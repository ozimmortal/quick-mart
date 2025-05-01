import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  Alert,
  Modal,
  Pressable,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingsScreen: React.FC = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [languageModalVisible, setLanguageModalVisible] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  useEffect(() => {
    loadSettings();
  }, []);

  useEffect(() => {
    saveSettings();
  }, [notificationsEnabled, darkMode, selectedLanguage]);

  const loadSettings = async () => {
    try {
      const notif = await AsyncStorage.getItem('notificationsEnabled');
      const dark = await AsyncStorage.getItem('darkMode');
      const lang = await AsyncStorage.getItem('language');

      if (notif !== null) setNotificationsEnabled(JSON.parse(notif));
      if (dark !== null) setDarkMode(JSON.parse(dark));
      if (lang !== null) setSelectedLanguage(lang);
    } catch (error) {
      console.error('Failed to load settings', error);
    }
  };

  const saveSettings = async () => {
    try {
      await AsyncStorage.setItem('notificationsEnabled', JSON.stringify(notificationsEnabled));
      await AsyncStorage.setItem('darkMode', JSON.stringify(darkMode));
      await AsyncStorage.setItem('language', selectedLanguage);
    } catch (error) {
      console.error('Failed to save settings', error);
    }
  };

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', onPress: () => console.log('User logged out') },
    ]);
  };

  const handleClearCache = () => {
    AsyncStorage.clear();
    setNotificationsEnabled(true);
    setDarkMode(false);
    setSelectedLanguage('English');
    Alert.alert('Cache Cleared');
  };

  const handleLanguageChange = (lang: string) => {
    setSelectedLanguage(lang);
    setLanguageModalVisible(false);
  };

  return (
    <View style={[styles.container, darkMode && { backgroundColor: '#222' }]}>
      <Text style={[styles.header, darkMode && { color: '#fff' }]}>Settings</Text>

      <View style={styles.settingItem}>
        <Text style={[styles.settingText, darkMode && { color: '#ccc' }]}>Enable Notifications</Text>
        <Switch value={notificationsEnabled} onValueChange={setNotificationsEnabled} />
      </View>

      <View style={styles.settingItem}>
        <Text style={[styles.settingText, darkMode && { color: '#ccc' }]}>Dark Mode</Text>
        <Switch value={darkMode} onValueChange={setDarkMode} />
      </View>

      <TouchableOpacity style={styles.settingItem} onPress={() => setLanguageModalVisible(true)}>
        <Text style={[styles.settingText, darkMode && { color: '#ccc' }]}>
          Language: {selectedLanguage}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.settingItem} onPress={() => {}}>
        <Text style={[styles.settingText, darkMode && { color: '#ccc' }]}>Change Password</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.settingItem} onPress={handleClearCache}>
        <Text style={[styles.settingText, darkMode && { color: '#ccc' }]}>Clear Cache</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.settingItem} onPress={() => {}}>
        <Text style={[styles.settingText, darkMode && { color: '#ccc' }]}>About</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.settingItem} onPress={handleLogout}>
        <Text style={[styles.settingText, { color: 'red' }]}>Log Out</Text>
      </TouchableOpacity>

      <Modal visible={languageModalVisible} transparent animationType="slide">
<View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Language</Text>
            {['English', 'Spanish', 'French', 'Hindi'].map((lang) => (
              <Pressable key={lang} style={styles.modalOption} onPress={() => handleLanguageChange(lang)}>
                <Text style={styles.modalText}>{lang}</Text>
              </Pressable>
            ))}
            <Pressable onPress={() => setLanguageModalVisible(false)}>
              <Text style={[styles.modalText, { marginTop: 10 }]}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  settingItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingText: { fontSize: 16 },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 30,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  modalOption: { paddingVertical: 10 },
  modalText: { fontSize: 16 },
});

export default Settings;
