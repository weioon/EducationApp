import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from '../styles/styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomePage = ({ route }) => {
  const navigation = useNavigation();
  const [sessionToken, setSessionToken] = useState(null);
  const { userId } = route.params || {}; // Add default value to avoid destructuring error

  useEffect(() => {
    const getSessionToken = async () => {
      const token = await AsyncStorage.getItem('sessionToken');
      setSessionToken(token);
    };

    getSessionToken();
  }, []);

  const handleLogout = async () => {
    // Clear session token
    await AsyncStorage.removeItem('c');
    // Implement logout functionality
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Header title="Home" />
      <Text style={styles.title}>Welcome Home!</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          console.log('Navigating to CourseScheduleDisplay with sessionToken:', sessionToken);
          navigation.navigate('CourseScheduleDisplay', { userId, sessionToken });
        }}
      >
        <Text style={styles.buttonText}>View Current Timetable / Drop Course</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          console.log('Navigating to AddDropCourse with sessionToken:', sessionToken);
          navigation.navigate('AddDropCourse', { userId, sessionToken });
        }}
      >
        <Text style={styles.buttonText}>View Course Schedule / Add Courses</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          console.log('Navigating to Feedback with sessionToken:', sessionToken);
          navigation.navigate('Feedback', { userId, sessionToken });
        }}
      >
        <Text style={styles.buttonText}>Give Feedback</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          console.log('Navigating to User with sessionToken:', sessionToken);
          navigation.navigate('User', { userId, sessionToken });
        }}
      >
        <Text style={styles.buttonText}>User Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          console.log('Navigating to Weather with sessionToken:', sessionToken);
          navigation.navigate('Weather', { sessionToken });
        }}
      >
        <Text style={styles.buttonText}>Check Weather</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
      <Footer />
    </View>
  );
};

export default HomePage;