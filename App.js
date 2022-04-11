import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LandingScreen from './screens/LandingScreen';
import RegistrationScreen from './screens/RegistrationScreen';
import LoginScreen from './screens/LoginScreen';
import ExercisesScreen from './screens/ExercisesScreen';
import HomeScreen from './screens/HomeScreen';
import ExerciseDetailScreen from './screens/ExerciseDetailScreen';

// globals
global.API_URL = 'https://fiit-mtaa-app4.azurewebsites.net/'
global.user_id = 2 // debugging only - vymazat neskor

const Stack = createNativeStackNavigator();

export default function App(){
    return(
        <NavigationContainer>
        <Stack.Navigator
         screenOptions = {{
                headerShown: false
            }} 
            initialRouteName={"Home"}
        >
          
          <Stack.Screen name="Landing" component={LandingScreen}/>
          <Stack.Screen name="Login" component={LoginScreen}/>
          <Stack.Screen name="Registration" component={RegistrationScreen}/>
          <Stack.Screen name="Exercises" component={ExercisesScreen}/>
          <Stack.Screen name="Home" component={HomeScreen}/>
          <Stack.Screen name="ExerciseDetail" component={ExerciseDetailScreen}/>
        
        </Stack.Navigator>
      </NavigationContainer>
    );
};