import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, Button, StyleSheet } from 'react-native';
import axios from 'axios';

const RecordsList = ({ navigation }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://192.168.1.3:4547/records');
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleGoBack = () => {
    navigation.replace('UserList');
  };

  const renderImage = (item) => {
    if (item.licenseImage) {
      return (
        <Image
          style={styles.imageLicense}
          source={{ uri: `data:image/jpeg;base64,${item.licenseImage}` }}
        />
      );
    } else {
      return null;
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.id}>Id: {item.id}</Text>
      <Text style={styles.textLicense}>License as text: {item.licenseText}</Text>
      {renderImage(item)}
      <Text style={styles.timestamp}>Date and hour: {item.timestamp}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
      <Button title="Back" onPress={handleGoBack} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  itemContainer: {
    marginBottom: 16,
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  id: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  textLicense: {
    fontSize: 16,
    marginBottom: 8,
  },
  imageLicense: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginBottom: 8,
  },
  timestamp: {
    fontSize: 12,
    color: '#888',
  },
});

export default RecordsList;
