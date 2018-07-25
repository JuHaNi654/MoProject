import React from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, Picker, AsyncStorage } from 'react-native';
import { StackNavigator} from 'react-navigation';
import { Button, Header } from 'react-native-elements';
import styles from './style';

export default class ViikonpaivatScreen extends React.Component {
  static navigationOptions = {header: null};
    constructor(props) {
      super(props)
      this.state = {
        style: null
      };
    }
    componentDidMount() {
      this.loadSettings();
    }
    loadSettings = async () => {
      try {
        let setColor = await AsyncStorage.getItem('settings');
        if (setColor != null) {
          this.setState({
            style: {backgroundColor: setColor}
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
    render() {
      const {navigate} = this.props.navigation;
      return (
        <View style={styles.container}>
          <Header
            centerComponent={{ text: 'Viikonpäivät', style: {fontSize: 25, fontWeight: 'bold', color: 'white', fontStyle: 'italic'} }}
            outerContainerStyles={ [styles.headerStyle,  this.state.style] }
          />
          <View style={{flex: 1, marginTop: '20%'}}>
            <Button buttonStyle={[styles.vp_buttonStyle, this.state.style]} onPress={() => navigate('Kurssit', {viikonpaiva: 'maanantai'})} title="maanantai"/>
            <Button buttonStyle={[styles.vp_buttonStyle, this.state.style]} onPress={() => navigate('Kurssit', {viikonpaiva: 'tiistai'})} title="tiistai"/>
            <Button buttonStyle={[styles.vp_buttonStyle, this.state.style]} onPress={() => navigate('Kurssit', {viikonpaiva: 'keskiviikko'})} title="keskiviikko"/>
            <Button buttonStyle={[styles.vp_buttonStyle, this.state.style]} onPress={() => navigate('Kurssit', {viikonpaiva: 'torstai'})} title="torstai"/>
            <Button buttonStyle={[styles.vp_buttonStyle, this.state.style]} onPress={() => navigate('Kurssit', {viikonpaiva: 'perjantai'})} title="perjantai"/>
          </View>
        </View>
      );
    }
}
