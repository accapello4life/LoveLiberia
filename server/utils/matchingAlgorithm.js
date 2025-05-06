const calculateCulturalCompatibility = (user1, user2) => {
  let score = 0;

  // Ethnicity match (30% weight)
  if (user1.ethnicity === user2.ethnicity) {
    score += 30;
  }

  // Religion match (20% weight)
  if (user1.religion === user2.religion) {
    score += 20;
  }

  // Language match (25% weight)
  const commonLanguages = user1.languages.filter(lang =>
    user2.languages.includes(lang)
  );
  if (commonLanguages.length > 0) {
    score += 25;
  }

  // Location match (25% weight)
  if (user1.location === user2.location) {
    score += 25;
  }

  return {
    totalScore: score,
    culturalMatchFactors: {
      ethnicity: user1.ethnicity === user2.ethnicity ? 30 : 0,
      religion: user1.religion === user2.religion ? 20 : 0,
      languages: commonLanguages.length > 0 ? 25 : 0,
      location: user1.location === user2.location ? 25 : 0
    }
  };
};

module.exports = { calculateCulturalCompatibility };
