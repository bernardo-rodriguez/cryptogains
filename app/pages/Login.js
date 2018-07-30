import React from 'react';
import { StyleSheet, View, ScrollView,
         Image, Text, Button, Animated } from 'react-native';
import { RkButton, RkTextInput } from 'react-native-ui-kitten'
import firebase from 'react-native-firebase';
import TypeWriter from 'react-native-typewriter'
import PhoneInput from 'react-native-phone-input'
 

export default class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      code: "",
    };
  }
  static navigationOptions = { header: null }

  handleLogin = () => {
    if (!this.state.confirmResult) {
      if (this.phone.isValidNumber()) {
        firebase.auth().signInWithPhoneNumber((this.phone.getValue()))
          .then(confirmResult => this.setState({ confirmResult, message: 'Code has been sent!' }))
          .catch(error => this.setState({ message: `Sign In With Phone Number Error: ${error.message}` }))
      } else {
        this.setState({ message: "please enter a valid phone number" })
      }
    } else 
      this.confirmCode()
  }
  confirmCode = () => {
    const { code, confirmResult } = this.state;
    if (confirmResult && code.length) {
      confirmResult.confirm(code)
        .then((user) => {
          this.setState({ message: 'Code Confirmed!' });
          this.props.navigation.navigate('app')
        })
        .catch(error => this.setState({ message: `Code Confirm Error: ${error.message}` }));
    }
  }
  getMessage = () => this.state.signIn ? "sign up" : "sign in"
  getButton = () => !this.state.signIn ? "sign up" : "sign in"
  getPrompt = () => this.state.signIn ? "Don't have an account yet?" : "Already have an account?"
  getTitle = () => `welcome,\nenter to continue`

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={{ alignItems: "center" }}>
            <Image style={styles.image} source={require('../../assets/images/candle.png')} />
          </View>
          <View style={styles.header}>
            <TypeWriter typing={1}
                        style={styles.mainText}
                        fixed>
              {this.getTitle()}
            </TypeWriter>
          </View>
          <View style={styles.inputs}>
            {!this.state.confirmResult ?
            <PhoneInput ref={ref => {
                          this.phone = ref;
                        }}/>
            : 
            <RkTextInput value={this.state.code}
                         placeholder="code"
                         autoCapitalize="none"
                         onChangeText={code => this.setState({ code })} />}
            <RkButton onPress={this.handleLogin}
                      rkType="rounded">Confirm</RkButton>
          </View>
          <Text>{this.state.message}</Text>
          <View style={styles.center}>
            <Text>Standard rates may apply</Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    justifyContent: 'center',
  }, 
  center: {
    alignItems: "center",
    fontFamily: "Roboto-Light"
  },
  subText: {
    paddingBottom:10
  },
  light: {
    fontFamily: "Roboto-Light"
  },
  padding: {
    marginTop: 10
  },
  image: {
    width: 90,
    height: 90,
    marginBottom: 10
  },
  header: {
    paddingLeft: 40,
    paddingRight: 40,
    height: 130,
    paddingBottom: 30,
  },
  mainText: {
    fontSize: 30,
    fontFamily: "Roboto-Bold"
  },
  logo: {
    height: 120,
    marginBottom: 16,
    width: 120,
  },
  inputs: {
    padding: 20,
    alignItems: "center"
  }
});
