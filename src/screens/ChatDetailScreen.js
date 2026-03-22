import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { getMessages } from '../database/db';
import { format } from 'date-fns';

export default function ChatDetailScreen({ route }) {
      const { chatId } = route.params;
      const [messages, setMessages] = useState([]);
      const [activeTab, setActiveTab] = useState('All');
      const tabs = ['All', 'Media', 'Docs', 'Links'];

    useEffect(() => {
              getMessages(chatId, setMessages);
    }, [chatId]);

    const filteredMessages = messages.filter(m => {
              if (activeTab === 'All') return true;
              if (activeTab === 'Media') return m.contentType === 'IMAGE' || m.contentType === 'VIDEO';
              if (activeTab === 'Docs') return m.contentType === 'DOCUMENT';
              if (activeTab === 'Links') return m.contentType === 'LINK';
              return true;
    });

    const renderItem = ({ item }) => (
              <View style={styles.messageItem}>
            <Text style={styles.content}>{item.content}</Text>
              <Text style={styles.time}>{format(item.timestamp, 'HH:mm - dd/MM')}</Text>
  </View>
    );

    return (
              <View style={styles.container}>
            <View style={styles.tabBar}>
    {tabs.map(tab => (
                          <TouchableOpacity 
                                      key={tab} 
                        style={[styles.tab, activeTab === tab && styles.activeTab]} 
                        onPress={() => setActiveTab(tab)}
                    >
                                                  <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
                          </TouchableOpacity>
                ))}
                  </View>
            <FlatList 
                data={filteredMessages} 
                keyExtractor={item => item.id.toString()} 
                                  renderItem={renderItem}
                inverted={false}
            />
                  </View>
    );
}

const styles = StyleSheet.create({
      container: { flex: 1, backgroundColor: '#f5f5f5' },
      tabBar: { flexDirection: 'row', backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#eee' },
      tab: { flex: 1, padding: 15, alignItems: 'center' },
      activeTab: { borderBottomWidth: 3, borderBottomColor: '#25D366' },
      tabText: { color: 'gray' },
      activeTabText: { color: '#25D366', fontWeight: 'bold' },
      messageItem: { padding: 15, marginHorizontal: 10, marginVertical: 5, backgroundColor: '#fff', borderRadius: 8, elevation: 1 },
      content: { fontSize: 16 },
      time: { fontSize: 10, color: 'gray', marginTop: 5, alignSelf: 'flex-end' }
});
