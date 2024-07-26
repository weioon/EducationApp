import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { updateUser, getUser } from '../services/api';
import { useRoute } from '@react-navigation/native';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from '../styles/styles';

const UserPage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [address, setAddress] = useState('');
  const route = useRoute();
  const { sessionToken } = route.params;

  useEffect(() => {
    const fetchUserData = async () => {
      console.log('Fetching user data with sessionToken:', sessionToken);
      const response = await getUser(sessionToken);
      console.log('Fetched user data response:', response);
      if (response.success) {
        setUser(response.data);
        setName(response.data.name || '');
        setEmail(response.data.email || '');
        setStudentId(response.data.student_id || '');
        setContactNumber(response.data.phone_number || '');
        setAddress(response.data.address || '');
      } else {
        setError(response.message || 'Failed to fetch user');
      }
      setLoading(false);
    };

    fetchUserData();
  }, [sessionToken]);

  const handleUpdate = async () => {
    console.log('Updating user with data:', { name, email, studentId, contactNumber, address });
    const response = await updateUser(sessionToken, name, email, studentId, contactNumber, address);
    console.log('Update response:', response);
    if (response.success) {
      alert('Profile updated successfully');
    } else {
      alert('Failed to update profile: ' + response.message);
    }
  };

  return (
    <View style={styles.container}>
      <Header title="User Profile" />
      <Text style={styles.title}>User Profile</Text>
      {loading ? (
        <Text style={styles.loadingText}>Loading user information...</Text>
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <ScrollView contentContainerStyle={styles.profileContainer}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={name}
            onChangeText={setName}
          />
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
          <Text style={styles.label}>Student ID</Text>
          <TextInput
            style={styles.input}
            placeholder="Student ID"
            value={studentId}
            onChangeText={setStudentId}
          />
          <Text style={styles.label}>Contact Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Contact Number"
            value={contactNumber}
            onChangeText={setContactNumber}
          />
          <Text style={styles.label}>Address</Text>
          <TextInput
            style={styles.input}
            placeholder="Address"
            value={address}
            onChangeText={setAddress}
          />
          <TouchableOpacity style={styles.button} onPress={handleUpdate}>
            <Text style={styles.buttonText}>Update Profile</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
      <Footer />
    </View>
  );
};

export default UserPage;