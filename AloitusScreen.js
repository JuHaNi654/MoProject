import React from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, Picker, AsyncStorage } from 'react-native';
import { StackNavigator} from 'react-navigation';
import { Button } from 'react-native-elements';
import styles from './style';

export default class AloitusScreen extends React.Component {
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

 //{[(this.state.style == null) ? styles.headerStyle : styles.headerStyle, this.state.style]}
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
            buttonStyle={[ styles.al_defaultColor, this.state.style ]}
            onPress={() => navigate('Viikonpäivät')} title="Lukkari"/>
          <Button
            buttonStyle={[ styles.al_defaultColor, this.state.style ]}
            onPress={() => navigate('Opetustuntilisays')} title="Lisää Kurssi"/>
          <Button
            buttonStyle={[ styles.al_defaultColor, this.state.style ]}
            onPress={() => navigate('Laskuri')} title="Keskiarvo Laskuri"/>
          <Button
            buttonStyle={[ styles.al_defaultColor, this.state.style ]}
            onPress={() => navigate('Asetukset')} title="Asetukset"/>
        </View>
      </View>
    );
  }
}
