import { useState, useEffect, useMemo } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView, Image, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Search, ChevronRight } from 'lucide-react-native';
import { useStore, Product } from '@/store/useStore';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '@/firebaseConfig';

export default function SearchScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [shoeProducts, setShoeProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addItem } = useStore();

 
  useEffect(() => {
    const fetchShoes = async () => {
      try {
        const shoesCollection = collection(db, 'shoedb');
        const shoesQuery = query(shoesCollection);
        const querySnapshot = await getDocs(shoesQuery);
        
        const products = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Product[];
        
        setShoeProducts(products);
      } catch (err) {
        console.error('Error fetching shoes:', err);
        setError('Failed to load shoes. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchShoes();
  }, []);

  const suggestions = useMemo(() => {
    if (!searchQuery) return [];
    
    return shoeProducts.filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase()))
    ).slice(0, 5); 
  }, [searchQuery, shoeProducts]);

  const handleSelectProduct = (product: Product) => {
    
    router.push(`./details/${product.id}`);
  };

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
            setShoeProducts([]);
          }}
        >
          <Text style={styles.retryButtonText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#000" />
        </TouchableOpacity>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for shoes..."
          placeholderTextColor="#888"
          value={searchQuery}
          onChangeText={setSearchQuery}
          autoFocus
        />
      </View>

      {searchQuery ? (
        <ScrollView style={styles.suggestionsContainer}>
          {suggestions.length > 0 ? (
            suggestions.map((product,i) => (
              <TouchableOpacity
                key={product.id + String(i)}
                style={styles.suggestionItem}
                onPress={() => handleSelectProduct(product)}
              >
                <Image 
                  source={{ uri: product.image }} 
                  style={styles.suggestionImage} 
                  
                />
                <View style={styles.suggestionText}>
                  <Text style={styles.suggestionName}>{product.name}</Text>
                  <Text style={styles.suggestionPrice}>${product.price?.toFixed(2)}</Text>
                </View>
                <ChevronRight size={20} color="#888" />
              </TouchableOpacity>
            ))
          ) : (
            <View style={styles.noResults}>
              <Search size={40} color="#ccc" />
              <Text style={styles.noResultsText}>No shoes found</Text>
              <Text style={styles.noResultsSubText}>Try different keywords</Text>
            </View>
          )}
        </ScrollView>
      ) : (
        <View style={styles.searchPrompt}>
          <Search size={40} color="#ccc" />
          <Text style={styles.promptText}>Search for your favorite shoes</Text>
          <Text style={styles.promptSubText}>Try brand names like "Nike" or types like "running shoes"</Text>
          
          {shoeProducts.length > 0 && (
            <View style={styles.popularSection}>
              <Text style={styles.sectionTitle}>Popular Now</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {shoeProducts.slice(0, 5).map(product => (
                  <TouchableOpacity 
                    key={product.id} 
                    style={styles.popularItem}
                    onPress={() => handleSelectProduct(product)}
                  >
                    <Image 
                      source={{ uri: product.image }} 
                      style={styles.popularImage}
                    />
                    <Text style={styles.popularName}>{product.name}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}
        </View>
      )}
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
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    height: 48,
    backgroundColor: '#f5f5f5',
    borderRadius: 24,
    paddingHorizontal: 20,
    fontSize: 16,
  },
  suggestionsContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  suggestionImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 12,
  },
  suggestionText: {
    flex: 1,
  },
  suggestionName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 2,
  },
  suggestionPrice: {
    fontSize: 14,
    color: '#FF385C',
  },
  noResults: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  noResultsText: {
    fontSize: 18,
    fontWeight: '500',
    marginTop: 16,
    color: '#333',
  },
  noResultsSubText: {
    fontSize: 14,
    color: '#888',
    marginTop: 4,
  },
  searchPrompt: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  promptText: {
    fontSize: 18,
    fontWeight: '500',
    marginTop: 16,
    color: '#333',
    textAlign: 'center',
  },
  promptSubText: {
    fontSize: 14,
    color: '#888',
    marginTop: 8,
    textAlign: 'center',
  },
  loadingContainer: {
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
  errorText: {
    fontSize: 16,
    color: '#FF385C',
    textAlign: 'center',
    marginBottom: 20,
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
  popularSection: {
    marginTop: 40,
    width: '100%',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  popularItem: {
    width: 120,
    marginLeft: 20,
  },
  popularImage: {
    width: 120,
    height: 120,
    borderRadius: 10,
    marginBottom: 8,
  },
  popularName: {
    fontSize: 14,
    fontWeight: '500',
  },
});