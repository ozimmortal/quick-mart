import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { CircleCheck as CheckCircle2 } from 'lucide-react-native';

export default function OrderConfirmationScreen() {
  const handleContinueShopping = () => {
    router.replace('/');
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <CheckCircle2 size={80} color="#4CAF50" />
        <Text style={styles.title}>Order Confirmed!</Text>
        <Text style={styles.message}>
          Thank you for your purchase.
        </Text>
        
        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>What's Next?</Text>
          <Text style={styles.infoText}>
            • We'll notify you when your order ships{'\n'}
            • Track your order in the Profile section
          </Text>
        </View>

        <TouchableOpacity 
          style={styles.continueButton}
          onPress={handleContinueShopping}
        >
          <Text style={styles.continueButtonText}>Continue Shopping</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 10,
    color: '#1a1a1a',
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666666',
    marginBottom: 30,
    lineHeight: 24,
  },
  infoContainer: {
    backgroundColor: '#f8f8f8',
    padding: 20,
    borderRadius: 10,
    width: '100%',
    marginBottom: 30,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#1a1a1a',
  },
  infoText: {
    fontSize: 16,
    color: '#666666',
    lineHeight: 24,
  },
  continueButton: {
    backgroundColor: '#FF4785',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  continueButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
});