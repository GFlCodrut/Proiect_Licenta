import React, {Component} from 'react';
import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, Text, View, FlatList } from 'react-native';
import {useEffect, useState} from 'react';



export default function App() {

  //const [num, setNum] = useState(0);

  state ={
    data:[]
  }

fetchData= async()=>{
  const response = await fetch('http://192.168.1.5:4547/users');
  const users = await response.json();
  this.setState({data: users});

}
React.useEffect(() => {
  // 👇️ only runs once
  console.log('useEffect ran');

  this.fetchData();
 

  
}, []); // 👈️ empty dependencies array
 

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
     
      <FlatList>

      data={this.state.data}
      renderItem={({item}) =>
        <View>
          <Text>{item.name}</Text>
        </View>
      }

      </FlatList>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
