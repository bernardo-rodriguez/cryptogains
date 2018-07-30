import React from 'react'
import { ActivityIndicator, StatusBar, View, StyleSheet } from 'react-native'
import firebase from 'react-native-firebase'

export default class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props)
    this.checkLogin()
  }

  checkLogin = async () => {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            console.log('ya')
            this.props.navigation.navigate('App')
        } else this.props.navigation.navigate('Auth')
    })
    console.log("ok")
  };

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 60,
        justifyContent: 'center',
    }
})