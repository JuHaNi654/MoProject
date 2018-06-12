import React from 'react';
import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView } from 'react-native';
import { StackNavigator, StatusBar} from 'react-navigation'
import { Button } from 'react-native-elements';

export default class LaskuriScreen extends React.Component{
  static navigationOptions = {
    title: 'Keskiarvon Laskuri'
  };
  constructor(props) {
    super(props);
    this.state = {
      opintopiste: '',
      arvosana: '',
      kokonaisMaara: 0,
      kokonaisOpMaara: 0,
      keskiarvo: 0,
    };
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
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
          <View style={{marginBottom: 15}}>
            <Text style={styles.textStyles}>Opintopisteet Yhteensä: {this.state.kokonaisOpMaara}</Text>
            <Text style={styles.textStyles}>Arvosanojen Keskiarvo: {this.state.keskiarvo}</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.textStyles}>Opinnon Laajuus:</Text>
            <TextInput
              keyboardType='numeric'
              style={{width: 50, textAlign: 'center', marginLeft: 10, fontSize: 18}}
              onChangeText={this.numberOnly1}
              value={this.state.opintopiste}

            />
            <Text style={styles.textStyles}>op</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.textStyles}>Arvosana:</Text>
            <TextInput
              keyboardType='numeric'
              style={{width: 50, textAlign: 'center', marginLeft: 33, fontSize:18}}
              onChangeText={this.numberOnly2}
              value={this.state.arvosana}
              maxLength={1}
            />
          </View>
          <Button buttonStyle={styles.buttonStyle} title="Lisää" onPress={this.addArvo}/>
          <Button buttonStyle={styles.buttonStyle} title="Laske Keskiarvo" onPress={this.laskeKa}/>

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
  buttonStyle: {
    backgroundColor: 'red',
    borderRadius: 100,
    width: 200,
    marginTop: 10,
  },
  textStyles: {
    fontSize: 18,
  }
});
