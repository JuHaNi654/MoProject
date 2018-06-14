import React, {StyleSheet} from 'react-native';

export default StyleSheet.create({
//Kaikkiin tiedostoihin tyyli
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },

// Styles for AsetuksetScreen.js
    as_defaultColor: {
      backgroundColor: '#DDDDDD',
      alignItems: 'center',
      padding: 10,
      width: 100,
      height: 50,
      borderRadius: 12,
      margin: 10,
    },
    as_redColor: {
      backgroundColor: 'red',
      alignItems: 'center',
      padding: 10,
      width: 100,
      height: 50,
      borderRadius: 12,
      margin: 10,
    },
    as_blueColor: {
      color: 'white',
      backgroundColor: 'blue',
      alignItems: 'center',
      padding: 10,
      width: 100,
      height: 50,
      borderRadius: 12,
      margin: 10,
    },
    as_greenColor: {
      backgroundColor: 'green',
      alignItems: 'center',
      padding: 10,
      width: 100,
      height: 50,
      borderRadius: 12,
      margin: 10,
    },
    as_purpleColor: {
      backgroundColor: 'purple',
      alignItems: 'center',
      padding: 10,
      width: 100,
      height: 50,
      borderRadius: 12,
      margin: 10,
    },
// Styles for AloitusScreen.js
  al_container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: 100,
  },
  al_otsikko: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  al_redColor: {
    backgroundColor: 'yellow',
    borderRadius: 12,
    width: 300,
    marginBottom: 10,
  },
// Styles for LaskuriScreen.js
  la_textStyles: {
    fontSize: 18,
  },
  la_redColor: {
    backgroundColor: 'yellow',
    borderRadius: 100,
    width: 200,
    marginTop: 10,
  },

});
