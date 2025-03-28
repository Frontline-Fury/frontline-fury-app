import React, { useEffect, useRef, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  FlatListProps,
} from "react-native";
import { LinearGradient } from 'expo-linear-gradient'; // Requires expo-linear-gradient

// Define Type for Carousel Items with Map Details
interface CarouselItem {
  id: string;
  image: any;
  name: string;
  description: string;
}

const CarouselMap: React.FC = () => {
  // Get Dimensions
  const screenWidth = Dimensions.get("window").width;

  // UseRef with FlatList
  const flatlistRef = useRef<FlatList<CarouselItem>>(null);

  // State with Explicit Type
  const [activeIndex, setActiveIndex] = useState<number>(0);

  // Define Data with Types and Map Details
  const carouselData: CarouselItem[] = [
    { 
      id: "01", 
      image: require("../../assets/split.jpg"),
      name: "Split",
      description: "A two-site map with unique vertical gameplay and tight corridors. Perfect for strategic team play and precise gunfights."
    },
    { 
      id: "02", 
      image: require("../../assets/bind.jpg"),
      name: "Bind",
      description: "A compact map with two sites and teleporters. Offers quick rotations and intense close-quarter combat scenarios."
    },
    { 
      id: "03", 
      image: require("../../assets/haven.jpg"),
      name: "Haven",
      description: "A traditional three-site map with complex layout and multiple entry points. Requires careful coordination and map control."
    }
  ];

  // Auto Scroll Logic
  useEffect(() => {
    const interval = setInterval(() => {
      if (flatlistRef.current) {
        if (activeIndex === carouselData.length - 1) {
          flatlistRef.current.scrollToIndex({ index: 0, animated: true });
        } else {
          flatlistRef.current.scrollToIndex({ index: activeIndex + 1, animated: true });
        }
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [activeIndex]);

  // Get Item Layout with Type Safety
  const getItemLayout: FlatListProps<CarouselItem>["getItemLayout"] = (_, index) => ({
    length: screenWidth,
    offset: screenWidth * index,
    index,
  });

  // Render Item with Type Safety and New Layout
  const renderItem = ({ item }: { item: CarouselItem }) => (
    <View style={styles.carouselItemContainer}>
      <LinearGradient
        colors={['#85d5c8', '#03ced5']}
        style={styles.mapItemGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.mapImageContainer}>
          <Image 
            source={item.image} 
            style={styles.mapImage} 
          />
        </View>
        <View style={styles.mapDetailsContainer}>
          <Text style={styles.mapName}>{item.name}</Text>
          <Text style={styles.mapDescription}>{item.description}</Text>
        </View>
      </LinearGradient>
    </View>
  );

  // Handle Scroll and Update Active Index
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / screenWidth);
    setActiveIndex(index);
  };

  // Render Dot Indicators
  const renderDotIndicators = () => {
    return carouselData.map((_, index) => (
      <View
        key={index}
        style={[
          styles.dot,
          { 
            backgroundColor: activeIndex === index ? '#03ced5' : '#85d5c8',
            width: activeIndex === index ? 20 : 10
          },
        ]}
      />
    ));
  };

  return (
    <View style={styles.container}>
      {/* Carousel FlatList */}
      <FlatList
        data={carouselData}
        ref={flatlistRef}
        getItemLayout={getItemLayout}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        onScroll={handleScroll}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
      />

      {/* Pagination Dots */}
      <View style={styles.pagination}>{renderDotIndicators()}</View>
    </View>
  );
};

export default CarouselMap;

// Styles
const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: 'transparent',
  },
  carouselItemContainer: {
    width: Dimensions.get("window").width,
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
  mapItemGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 15,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  mapImageContainer: {
    width: '40%',
    marginRight: 15,
  },
  mapImage: {
    height: 200,
    width: '100%',
    resizeMode: 'cover',
    borderRadius: 10,
    borderWidth: 3,
    borderColor: 'white',
  },
  mapDetailsContainer: {
    width: '55%',
    justifyContent: 'center',
  },
  mapName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
  },
  mapDescription: {
    fontSize: 16,
    color: '#000',
    lineHeight: 24,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 15,
    marginBottom: 10,
  },
  dot: {
    height: 10,
    borderRadius: 5,
    marginHorizontal: 3,
    backgroundColor: '#85d5c8',
  },
});