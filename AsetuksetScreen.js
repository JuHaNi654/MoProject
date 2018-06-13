import React from 'react';
import { Component, StyleSheet, Text, View, TextInput, KeyboardAvoidingView, TouchableHighlight, AsyncStorage, Alert } from 'react-native';
import { StackNavigator, StatusBar} from 'react-navigation';
import { Button } from 'react-native-elements';
import styles from './style'

export default class AsetuksetScreen extends React.Component{
  static navigationOptions = {
    title: 'Asetukset'
  };
  constructor(props) {
    super(props)
    this.state = {
      red: null,
      blue: null,
      purple: null,
      green: null,
    };
  }

  componentDidMount() {
    this.loadSettings()
  }

  saveSettings = () => {
    let settings = {
      red: this.state.red,
      green: this.state.green,
      blue: this.state.blue,
      purple: this.state.purple,
    }
    AsyncStorage.setItem('settings', JSON.stringify(settings));
    this.loadSettings();
  }
  loadSettings = async () => {
    try {
      let settings = await AsyncStorage.getItem('settings');
      let parsed = JSON.parse(settings);
      this.deploySettings(parsed);
    } catch (error) {
      console.log(error);
    }
  }
  deploySettings = (parsed) => {
    this.setState({
      red: parsed.red,
      blue: parsed.blue,
      green: parsed.green,
      purple: parsed.purple
    });
  }

  setColorRed = () => {
    this.setState({
      red: true,
      blue: false,
      purple: false,
      green: false
    });
  }
  setColorBlue = () => {
    this.setState({
      blue: true,
      red: false,
      purple: false,
      green: false
    });
  }
  setColorGreen = () => {
    this.setState({
      green: true,
      red: false,
      blue: false,
      purple: false
    });
  }
  setColorPurple = () => {
    this.setState({
      purple: true,
      red: false,
      blue: false,
      green: false
    });
  }

  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={{flexDirection: 'row'}}>
          <TouchableHighlight
            style={ this.state.red ? styles.as_redColor : styles.as_defaultColor}
            onPress={this.setColorRed}>
            <Text> Red </Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={ this.state.blue ? styles.as_blueColor : styles.as_defaultColor}
            onPress={this.setColorBlue}>
            <Text> Blue </Text>
          </TouchableHighlight>
        </View>
        <View style={{flexDirection: 'row'}}>
          <TouchableHighlight
            style={ this.state.green ? styles.as_greenColor : styles.as_defaultColor}
            onPress={this.setColorGreen}>
            <Text> Green </Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={ this.state.purple ? styles.as_purpleColor : styles.as_defaultColor}
            onPress={this.setColorPurple}>
            <Text> Purple </Text>
          </TouchableHighlight>
        </View>
        <View>
          <TouchableHighlight
            style={ this.state.red ? styles.as_redColor : this.state.blue ? styles.as_blueColor : this.state.green ? styles.as_greenColor : this.state.purple ? styles.as_purpleColor : styles.as_defaultColor}
            onPress={this.saveSettings}>
            <Text> Tallenna asetukset </Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={ this.state.red ? styles.as_redColor : this.state.blue ? styles.as_blueColor : this.state.green ? styles.as_greenColor : this.state.purple ? styles.as_purpleColor : styles.as_defaultColor}
            onPress={() => navigate('Aloitus')}>
            <Text> Takaisin </Text>
          </TouchableHighlight>
        </View>
      </View>
      );
    }
  }
