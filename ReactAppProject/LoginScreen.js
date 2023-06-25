import React, { useState } from 'react';
import { useContext } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import axios from 'axios';
import ListUserDetails from './ListUserDetails';
import { useDispatch, useSelector } from 'react-redux';


const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const currentUser = useSelector(state => state.currentUser);
  const dispatch = useDispatch();
  
  const handleLogin = async () => {
    try {
    
      const response = await axios.get('http://192.168.1.3:4547/usersLogin');
      const users = response.data;
      const user = users.find((u) => u.username === username && u.password === password);

      if (user) {
        dispatch({ type: 'SET_CURRENT_USER', payload: username });
        navigation.replace('UserList'); // Navigate to the data listing screen
      } else {
        Alert.alert('Login Failed', 'Invalid username or password.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'An error occurred during login.');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Login</Text>
      <TextInput
        style={{ width: 200, height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
        placeholder="Username"
        onChangeText={(text) => setUsername(text)}
        value={username}
      />
      <TextInput
        style={{ width: 200, height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 20 }}
        placeholder="Password"
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
        value={password}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

export default LoginScreen;
