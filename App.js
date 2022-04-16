import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LandingScreen from './screens/LandingScreen';
import RegistrationScreen from './screens/RegistrationScreen';
import LoginScreen from './screens/LoginScreen';
import ExercisesScreen from './screens/ExercisesScreen';
import HomeScreen from './screens/HomeScreen';
import ExerciseDetailScreen from './screens/ExerciseDetailScreen';
import FilterScreen from './screens/FilterScreen';
import UsersScreen from './screens/UsersScreen';
import AddExerciseScreen from './screens/AddExerciseScreen';
import CallScreen from './WebRtc';
import PickBodyPartsScreen from './screens/PickBodyPartsScreen'
import EditExerciseScreen from './screens/EditExerciseScreen'

// globals
global.API_URL = 'https://fiit-mtaa-app4.azurewebsites.net/'
global.logged_user_id = 2 // debugging only - vymazat neskor
global.access_token = 'n4T1ZQphANT5DimV5TSivKBxgeRFoCinILyFdA9nGXNGgvD0jiESNHGEQTCbz8Mq' // debugging only - vymazat neskor


const Stack = createNativeStackNavigator();

const MyTheme = {
  colors: {
    primary: 'white',
  },
};

export default function App(){
    return(
        <NavigationContainer theme={MyTheme}>
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
          <Stack.Screen name="Filter" component={FilterScreen}/>
          <Stack.Screen name="Users" component={UsersScreen}/>
          <Stack.Screen name="AddExercise" component={AddExerciseScreen}/>
          <Stack.Screen name="PickBodyParts" component={PickBodyPartsScreen}/>
          <Stack.Screen name="EditExercise" component={EditExerciseScreen}/>

          <Stack.Screen name="Call" component={CallScreen}/>

        </Stack.Navigator>
      </NavigationContainer>
    );
};