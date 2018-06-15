import React from 'react';
import { Dimensions, Component, StyleSheet, Text, View, TextInput, KeyboardAvoidingView, TouchableHighlight, AsyncStorage, Alert, ScrollView } from 'react-native';
import { StackNavigator, StatusBar} from 'react-navigation';
import { Button, Header } from 'react-native-elements';
import { SQLite } from 'expo';
import styles from './style'

const db = SQLite.openDatabase('coursedb.db');

export default class AsetuksetScreen extends React.Component{
  static navigationOptions = {header: null};
  constructor(props) {
    super(props)
    this.state = {
      red: null,
      blue: null,
      green: null,
      purple: null,
      style: {
        backgroundColor: ''
      },

    };
  }

  componentDidMount() {
    this.loadSettings();
  }
  confirmationFunction = () => {
    Alert.alert(
      'Varoitus',
      'Haluatko varmasti poistaa lukkarin tiedot?',
      [
        {text: 'Ei', onPress: () => Alert.alert('Toiminto Peruttiin')},
        {text: 'Kyllä', onPress: () => this.deleteKurssitData()},
      ],
      { cancelable: false }
    )
  }
  deleteKurssitData = () => {
    db.transaction(tx => {
      tx.executeSql('drop table kurssit;');
    }, null, Alert.alert('Lukkarin tiedot poistettiin.'));
  }

  saveSettings = () => {
    let style = this.state.style.backgroundColor;
    let boolVal = {
      red: this.state.red,
      blue: this.state.blue,
      green: this.state.green,
      purple: this.state.purple
    }
    AsyncStorage.setItem('boolValues', JSON.stringify(boolVal));
    AsyncStorage.setItem('settings', style);
    this.loadSettings();
  }
  loadSettings = async () => {
    try {
      let boolVal = await AsyncStorage.getItem('boolValues');
      let parsed = JSON.parse(boolVal);
      let setColor = await AsyncStorage.getItem('settings');
      this.deploySettings(setColor, parsed);
    } catch (error) {
      console.log(error);
    }
  }
  deploySettings = (setColor, parsed) => {
    this.setState({
      red: parsed.red,
      blue: parsed.blue,
      green: parsed.green,
      purple: parsed.purple,
      style: {backgroundColor: setColor}
    });
  }


  setColorRed = () => {
    this.setState({
      red: true,
      blue: false,
      green: false,
      purple: false,
      style: {backgroundColor: 'red'}
    });
  }
  setColorBlue = () => {
    this.setState({
      blue: true,
      red: false,
      green: false,
      purple: false,
      style: {backgroundColor: 'blue'}
    });
  }
  setColorGreen = () => {
    this.setState({
      green: true,
      red: false,
      blue: false,
      purple: false,
      style: {backgroundColor: 'green'}
    });
  }
  setColorPurple = () => {
    this.setState({
      purple: true,
      red: false,
      blue: false,
      green: false,
      style: {backgroundColor: 'purple'}
    });
  }

  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <Header
          centerComponent={{ text: 'Asetukset', style: {fontSize: 25, fontWeight: 'bold', color: 'white', fontStyle: 'italic'} }}
          outerContainerStyles={ [styles.headerStyle,  this.state.style] }
        />
        <View style={{flex: 2, marginTop: '8%' }}>
          <View style={{flexDirection: 'row'}}>
            <TouchableHighlight
              style={[ styles.as_defaultColor, this.state.red ? this.state.style : null]}
              onPress={this.setColorRed}>
              <Text style={styles.as_textStyle}> Red </Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={[ styles.as_defaultColor, this.state.blue ? this.state.style : null ]}
              onPress={this.setColorBlue}>
              <Text style={styles.as_textStyle}> Blue </Text>
            </TouchableHighlight>
          </View>
          <View style={{flexDirection: 'row'}}>
            <TouchableHighlight
              style={[ styles.as_defaultColor, this.state.green ? this.state.style : null ]}
              onPress={this.setColorGreen}>
              <Text style={styles.as_textStyle}> Green </Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={[ styles.as_defaultColor, this.state.purple ? this.state.style : null]}
              onPress={this.setColorPurple}>
              <Text style={styles.as_textStyle}> Purple </Text>
            </TouchableHighlight>
          </View>
          <TouchableHighlight
            style={[ styles.as_deletButton, this.state.style ]}
            onPress={this.confirmationFunction}>
            <Text style={styles.as_textStyle}> Tyhjennä Lukkarin tiedot </Text>
          </TouchableHighlight>
        </View>
        <View style={{flex: 1}}>
          <TouchableHighlight
            style={[styles.controllButtons, this.state.style]}
            onPress={this.saveSettings}>
            <Text style={styles.as_textStyle}> Tallenna asetukset </Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={[styles.controllButtons, this.state.style ]}
            onPress={() => navigate('Aloitus')}>
            <Text style={styles.as_textStyle}> Takaisin </Text>
          </TouchableHighlight>
        </View>
      </View>
      );
    }
  }
