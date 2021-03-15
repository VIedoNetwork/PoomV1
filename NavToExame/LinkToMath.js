import * as React from 'react';
import { useContext, Component} from 'react'
import {View, StyleSheet, Text, Alert, TouchableOpacity,Image} from 'react-native';
import {FilledButton} from '../components/FilledButton';
import { AuthContext } from '../navigaiton/AuthProvider';
import firestore from '@react-native-firebase/firestore';
import { Input, ListItem, Button } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';


class test extends React.Component {
  constructor(props) {
    super(props);
    this.usersCollectionRef = firestore().collection('subject_Math').doc('Name').collection('Name')
    this.state = {
      name: ''
    };


  }
  inputValueUpdate = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  storeUser() { 
    this.usersCollectionRef.add({
            name: this.state.name
          }).then((res) => {
              this.setState({
                  name: ''
              })
          })
          .catch((err) => {
              console.log('Error found: ', err);
              this.setState({
                  isLoading: false
              })
          })
      }

  render() {
    return (
        <ScrollView>
          <View style={styles.container}>
          <Image source={require('C:/Users/CKAMp/EX1/book.png')}
                  style={styles.Image} />
            <Input
                placeholder="Exam"
                leftIcon={{ type: 'font-awesome', name: 'book' }}
                onChangeText = {(val) => this.inputValueUpdate(val, 'name')}
                style={styles}
            />
          
            <TouchableOpacity style={styles.loginButton} onPress={() => {
                  this.props.navigation.navigate('Math', {text: this.state.name});
                  this.storeUser()}
                }>
              <Text style={styles.loginButtonText}>
                NEXT
              </Text>
            </TouchableOpacity>

          </View>
        </ScrollView>

    );
  }
}


const styles = StyleSheet.create({
    title: {
      marginBottom: 20,
      textAlign: 'center',
    },
    Image: {
      paddingVertical:10,
      width: 400,
      height: 200,
    },
    input: {
      marginVertical: 10,
      marginBottom: 15,
    },
    loginButton: {
      marginVertical: 10,
      backgroundColor: '#00CABA',
      width: 320,
      height: 60,
      borderRadius: 10,
      shadowColor: "#000000",
      shadowOpacity: 5,
      shadowRadius: 5,
      elevation: 5
    },
    loginButtonText: {
      textAlign: 'center',
      color: '#F0FFFF',
      fontWeight: 'bold',
      fontSize:20,
      padding: 15
    },

    container: {
      flex: 1,
      backgroundColor: '#E2FCFA',
      alignItems: 'center',
      paddingVertical:198,
    }
});

export default test;