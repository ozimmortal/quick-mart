import { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';
import Animated, { useSharedValue, withSpring, runOnJS } from 'react-native-reanimated';
import { X, ShoppingCart, Search } from 'lucide-react-native';
import { ProductCard } from '../../components/ProductCard';
import { useStore, type Product } from '@/store/useStore';
import { db } from '@/firebaseConfig';
import { collection, getDocs, limit, query } from 'firebase/firestore';
import { router } from 'expo-router';


const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function DiscoverScreen() {
  const translateX = useSharedValue(0);
  const { addItem } = useStore();
  const [products, setProducts] = useState<Product[]>([]);
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Fetch products from Firebase
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const shoeCollection = collection(db, "shoedb");
        const q = query(shoeCollection, limit(10));
        const querySnapshot = await getDocs(q);
        const fetchedProducts = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Product[];
        setProducts(fetchedProducts);

      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  // Reset animation state when product changes
  useEffect(() => {
    translateX.value = 0;
  }, [currentProductIndex]);

  const moveToNextProduct = useCallback(() => {
    setCurrentProductIndex(prev => {
      // Loop back to first product when reaching the end
      return prev >= products.length - 1 ? 0 : prev + 1;
    });
  }, [products.length]);

  const handleAddToCart = useCallback(() => {
    if (isAnimating || products.length === 0) return;
    
    setIsAnimating(true);
    const productToAdd = products[currentProductIndex];
    
    translateX.value = withSpring(
      SCREEN_WIDTH,
      {
        damping: 20,
        stiffness: 110,
      },
      (finished) => {
        if (finished) {
          runOnJS(addItem)(productToAdd);
          runOnJS(moveToNextProduct)();
          runOnJS(setIsAnimating)(false);
        }
      }
    );
  }, [currentProductIndex, products, isAnimating, addItem, moveToNextProduct]);

  const handleSkipProduct = useCallback(() => {
    if (isAnimating || products.length === 0) return;
    
    setIsAnimating(true);
    translateX.value = withSpring(
      -SCREEN_WIDTH,
      {
        damping: 15,
        stiffness: 100,
      },
      (finished) => {
        if (finished) {
          runOnJS(moveToNextProduct)();
          runOnJS(setIsAnimating)(false);
        }
      }
    );
  }, [isAnimating, moveToNextProduct]);

  if (products.length === 0) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        {/* Add your loading indicator here */}
        <ActivityIndicator size="large" color="#FF4785" />
      </View>
    );
  }

  const currentProduct = products[currentProductIndex];

  return (
    <View style={styles.container}>
      <View  style={styles.search}>
        <TouchableOpacity onPress={() => router.push('/search')}>
          <Search size={32} color="#FF4785" />
        </TouchableOpacity>
      </View>
      <View style={styles.cardsContainer}>
        {currentProduct && (
          <ProductCard
            key={`product_${currentProduct.id}`}
            product={currentProduct}
            translateX={translateX}
            index={currentProductIndex}
          />
        )}
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[styles.button, styles.skipButton]}
          onPress={handleSkipProduct}
          disabled={isAnimating}
        >
          <X size={32} color="#FF4785" />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.likeButton]}
          onPress={handleAddToCart}
          disabled={isAnimating}
        >
          <ShoppingCart size={32} color="#ffffff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  search:{
    top:30,
    right:15,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    padding:10,
    position:'absolute',
    gap: 10,
    zIndex:1000,
    boxShadow:'rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px',
    borderRadius:'100%',
  },
  searchbtn:{
    width:'100%',
  },
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:20,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 40,
    gap: 20,
  },
  button: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  skipButton: {
    backgroundColor: '#ffffff',
  },
  likeButton: {
    backgroundColor: '#FF4785',
  },
});
