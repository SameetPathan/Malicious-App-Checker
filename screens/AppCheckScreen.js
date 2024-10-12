import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView, SafeAreaView, Animated, ActivityIndicator } from 'react-native';
import { checkInstalledApps } from '../services/apiService';
import AppItem from '../components/AppItem';
import { auth } from '../services/firebase';
import { Ionicons } from '@expo/vector-icons';

const AppCheckScreen = ({ navigation }) => {
  const [maliciousApps, setMaliciousApps] = useState([]);
  const [safeApps, setSafeApps] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const fetchAppData = async () => {
    setIsLoading(true);
    try {
      // Mock data for installed apps (replace with actual device data in a real app)
      const installedApps = [
        { name: 'App1', packageName: 'com.example.app1' },
        { name: 'App2', packageName: 'com.example.app2' },
        { name: 'App3', packageName: 'com.example.app3' },
      ];

      const result = await checkInstalledApps(installedApps);
      setMaliciousApps(result.maliciousApps);
      setSafeApps(result.safeApps);
      setShowResults(true);
    } catch (error) {
      console.error('Error fetching app data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
 
      navigation.navigate('Home');
    
  };

  const renderAppItem = ({ item }) => <AppItem name={item.name} isMalicious={item.isMalicious} />;

  return (
    <SafeAreaView style={styles.safeArea}>
      <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={styles.iconButton}>
            <Ionicons name="person-circle-outline" size={32} color="#007AFF" />
          </TouchableOpacity>
          <Text style={styles.title}>App Checker</Text>
          <TouchableOpacity onPress={handleLogout} style={styles.iconButton}>
            <Ionicons name="log-out-outline" size={32} color="#007AFF" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.scrollView}>
          {!showResults ? (
            <View style={styles.startSection}>
              <Ionicons name="shield-checkmark-outline" size={100} color="#007AFF" style={styles.icon} />
              <Text style={styles.startText}>
                Click the button below to check your installed apps for potential security risks.
              </Text>
              <TouchableOpacity style={styles.checkButton} onPress={fetchAppData} disabled={isLoading}>
                {isLoading ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text style={styles.checkButtonText}>Check Apps</Text>
                )}
              </TouchableOpacity>
            </View>
          ) : (
            <>
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Malicious Apps</Text>
                <FlatList
                  data={maliciousApps}
                  renderItem={renderAppItem}
                  keyExtractor={(item) => item.packageName}
                  ListEmptyComponent={<Text style={styles.emptyText}>No malicious apps found</Text>}
                />
              </View>
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Safe Apps</Text>
                <FlatList
                  data={safeApps}
                  renderItem={renderAppItem}
                  keyExtractor={(item) => item.packageName}
                  ListEmptyComponent={<Text style={styles.emptyText}>No safe apps found</Text>}
                />
              </View>
            </>
          )}
        </ScrollView>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  iconButton: {
    padding: 5,
  },
  scrollView: {
    flex: 1,
  },
  startSection: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  icon: {
    marginBottom: 20,
  },
  startText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  checkButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    elevation: 3,
  },
  checkButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#007AFF',
  },
  emptyText: {
    textAlign: 'center',
    color: '#666',
    fontStyle: 'italic',
  },
});

export default AppCheckScreen;
