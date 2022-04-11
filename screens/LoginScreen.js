import * as React from 'react';
import { View, Text, StyleSheet, Pressable , TextInput } from 'react-native';

const loginApi = ({navigation}, user_name, user_password) => {
  console.log({user_name, user_password})
  return fetch(global.API_URL + 'users/login/', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: user_name,
      password: user_password
    })
  })
  .then((response) => response.json())
  .then((json) => {
    console.log(json);

    if (json['status'] === 'success'){
      global.user_id = json['id'];
      navigation.navigate('Home', {access_token: json['access_token'], user_id: json['id']})
    }
    else{
      alert("Nespravne udaje")
    }
  })
  .catch((error) => {
    console.log(error);
  })
};

export default function LoginScreen({navigation}) {
  const [user_name, onChangeName] = React.useState();
  const [user_password, onChangePassword] = React.useState();

  const styles = StyleSheet.create({
    input: {
      paddingVertical: 12,
      paddingHorizontal: 15,
      borderRadius: 15,
      fontSize: 19,
      width: 250,
      borderWidth: 1.5,
      marginBottom: 35,
      backgroundColor: "transparent"
    },
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
    text: {
      fontSize: 18,
      lineHeight: 21,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: 'white',
    },
  });

  return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'space-around' }}>
        <Text style={{fontSize: 40, fontWeight: 'bold', letterSpacing: 0.25}}>Prihlásenie</Text>

        <View>
          <Text style={{marginBottom: 6, marginLeft: 15, fontSize: 16, lineHeight: 21}}>Meno</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeName}
        />

        <Text style={{marginBottom: 6, marginLeft: 15, fontSize: 16, lineHeight: 21}}>Heslo</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangePassword}
        />
        </View>

      <Pressable
          style={styles.button}
          onPress={() => loginApi({navigation}, user_name, user_password)}
        >
          <Text style={styles.text}>Prihlásiť sa</Text>
        </Pressable>

      </View>
  );
}