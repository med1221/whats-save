import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('whatssave.db');

export const initSync = () => {
      db.transaction(tx => {
                // Chats table
                             tx.executeSql(
                                           'CREATE TABLE IF NOT EXISTS chats (id TEXT PRIMARY KEY, whatsappType TEXT, lastMessage TEXT, timestamp INTEGER);'
                                       );
                // Messages table
                             tx.executeSql(
                                           'CREATE TABLE IF NOT EXISTS messages (id INTEGER PRIMARY KEY AUTOINCREMENT, chatId TEXT, content TEXT, contentType TEXT, timestamp INTEGER, isDeleted INTEGER DEFAULT 0, FOREIGN KEY (chatId) REFERENCES chats (id) ON DELETE CASCADE);'
                                       );
      });
};

export const saveMessage = (chatId, content, contentType, whatsappType) => {
      return new Promise((resolve, reject) => {
                db.transaction(tx => {
                              // 1. Update/Insert Chat
                                           tx.executeSql(
                                                             'INSERT OR REPLACE INTO chats (id, whatsappType, lastMessage, timestamp) VALUES (?, ?, ?, ?);',
                                                             [chatId, whatsappType, content, Date.now()]
                                                         );
                              // 2. Insert Message
                                           tx.executeSql(
                                                             'INSERT INTO messages (chatId, content, contentType, timestamp) VALUES (?, ?, ?, ?);',
                                                             [chatId, content, contentType, Date.now()],
                                                             () => resolve(),
                                                             (_, error) => reject(error)
                                                         );
                });
      });
};

export const getChats = (callback) => {
      db.transaction(tx => {
                tx.executeSql('SELECT * FROM chats ORDER BY timestamp DESC;', [], (_, { rows }) => {
                              callback(rows._array);
                });
      });
};

export const getMessages = (chatId, callback) => {
      db.transaction(tx => {
                tx.executeSql('SELECT * FROM messages WHERE chatId = ? ORDER BY timestamp ASC;', [chatId], (_, { rows }) => {
                              callback(rows._array);
                });
      });
};
