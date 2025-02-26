import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Svg, Circle } from "react-native-svg";

const PlayerStats = () => {
  const stats = {
    kdRatio: 5.0,
    kills: 15,
    deaths: 3,
    wins: 3,
    timePlayed: "3 Hrs",
    winPercentage: 75, // Change this value dynamically
  };

  const radius = 40;
  const strokeWidth = 8;
  const circumference = 2 * Math.PI * radius;
  const progress = (stats.winPercentage / 100) * circumference;

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/freepik__an-asian-man-25-years-old-with-black-hair-wearing-__14254.jpeg")}
        style={styles.image}
        resizeMode="contain"
      />
      <View style={styles.statsContainer}>
        <Text style={styles.statTextBold}>K/D Ratio: {stats.kdRatio}</Text>
        <Text style={styles.statText}>Kills: {stats.kills}</Text>
        <Text style={styles.statText}>Deaths: {stats.deaths}</Text>
        <Text style={styles.statText}>Wins: {stats.wins}</Text>
        <Text style={styles.statText}>Time Played: {stats.timePlayed}</Text>
      </View>
      <View style={styles.progressContainer}>
        <Svg width={100} height={100} viewBox="0 0 100 100">
          <Circle
            cx={50}
            cy={50}
            r={radius}
            stroke="#000"
            strokeWidth={strokeWidth}
            fill="none"
            opacity={1}
          />
          <Circle
            cx={50}
            cy={50}
            r={radius}
            stroke="#FF6600"
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - progress}
            strokeLinecap="round"
        
          />
        </Svg>
        <Text style={styles.progressText}>Win %</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "95%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 16,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  image: {
    width: 128,
    height: 192,
  },
  statsContainer: {
    marginLeft: 0,
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: 'stretch',
  },
  statText: {
    fontSize: 10,
  },
  statTextBold: {
    fontSize: 10,
    fontWeight: "bold",
  },
  progressContainer: {
    position: "relative",
    width: 96,
    height: 96,
    alignItems: "center",
    justifyContent: "center",
  },
  progressText: {
    position: "absolute",
    top: "40%",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default PlayerStats;
