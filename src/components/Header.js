import React from 'react';
import { View, Text } from 'react-native';
import styles from '../styles/styles';

const Header = ({ title }) => {
  return (
    <View style={{ padding: 16, fontSize: 30,
      textAlign: 'center',
      fontWeight: 'bold',
      color: '#333', }}>
      <Text style={{fontSize: 20, textAlign: 'center' }}>{title}</Text>
    </View>
  );
};

export default Header;
