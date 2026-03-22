import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SplashScreen({ navigation }) {
    const [selectedType, setSelectedType] = useState('PERSONAL');

  return (
        <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Welcome to WhatsSave</Text>
        <Text style={styles.subtitle}>Select WhatsApp version to track:</Text>

      <View style={styles.selectionContainer}>
        <TouchableOpacity 
          style={[styles.button, selectedType === 'PERSONAL' && styles.active]} 
          onPress={() => setSelectedType('PERSONAL')}
          >
                      <Text style={selectedType === 'PERSONAL' && styles.activeText}>WhatsApp</Text>
            </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.button, selectedType === 'BUSINESS' && styles.active]} 
          onPress={() => setSelectedType('BUSINESS')}
          >
                      <Text style={selectedType === 'BUSINESS' && styles.activeText}>WA Business</Text>
            </TouchableOpacity>
            </View>

      <TouchableOpacity style={styles.continueButton} onPress={() => navigation.navigate('Home')}>
                    <Text style={styles.continueText}>Continue</Text>
            </TouchableOpacity>
            </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#fff' },
    title: { fontSize: 28, fontWeight: 'bold', marginBottom: 40, color: '#25D366' },
    subtitle: { fontSize: 16, marginBottom: 20 },
    selectionContainer: { flexDirection: 'row', marginBottom: 40 },
    button: { padding: 15, borderWidth: 1, borderColor: '#ccc', borderRadius: 10, marginHorizontal: 10 },
    active: { backgroundColor: '#25D366', borderColor: '#25D366' },
    activeText: { color: '#fff', fontWeight: 'bold' },
    continueButton: { backgroundColor: '#25D366', padding: 20, borderRadius: 10, width: '100%', alignItems: 'center' },
    continueText: { color: '#fff', fontSize: 18, fontWeight: 'bold' }
});
