import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, PermissionsAndroid, Platform } from 'react-native';
import axios from 'axios';
import Geolocation from 'react-native-geolocation-service';
import { Icon } from 'react-native-elements';
import Header from '../components/Header';
import Footer from '../components/Footer';

const WeatherPage = () => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [locationName, setLocationName] = useState('');
  const apiKey = '168013637d1447c882c3ba794a5e1a76';
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather`;

  useEffect(() => {
    const fetchWeather = async (latitude, longitude) => {
      try {
        const response = await axios.get(apiUrl, {
          params: {
            lat: latitude,
            lon: longitude,
            appid: apiKey,
            units: 'metric',
          },
        });
        setWeather(response.data);
        setLocationName(response.data.name);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch weather data');
        setLoading(false);
      }
    };

    const requestLocationPermission = async () => {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'This app needs access to your location to show the weather.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          setError('Location permission denied');
          setLoading(false);
          return;
        }
      }
      Geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLatitude(latitude);0
          setLongitude(longitude);
          fetchWeather(latitude, longitude);
        },
        (error) => {
          setError('Failed to get location');
          setLoading(false);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    };

    requestLocationPermission();
  }, []);

  const renderWeatherInfo = () => {
    if (loading) {
      return <ActivityIndicator size="large" color="#0000ff" />;
    } else if (error) {
      return <Text style={styles.error}>{error}</Text>;
    } else if (weather) {
      return (
        <View style={styles.weatherContainer}>
          <Text style={styles.locationText}>Location: {locationName}</Text>
          <Text style={styles.locationText}>Latitude: {latitude}</Text>
          <Text style={styles.locationText}>Longitude: {longitude}</Text>
          <View style={styles.weatherRow}>
            <Icon name="thermometer" type="font-awesome" color="#f50" size={50} />
            <Text style={styles.weatherText}>{weather.main.temp}°C</Text>
          </View>
          <View style={styles.weatherRow}>
            <Icon name="cloud" type="font-awesome" color="#00aced" size={50} />
            <Text style={styles.weatherText}>{weather.weather[0].description}</Text>
          </View>
          <View style={styles.weatherRow}>
            <Icon name="tint" type="font-awesome" color="#3498db" size={50} />
            <Text style={styles.weatherText}>Humidity: {weather.main.humidity}%</Text>
          </View>
          <View style={styles.weatherRow}>
            <Icon name="wind" type="font-awesome-5" color="#2ecc71" size={50} />
            <Text style={styles.weatherText}>Wind: {weather.wind.speed} m/s</Text>
          </View>
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Current Weather" />
      <View style={styles.content}>
       
        {renderWeatherInfo()}
      </View>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // Adjust background color as needed
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  error: {
    color: 'red',
    fontSize: 18,
    marginVertical: 20,
  },
  weatherContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  weatherRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  weatherText: {
    fontSize: 18,
    marginLeft: 10,
  },
  locationText: {
    fontSize: 18,
    marginVertical: 5,
  },
});

export default WeatherPage;