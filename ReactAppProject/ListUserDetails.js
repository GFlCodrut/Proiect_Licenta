import React, {Component} from 'react';
import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, Text, View, FlatList, TextInput, Button, Alert } from 'react-native';
import {useEffect, useState} from 'react';
import axios from 'axios';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';


const ListUserDetails = ({ navigation }) => {
  const [data, setData] = useState([]);
  const currentUser = useSelector(state => state.currentUser);
  const modifiedStr = currentUser.charAt(0).toUpperCase() + currentUser.substring(1).split('@')[0];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://192.168.1.3:4547/users');
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    navigation.replace('Login');
  };

  const handleGoToParkingSpots = () => {
    navigation.replace('ParkingList', { currentUser: currentUser });
  };

  const handleGoToRecordsList = () => {
    navigation.replace('RecordsList');
  };

  const handleViewUserDetails = () => {
    navigation.replace('UserDetails', { currentUser: currentUser });

  };


  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={styles.itemInfo}>
        <Text style={styles.nameText}>Name: {item.name}</Text>
        <Text style={styles.emailText}>Email: {item.email}</Text>
        <Text style={styles.ageText}>Age: {item.age}</Text>
      </View>
    </View>
  );
  
  return (
    <View style={styles.container}>
      <Text>Welcome, {modifiedStr}</Text>
      {currentUser === 'admin' ? (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      ) : (
        <Button title="View User Details" onPress={handleViewUserDetails} />
      )}
      <View style={styles.buttonContainer}>
        <Button
          title="See parking spots"
          onPress={handleGoToParkingSpots}
          style={[styles.button, styles.firstButton]}
        />
        {currentUser === 'admin' && (
          <Button
            title="See records"
            onPress={handleGoToRecordsList}
            style={styles.button}
          />
        )}
        <Button title="Logout" onPress={handleLogout} style={styles.button} />
      </View>
    </View>
  );
  
};
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 10,
      paddingBottom: 10,
    },
    buttonContainer: {
        position: 'absolute',
        flexDirection: 'column',
        bottom: 20,
        width: 220, // Adjust the width as needed
        height: 40, // Adjust the height as needed
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginVertical: 10, // Add vertical space between the buttons
      },
      button: {
        borderRadius: 20,
        backgroundColor: 'blue', // Customize the button color as needed
        width: '100%',
        height: '100%',
      },
      firstButton: {
        marginTop: 400, // Add margin to the right of the first button
      },
      
    itemContainer: {
      backgroundColor: '#f5f5f5',
      borderRadius: 8,
      marginVertical: 8,
      marginHorizontal: 16,
      padding: 16,
      elevation: 2,
    },
    itemInfo: {
      flexDirection: 'column',
    },
    nameText: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 4,
    },
    emailText: {
      fontSize: 16,
      marginBottom: 2,
    },
    ageText: {
      fontSize: 16,
      marginBottom: 2,
    },
  });
  
  export default ListUserDetails;