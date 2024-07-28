import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { addCourse, getCoursesAndSchedules } from '../services/api';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from '../styles/styles';

const AddDropCoursePage = ({ route }) => {
  const { sessionToken } = route.params || {}; // Retrieve sessionToken from route params
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedSchedule, setSelectedSchedule] = useState('');
  const [message, setMessage] = useState('');
  const [existingCourses, setExistingCourses] = useState([]);
  const [courses, setCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchCoursesAndSchedules = async () => {
      const response = await getCoursesAndSchedules(sessionToken); // Pass sessionToken to getCoursesAndSchedules
      if (response.status === 'success') {
        setCourses(response.data);
      } else {
        setMessage('Failed to fetch courses and schedules.');
      }
    };
    fetchCoursesAndSchedules();
  }, [sessionToken]);

  const handleAddCourse = async (course) => {
    const duplicate = existingCourses.some(existingCourse => existingCourse.name === course.course_name);
    const scheduleConflict = existingCourses.some(existingCourse => existingCourse.schedule === course.schedule);
  
    if (duplicate) {
      setMessage('Course already added.');
    } else if (scheduleConflict) {
      setMessage('Schedule conflict with another course.');
    } else {
      try {
        // Ensure sessionToken, course name, and schedule are posted
        const response = await addCourse(sessionToken, course.course_name, course.schedule);
        if (response.success) {
          setMessage('Course added successfully');
          setExistingCourses([...existingCourses, { name: course.course_name, schedule: course.schedule }]);
        } else {
          setMessage('Failed to add course.');
        }
      } catch (error) {
        setMessage('Failed to add course');
      }
    }
  };

  const renderCourseItem = ({ item }) => (
    <View style={styles.tableRow}>
      <Text style={styles.tableCell}>{item.course_name}</Text>
      <Text style={styles.tableCell}>{item.course_code}</Text>
      <Text style={styles.tableCell}>{item.instructor}</Text>
      <Text style={styles.tableCell}>{item.schedule}</Text>
      <TouchableOpacity style={styles.button} onPress={() => handleAddCourse(item)}>
        <Text style={styles.buttonText}>Add Course</Text>
      </TouchableOpacity>
    </View>
  );

  const handleNextPage = () => {
    if (currentPage < Math.ceil(courses.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const paginatedCourses = courses.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <View style={styles.container}>
      <Header title="View Course Schedule / Add Courses" />

      <FlatList
        data={paginatedCourses}
        renderItem={renderCourseItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={() => (
          <View style={styles.tableHeader}>
            <Text style={styles.tableHeaderCell}>Course Name</Text>
            <Text style={styles.tableHeaderCell}>Course Code</Text>
            <Text style={styles.tableHeaderCell}>Instructor</Text>
            <Text style={styles.tableHeaderCell}>Schedule</Text>
            <Text style={styles.tableHeaderCell}>Action</Text>
          </View>
        )}
      />

      <View style={[styles.pagination, { flexDirection: 'row', justifyContent: 'space-between' }]}>
        <TouchableOpacity style={styles.button} onPress={handlePreviousPage} disabled={currentPage === 1}>
          <Text style={styles.buttonText}>Previous</Text>
        </TouchableOpacity>
        <Text style={styles.pageNumber}>{currentPage}</Text>
        <TouchableOpacity style={styles.button} onPress={handleNextPage} disabled={currentPage === Math.ceil(courses.length / itemsPerPage)}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>

      {message ? <Text style={{ color: 'green', marginTop: 10 }}>{message}</Text> : null}
      <Footer />
    </View>
  );
};

export default AddDropCoursePage;
