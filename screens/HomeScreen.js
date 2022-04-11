import * as React from 'react';
import { View, Text, StyleSheet, Pressable , TextInput, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

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
        onPress={() => navigation.push("Landing")}
        >
        <Text style={styles.text}>Moje cvičenia</Text>
        </Pressable>
        </View>

        <View>
        <Pressable
        style={styles.button}
        onPress={() => navigation.push("Landing")}
        >
        <Text style={styles.text}>Cvičenia iných používateľov</Text>
        </Pressable>
        </View>

        </View>

      );
}