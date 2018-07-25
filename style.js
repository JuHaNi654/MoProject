import React, {StyleSheet, Dimensions } from 'react-native';
  const {width} = Dimensions.get('window');

export default StyleSheet.create({
//Kaikkiin tiedostoihin tyyli
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    headerStyle: {
      backgroundColor: 'black',
      width: width,
      height: '15%',
    },
// Styles for AsetuksetScreen.js
    as_textStyle: {
      color: 'white',
      textAlign: 'center',
    },
    as_deletButton: {
      justifyContent: 'center',
      backgroundColor: 'black',
      alignItems: 'center',
      width: 320,
      height: 75,
      borderRadius: 12,
      margin: 5,
      borderColor: 'black',
      borderWidth: 1,
    },
    controllButtons: {
      justifyContent: 'center',
      backgroundColor: 'black',
      alignItems: 'center',
      padding: 10,
      width: 300,
      height: 50,
      borderRadius: 12,
      margin: 5,
      borderColor: 'black',
      borderWidth: 1,
    },
    as_defaultColor: {
      justifyContent: 'center',
      backgroundColor: '#DDDDDD',
      alignItems: 'center',
      padding: 10,
      width: 150,
      height: 75,
      borderRadius: 12,
      margin: 10,
      borderColor: 'black',
      borderWidth: 1,
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
  al_defaultColor: {
    backgroundColor: 'black',
    borderRadius: 12,
    width: 300,
    marginBottom: 10,
  },
// Styles for LaskuriScreen.js
  la_textStyles: {
    fontSize: 18,
  },
  la_redColor: {
    backgroundColor: 'black',
    borderRadius: 100,
    width: 200,
    marginTop: 10,
  },
// Styles for LisaatuntiScreen.js
  li_textInputStyle: {
    width: 200,
    borderColor: 'black',
    borderWidth: 3,
    textAlign: 'center',
    marginBottom: 10,
    borderRadius: 12,
  },
  li_timeInputstyle: {
    width: 75,
    borderColor: 'black',
    borderWidth: 3,
    textAlign: 'center',
    marginBottom: 10,
    borderRadius: 12,
  },
  li_timeTextBoxStyle: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  li_buttonStyle: {
    justifyContent: 'center',
    backgroundColor: 'black',
    alignItems: 'center',
    width: 320,
    borderRadius: 12,
    margin: 5,
    borderColor: 'black',
    borderWidth: 1,
  },
// Styles for ViikonpaivatScreen.js
  vp_buttonStyle: {
    backgroundColor: 'black',
    borderRadius: 12,
    width: 300,
    marginBottom: 10,
  },
//Styles for LukkariScreen.js
  lu_infoBox: {
    left: 30,
    width: '75%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'black',
    borderRadius: 12,
    marginTop: 15,
  },
});
