import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { login } from '../services/api';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from '../styles/styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      const response = await login(email, password);
      console.log('Login response:', response); // Add this line for debugging
      if (response.success) {
        // Save session token
        await AsyncStorage.setItem('sessionToken', response.sessionToken);
        // Navigate to Home
        navigation.navigate('Home');
      } else {
        setError(response.message || 'Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error); // Add this line for debugging
      setError('An error occurred. Please try again.');
    }
  };
  
  return (
    <View style={styles.container}>
      <Header title="Login" />
      <Text style={styles.title}>Login</Text>
      {error ? <Text style={{ color: 'red' }}>{error}</Text> : null}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text style={{ color: 'blue', marginTop: 10 }}>Don't have an account? Sign up</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('ForgetPassword')}>
        <Text style={{ color: 'blue', marginTop: 10 }}>Forgot Password?</Text>
      </TouchableOpacity>
      <Footer />
    </View>
  );
};

export default LoginPage;