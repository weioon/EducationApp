import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { dropCourse, getUserCourses } from '../services/api'; // Import the dropCourse and getUserCourses functions
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from '../styles/styles';

const CourseScheduleDisplayPage = ({ route }) => {
  const { sessionToken } = route.params;
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await getUserCourses(sessionToken);
        if (response.success) {
          setCourses(response.data);
          setFilteredCourses(response.data);
        } else {
          setError('Failed to load courses.');
        }
      } catch (err) {
        setError('An error occurred while fetching courses.');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [sessionToken]);

  useEffect(() => {
    handleSearch();
  }, [searchQuery]);

  const handleSearch = () => {
    const filtered = courses.filter(course =>
      course.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredCourses(filtered);
  };

  const handleReset = () => {
    setFilteredCourses(courses);
    setSearchQuery('');
  };

  const handleDropCourse = async (courseName) => {
    console.log(`Attempting to drop course: ${courseName}`);
    try {
      const response = await dropCourse(sessionToken, courseName);
      console.log('Drop course response:', response);
      if (response.success) {
        setCourses(courses.filter(course => course.name !== courseName));
        setFilteredCourses(filteredCourses.filter(course => course.name !== courseName));
      } else {
        setError(`Failed to drop course: ${response.message}`);
      }
    } catch (err) {
      console.error('Error dropping course:', err);
      setError(`An error occurred while dropping the course: ${err.message}`);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={styles.loadingText} />;
  }

  if (error) {
    return <Text style={styles.errorText}>{error}</Text>;
  }

  if (filteredCourses.length === 0) {
    return <Text style={styles.emptyText}>No courses available.</Text>;
  }

  return (
    <View style={styles.container}>
      <Header title="View Current Timetable / Drop Course" />
      <Text style={styles.title}>View Current Timetable / Drop Course</Text>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search course..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.tableHeader}>
        <Text style={[styles.tableHeaderText, styles.flex1]}>Course Name</Text>
        <Text style={[styles.tableHeaderText, styles.flex1]}>Time</Text>
        <Text style={[styles.tableHeaderText, styles.flex1]}>Actions</Text>
      </View>
      <FlatList
        data={filteredCourses}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.courseItem}>
            <Text style={[styles.courseText, styles.flex1]}>{item.name}</Text>
            <Text style={[styles.courseText, styles.flex1]}>{item.schedule}</Text>
            <TouchableOpacity style={styles.dropButton} onPress={() => handleDropCourse(item.name)}>
              <Text style={styles.buttonText}>Drop</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <Footer />
    </View>
  );
};

export default CourseScheduleDisplayPage;