import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput, Alert } from 'react-native';
import axios from 'axios';
import { useSelector } from 'react-redux';

const UserDetailsScreen = ({ navigation }) => {
  const [userDetails, setUserDetails] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedUser, setEditedUser] = useState(null);
  const currentUser = useSelector((state) => state.currentUser);
  const [lastSpottedTimestamp, setLastSpottedTimestamp] = useState(null);

  useEffect(() => {
    fetchUserDetails();
  }, []);

  useEffect(() => {
    if (userDetails) {
      fetchLastSpottedTimestamp();
    }
  }, [userDetails]);

  const fetchUserDetails = async () => {
    try {
      const response = await axios.get('http://192.168.1.3:4547/users');
      const users = response.data;
      const currentUserDetails = users.find((user) => user.email === currentUser);
      setUserDetails(currentUserDetails);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchLastSpottedTimestamp = async () => {
    try {
      const response = await axios.get('http://192.168.1.3:4547/records');
      const records = response.data;
      const lastSpottedRecord = records
        .filter((record) => record.licenseText === userDetails.licensePlate)
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))[0];
      setLastSpottedTimestamp(lastSpottedRecord ? new Date(lastSpottedRecord.timestamp).toLocaleString() : 'N/A');
    } catch (error) {
      console.error(error);
    }
  };

  const handleGoBack = () => {
    navigation.replace('UserList');
  };

  const handleEdit = () => {
    setEditMode(true);
    setEditedUser({ ...userDetails });
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://192.168.1.3:4547/users/${editedUser.id}`, editedUser);
      Alert.alert('Success', 'User data updated successfully.');
      setEditMode(false);
      fetchUserDetails();
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to update user data. Please try again.');
    }
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setEditedUser(null);
  };

  const handleInputChange = (value, field) => {
    setEditedUser((prevUser) => ({
      ...prevUser,
      [field]: value,
    }));
  };

  return (
    <View style={styles.container}>
      {userDetails && !editMode ? (
        <View style={styles.userDetailsContainer}>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.text}>{userDetails.name}</Text>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.text}>{userDetails.email}</Text>
          <Text style={styles.label}>Age:</Text>
          <Text style={styles.text}>{userDetails.age}</Text>
          <Text style={styles.label}>License Plate:</Text>
          <Text style={styles.text}>{userDetails.licensePlate}</Text>
          <Text style={styles.label}>Last Spotted:</Text>
          <Text style={styles.text}>{lastSpottedTimestamp ? lastSpottedTimestamp : 'N/A'}</Text>
          <Button title="Edit User Data" onPress={handleEdit} />
        </View>
      ) : userDetails && editMode ? (
        <View style={styles.userDetailsContainer}>
          <Text style={styles.label}>Name:</Text>
          <TextInput
            style={styles.input}
            value={editedUser.name}
            onChangeText={(value) => handleInputChange(value, 'name')}
          />
          <Text style={styles.label}>Email:</Text>
          <TextInput
            style={styles.input}
            value={editedUser.email}
            onChangeText={(value) => handleInputChange(value, 'email')}
          />
          <Text style={styles.label}>Age:</Text>
          <TextInput
            style={styles.input}
            value={editedUser.age}
            onChangeText={(value) => handleInputChange(value, 'age')}
          />
          <Text style={styles.label}>License Plate:</Text>
          <TextInput
            style={styles.input}
            value={editedUser.licensePlate}
            onChangeText={(value) => handleInputChange(value, 'licensePlate')}
          />
          <View style={styles.editButtonsContainer}>
            <Button title="Save" onPress={handleSave} />
            <Button title="Cancel" onPress={handleCancelEdit} />
          </View>
        </View>
      ) : (
        <Text>Loading user details...</Text>
      )}
      <Button title="Back" onPress={handleGoBack} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  userDetailsContainer: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  text: {
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginBottom: 8,
  },
  editButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
  },
});

export default UserDetailsScreen;
