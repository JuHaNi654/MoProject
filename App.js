import React from 'react';
import { } from 'react-native';
import { StackNavigator} from 'react-navigation'
import AloitusScreen from './AloitusScreen';
import LukkariScreen from './LukkariScreen';
import LisaatuntiScreen from './LisaatuntiScreen';
import ViikonpaivatScreen from './ViikonpaivatScreen';
import LaskuriScreen from './LaskuriScreen';
import AsetuksetScreen from './AsetuksetScreen';


const MyApp = StackNavigator({
  Aloitus: {screen: AloitusScreen},
  Kurssit: {screen: LukkariScreen},
  Opetustuntilisays: {screen: LisaatuntiScreen},
  Viikonpäivät: {screen: ViikonpaivatScreen},
  Laskuri: {screen: LaskuriScreen},
  Asetukset: {screen: AsetuksetScreen},
});

export default class App extends React.Component {
  render() {
    return <MyApp/>;
  }
}
