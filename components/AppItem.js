import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AppItem = ({ name, isMalicious }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{name}</Text>
      <Text style={[styles.status, isMalicious ? styles.malicious : styles.safe]}>
        {isMalicious ? 'Malicious' : 'Safe'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  name: {
    fontSize: 16,
  },
  status: {
    fontWeight: 'bold',
  },
  malicious: {
    color: 'red',
  },
  safe: {
    color: 'green',
  },
});

export default AppItem;
