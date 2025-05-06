import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const MatchingScreen = () => {
  const calculateCulturalMatchScore = (match) => {
    // Calculate compatibility based on cultural attributes
    let score = 0;

    // Add scoring logic for cultural attributes
    if (match.clothing && clothing) score += 10;
    if (match.religion && religion) score += 15;
    if (match.tribe && tribe) score += 20;
    if (match.language && language) score += 5;

    return score;
  };

  const [matches, setMatches] = useState([
    {
      id: 1,
      name: 'Sarah',
      age: 28,
      location: 'Monrovia',
      image: require('../assets/profile-placeholder.png'),
      interests: ['Music', 'Dancing', 'Liberian cuisine']
    },
    {
      id: 2,
      name: 'James',
      age: 32,
      location: 'Maryland, USA',
      image: require('../assets/profile-placeholder.png'),
      interests: ['Sports', 'Travel', 'Liberian history']
    },
    {
      id: 3,
      name: 'Patience',
      age: 25,
      location: 'Gbarnga',
      image: require('../assets/profile-placeholder.png'),
      interests: ['Reading', 'Cooking', 'Community work']
    }
  ]);

  const handleLike = async (id) => {
    try {
      const match = matches.find(m => m.id === id);
      const response = await fetch('http://localhost:3000/api/matches/like', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          matchId: id,
          culturalMatchScore: calculateCulturalMatchScore(match)
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Match liked successfully:', data);
        // TODO: Update UI to reflect successful like
      } else {
        console.error('Like failed:', data.message);
        // TODO: Show error to user
      }
    } catch (error) {
      console.error('Like error:', error);
      // TODO: Show error to user
    }
  };

  const handlePass = (id) => {
    console.log('Passed on profile:', id);
    // TODO: Implement pass logic
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Potential Matches</Text>

      {matches.map((match) => (
        <View key={match.id} style={styles.card}>
          <Image source={match.image} style={styles.profileImage} />
          <View style={styles.infoContainer}>
            <Text style={styles.name}>{match.name}, {match.age}</Text>
            <Text style={styles.location}>{match.location}</Text>
            <View style={styles.interestsContainer}>
              {match.interests.map((interest, index) => (
                <Text key={index} style={styles.interestTag}>{interest}</Text>
              ))}
            </View>
          </View>

          <View style={styles.actionsContainer}>
            <TouchableOpacity
              style={styles.passButton}
              onPress={() => handlePass(match.id)}
            >
              <Text style={styles.buttonText}>Pass</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.likeButton}
              onPress={() => handleLike(match.id)}
            >
              <Text style={styles.buttonText}>Like</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: liberianTheme.colors.background,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: liberianTheme.colors.primary,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profileImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
  },
  infoContainer: {
    marginBottom: 15,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#2c3e50',
  },
  location: {
    fontSize: 16,
    color: '#7f8c8d',
    marginBottom: 10,
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  interestTag: {
    backgroundColor: '#e0f7fa',
    color: '#00838f',
    padding: 5,
    borderRadius: 15,
    marginRight: 5,
    marginBottom: 5,
    fontSize: 12,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  passButton: {
    backgroundColor: liberianTheme.colors.danger,
    padding: 10,
    borderRadius: liberianTheme.borderRadius.medium,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  likeButton: {
    backgroundColor: liberianTheme.colors.success,
    padding: 10,
    borderRadius: liberianTheme.borderRadius.medium,
    flex: 1,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default MatchingScreen;
