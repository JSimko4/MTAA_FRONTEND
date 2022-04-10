import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LandingScreen from './screens/LandingScreen';
import RegistrationScreen from './screens/RegistrationScreen';
import LoginScreen from './screens/LoginScreen';
import ExercisesScreen from './screens/ExercisesScreen';
import HomeScreen from './screens/HomeScreen';

const Stack = createNativeStackNavigator();

export default function App(){
    return(
        <NavigationContainer>
        <Stack.Navigator
        /* screenOptions = {{
                headerShown: false
            }}
            */
            initialRouteName={"Landing"}
        >
          <Stack.Screen name="Landing" component={LandingScreen}/>
          <Stack.Screen name="Login" component={LoginScreen}/>
          <Stack.Screen name="Registration" component={RegistrationScreen}/>
          <Stack.Screen name="Exercises" component={ExercisesScreen}/>
          <Stack.Screen name="Home" component={HomeScreen}/>
        
        </Stack.Navigator>
      </NavigationContainer>
    );
};