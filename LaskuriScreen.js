import React from 'react';
import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, AsyncStorage } from 'react-native';
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
      style: {
        backgroundColor: '',
      },
    };
  }
  componentDidMount() {
    this.loadSettings();
  }
  loadSettings = async () => {
    try {
      let setColor = await AsyncStorage.getItem('settings');
      this.setState({
        style: {backgroundColor: setColor}
      });
    } catch (error) {
      console.log(error);
    }
  }

  addArvo = () => {
    var yhteensa = 0;
    const kokonaisOpMaara = this.state.kokonaisOpMaara + parseInt(this.state.opintopiste);
    yhteensa = parseInt(this.state.opintopiste) * parseInt(this.state.arvosana);
    const kokonaisMaara = this.state.kokonaisMaara + yhteensa;
    this.setState({
      kokonaisOpMaara: kokonaisOpMaara,
      kokonaisMaara: kokonaisMaara,
      opintopiste: '',
      arvosana: ''
    });
  }

  laskeKa = () => {
    const keskiarvo = this.state.kokonaisMaara / this.state.kokonaisOpMaara;
    this.setState({keskiarvo: keskiarvo});
  }
  numberOnly1 = (opintopiste) => {
    if(/^\d+$/.test(opintopiste)) {
      this.setState({
        opintopiste: opintopiste
      });
    }
  }
  numberOnly2 = (arvosana) => {
    if(/^\d+$/.test(arvosana)) {
      this.setState({
        arvosana: arvosana
      });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          centerComponent={{ text: 'Keskiarvon Laskuri', style: {fontSize: 25, fontWeight: 'bold', color: 'white', fontStyle: 'italic'} }}
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
                onChangeText={this.numberOnly1}
                value={this.state.opintopiste}
                />
                <Text style={styles.la_textStyles}>op</Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={styles.la_textStyles}>Arvosana:</Text>
                <TextInput
                keyboardType='numeric'
                style={{width: 50, textAlign: 'center', fontSize:18}}
                onChangeText={this.numberOnly2}
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
          </View>
      </View>
    );
  }

}
