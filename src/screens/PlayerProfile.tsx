import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Animated, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../main/types';
import PlayerStats from "../components/Player_Stats";


type PlayerProfileScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'PlayerProfile'>;
};


  const PlayerProfileScreen: React.FC<PlayerProfileScreenProps> = ({ navigation }) => {
    const [xp, setXp] = useState(80);
  const [maxXp, setMaxXp] = useState(100);

  const progress = new Animated.Value((xp / maxXp) * 100);

  useEffect(() => {
    Animated.timing(progress, {
      toValue: (xp / maxXp) * 100,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [xp]);

    return (
      <View style={styles.container}>
        {/* Custom Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backText}>← Player Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Screen Content */}
        <View style={styles.content}>
          <View style={{ flex: 1, alignItems: "center", backgroundColor: "#fff" }}>
            <View
              style={{
                width: "95%",
                height: 140,
                backgroundColor: "#FF900036",
                borderRadius: 12,
                padding: 10,
                alignItems: "center",
                marginTop: 20,
                borderColor: '#000',
                borderWidth: 1
              }}
            >
              <Image
                source={require("../../assets/Ruby_converted-removebg-preview.png")}
                style={{ width: 80, height: 80, resizeMode: "contain", position: "relative", bottom: 0, left: 120 }}
              />
              <Text
                style={{
                  fontFamily: 'poppins',
                  fontSize: 36,
                  fontWeight: "bold",
                  marginTop: 5,
                  position: "relative",
                  bottom: 60,
                  right: 100
                }}>
                S2AT
              </Text>
              <Text style={{ fontSize: 16, color: "#555", position: "relative", bottom: 40, left: 123 }}>Ruby I</Text>
              <View
                style={{
                  position: "absolute",
                  bottom: 55,
                  left: 6,
                  width: "40%",
                  height: 10,
                  backgroundColor: "#ccc",
                  borderRadius: 5,
                  overflow: "hidden",
                  borderColor: '#000',
                  borderWidth: 1
                }}
              >
                <Animated.View
                  style={{
                    width: progress.interpolate({
                      inputRange: [0, 100],
                      outputRange: ["0%", "100%"],
                    }),
                    height: "100%",
                    backgroundColor: "#fe6807",
                  }}
                />
              </View>

              <Text
                style={{
                  position: "absolute",
                  bottom: 40,
                  left: 30,
                  fontSize: 14,
                  color: "#333",
                  marginTop: 3
                }}>
                XP: {xp} / {maxXp}
              </Text>
            </View>
            <View>
              <PlayerStats />
            </View>
          </View>
        </View>
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f5f5f5',
    },
    header: {
      marginTop: 40,
      height: 60,
      backgroundColor: '#FF6600',
      justifyContent: 'center',
      paddingHorizontal: 16,
      paddingTop: 10,
    },
    backText: {
      height: 40,
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
    },
    content: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      fontSize: 20,
    },
  });

export default PlayerProfileScreen;
