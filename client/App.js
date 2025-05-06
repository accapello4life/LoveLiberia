import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthScreen from './screens/AuthScreen';
import SignUpScreen from './screens/SignUpScreen';
import ProfileScreen from './screens/ProfileScreen';
import MatchingScreen from './screens/MatchingScreen';
import { liberianTheme } from './theme';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer theme={{
      colors: {
        primary: liberianTheme.colors.primary,
        background: liberianTheme.colors.background,
        card: liberianTheme.colors.accent,
        text: liberianTheme.colors.text,
        border: liberianTheme.colors.secondary,
      },
    }}>
      <Stack.Navigator initialRouteName="Auth">
        <Stack.Screen
          name="Auth"
          component={AuthScreen}
          options={{ title: 'Welcome to LoveLiberia' }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{ title: 'Create Account' }}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ title: 'Your Profile' }}
        />
        <Stack.Screen
          name="Matching"
          component={MatchingScreen}
          options={{ title: 'Find Your Match' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
