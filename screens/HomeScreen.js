import * as React from 'react';
import { View, Text, StyleSheet, Pressable , TextInput } from 'react-native';

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
          marginBottom: 40
        },
        image: {
          fontSize: 18,
          lineHeight: 21,
          fontWeight: 'bold',
          letterSpacing: 0.25,
          color: 'white',
        },
      });
      return (
        <View>
            <Image>source={require("../assets/images/Logo.png")}
        resizeMode="contain"
        style={styles.image1}
        </Image>
        </View>

      );
}