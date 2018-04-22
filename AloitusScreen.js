import React from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, Picker } from 'react-native';
import { StackNavigator} from 'react-navigation';
import { Button } from 'react-native-elements';

export default class AloitusScreen extends React.Component {
  static navigationOptions = {header: null};
  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style = {{
          flex: 2,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <Text style={styles.otsikko}> LukkariSovellus </Text>
        </View>
        <View style={{
          flex: 3,
          flexDirection: 'column',
          alignItems: 'center',
        }}>
          <Button
            buttonStyle={styles.buttonstyle}
            onPress={() => navigate('Viikonpäivät')} title="Lukkari"/>
          <Button
            buttonStyle={styles.buttonstyle}
            onPress={() => navigate('Opetustuntilisays')} title="Lisää Kurssi"/>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: 100,
  },
  buttonstyle: {
    backgroundColor: 'red',
    borderRadius: 12,
    width: 300,
    marginBottom: 10,
  },
  otsikko: {
    fontSize: 25,
    fontWeight: 'bold',
  }
});
