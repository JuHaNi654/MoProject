import React from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, Picker, Alert, KeyboardAvoidingView, } from 'react-native';
import { StackNavigator, StatusBar} from 'react-navigation'
import { SQLite } from 'expo';
import { Button } from 'react-native-elements';

const db = SQLite.openDatabase('coursedb.db');

export default class LisaatuntiScreen extends React.Component {
  static navigationOptions = {title: 'Lisää uusi kurssi'};
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
      aloitukset: [],
      lopetukset: [],
    };
  }

    componentDidMount() {
      db.transaction(tx => {
        tx.executeSql('create table if not exists kurssit (id integer primary key not null, aloitus time, lopetus time, kurssinimi text, kurssitunnus text, luokka text, viikonpaiva text);');
      });
    }

    saveKurssi = () => {
      if (this.state.viikonpaiva != null) {
        db.transaction(tx => {
            tx.executeSql('insert into kurssit (aloitus , lopetus, kurssinimi, kurssitunnus, luokka, viikonpaiva) values (?, ?, ?, ?, ?, ?)',
            [this.state.aloitus, this.state.lopetus, this.state.kurssinimi, this.state.kurssitunnus, this.state.luokka, this.state.viikonpaiva]);
          }, null, Alert.alert('Tallennus onnistui'))
      } else {
        Alert.alert('Aseta viikonpäivä');
      }
    }
/*
    saveKurssi = () => {
      db.transaction(tx => {
        tx.executeSql('select aloitus from kurssit where viikonpaiva = ?', [this.state.viikonpaiva], (_, {rows}) =>
          this.setState({aloitukset: rows._array}));
        tx.executeSql('select lopetus from kurssit where viikonpaika = ?', [this.state.viikonpaika], (_, {rows}) =>
          this.setState({lopetukset: rows._array}));
      });
      for()
    }

*/

render() {
  return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
          <View style={styles.timeTextBoxStyle}>
            <View style={{flexDirection: 'row'}}>
              <TextInput
                style={styles.timeInputstyle}
                placeholder='Aloitus'
                onChangeText={(aloitus) => this.setState({aloitus})}
                value={this.state.aloitus}/>
              <Text> - </Text>
              <TextInput
                style={styles.timeInputstyle}
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
