import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';

export default function SettingsScreen() {
      const clearAllData = () => {
                Alert.alert(
                              "Clear All Data",
                              "Are you sure you want to delete all saved messages? This cannot be undone.",
                              [
                                { text: "Cancel", style: "cancel" },
                                { text: "Delete", style: "destructive", onPress: () => {
                                                      // Logic to clear DB
                                }}
                                            ]
                          );
      };

    return (
              <View style={styles.container}>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Storage & Cleanup</Text>
                  <TouchableOpacity style={styles.deleteButton} onPress={clearAllData}>
                          <Text style={styles.deleteText}>Delete All Saved Messages</Text>
      </TouchableOpacity>
                  <Text style={styles.warning}>Warning: This action cannot be undone.</Text>
      </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>About</Text>
                  <Text>WhatsSave v1.0.0</Text>
                  <Text style={styles.description}>
                    A personal tool to save WhatsApp notifications locally.
      </Text>
      </View>
      </View>
      );
}

const styles = StyleSheet.create({
      container: { flex: 1, backgroundColor: '#f5f5f5', padding: 20 },
      section: { backgroundColor: '#fff', padding: 20, borderRadius: 10, marginBottom: 20 },
      sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15 },
      deleteButton: { backgroundColor: '#ffefef', padding: 15, borderRadius: 8, alignItems: 'center' },
      deleteText: { color: 'red', fontWeight: 'bold' },
      warning: { color: 'gray', fontSize: 12, marginTop: 10 },
      description: { marginTop: 10, color: 'gray' }
});
