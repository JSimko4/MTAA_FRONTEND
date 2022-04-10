import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignIn from './screens/SignIn';
import Registration from './screens/Registration';
import { View, Text } from 'react-native';

function HomeScreen() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
      </View>
    );
  }

const Stack = createNativeStackNavigator();

export default function App(){
    return(
        <NavigationContainer>
        <Stack.Navigator
        /* screenOptions = {{
                headerShown: false
            }}
            */
            initialRouteName={"SignIn"}
        >
          <Stack.Screen name="SignIn" component={SignIn}/>
          <Stack.Screen name="Registration" component={Registration}/>
        
        </Stack.Navigator>
      </NavigationContainer>
    );
};