import React from 'react';
import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, AsyncStorage, Alert } from 'react-native';
import { StackNavigator, StatusBar} from 'react-navigation';
import { Button, Header } from 'react-native-elements';
import styles from './style';

export default class LaskuriScreen extends React.Component{
  static navigationOptions = {header: null};
  constructor(props) {
    super(props);
    this.state = {
      opintopiste: '',
      arvosana: '',
      kokonaisMaara: 0,
      kokonaisOpMaara: 0,
      keskiarvo: 0,
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

  addArvo = () => {
    var yhteensa = 0;
    if(/^\d+$/.test(this.state.opintopiste) && /^\d+$/.test(this.state.arvosana)) {
      const kokonaisOpMaara = this.state.kokonaisOpMaara + parseInt(this.state.opintopiste);
      yhteensa = parseInt(this.state.opintopiste) * parseInt(this.state.arvosana);
      const kokonaisMaara = this.state.kokonaisMaara + yhteensa;
      this.setState({
        kokonaisOpMaara: kokonaisOpMaara,
        kokonaisMaara: kokonaisMaara,
        opintopiste: '',
        arvosana: ''
      });
    } else {
      Alert.alert('Aseta arvosana tai opintopiste numerona!');
    }
  }

  laskeKa = () => {
    const keskiarvo = this.state.kokonaisMaara / this.state.kokonaisOpMaara;
    this.setState({keskiarvo: keskiarvo.toFixed(2)});
  }
  reset = () => {
    this.setState({
      kokonaisOpMaara: 0,
      kokonaisMaara: 0,
      keskiarvo: 0,
      opintopiste: '',
      arvosana: ''
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <Header
          centerComponent={{ text: 'Keskiarvo Laskuri', style: {fontSize: 25, fontWeight: 'bold', color: 'white', fontStyle: 'italic'} }}
          outerContainerStyles={ [styles.headerStyle,  this.state.style] }
        />
          <View style={{flex: 1, marginTop: "25%"}}>
            <Text style={styles.la_textStyles}>Opintopisteet Yhteensä: {this.state.kokonaisOpMaara}</Text>
            <Text style={styles.la_textStyles}>Arvosanojen Keskiarvo: {this.state.keskiarvo}</Text>

            <KeyboardAvoidingView behavior="padding">
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={styles.la_textStyles}>Opinnon Laajuus:</Text>
                <TextInput
                keyboardType='numeric'
                style={{width: 50, textAlign: 'center', fontSize: 18}}
                onChangeText={(opintopiste) => this.setState({opintopiste})}
                value={this.state.opintopiste}
                />
                <Text style={styles.la_textStyles}>op</Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={styles.la_textStyles}>Arvosana:</Text>
                <TextInput
                keyboardType='numeric'
                style={{width: 50, textAlign: 'center', fontSize:18}}
                onChangeText={(arvosana) => this.setState({arvosana})}
                value={this.state.arvosana}
                maxLength={1}
              />
              </View>
            </KeyboardAvoidingView>
            <Button buttonStyle={[ styles.la_redColor, this.state.style]}
              title="Lisää"
              onPress={this.addArvo}/>
            <Button buttonStyle={[ styles.la_redColor, this.state.style ]}
              title="Laske Keskiarvo"
              onPress={this.laskeKa}/>
            <Button buttonStyle={[ styles.la_redColor, this.state.style ]}
              title="reset"
              onPress={this.reset}/>
          </View>
      </View>
    );
  }

}
