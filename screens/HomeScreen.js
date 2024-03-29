import * as React from 'react';
import { View, Text, StyleSheet, Pressable , Image } from 'react-native';

const exercisesApi = ({navigation}) => {
  return fetch(global.API_URL + 'exercises/' + global.logged_user_id + '/all')
  .then((response) => response.json())
  .then((json) => {
    if (json['status'] === 'success'){      
      navigation.navigate('Exercises', {exercises: json['data'], user_id: global.logged_user_id})
    }
    else{
      alert("Nespravne udaje")
    }
  })
  .catch((error) => {
    console.log(error);
  })
};

const usersApi = ({navigation}) => {
  return fetch(global.API_URL + 'users/all')
  .then((response) => response.json())
  .then((json) => {
    if (json['status'] === 'success'){      
      navigation.navigate('Users', {users: json['data']})
    }
    else{
      alert("Nespravne udaje")
    }
  })
  .catch((error) => {
    console.log(error);
  })
};

export default function HomeScreen({navigation}) {
    const styles = StyleSheet.create({
        button: {
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: 15,
          paddingHorizontal: 15,
          width: 250,
          borderRadius: 4,
          elevation: 3,
          backgroundColor: "rgb(21, 9, 65)",
          borderRadius: 20,
          marginTop: 50,
          marginBottom: 10,
          marginLeft: 70,
        },
        image: {
          width: 285,
          height: 269,
          marginTop: 48,
          marginLeft: 50
        },
        text: {
          fontSize: 18,
          lineHeight: 21,
          fontWeight: 'bold',
          letterSpacing: 0.25,
          color: 'white',
        },
      });
      return (

        <View>
          <Image source={require("../assets/images/Logo.png")}
        resizeMode="contain"
        style={styles.image}
        ></Image>
        
        <View>
        <Pressable
        style={styles.button}
         onPress={() => exercisesApi({navigation})}
         >
        <Text style={styles.text}>Moje cvičenia</Text>
        </Pressable>
        </View>

        <View>
        <Pressable
        style={styles.button}
        onPress={() => usersApi({navigation})}
        >
        <Text style={styles.text}>Cvičenia iných používateľov</Text>
        </Pressable>
        </View>

        </View>

      );
}