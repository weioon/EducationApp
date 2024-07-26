import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginPage from './src/screens/LoginPage';
import SignupPage from './src/screens/SignupPage';
import ForgetPasswordPage from './src/screens/ForgetPasswordPage';
import HomePage from './src/screens/HomePage';
import CourseScheduleDisplayPage from './src/screens/CourseScheduleDisplayPage';
import AddDropCoursePage from './src/screens/AddDropCoursePage';
import FeedbackPage from './src/screens/FeedbackPage';
import UserPage from './src/screens/UserPage';
import WeatherPage from './src/screens/WeatherPage';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="Signup" component={SignupPage} />
        <Stack.Screen name="ForgetPassword" component={ForgetPasswordPage} />
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="CourseScheduleDisplay" component={CourseScheduleDisplayPage} />
        <Stack.Screen name="AddDropCourse" component={AddDropCoursePage} />
        <Stack.Screen name="Feedback" component={FeedbackPage} />
        <Stack.Screen name="User" component={UserPage} />
        <Stack.Screen name="Weather" component={WeatherPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
