import { useLocalSearchParams } from 'expo-router';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity,ActivityIndicator } from 'react-native';
import { ShoppingBag } from 'lucide-react-native';
import { useStore, type Product } from '@/store/useStore';
import {  getDocs, doc,query,collection,where } from 'firebase/firestore';
import { db } from '@/firebaseConfig';
import { useState, useEffect, useMemo } from 'react';


export default function ProductDetail() {
  const { id } = useLocalSearchParams();
  const shoeId = Array.isArray(id) ? id[0] : id; // Handle array case
  const { addItem } = useStore();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
 

useEffect(() => {
  const fetchShoe = async () => {
    try {
      setLoading(true) 
      console.log(shoeId , typeof(id)) 

      const q = query(
        collection(db, "shoedb"),
        where("id", "==", shoeId)
      );
      const shoeSnapshot = await getDocs(q);

      if (!shoeSnapshot.empty) {
        const product = shoeSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }))[0] as Product;
        setProduct(product);
      } else {
        setError('Shoe not found.');
      }
    } catch (err) {
      console.error('Error fetching shoe:', err);
      setError('Failed to load shoe. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  fetchShoe();
}, []); 
   if (loading) {
       return (
         <View style={styles.loadingContainer}>
           <ActivityIndicator size="large" color="#FF385C" />
           <Text style={styles.loadingText}>Loading shoes...</Text>
         </View>
       );
     }
   
     if (error) {
       return (
         <View style={styles.errorContainer}>
           <Text style={styles.errorText}>{error}</Text>
           <TouchableOpacity 
             style={styles.retryButton}
             onPress={() => {
               setError(null);
               setLoading(true);
               setProduct(null);
             }}
           >
             <Text style={styles.retryButtonText}>Try Again</Text>
           </TouchableOpacity>
         </View>
       );
     }  
  
  if (!product) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Product not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <Image 
          source={{ uri: product.image }} 
          style={styles.image}
        />
        <View style={styles.content}>
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.price}>${product.price}</Text>
          <Text style={styles.description}>{product.description}</Text>
          
          <View style={styles.specs}>
            <Text style={styles.specsTitle}>Product Specifications</Text>
            <View style={styles.specItem}>
              <Text style={styles.specLabel}>Availability</Text>
              <Text style={styles.specValue}>In Stock</Text>
            </View>
            <View style={styles.specItem}>
              <Text style={styles.specLabel}>Shipping</Text>
              <Text style={styles.specValue}>Free</Text>
            </View>
            <View style={styles.specItem}>
              <Text style={styles.specLabel}>Warranty</Text>
              <Text style={styles.specValue}>1 Year</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.addToCartButton}
          onPress={() => addItem(product)}
        >
          <ShoppingBag color="#ffffff" size={24} />
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  image: {
    width: '100%',
    height: 400,
    resizeMode: 'cover',
  },
  content: {
    padding: 20,
  },
  name: {
    fontSize: 28,
    fontWeight: '600',
    marginBottom: 8,
    color: '#1a1a1a',
  },
  price: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FF4785',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#666666',
    marginBottom: 24,
  },
  specs: {
    backgroundColor: '#f8f8f8',
    padding: 16,
    borderRadius: 12,
  },
  specsTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: '#1a1a1a',
  },
  specItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e1e1e1',
  },
  specLabel: {
    fontSize: 16,
    color: '#666666',
  },
  specValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1a1a1a',
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#f1f1f1',
    backgroundColor: '#ffffff',
  },
  addToCartButton: {
    backgroundColor: '#FF4785',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  addToCartText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  errorText: {
    fontSize: 18,
    color: '#FF4785',
    textAlign: 'center',
    marginTop: 20,
  },loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    color: '#666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  retryButton: {
    backgroundColor: '#FF385C',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});