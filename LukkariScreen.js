import React from 'react';
import { StyleSheet, Text, View, FlatList, Alert, TouchableWithoutFeedback, Animated, AsyncStorage } from 'react-native';
import { StackNavigator} from 'react-navigation';
import { Header } from 'react-native-elements';
import { SQLite } from 'expo';
import { moment } from 'moment';
import styles from './style';


const db = SQLite.openDatabase('coursedb.db');

export default class testiScreen extends React.Component {
  static navigationOptions = {header: null};

  constructor(props) {
    super(props);
    this.state = {
      aloitus: '',
      lopetus: '',
      kurssinimi: '',
      kurssitunnus: '',
      luokka: '',
      viikonpaiva: '',
      paiva: '',
      kurssit: [],
      style: {
        backgroundColor: '',
      },
      borderStyle: {
        borderColor: '',
      },
    };
  }

  componentDidMount() {
    const {params} = this.props.navigation.state;
    this.setState({paiva: params.viikonpaiva});
    this.updateList();
    this.loadSettings();
  }

  loadSettings = async () => {
    try {
      let setColor = await AsyncStorage.getItem('settings');
      if (setColor != null) {
        this.setState({
          style: {backgroundColor: setColor},
          borderStyle:  {borderColor: setColor}
        });
      } else {
        this.setState({
          style: null,
          borderStyle: null
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  updateList = () => {
    db.transaction(tx => {
      tx.executeSql('select * from kurssit where viikonpaiva = ? ORDER BY aloitus;', [this.state.paiva], (_, { rows }) =>
        this.setState({kurssit: rows._array})
      );
    });
  }

  deleteOppitunti = (id) => {
    db.transaction(tx => {tx.executeSql('delete from kurssit where id = ?;', [id]);}, null, this.updateList)
    Alert.alert('Kurssi poistettiin Lukkarista')
  }

  handlePressIn = (id) => {
    Alert.alert(
      'Varoitus',
      'Haluatko poistaa valitsemasi kurssin?',
      [
        {text: 'Ei', onPress: () => Alert.alert('Toiminto Peruttiin')},
        {text: 'Kyllä', onPress: () => this.deleteOppitunti(id)},
      ],
      { cancelable: false }
    )

  }

  render() {
    const {params} = this.props.navigation.state;
    return (
      <View style={{flex: 1}}>
        <Header
          centerComponent={{ text: params.viikonpaiva, style: {fontSize: 25, fontWeight: 'bold', color: 'white', fontStyle: 'italic'} }}
          outerContainerStyles={[ styles.headerStyle, this.state.style ]}
        />
        <View style={{flex: 1}}>
          <View>
            <FlatList
              style={{marginLeft: '7%'}}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => (
                    <TouchableWithoutFeedback
                      delayPressIn={300}
                      onPressIn={() => this.handlePressIn(item.id)}>
                      <View style={[styles.lu_infoBox, this.state.borderStyle]}>
                        <Text style={{fontSize: 18, textAlign: 'center'}}>{item.aloitus} - {item.lopetus}</Text>
                        <Text style={{fontSize: 18, textAlign: 'center', fontWeight: 'bold'}}>{item.kurssinimi}</Text>
                        <Text style={{fontSize: 15, textAlign: 'center'}}>{item.kurssitunnus}</Text>
                        <Text style={{fontSize: 15, textAlign: 'center'}}>{item.luokka}</Text>
                      </View>
                    </TouchableWithoutFeedback>
                  )}
              data={this.state.kurssit} />
            </View>
        </View>
      </View>
    );
  }
}
