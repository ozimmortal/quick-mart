import { StyleSheet, View, Text, FlatList, Image, TouchableOpacity, Alert } from 'react-native';
import { useStore } from '@/store/useStore';
import { X } from 'lucide-react-native';
import { router } from 'expo-router';
import { auth } from '@/firebaseConfig'; // Import your Firebase auth instance

export default function CartScreen() {
  const { items, removeItem, clearCart, addOrders } = useStore();
  
  const total = items.reduce((sum, item) => sum + item.price, 0);
  
  const handleCheckout = async () => {
    // Check if user is authenticated
    const user = auth.currentUser;
    console.log(user,auth);
    if (!user) {
      // User is not logged in, redirect to login page
      Alert.alert(
        "Login Required",
        "You need to be logged in to checkout",
        [
          {
            text: "Cancel",
            style: "cancel"
          },
          { 
            text: "Login", 
            onPress: () => router.push('../sign-in') 
          }
        ]
      );
      return;
    }
    
    // User is logged in, proceed with checkout
    if (items.length === 0) {
      Alert.alert("Your cart is empty");
      return;
    }
    
    addOrders(items);
    clearCart();
    router.push('../conformation');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shopping Cart</Text>
      {items.length === 0 ? (
        <View style={styles.emptyCart}>
          <Text style={styles.emptyText}>Your cart is empty</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={items}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.cartItem}>
                <Image source={{ uri: item.image }} style={styles.itemImage} />
                <View style={styles.itemDetails}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemPrice}>${item.price}</Text>
                </View>
                <TouchableOpacity
                  onPress={() => removeItem(item.id)}
                  style={styles.removeButton}
                >
                  <X size={20} color="#FF4785" />
                </TouchableOpacity>
              </View>
            )}
          />
          <View style={styles.footer}>
            <Text style={styles.total}>Total: ${total.toFixed(2)}</Text>
            <TouchableOpacity 
              style={styles.checkoutButton}  
              onPress={handleCheckout}
              disabled={items.length === 0}
            >
              <Text style={styles.checkoutText}>Checkout</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingTop: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  cartItem: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f1f1',
    alignItems: 'center',
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 15,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5,
  },
  itemPrice: {
    fontSize: 16,
    color: '#FF4785',
    fontWeight: '600',
  },
  removeButton: {
    padding: 10,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#f1f1f1',
  },
  total: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 15,
  },
  checkoutButton: {
    backgroundColor: '#FF4785',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  checkoutButtonDisabled: {
    backgroundColor: '#cccccc',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  checkoutText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  emptyCart: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#888',
  },
});