import * as React from 'react';
import { View, StyleSheet, Button, TextInput } from 'react-native';

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
      navigation.navigate('Home', {access_token: json['access_token']})
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
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
  });  

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

      <TextInput
        style={styles.input}
        onChangeText={onChangeName}
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangePassword}
      />

    <Button title="Sign up" onPress={() => loginApi({navigation}, user_name, user_password)} />
    </View>
  );
}