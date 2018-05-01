import React from 'react';
import { StyleSheet, Text, View, FlatList, Alert, TouchableWithoutFeedback, Animated } from 'react-native';
import { StackNavigator} from 'react-navigation';
import { Button } from 'react-native-elements';
import { SQLite } from 'expo';
import { moment } from 'moment';



const db = SQLite.openDatabase('coursedb.db');

export default class testiScreen extends React.Component {
  //static navigationOptions = {title: 'Kurssit'};
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return {
      title: params ? params.viikonpaiva : '',
    }
  };

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
    };
  }

  componentDidMount() {
    const {params} = this.props.navigation.state;
    this.setState({paiva: params.viikonpaiva});
    this.updateList();
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
      <View>
        <View>
          <FlatList
            style={{marginLeft: '7%'}}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
                  <TouchableWithoutFeedback
                    delayPressIn={300}
                    onPressIn={() => this.handlePressIn(item.id)}>
                    <View style={styles.infoBox}>
                      <Text syle={{Size: 20}}>{item.aloitus} - {item.lopetus}</Text>
                      <Text style={{fontSize: 18, textAlign: 'center', fontWeight: 'bold'}}>{item.kurssinimi}</Text>
                      <Text>{item.kurssitunnus}</Text>
                      <Text>{item.luokka}</Text>
                    </View>
                  </TouchableWithoutFeedback>
                )}
            data={this.state.kurssit} />
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
    justifyContent: 'center',
  },
  infoBox: {
    left: 30,
    fontWeight: 'bold',
    width: '75%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 12,
    marginTop: 15,
  }
});
