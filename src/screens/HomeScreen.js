import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { getChats } from '../database/db';
import { format } from 'date-fns';

export default function HomeScreen({ navigation }) {
      const [chats, setChats] = useState([]);
      const [search, setSearch] = useState('');

    useEffect(() => {
              const unsubscribe = navigation.addListener('focus', () => {
                            getChats(setChats);
              });
              return unsubscribe;
    }, [navigation]);

    const filteredChats = chats.filter(c => c.id.toLowerCase().includes(search.toLowerCase()));

    const renderItem = ({ item }) => (
              <TouchableOpacity style={styles.chatItem} onPress={() => navigation.navigate('ChatDetail', { chatId: item.id })}>
              <View style={styles.chatInfo}>
                <Text style={styles.chatName}>{item.id}</Text>
                <Text style={styles.lastMsg}>{item.lastMessage}</Text>
  </View>
            <Text style={styles.time}>{format(item.timestamp, 'HH:mm')}</Text>
  </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <TextInput 
                style={styles.searchBar} 
                placeholder="Search chats..." 
                value={search} 
                onChangeText={setSearch} 
            />
                              <FlatList 
                data={filteredChats} 
                keyExtractor={item => item.id} 
                                  renderItem={renderItem}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                              />
                  </View>
                      );
                                       }

const styles = StyleSheet.create({
      container: { flex: 1, backgroundColor: '#fff' },
      searchBar: { padding: 15, margin: 10, backgroundColor: '#f0f0f0', borderRadius: 10 },
      chatItem: { flexDirection: 'row', padding: 16, alignItems: 'center', justifyContent: 'space-between' },
      chatInfo: { flex: 1 },
      chatName: { fontSize: 18, fontWeight: 'bold' },
      lastMsg: { color: 'gray', marginTop: 4 },
      time: { color: 'gray', fontSize: 12 },
      separator: { height: 1, backgroundColor: '#eee', marginLeft: 16 }
});
