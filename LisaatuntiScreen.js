import React from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, Picker, Alert, KeyboardAvoidingView } from 'react-native';
import { StackNavigator, StatusBar} from 'react-navigation'
import { SQLite } from 'expo';
import { Button } from 'react-native-elements';
import { moment } from 'moment';


const db = SQLite.openDatabase('coursedb.db');

export default class LisaatuntiScreen extends React.Component {

  static navigationOptions = {
    title: "Lisää uusi kurssi"
  }

  constructor(props) {
    super(props);
    this.state = {
      aloitus: null,
      lopetus: null,
      kurssinimi: '',
      kurssitunnus: '',
      luokka: '',
      viikonpaiva: null,
      kurssit: [],
      kellonajat: [],
    };
  }

    componentDidMount() {
      var moment = require('moment')
      db.transaction(tx => {
        tx.executeSql('create table if not exists kurssit (id integer primary key not null, aloitus time, lopetus time, kurssinimi text, kurssitunnus text, luokka text, viikonpaiva text);');
      });
    }

    saveKurssi = () => {
      var moment = require('moment');
      const alku = moment.utc(this.state.aloitus, 'HH:mm').format('HH:mm');
      const loppu = moment.utc(this.state.lopetus, 'HH:mm').format('HH:mm');
      db.transaction(tx => {
        tx.executeSql('select * from kurssit', [], (_, {rows}) =>
        this.setState({kurssit: rows._array}));
      })
      if (this.state.kurssit.length === 0 && this.state.viikonpaiva != null) {
        db.transaction(tx => {
          tx.executeSql('insert into kurssit (aloitus , lopetus, kurssinimi, kurssitunnus, luokka, viikonpaiva) values (?, ?, ?, ?, ?, ?)',
                        [alku, loppu, this.state.kurssinimi, this.state.kurssitunnus, this.state.luokka, this.state.viikonpaiva]);
          }, null, Alert.alert('Tallennus onnistui'))
      } else {
      for (var i = 0; i < this.state.kurssit.length; i++) {
         const kurssit = this.state.kurssit[i];
         console.log(this.state.kurssit);
        if (this.state.viikonpaiva == null) {
          Alert.alert('Aseta viikonpäivä!');
          break;
        } else if (alku >= this.state.kurssit[i].aloitus && alku <= this.state.kurssit[i].lopetus && this.state.viikonpaiva == this.state.kurssit[i].viikonpaiva ||
          loppu >= this.state.kurssit[i].aloitus && loppu <= this.state.kurssit[i].lopetus && this.state.viikonpaiva == this.state.kurssit[i].viikonpaiva) {
            Alert.alert('Kurssia ei lisätty.',
                        'Syy: Asettamasi kurssin kellonajat menee toisen kurssin päälle.');
            break;
        } else {
          if (i === this.state.kurssit.length) {
            db.transaction(tx => {
              tx.executeSql('insert into kurssit (aloitus , lopetus, kurssinimi, kurssitunnus, luokka, viikonpaiva) values (?, ?, ?, ?, ?, ?)',
                            [alku, loppu, this.state.kurssinimi, this.state.kurssitunnus, this.state.luokka, this.state.viikonpaiva]);
              }, null, Alert.alert('Tallennus onnistui'))
              }
          }
        }
      }
    }


  render() {
    return (
          <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <View style={styles.timeTextBoxStyle}>
              <View style={{flexDirection: 'row'}}>
                <TextInput
                  style={styles.timeInputstyle}
                  keyboardType='numeric'
                  placeholder='Aloitus'
                  onChangeText={(aloitus) => this.setState({aloitus})}
                  value={this.state.aloitus}/>
                <Text> - </Text>
                <TextInput
                  style={styles.timeInputstyle}
                  keyboardType='numeric'
                  placeholder='Lopetus'
                  onChangeText={(lopetus) => this.setState({lopetus})}
                  value={this.state.lopetus}/>
              </View>
              <TextInput
                style={styles.textInputStyle}
                placeholder='Kurssinimi'
                onChangeText={(kurssinimi) => this.setState({kurssinimi})}
                value={this.state.kurssinimi}/>
              <TextInput
                style={styles.textInputStyle}
                placeholder='Kurssitunnus'
                onChangeText={(kurssitunnus) => this.setState({kurssitunnus})}
                value={this.state.kurssitunnus}/>
              <TextInput
                style={styles.textInputStyle}
                placeholder='Luokka'
                onChangeText={(luokka) => this.setState({luokka})}
                value={this.state.luokka}/>
            </View>
            <View>
              <Picker
                style={{width: 200}}
                selectedValue={this.state.viikonpaiva}
                onValueChange={(itemValue, itemIndex) => this.setState({viikonpaiva: itemValue})}>
                <Picker.Item label={"Viikonpäivä"} value={null} />
                <Picker.Item label={"maanantai"} value={"maanantai"} />
                <Picker.Item label={"tiistai"} value={"tiistai"} />
                <Picker.Item label={"keskiviikko"} value={"keskiviikko"} />
                <Picker.Item label={"torstai"} value={"torstai"} />
                <Picker.Item label={"perjantai"} value={"perjantai"} />
              </Picker>
            </View>
            <Button buttonStyle={styles.buttonStyle} title="Lisää kurssi" onPress={this.saveKurssi}/>
          </KeyboardAvoidingView>
      );
    }
  }

  const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
      listcontainer: {
       flexDirection: 'row',
       backgroundColor: '#fff',
       alignItems: 'center'
     },
     textInputStyle: {
       width: 200,
       borderColor: 'blue',
       borderWidth:1,
       textAlign: 'center',
       marginBottom: 10,
       borderRadius: 12,
     },
     timeInputstyle: {
       width: 75,
       borderColor: 'blue',
       borderWidth:1,
       textAlign: 'center',
       marginBottom: 10,
       borderRadius: 12,
     },
     timeTextBoxStyle: {
       flexDirection: 'column',
       justifyContent: 'center',
       alignItems: 'center'
     },
     buttonStyle: {
       backgroundColor: 'red',
       borderRadius: 100,
     }
  });
