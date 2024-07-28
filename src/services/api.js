import axios from 'axios';

const API_URL = 'http://localhost/edu_app_server'; // Replace with your actual API URL

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login.php`, { email, password });
    console.log('Login response:', response.data); // Add this line for debugging
    if (response.data.status === 'success') {
      return { success: true, sessionToken: response.data.session_token };
    } else {
      return { success: false, message: response.data.message };
    }
  } catch (error) {
    console.error('Login error:', error); // Add this line for debugging
    return { success: false, message: error.message };
  }
};

export const signup = async (name, email, studentId, password, phoneNumber, address, securityAnswer) => {
  try {
    const response = await axios.post(`${API_URL}/register.php`, {
      name,
      email,
      student_id: studentId,
      password,
      phone_number: phoneNumber,
      address,
      security_answer: securityAnswer
    });
    console.log('Posted data:', {
      name,
      email,
      student_id: studentId,
      password,
      phone_number: phoneNumber,
      address,
      security_answer: securityAnswer
    });
    console.log('API response:', response.data);
    return response.data;
  } catch (error) {
    console.error('API error:', error);
    return { success: false, message: error.message };
  }
};


export const forgetPassword = async (email, securityAnswer) => {
  try {
    const response = await axios.post([`${API_URL}/forget-password.php`] , { email, securityAnswer });
    console.log('Forget Password response:', response.data); // Add this line for debugging
    return response.data;
  } catch (error) {
    console.error('Forget Password error:', error); // Add this line for debugging
    return { success: false, message: error.message };
  }
};

export const resetPassword = async (email, newPassword) => {
  try {
    const response = await axios.post(`${API_URL}/reset-password.php`, { email, newPassword });
    return response.data;
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const getCourses = async (sessionToken) => {
  try {
    const response = await axios.get(`${API_URL}/course_schedule.php`, {
      headers: {
        'Authorization': `Bearer ${sessionToken}`
      }
    });
    return response.data;
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const addCourse = async (sessionToken,name, schedule) => {
  try {
    const response = await axios.post(`${API_URL}/add_courses.php`, { sessionToken, name, schedule }, {
      headers: {
        'Authorization': `Bearer ${sessionToken}`,
        'Content-Type': 'application/json'
      }
    });
    console.log('API addCourse response:', response.data); // Add this line for debugging
    return response.data;
  } catch (error) {
    console.error('API addCourse error:', error); // Add this line for debugging
    return { success: false, message: error.message };
  }
};

export const dropCourse = async (sessionToken, courseName) => {
  try {
    console.log('Dropping course:', { sessionToken, courseName });
    const response = await axios.post(`${API_URL}/drop_course.php`, 
      { sessionToken, courseName },
      {
        headers: {
          'Authorization': `Bearer ${sessionToken}`,
          'Content-Type': 'application/json'
        }
      }
    );
    console.log('Drop course API response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Drop course API error:', error);
    return { success: false, message: error.message };
  }
};

export const submitFeedback = async (sessionToken, feedback, photo) => {
  const formData = new FormData();
  formData.append('id', sessionToken);
  formData.append('feedback', feedback);

  if (photo) {
    const response = await fetch(photo.uri);
    const blob = await response.blob();
    formData.append('photo', blob, 'photo.jpg');
  }

  try {
    const response = await axios.post(`${API_URL}/feedback.php`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${sessionToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Feedback submission error:', error);
    return { success: false, message: error.message };
  }
};


export const getUser = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/user.php?userId=${userId}`);
    return response.data;
  } catch (error) {
    return { success: false, message: error.message };
  }
};



export const updateUser = async (sessionToken, name, email, studentId, contactNumber, address) => {
  try {
    const response = await axios.put([`${API_URL}/edit_user.php`] , {
      id: sessionToken, // Assuming sessionToken is the user ID
      name,
      email,
      student_id: studentId,
      phone_number: contactNumber,
      address
    }, {
      headers: {
        'Authorization': `Bearer ${sessionToken}`,
        'Content-Type': 'application/json'
      }
    });
    console.log('API updateUser response:', response.data); // Add this line for debugging
    return response.data;
  } catch (error) {
    console.error('API updateUser error:', error); // Add this line for debugging
    return { success: false, message: error.message };
  }
};

export const getCoursesAndSchedules = async (sessionToken) => {
  try {
    const response = await axios.get(`${API_URL}/course_schedule.php`, {
      headers: {
        'Authorization': `Bearer ${sessionToken}`
      }
    });
    return response.data;
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const getUserCourses = async (sessionToken) => {
  try {
    const response = await axios.get(`${API_URL}/get_user_courses.php`, {
      headers: {
        'Authorization': `Bearer ${sessionToken}`
      }
    });
    return response.data;
  } catch (error) {
    return { success: false, message: error.message };
  }
};

