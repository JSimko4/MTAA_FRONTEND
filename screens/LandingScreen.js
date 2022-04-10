import React, { Component } from "react";
import { StyleSheet, View, Image } from "react-native";
import RegistrationButtonOnLandingScreen from "../components/RegistrationButtonLandingScreen";

export default function LandingScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/Logo.png")}
        resizeMode="contain"
        style={styles.image1}
      ></Image>
      <View style={styles.image1Filler}></View>
      
      <View style={styles.LoginRegisterColumn}>

        <RegistrationButtonOnLandingScreen
          style={styles.RegistrationButtonStyle}
          name="Registracia"
          link="Registration"
        ></RegistrationButtonOnLandingScreen>

        <RegistrationButtonOnLandingScreen
          style={styles.LoginButtonStyle}
          name="Prihlasenie"
          link="Login"
        ></RegistrationButtonOnLandingScreen>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  image1: {
    width: 285,
    height: 269,
    marginTop: 48,
    marginLeft: 50
  },
  image1Filler: {
    flex: 1
  },
  RegistrationButtonStyle: {
    width: 218,
    height: 47,
    borderRadius: 100,
    backgroundColor: "rgba(21,9,65,1)",
    marginBottom: -146
  },
  LoginButtonStyle: {
    width: 218,
    height: 47,
    borderRadius: 100,
    backgroundColor: "rgba(21,9,65,1)",
    marginBottom: -146
  },
  LoginRegisterColumn: {
    width: 218,
    marginBottom: 150,
    marginLeft: 85
  }
});

/*export default function HomeScreen({navigation}) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>HOME SCREEN</Text>
        <Button title="Login" onPress={() => navigation.push("Login")} />
        <Button title="Register" onPress={() => navigation.push("Registration")} />
      </View>
    );
  }*/

