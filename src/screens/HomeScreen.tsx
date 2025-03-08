import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Carousel from '../components/Carousel';


const HomeScreen: React.FC = () => {
  return (
    // Mian Home Screen
    <View>
      <View style={styles.container}>

        <View >
          <Image source={require('../../assets/a1.jpeg')} style={styles.image} />
        </View>
        <View style={{ justifyContent: 'center', alignContent: 'center', }}>
          <Text style={styles.text}>S2AT</Text>
        </View>
        <View style={{ justifyContent: 'center', alignContent: 'center', }}>
          <Text style={styles.text}>
            sochta hun?
          </Text>
        </View>

      </View>

      {/* Main container of All Child Container */}
      <View>
        {/* Container of Weekly Event */}
        <View  style={styles.baseContainer}>
          <Text>
            This Container Hold the Data of Weekly Event
          </Text>
          <Carousel />
        </View>
        {/* Container of Best Performance Team/Individual Crousal */}
        <View  style={styles.baseContainer}>
          <Text>
            This Container Hold the Data of Best Performance Team/Individual Crousal
          </Text>
        </View>
        {/* Container of Map Rotaion */}
        <View  style={styles.baseContainer}>
          <Text>
            This Container Hold the Data of Map Rotaion
          </Text>
        </View>
        {/* Container of Fast Booking Slot */}
        <View  style={styles.baseContainer}>
          <Text>
            This Container Hold the Data of Fast Booking Slot
          </Text>
        </View>

      </View>

    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#fe680780',
  },
  text: {
    fontSize: 26,
    color: 'black',
    fontFamily: 'poppins',
    fontWeight: 'bold',
  },
  image: {
    resizeMode: 'contain',
    width: 100,
    height: 100,
  },
  baseContainer: {
    width: "95%",
    alignSelf: 'center',
    marginTop: 10,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    padding: 10,
    backgroundColor: '#fe680780',
    borderRadius: 6,
    borderWidth: 1,
  },
});
export default HomeScreen;