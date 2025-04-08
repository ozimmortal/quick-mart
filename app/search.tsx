import { useState } from 'react';
import { StyleSheet, View, Text, TextInput, FlatList, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, ShoppingBag } from 'lucide-react-native';
import { useStore, Product } from '@/store/useStore';

const ALL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Modern Lounge Chair',
    price: 299.99,
    description: 'Elegant mid-century modern design with premium comfort',
    image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '2',
    name: 'Minimalist Desk Lamp',
    price: 79.99,
    description: 'Adjustable LED lamp with sleek aluminum finish',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '3',
    name: 'Ceramic Plant Pot',
    price: 34.99,
    description: 'Hand-crafted ceramic pot with drainage system',
    image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '4',
    name: 'Vintage Record Player',
    price: 199.99,
    description: 'Classic turntable with modern features',
    image: 'https://images.unsplash.com/photo-1542820242-a6c6bcb6b3b3?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: '5',
    name: 'Leather Messenger Bag',
    price: 149.99,
    description: 'Handcrafted leather bag with multiple compartments',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=1000',
  },
];

export default function SearchScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const { addItem } = useStore();

  const filteredProducts = ALL_PRODUCTS.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Search Products</Text>
      </View>
      <TextInput
        style={styles.searchInput}
        placeholder="Search for products..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        autoFocus
      />
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.productCard}>
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <View style={styles.productInfo}>
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productPrice}>${item.price}</Text>
              <Text style={styles.productDescription} numberOfLines={2}>
                {item.description}
              </Text>
              <TouchableOpacity
                style={styles.addToCartButton}
                onPress={() => addItem(item)}
              >
                <ShoppingBag size={20} color="#fff" />
                <Text style={styles.buttonText}>Add to Cart</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: '#fff',
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  searchInput: {
    margin: 20,
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    fontSize: 16,
  },
  listContent: {
    padding: 20,
  },
  productCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    overflow: 'hidden',
  },
  productImage: {
    width: 120,
    height: 120,
    resizeMode: 'cover',
  },
  productInfo: {
    flex: 1,
    padding: 15,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 16,
    color: '#FF385C',
    marginBottom: 4,
  },
  productDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  addToCartButton: {
    backgroundColor: '#FF385C',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    marginLeft: 8,
    fontWeight: '600',
  },
});