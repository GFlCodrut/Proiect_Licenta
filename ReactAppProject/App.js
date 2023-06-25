import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import store from './store';
import LoginScreen from './LoginScreen';
import ListUserDetails from './ListUserDetails';
import ParkingSpotsList from './ParkingSpotsScreen';
import RecordsList from './ListRecords';
import UserDetailsScreen from './UserDetailsScreen';

const Stack = createStackNavigator();

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={require('./logo.png')} style={styles.logo} />
    </View>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash">
          <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="UserList" component={ListUserDetails} />
          <Stack.Screen name="ParkingList" component={ParkingSpotsList} />
          <Stack.Screen name="RecordsList" component={RecordsList} />
          <Stack.Screen name="UserDetails" component={UserDetailsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  logo: {
    width: 200,
    height: 200,
  },
});

export default App;