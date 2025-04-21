import { StyleSheet, View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { useStore } from '@/store/useStore';
import { X } from 'lucide-react-native';
import { router } from 'expo-router';

export default function CartScreen() {
  const { orders,addOrders } = useStore();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order History</Text>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <Image source={{ uri: item.image }} style={styles.itemImage} />
            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>${item.price}</Text>
            </View>
          </View>
        )}
      />
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
  checkoutText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});