import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, FlatList, Picker } from 'react-native';
import { StackNavigator} from 'react-navigation'
import { SQLite } from 'expo';
import AloitusScreen from './AloitusScreen';
import LukkariScreen from './LukkariScreen';
import LisaatuntiScreen from './LisaatuntiScreen';
import ViikonpaivatScreen from './ViikonpaivatScreen';

const MyApp = StackNavigator({
  Aloitus: {screen: AloitusScreen},
  Kurssit: {screen: LukkariScreen},
  Opetustuntilisays: {screen: LisaatuntiScreen},
  Viikonpäivät: {screen: ViikonpaivatScreen},
});

export default class App extends React.Component {

  render() {
    return <MyApp/>;
  }
}
