import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { getFeedbacks } from '../services/api'; // Assumes you have an API utility to fetch data

const GetFeedbackPage = ({ route }) => {
  const { sessionToken } = route.params;
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await getFeedbacks(sessionToken);
        if (response.success) {
          setFeedbacks(response.data);
        } else {
          setError('Failed to load feedbacks.');
        }
      } catch (err) {
        setError('An error occurred while fetching feedbacks.');
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, [sessionToken]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text style={styles.errorText}>{error}</Text>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={feedbacks}
        keyExtractor={(item) => item.feedback_id.toString()}
        renderItem={({ item }) => (
          <View style={styles.feedbackItem}>
            <Text style={styles.feedbackText}>User ID: {item.user_id}</Text>
            <Text style={styles.feedbackText}>{item.feedback}</Text>
            {item.photo && (
              <Image
                source={{ uri: `data:image/jpeg;base64,${item.photo}` }}
                style={styles.feedbackImage}
              />
            )}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  feedbackItem: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  feedbackText: {
    fontSize: 16,
    marginBottom: 8,
  },
  feedbackImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
});

export default GetFeedbackPage;
