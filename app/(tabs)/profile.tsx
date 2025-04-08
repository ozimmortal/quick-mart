import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Settings, CreditCard, Package, Heart, Bell, CircleHelp as HelpCircle, LogOut, LogIn } from 'lucide-react-native';
import { router } from 'expo-router';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

const MENU_ITEMS = [
  { icon: Settings, label: 'Settings', color: '#4A90E2' },
  { icon: Package, label: 'Orders', color: '#FF8C00' },
  { icon: HelpCircle, label: 'Help & Support', color: '#34495E' },
];

export default function ProfileScreen() {
  const [login, setLogin] = useState(false);
  const [userSession, setUserSession] = useState(null);

  useEffect(() => {
    const getUserSession = async () => {
      try {
        const user = await AsyncStorage.getItem("userSession");
        if (user) {
          setLogin(true);
          setUserSession(JSON.parse(user));
        }
        console.log("User session:", user);
      } catch (error) {
        console.error("Sign-in error:", error.message);
      }
    };

    getUserSession();
  }, []); // ✅ Fix: Added dependency array to prevent infinite loops

  // ✅ Handle Logout
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("userSession");
      setLogin(false);
      setUserSession(null);
      router.push('/sign-up'); // Redirect to login screen
    } catch (error) {
      console.error("Logout error:", error.message);
    }
  };

  if (login) {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=1000' }}
            style={styles.avatar}
          />
          <Text style={styles.name}>{userSession?.displayName || "John Doe"}</Text>
          <Text style={styles.email}>{userSession?.email}</Text>
        </View>

        <View style={styles.menuContainer}>
          {MENU_ITEMS.map((item, index) => (
            <TouchableOpacity key={index} style={styles.menuItem}>
              <View style={[styles.iconContainer, { backgroundColor: `${item.color}15` }]}>
                <item.icon size={24} color={item.color} />
              </View>
              <Text style={styles.menuLabel}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* ✅ Logout Button Fixed */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <LogOut size={24} color="#FF385C" />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  } else {
    return (
      <View style={styles.containerIn}>
        <TouchableOpacity style={styles.logoutButton} onPress={() => router.push('/sign-up')}>
          <LogIn size={24} color="#38FF60" />
          <Text style={styles.logoutText}>Log In</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  containerIn: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 30,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: '#666',
  },
  menuContainer: {
    padding: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuLabel: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    marginTop: 20,
    marginHorizontal: 20,
    marginBottom: 40,
    backgroundColor: '#FFF1F3',
    borderRadius: 12,
  },
  logoutText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#FF385C',
    fontWeight: '600',
  },
});
