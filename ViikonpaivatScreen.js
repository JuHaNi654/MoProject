import React from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, Picker } from 'react-native';
import { StackNavigator} from 'react-navigation';
import { Button } from 'react-native-elements';

export default class ViikonpaivatScreen extends React.Component {
    static navigationOptions = {
      title: 'Viikonpäivät',
      headerTitleStyle: {
        left: 75,
        flex: 1,
        width: '90%',
        alignSelf:'center',
      }
    };

    render() {
      const {navigate} = this.props.navigation;
      return (
        <View style={styles.container}>
          <View>
            <Button buttonStyle={styles.buttonStyle} onPress={() => navigate('Kurssit', {viikonpaiva: 'maanantai'})} title="maanantai"/>
            <Button buttonStyle={styles.buttonStyle} onPress={() => navigate('Kurssit', {viikonpaiva: 'tiistai'})} title="tiistai"/>
            <Button buttonStyle={styles.buttonStyle} onPress={() => navigate('Kurssit', {viikonpaiva: 'keskiviikko'})} title="keskiviikko"/>
            <Button buttonStyle={styles.buttonStyle} onPress={() => navigate('Kurssit', {viikonpaiva: 'torstai'})} title="torstai"/>
            <Button buttonStyle={styles.buttonStyle} onPress={() => navigate('Kurssit', {viikonpaiva: 'perjantai'})} title="perjantai"/>
          </View>
        </View>
      );
    }
}

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: 'red',
    borderRadius: 12,
    width: 300,
    marginBottom: 10,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
});
