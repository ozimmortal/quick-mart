import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity,Pressable } from 'react-native';
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_700Bold } from '@expo-google-fonts/inter';
import { SplashScreen, useRouter } from 'expo-router';
import { Search } from 'lucide-react-native';
import ProductCard from '@/components/ProductCard';
import { useStore, Product } from '@/store/useStore';

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

const SAMPLE_PRODUCTS: Product[] = [
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
];

export default function DiscoverScreen() {
  const router = useRouter();
  const [fontsLoaded, fontError] = useFonts({
    'Inter-Regular': Inter_400Regular,
    'Inter-Medium': Inter_500Medium,
    'Inter-Bold': Inter_700Bold,
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const { addToCart, addToFavorites } = useStore();

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  const handleSwipeLeft = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, SAMPLE_PRODUCTS.length - 1));
  };

  const handleSwipeRight = () => {
    const product = SAMPLE_PRODUCTS[currentIndex];
    addToCart(product);
    addToFavorites(product);
    setCurrentIndex((prev) => Math.min(prev + 1, SAMPLE_PRODUCTS.length - 1));
  };

  if (currentIndex >= SAMPLE_PRODUCTS.length) {
    return (
      <View style={styles.container}>
        <Text style={styles.endText}>No more products to show!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Pressable 
        style={styles.searchButton}
        onPressIn={() => {
          router.push('./search') 
          console.log('Search button pressed!');}}
      >
        <Search size={24} color="#666" />
      </Pressable>
      <ProductCard
        product={SAMPLE_PRODUCTS[currentIndex]}
        onSwipeLeft={handleSwipeLeft}
        onSwipeRight={handleSwipeRight}
      />
      <View style={styles.instructions}>
        <Text style={styles.instructionText}>
          Swipe right to add to cart, left to skip
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchButton: {
    position: 'absolute',
    top: 60,
    right: 20,
    width: 44,
    height: 44,
    backgroundColor: 'white',
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 10,
  },
  instructions: {
    position: 'absolute',
    bottom: 100,
    padding: 20,
  },
  instructionText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    fontFamily: 'Inter-Regular',
  },
  endText: {
    fontSize: 20,
    color: '#666',
    textAlign: 'center',
    fontFamily: 'Inter-Medium',
  },
});