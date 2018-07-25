import React from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, Picker, Alert, KeyboardAvoidingView, AsyncStorage } from 'react-native';
import { StackNavigator, StatusBar} from 'react-navigation'
import { SQLite } from 'expo';
import { Button, Header } from 'react-native-elements';
import { moment } from 'moment';
import styles from './style';

const db = SQLite.openDatabase('coursedb.db');

export default class LisaatuntiScreen extends React.Component {
  static navigationOptions = {header: null};
  constructor(props) {
    super(props);
    this.state = {
      aloitus: '',
      lopetus: '',
      kurssinimi: '',
      kurssitunnus: '',
      luokka: '',
      viikonpaiva: null,
      kurssit: [],
      kellonajat: [],
      style: {
        backgroundColor: '',
      },
      borderStyle: {
        borderColor: '',
      },
    };
  }

  componentDidMount() {
    db.transaction(tx => {
      tx.executeSql('create table if not exists kurssit (id integer primary key not null, aloitus time, lopetus time, kurssinimi text, kurssitunnus text, luokka text, viikonpaiva text);');
      tx.executeSql('select * from kurssit', [], (_, {rows}) => this.setState({kurssit: rows._array}));
    });
    this.saveKurssi();
    this.loadSettings();
  }
  loadSettings = async () => {
    try {
      let setColor = await AsyncStorage.getItem('settings');
      if (setColor != null) {
        this.setState({
          style: {backgroundColor: setColor},
          borderStyle:  {borderColor: setColor}
        });
      } else {
        this.setState({
          style: null,
          borderStyle: null
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  saveKurssi = () => {
    if (this.state.aloitus == '' && this.state.lopetus == '' && this.state.kurssinimi == '' &&
    this.state.kurssitunnus == '' && this.state.luokka == '' && this.state.viikonpaiva == null) {
      return;
    } else {
      if (this.state.kurssinimi == '') {
        Alert.alert('Kurssia ei lisätty lukujärjestykseen!',
        'Syy: Kurssinimen kenttä on tyhjä');
        return;
      } else if (this.state.kurssitunnus == '') {
        Alert.alert('Kurssia ei lisätty lukujärjestykseen!',
        'Syy: Kurssitunnuksen kenttä on tyhjä');
        return;
      } else if (this.state.luokka == '') {
        Alert.alert('Kurssia ei lisätty lukujärjestykseen!',
        'Syy: Luokka kenttä on tyhjä');
        return;
      } else if (this.state.aloitus == '') {
        Alert.alert('Kurssia ei lisätty lukujärjestykseen!',
        'Syy: Kurssin aloitus kenttä on tyhjä');
        return;
      } else if (this.state.lopetus == '') {
        Alert.alert('Kurssia ei lisätty lukujärjestykseen!',
        'Syy: Kurssin lopetus kenttä on tyhjä');
        return;
      } else if (this.state.viikonpaiva == null) {
        Alert.alert('Kurssia ei lisätty lukujärjestykseen!',
        'Syy: Viikonpäivä ei ole valittuna');
        return;
      } else {
        var moment = require('moment');
        const alku = moment.utc(this.state.aloitus, 'HH:mm').format('HH:mm');
        const loppu = moment.utc(this.state.lopetus, 'HH:mm').format('HH:mm');
        if (this.state.kurssit.length === 0) {
          db.transaction(tx => {
            tx.executeSql('insert into kurssit (aloitus , lopetus, kurssinimi, kurssitunnus, luokka, viikonpaiva) values (?, ?, ?, ?, ?, ?)',
            [alku, loppu, this.state.kurssinimi, this.state.kurssitunnus, this.state.luokka, this.state.viikonpaiva]);
            tx.executeSql('select * from kurssit', [], (_, {rows}) => this.setState({kurssit: rows._array}));
          }, null, Alert.alert('Tallennus onnistui'));
          return;
        } else {
          for(var i = 0;i < this.state.kurssit.length; i++) {
            const kurssit = this.state.kurssit[i];
            if (alku >= this.state.kurssit[i].aloitus && alku <= this.state.kurssit[i].lopetus && this.state.viikonpaiva == this.state.kurssit[i].viikonpaiva ||
              loppu >= this.state.kurssit[i].aloitus && loppu <= this.state.kurssit[i].lopetus && this.state.viikonpaiva == this.state.kurssit[i].viikonpaiva) {
                Alert.alert('Kurssia ei lisätty lukujärjestykseen!',
                'Syy: Asettamasi kurssin kellonajat menee toisen kurssin päälle.');
                break;
              } else if ( i + 1 === this.state.kurssit.length) {
                db.transaction(tx => {
                  tx.executeSql('insert into kurssit (aloitus , lopetus, kurssinimi, kurssitunnus, luokka, viikonpaiva) values (?, ?, ?, ?, ?, ?)',
                  [alku, loppu, this.state.kurssinimi, this.state.kurssitunnus, this.state.luokka, this.state.viikonpaiva]);
                  tx.executeSql('select * from kurssit', [], (_, {rows}) => this.setState({kurssit: rows._array}));
                }, null, Alert.alert('Tallennus onnistui'));
              }
            }
          }
        }
      }
    }


    render() {
      return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
          <Header
            centerComponent={{ text: 'Lisää uusi kurssi', style: {fontSize: 25, fontWeight: 'bold', color: 'white', fontStyle: 'italic'} }}
            outerContainerStyles={ [styles.headerStyle,  this.state.style] }
          />
          <View style={{flex: 1, marginTop: '10%'}}>
              <View style={styles.li_timeTextBoxStyle}>
                <View style={{flexDirection: 'row'}}>
                  <TextInput
                    style={[styles.li_timeInputstyle, this.state.borderStyle]}
                    keyboardType='numeric'
                    placeholder='Aloitus'
                    onChangeText={(aloitus) => this.setState({aloitus})}
                    value={this.state.aloitus}/>
                  <Text> - </Text>
                  <TextInput
                    style={[styles.li_timeInputstyle, this.state.borderStyle]}
                    keyboardType='numeric'
                    placeholder='Lopetus'
                    onChangeText={(lopetus) => this.setState({lopetus})}
                    value={this.state.lopetus}/>
                </View>
                <TextInput
                  style={[styles.li_textInputStyle, this.state.borderStyle]}
                  placeholder='Kurssinimi'
                  onChangeText={(kurssinimi) => this.setState({kurssinimi})}
                  value={this.state.kurssinimi}/>
                <TextInput
                  style={[styles.li_textInputStyle, this.state.borderStyle]}
                  placeholder='Kurssitunnus'
                  onChangeText={(kurssitunnus) => this.setState({kurssitunnus})}
                  value={this.state.kurssitunnus}/>
                <TextInput
                  style={[styles.li_textInputStyle, this.state.borderStyle]}
                  placeholder='Luokka'
                  onChangeText={(luokka) => this.setState({luokka})}
                  value={this.state.luokka}/>
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
              <Button buttonStyle={[styles.li_buttonStyle, this.state.style]} title="Lisää kurssi" onPress={this.saveKurssi}/>
          </View>
        </KeyboardAvoidingView>
      );
    }
  }
