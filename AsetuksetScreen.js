import React from 'react';
import { Component, StyleSheet, Text, View, TextInput, KeyboardAvoidingView, TouchableHighlight, AsyncStorage, Alert } from 'react-native';
import { StackNavigator, StatusBar} from 'react-navigation';
import { Button } from 'react-native-elements';
import styles from './style'

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
        backgroundColor: '',
      }
    };
  }

  componentDidMount() {
    this.loadSettings();
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
        <View style={{flexDirection: 'row'}}>
          <TouchableHighlight
            style={[ styles.as_defaultColor, this.state.red ? this.state.style : null]}
            onPress={this.setColorRed}>
            <Text> Red </Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={[ styles.as_defaultColor, this.state.blue ? this.state.style : null ]}
            onPress={this.setColorBlue}>
            <Text> Blue </Text>
          </TouchableHighlight>
        </View>
        <View style={{flexDirection: 'row'}}>
          <TouchableHighlight
            style={[ styles.as_defaultColor, this.state.green ? this.state.style : null ]}
            onPress={this.setColorGreen}>
            <Text> Green </Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={[ styles.as_defaultColor, this.state.purple ? this.state.style : null]}
            onPress={this.setColorPurple}>
            <Text> Purple </Text>
          </TouchableHighlight>
        </View>
        <View>
          <TouchableHighlight
            style={[styles.as_defaultColor, this.state.style]}
            onPress={this.saveSettings}>
            <Text> Tallenna asetukset </Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={[styles.as_defaultColor, this.state.style ]}
            onPress={() => navigate('Aloitus')}>
            <Text> Takaisin </Text>
          </TouchableHighlight>
        </View>
      </View>
      );
    }
  }
