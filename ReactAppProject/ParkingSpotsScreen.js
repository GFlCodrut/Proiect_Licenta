import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Button } from 'react-native';
import axios from 'axios';
import { useSelector } from 'react-redux';

const ParkingSpotsList = ({ navigation }) => {
  const [data, setData] = useState([]);
  const currentUser = useSelector(state => state.currentUser);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://192.168.1.3:4547/parkingSpots');
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const toggleParkingSpotStatus = async (id, currentStatus, occupiedBy, currentUser) => {
    try {
      if (currentStatus === 'EMPTY') {
        // Check if the user already occupies a spot
        const occupiedSpots = data.filter(
          spot => spot.occupiedBy === currentUser && spot.status === 'OCCUPIED'
        );
        if (currentUser !== 'admin' && occupiedSpots.length > 0) {
          console.log('You can only occupy one spot');
          return;
        }
  
        // Update the spot status
        const newStatus = 'OCCUPIED';
        await axios.put(`http://192.168.1.3:4547/parkingSpots/${id}`, {
          status: newStatus,
          occupiedBy: currentUser,
        });
        fetchData(); // Fetch updated data after successful update
      } else if (
        currentStatus === 'OCCUPIED' &&
        (occupiedBy === currentUser || currentUser === 'admin')
      ) {
        // Update the spot status
        const newStatus = 'EMPTY';
        await axios.put(`http://192.168.1.3:4547/parkingSpots/${id}`, {
          status: newStatus,
          occupiedBy: null,
        });
        fetchData(); // Fetch updated data after successful update
      } else {
        console.log('You do not have permission to perform this action');
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  

  const getStatusColor = status => {
    return status === 'EMPTY' ? 'green' : 'red';
  };

  const renderItem = ({ item }) => {
    const handleToggleStatus = () => {
      toggleParkingSpotStatus(item.id, item.status, item.occupiedBy, currentUser);
    };
  
    return (
      
      <View style={[styles.itemContainer, { borderColor: getStatusColor(item.status) }]}>
        <View style={styles.itemInfo}>
          <Text style={styles.nameText}>Id: {item.id}</Text>
          <Text style={styles.emailText}>Name: {item.name}</Text>
          <Text style={styles.ageText}>
            Status: <Text style={{ color: getStatusColor(item.status) }}>{item.status}</Text>
          </Text>
          <Button title={item.status === 'EMPTY' ? 'Occupy' : 'Empty'} onPress={handleToggleStatus} />
        </View>
      </View>
    );
  };
  
  
  
  
  

  const handleGoBack = () => {
    navigation.replace('UserList');
  };

  return (
    <View style={styles.container}>
      <FlatList data={data} renderItem={renderItem} keyExtractor={(item) => item.id.toString()} />
      <Button title="Back" onPress={handleGoBack} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
  },
  itemContainer: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    marginVertical: 8,
    marginHorizontal: 16,
    padding: 16,
    elevation: 2,
    borderWidth: 2, // Added border width
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

export default ParkingSpotsList;
