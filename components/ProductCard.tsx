import { StyleSheet, View, Image, Text, Dimensions, TouchableOpacity } from 'react-native';
import Animated, {
  useAnimatedStyle,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';
import type { Product } from '@/store/useStore';
import { Heart } from 'lucide-react-native';
import { router } from 'expo-router';
import { useStore } from '@/store/useStore';
import { useState } from 'react';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = SCREEN_WIDTH * 0.9;

interface ProductCardProps {
  product: Product;
  translateX: Animated.SharedValue<number>;
  index: number;
}

export function ProductCard({ product, translateX, index }: ProductCardProps) {

  const { favorites,addFavorite,removeFavorite } = useStore();
  const [fill,setFill] = useState(false)
  const cardStyle = useAnimatedStyle(() => {
    const rotation = interpolate(
      translateX.value,
      [-SCREEN_WIDTH, 0, SCREEN_WIDTH],
      [-30, 0, 30],
      Extrapolation.CLAMP
    );

    const scale = interpolate(
      translateX.value,
      [-SCREEN_WIDTH, 0, SCREEN_WIDTH],
      [0.8, 1, 0.8],
      Extrapolation.CLAMP
    );

    const opacity = interpolate(
      translateX.value,
      [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      [0.5, 1, 0.5],
      Extrapolation.CLAMP
    );

    return {
      transform: [
        { translateX: translateX.value },
        { rotate: `${rotation}deg` },
        { scale },
      ],
      opacity,
    };
  });

  return (
    <Animated.View style={[styles.card, cardStyle]}>
      <TouchableOpacity onPress={()=>{
        router.push(`./details/${product.id}`)
      }}>
      <Image source={{ uri: product.image }} style={styles.image} />
      </TouchableOpacity>
      <View style={styles.content}>
        <View style={styles.heart}>
          <Text style={styles.name}>{product.name}</Text>
          <TouchableOpacity onPress={() => {
            if(favorites.filter(fav => fav.id != product.id)){
              addFavorite(product);
              setFill(true)
            }else{
              removeFavorite(product.id);
              setFill(false)
            }
          }}>
            <Heart size={35} color="#FF385C" fill={fill?'#FF385C':'#fff'} />
          </TouchableOpacity>
        </View>
        <Text style={styles.price}>${product.price}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {product.description}
        </Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  heart:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 10,
    
  },
  card: {
    width: CARD_WIDTH,
    backgroundColor: 'white',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    position: 'absolute',
  },
  image: {
    width: '100%',
    height: 300,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  content: {
    padding: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 8,
    textAlign:'left'
  },
  price: {
    fontSize: 20,
    color: '#FF4785',
    fontWeight: '600',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#666666',
    lineHeight: 24,
  },
});