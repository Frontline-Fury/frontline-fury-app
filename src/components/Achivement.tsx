import React from 'react';
import { View, Text, StyleSheet, Image, ImageSourcePropType } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Assuming you're using Expo

// Define props interface with TypeScript
interface AchievementProps {
  name: string;
  description?: string;
  iconName?: string; // Ionicons name
  customIcon?: ImageSourcePropType; // For custom images
  progress: number; // 0-100
  total: number;
  current: number;
  isCompleted?: boolean;
}

const Achievement: React.FC<AchievementProps> = ({
  name,
  description,
  iconName = "trophy",
  customIcon,
  progress,
  total,
  current,
  isCompleted = false,
}) => {
  // Ensure progress is between 0-100
  const normalizedProgress = Math.min(100, Math.max(0, progress));
  
  // Visual properties based on completion status
  const getProgressColor = () => {
    if (isCompleted) return "#22c55e"; // green for completed
    if (normalizedProgress >= 70) return "#22c55e"; // green-500
    if (normalizedProgress >= 30) return "#eab308"; // yellow-500
    return "#f59e0b"; // amber-500
  };
  
  // Badge/border color
  const getBadgeColor = () => {
    if (isCompleted) return "#22c55e"; // green for completed
    return "#6b7280"; // gray-500 for in progress
  };
  
  return (
    <View style={styles.container}>
      {/* Icon/Badge Section */}
      <View 
        style={[
          styles.iconContainer, 
          { borderColor: getBadgeColor() }
        ]}
      >
        {customIcon ? (
          <Image source={customIcon} style={styles.customIcon} />
        ) : (
          <Ionicons 
            name={iconName as any} 
            size={28} 
            color={getBadgeColor()} 
          />
        )}
        {isCompleted && (
          <View style={styles.completedBadge}>
            <Ionicons name="checkmark-circle" size={16} color="#22c55e" />
          </View>
        )}
      </View>
      
      {/* Content Section */}
      <View style={styles.contentContainer}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>{name}</Text>
          <Text style={[
            styles.progressText, 
            isCompleted ? styles.completed : null
          ]}>
            {isCompleted ? 'Completed' : `${current}/${total}`}
          </Text>
        </View>
        
        {description && (
          <Text style={styles.description}>{description}</Text>
        )}
        
        {/* Progress Bar */}
        <View style={styles.progressBarBackground}>
          <View 
            style={[
              styles.progressBar, 
              { 
                backgroundColor: getProgressColor(),
                width: `${normalizedProgress}%` 
              }
            ]} 
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    marginBottom: 10,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    marginRight: 12,
  },
  customIcon: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
  },
  completedBadge: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 2,

  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  progressText: {
    fontSize: 14,
    color: '#6b7280',
  },
  completed: {
    color: '#22c55e',
    fontWeight: '500',
  },
  description: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 8,
  },
  progressBarBackground: {
    height: 6,
    width: '100%',
    backgroundColor: '#e5e7eb',
    borderRadius: 9999,
    marginTop: 4,
  },
  progressBar: {
    height: '100%',
    borderRadius: 9999,
  },
});

export default Achievement;