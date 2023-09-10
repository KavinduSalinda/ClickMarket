import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import NetworkInfo from 'react-native-network-info';
import axios from 'axios';

const App = () => {
  const [ipAddress, setIpAddress] = useState('Loading...');

  useEffect(() => {
    const fetchIpAddress = async () => {
      try {
        const ip = await NetworkInfo.getIPAddress();
        setIpAddress(ip);
      } catch (error) {
        console.error('Error fetching IP address:', error);
        setIpAddress('Error fetching IP address');
      }
    };

    fetchIpAddress();
  }, []);

  // Use the ipAddress variable in your Axios instance or any other code
  const apiInstance = axios.create({
    baseURL: `http://${ipAddress}:8000`
  });

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Your IP Address: {ipAddress}</Text>
    </View>
  );
};

export default {App ,ipAddress};
