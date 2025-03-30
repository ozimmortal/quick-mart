import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Link, router } from 'expo-router';
import { useState } from 'react';
import { auth } from '@/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MoveLeft } from 'lucide-react-native';

export default function SignInScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const userSession = await AsyncStorage.getItem("userSession");
      if (!userSession) {
        await AsyncStorage.setItem("userSession", JSON.stringify(user));   
      }
      console.log("User signed in:", user);
      router.push('/');
    } catch (error) {
      console.error("Sign-in error:", error.message);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <View  style={styles.back}>
        <TouchableOpacity onPress={() => router.back()} >
          <MoveLeft size={24} color="#000" />
        </TouchableOpacity>
      </View>
      <View style={styles.form}>
      <Text style={styles.title}>Log In</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Choose a password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
          <Text style={styles.signUpButtonText}>Sign In</Text>
        </TouchableOpacity>

        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Create an Account.</Text>
          <Link href="/sign-up" style={styles.loginLink}>
            Sign Up
          </Link>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    back: {
        position: 'absolute',
        top: 60,
        left: 20,
      },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    height: '100%',
    borderColor: '#f5f5f5',
    
    
  },
  content: {
    flexGrow: 1, // Allows content to take the full height
    justifyContent: 'center', // Centers content vertically
    alignItems: 'center', // Centers content horizontally
    paddingBottom: 40, 
  },
  header: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 40,
  },
  headerImage: {
    width: 200,
    height: 200,
    marginBottom: 24,
    borderRadius: 100,
  },
  title: {
    fontSize: 34,
    fontWeight: '700',
    marginBottom: 8,
    color: '#1a1a1a',
    textAlign: 'center',
    paddingBottom: 40,
    fontFamily: 'Poppins',
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
  },
  form: {
    width: '90%', // Set a width so it doesn’t stretch
    maxWidth: 400, // Keep it neat on larger screens
    marginBottom: 50,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
  },
  signUpButton: {
    backgroundColor: '#FF4785',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 24,
  },
  signUpButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  loginText: {
    color: '#666666',
    marginRight: 4,
  },
  loginLink: {
    color: '#FF4785',
    fontWeight: '600',
  },
});