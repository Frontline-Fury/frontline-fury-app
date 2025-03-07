import React, { useRef, useState } from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';

const { width } = Dimensions.get('window');

interface EventItem {
  id: string;
  uri: string;
}

const weeklyEvents: EventItem[] = [
  { id: '1', uri: 'https://source.unsplash.com/400x300/?event' },
  { id: '2', uri: 'https://source.unsplash.com/400x300/?sports' },
  { id: '3', uri: 'https://source.unsplash.com/400x300/?gaming' },
];

const HomeScreen: React.FC = () => {
  const carouselRef = useRef<Carousel<EventItem>>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const renderItem = ({ item }: { item: EventItem }) => (
    <Image source={{ uri: item.uri }} style={styles.carouselImage} />
  );

  return (
    <View>
      {/* Weekly Event Container */}
      <View style={styles.baseContainer}>
        <Text style={styles.headerText}>Weekly Event</Text>
        <Carousel
          ref={carouselRef}
          data={weeklyEvents}
          renderItem={renderItem}
          sliderWidth={width * 0.95}
          itemWidth={width * 0.8}
          autoplay={true}
          autoplayInterval={3000}
          loop={true}
          onSnapToItem={(index) => setActiveIndex(index)}
        />

        {/* Custom Pagination Dots */}
        <View style={styles.paginationContainer}>
          {weeklyEvents.map((_, index) => (
            <View
              key={index}
              style={[
                styles.paginationDot,
                { backgroundColor: activeIndex === index ? 'black' : 'gray' },
              ]}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  baseContainer: {
    width: '95%',
    alignSelf: 'center',
    marginTop: 10,
    padding: 10,
    backgroundColor: '#fe680780',
    borderRadius: 6,
    borderWidth: 1,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  carouselImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
});

export default HomeScreen;
