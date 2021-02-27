import * as React from 'react';
import { useContext, Component} from 'react'
import {View, StyleSheet, Text, Alert } from 'react-native';
import {FilledButton} from '../components/FilledButton';
import { AuthContext } from '../navigaiton/AuthProvider';
import firestore from '@react-native-firebase/firestore';
import { Input, ListItem, Button } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';


class chat extends React.Component {

    constructor(props) {
        super(props);

        this.usersCollectionRef = firestore().collection('PoomTest')
        this.fireStoreData = firestore().collection("PoomTest");

        this.state = {
            chat: '',
            textArr: []
        };


    }

    inputValueUpdate = (val, prop) => {
        const state = this.state;
        state[prop] = val;
        this.setState(state);
    }

    componentDidMount() {
        this.unsubscribe = this.fireStoreData.onSnapshot(this.getCollection);
    }

    componentWillUnmount(){
        this.unsubscribe();
    }

    getCollection = (querySnapshot) => {
        const textArr = [];
        querySnapshot.forEach((res) => {
            const { chat } = res.data();
            textArr.push({
            chat
        })
        })
        this.setState({
            textArr
        })
    }

  storeUser() { 
    this.usersCollectionRef.add({
            chat: this.state.chat
          }).then((res) => {
              this.setState({
                chat: ''
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
            <Input
                placeholder="Aa"
                leftIcon={{ type: 'font-awesome', name: 'book' }}
                style={styles}
                value={this.state.chat}
                onChangeText = {(val) => this.inputValueUpdate(val, 'chat')}
            />
          
            <FilledButton 
                title='ENTER'
                style={styles.loginButton} 
                onPress={() => {
                  this.storeUser()}
                }
               
            />
            
          </View>
          <View>
              {
                this.state.textArr.map((item, i) => {
                    return (
                        <ListItem key={i} bottomDivider>

                            <ListItem.Content>
                            <Text>{item.chat}</Text>
                            </ListItem.Content>

                        </ListItem>
                    );
                })
            }
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
    input: {
      marginVertical: 10,
      marginBottom: 15,
    },
    loginButton: {
      marginVertical: 32,
    },

    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      marginBottom: 100

    }
});

export default chat;