import React from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, Picker, AsyncStorage } from 'react-native';
import { StackNavigator} from 'react-navigation';
import { Button } from 'react-native-elements';
import styles from './style'

export default class AloitusScreen extends React.Component {
  static navigationOptions = {header: null};

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
  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.al_container}>
        <View style = {{
          flex: 2,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <Text style={styles.al_otsikko}> LukkariSovellus </Text>
        </View>
        <View style={{
          flex: 3,
          flexDirection: 'column',
          alignItems: 'center',
        }}>
          <Button
            buttonStyle={ this.state.red ? styles.al_redColor : this.state.blue ? styles.al_blueColor : this.state.green ? styles.al_greenColor : this.state.purple ? styles.al_purpleColor : styles.al_defaultColor }
            onPress={() => navigate('Viikonpäivät')} title="Lukkari"/>
          <Button
            buttonStyle={ this.state.red ? styles.al_redColor : this.state.blue ? styles.al_blueColor : this.state.green ? styles.al_greenColor : this.state.purple ? styles.al_purpleColor : styles.al_defaultColor }
            onPress={() => navigate('Opetustuntilisays')} title="Lisää Kurssi"/>
          <Button
            buttonStyle={ this.state.red ? styles.al_redColor : this.state.blue ? styles.al_blueColor : this.state.green ? styles.al_greenColor : this.state.purple ? styles.al_purpleColor : styles.al_defaultColor }
            onPress={() => navigate('Laskuri')} title="Keskiarvon Laskuri"/>
          <Button
            buttonStyle={ this.state.red ? styles.al_redColor : this.state.blue ? styles.al_blueColor : this.state.green ? styles.al_greenColor : this.state.purple ? styles.al_purpleColor : styles.al_defaultColor }
            onPress={() => navigate('Asetukset')} title="Asetukset"/>
        </View>
      </View>
    );
  }
}
