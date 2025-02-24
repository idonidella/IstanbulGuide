import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
 

export default class App extends Component {


  componentDidMount() {
    const subscriber = auth().onAuthStateChanged(this.onAuthStateChanged);

    console.log("Hello Worlsd");
  };


   onAuthStateChanged = (user) => {
    if (user) {
      console.log('Kullanıcı giriş yaptı');
    } else {
      console.log('Kullanıcı çıkış yaptı');
    }
  };




  render() {
    return (
      <View>
        <Text> textInComponent </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({})
