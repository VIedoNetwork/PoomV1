// import * as React from 'react';
// import { useContext, Component} from 'react'
// import {View, StyleSheet, Text, Alert } from 'react-native';
// import {FilledButton} from '../components/FilledButton';
// import { AuthContext } from '../navigaiton/AuthProvider';
// import firestore from '@react-native-firebase/firestore';
// import { Input, ListItem, Button } from 'react-native-elements';
// import { ScrollView } from 'react-native-gesture-handler';

// const subject = 'sssss'

// const editSubject = () => {
//     // subject = this.subject
//     Alert.alert(subject)
// }

// class studentScore extends Component {

//     constructor() {
//         super();

//     }

    

//     render (){
//       return (
//         <ScrollView>
//           <View style={styles.container}>

//             <Input
//                 placeholder="sssss"
//                 leftIcon={{ type: 'font-awesome', name: 'book' }}
//                 style={styles}
//                 // value={this.subject}
//                 // onChangeText={(val) => editSubject}
//             />
        
       
//            </View>
//            </ScrollView>
//       )
//     }

//   }


// const styles = StyleSheet.create({
//     title: {
//       marginBottom: 20,
//       textAlign: 'center',
//     },
//     input: {
//       marginVertical: 10,
//       marginBottom: 15,
//     },
//     loginButton: {
//       marginVertical: 32,
//     },
  
//     container: {
//       flex: 1,
//       justifyContent: 'center',
//       alignItems: 'center',
//       padding: 20,
//       marginBottom: 100
  
//     }
//   });

//   export default studentScore;


import * as React from 'react';
import { useContext, Component} from 'react'
import {View, StyleSheet, Text} from 'react-native';
import {FilledButton} from '../components/FilledButton';
import { AuthContext } from '../navigaiton/AuthProvider';
import firestore from '@react-native-firebase/firestore';
import { Input, ListItem } from 'react-native-elements';

class ShowData extends Component { 
  constructor() {
    super();

    this.fireStoreData = firestore().collection("studentScore");
    this.state = {
      userArr: []
    }
  }

  componentDidMount() {
    this.unsubscribe = this.fireStoreData.onSnapshot(this.getCollection);
  }

  componentWillUnmount(){
    this.unsubscribe();
  }
  getCollection = (querySnapshot) => {
    const userArr = [];
    querySnapshot.forEach((res) => {
      const {exameName, name, score} = res.data();
      userArr.push({
        key: res.id,
        exameName,
        name,
        score
      })
    })
    this.setState({
      userArr
    })
  }
  render(){
    return(
      <View style={styles.container}>
        {
          this.state.userArr.map((item, i) => {
            return (
                
                    <ListItem.Content style={styles.box}>
                      <Text style={styles.textName}>Name: {item.name}</Text>
                      <Text style={styles.textScore}>Score: {item.score}</Text>
                    </ListItem.Content>

                
            );
          })
        }
      </View>
    )
  }

}


const styles = StyleSheet.create({
  textName: {
    paddingLeft:10,
    fontSize: 20,
  },
  textScore: {
    paddingLeft:10,
    fontSize: 16,
  },

  box: {
    margin: 10,
    marginHorizontal: 50,
    backgroundColor: '#00CABA',
    shadowColor: "#000000",
    shadowOpacity: 5,
    shadowRadius: 5,
    elevation: 5,
    borderRadius: 10,
  },
  
  container: {
    flex: 1,
    backgroundColor: '#E2FCFA',
  },
  });


  export default ShowData;