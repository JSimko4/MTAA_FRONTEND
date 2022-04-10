import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LandingScreen from './screens/LandingScreen';
import RegistrationScreen from './screens/RegistrationScreen';
import LoginScreen from './screens/LoginScreen';

// globals
global.API_URL = 'https://fiit-mtaa-app4.azurewebsites.net/'

const Stack = createNativeStackNavigator();
export default function App(){
    return(
        <NavigationContainer>
        <Stack.Navigator
        /* screenOptions = {{
                headerShown: false
            }}
            */
            initialRouteName={"LandingScreen"}
        >
          <Stack.Screen name="LandingScreen" component={LandingScreen}/>
          <Stack.Screen name="Login" component={LoginScreen}/>
          <Stack.Screen name="Registration" component={RegistrationScreen}/>
        
        </Stack.Navigator>
      </NavigationContainer>
    );
};