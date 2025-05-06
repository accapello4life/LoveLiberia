// Liberian cultural theme colors and styles
export const liberianTheme = {
  colors: {
    primary: '#002366', // Liberian flag blue
    secondary: '#BF0A30', // Liberian flag red
    accent: '#FFFFFF', // Liberian flag white
    background: '#F5F5F5',
    text: '#333333',
    success: '#2ECC71',
    warning: '#F39C12',
    danger: '#E74C3C',
  },
  typography: {
    heading1: {
      fontSize: 28,
      fontWeight: 'bold',
      color: '#002366',
    },
    heading2: {
      fontSize: 22,
      fontWeight: 'bold',
      color: '#002366',
    },
    body: {
      fontSize: 16,
      color: '#333333',
    },
  },
  spacing: {
    small: 8,
    medium: 16,
    large: 24,
    xlarge: 32,
  },
  borderRadius: {
    small: 4,
    medium: 8,
    large: 12,
  },
  shadows: {
    small: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
    medium: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 4,
    },
  },
};

export const liberianPatterns = {
  backgroundPatterns: {
    // kente: require('../assets/patterns/kente.png'),
    // adinkra: require('../assets/patterns/adinkra.png'),
  },
  icons: {
    liberiaFlag: require('../assets/icons/liberia-flag.png'),
    mapLiberia: require('../assets/icons/map-liberia.png'),
  },
};
