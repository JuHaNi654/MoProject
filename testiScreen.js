import React from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import { StackNavigator} from 'react-navigation'
import { SQLite } from 'expo';

const db = SQLite.openDatabase('coursedb.db');

export default class testiScreen extends React.Component {
  static navigationOptions = {title: 'testi'};
  constructor(props) {
    super(props);
    this.state = {
      kellonaika: '',
      kurssinimi: '',
      kurssitunnus: '',
      luokka: '',
      viikonpaiva: '',
      testi: '',
      kurssit: []

    };
  }
  componentDidMount() {
    const {params} = this.props.navigation.state;
    this.setState({testi: params.viikonpaiva});
    this.updateList();
  }

  updateList = () => {
    db.transaction(tx => {
      tx.executeSql('select * from kurssit where viikonpaiva = ?;', [this.state.testi], (_, { rows }) =>
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
        <Text>Oppitunnit:</Text>
        <FlatList
          style={{marginLeft : "5%"}}
          keyExtractor={item => item.id}
          renderItem={({item}) =>
                  <View style={styles.listcontainer}><Text>{item.kellonaika}, {item.kurssinimi}, {item.kurssitunnus}, {item.luokka}, {item.viikonpaiva}</Text>
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
  listcontainer: {
   flexDirection: 'row',
   backgroundColor: '#fff',
   alignItems: 'center'
  }
});
