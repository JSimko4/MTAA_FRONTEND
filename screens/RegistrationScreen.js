import * as React from 'react';
import { View, StyleSheet, Button, TextInput } from 'react-native';

const loginApi = ({navigation}, user_name, user_password, user_confirm_password) => {
  console.log({user_name, user_password, user_confirm_password})
  if(user_password != user_confirm_password)
  {
    alert("Passwords do not match");
  }
  else
    {
    return fetch(global.API_URL + 'users/register/', {
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
        navigation.navigate('LandingScreen', {access_token: json['access_token']})
      }
      else if(json['status'] === 'bad request')
      {
        alert("Nesprávne odoslaná/naformátovaná žiadosť")
      }
      else
      {
        alert("Zadané meno je už registrované")
      }
    })
    .catch((error) => {
      console.log(error);
    })
  }
};


export default function RegistrationScreen({navigation}) {
  const [user_name, onChangeName] = React.useState();
  const [user_password, onChangePassword] = React.useState();
  const [user_confirm_password, onChangeConfirmPassword] = React.useState()

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

      <TextInput
      style={styles.input}
      onChangeText={onChangeConfirmPassword}
      />

    <Button title="Register" onPress={() => loginApi({navigation}, user_name, user_password, user_confirm_password)} />
    </View>
  );
}





/*export default function RegistrationScreen({navigation}) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

    <Text>Rgistration screen</Text>
    <Button title="Sign up" onPress={() => alert("todo!")} />
    </View>
  );
}*/