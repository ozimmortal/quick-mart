import { StyleSheet, View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { useStore } from '@/store/useStore';
import { Heart } from 'lucide-react-native';

export default function FavoritesScreen() {
  const { favorites, removeFavorite, addItem } = useStore();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favorites</Text>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.favoriteItem}>
            <Image source={{ uri: item.image }} style={styles.itemImage} />
            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>${item.price}</Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  onPress={() => addItem(item)}
                  style={styles.addToCartButton}>
                  <Text style={styles.buttonText}>Add to Cart</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => removeFavorite(item.id)}
                  style={styles.removeButton}>
                  <Heart size={24} color="#FF385C" fill="#FF385C" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.emptyFavorites}>
            <Text style={styles.emptyText}>No favorites yet</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  favoriteItem: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  itemImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 15,
  },
  itemName: {
    fontSize: 18,
    fontWeight: '600',
  },
  itemPrice: {
    fontSize: 16,
    color: '#FF385C',
    marginTop: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
  },
  addToCartButton: {
    backgroundColor: '#FF385C',
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginRight: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
  },
  removeButton: {
    padding: 10,
  },
  emptyFavorites: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
  },
});