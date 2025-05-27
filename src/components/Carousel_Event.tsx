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

// ✅ Define Type for Carousel Items
interface CarouselItem {
  id: string;
  image: any; // Can be `ImageSourcePropType` for better accuracy
}

const Carousel: React.FC = () => {
  // Get Dimensions
  const screenWidth = Dimensions.get("window").width;

  // ✅ UseRef with FlatList
  const flatlistRef = useRef<FlatList<CarouselItem>>(null);

  // ✅ State with Explicit Type
  const [activeIndex, setActiveIndex] = useState<number>(0);

  // ✅ Define Data with Types
  const carouselData: CarouselItem[] = [
    { id: "01", image: require("../../assets/spike.jpg") },
    { id: "02", image: require("../../assets/ctf.jpg") },
    { id: "03", image: require("../../assets/tdm.jpg") },
  ];

  // ✅ Auto Scroll Logic
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

  // ✅ Get Item Layout with Type Safety
  const getItemLayout: FlatListProps<CarouselItem>["getItemLayout"] = (_, index) => ({
    length: screenWidth,
    offset: screenWidth * index,
    index,
  });

  // ✅ Render Item with Type Safety
  const renderItem = ({ item }: { item: CarouselItem }) => (
    <View style={{ borderColor: "black", borderWidth: 1 }}>
      <Image source={item.image} style={{ height: 200, width: screenWidth, resizeMode: 'stretch' }} />
    </View>
  );

  // ✅ Handle Scroll and Update Active Index
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / screenWidth);
    setActiveIndex(index);
  };

  // ✅ Render Dot Indicators
  const renderDotIndicators = () => {
    return carouselData.map((_, index) => (
      <View
        key={index}
        style={[
          styles.dot,
          { backgroundColor: activeIndex === index ? "white" : "black" },
        ]}
      />
    ));
  };

  return (
    <View>
      {/* ✅ Carousel FlatList */}
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

      {/* ✅ Pagination Dots */}
      <View style={styles.pagination}>{renderDotIndicators()}</View>
    </View>
  );
};

export default Carousel;

// ✅ Styles
const styles = StyleSheet.create({
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 30,
  },
  dot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    marginHorizontal: 3,
  },
});
