import React from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import { StackNavigator} from 'react-navigation'
import { SQLite } from 'expo';

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
      kurssit: []

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

  render() {
    const {params} = this.props.navigation.state;
    return (
      <View style={{flex: 1}}>
        <FlatList
          keyExtractor={item => item.id}
          renderItem={({item}) =>
                  <View style={styles.infoBox}>
                    <Text>{item.aloitus} - {item.lopetus}</Text>
                    <Text>{item.kurssinimi}</Text>
                    <Text>{item.kurssitunnus}</Text>
                    <Text>{item.luokka}</Text>
                    <Text style={{fontSize: 18, color: '#0000ff'}} onPress={() => this.deleteOppitunti(item.id)}>Poista</Text>
                  </View>}
          data={this.state.kurssit} />
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
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 12,
    marginBottom: 10,
  }
});
