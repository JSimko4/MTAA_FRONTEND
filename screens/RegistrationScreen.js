import * as React from 'react';
import { View, StyleSheet, Pressable, Text, TextInput } from 'react-native';

const RegisterApi = ({navigation}, user_name, user_password, user_confirm_password) => {
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
        global.user_id = json['id'];
        navigation.navigate('Home', {access_token: json['access_token'], user_id: json['id']})
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
      marginBottom: 40,
      marginTop: 20 
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
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{fontSize: 40, fontWeight: 'bold', letterSpacing: 0.25, marginBottom: 20, marginTop: 25}}>Registrácia</Text>

      <View>
        <Text style={{marginBottom: 6, marginLeft: 15, fontSize: 16, lineHeight: 21}}>Meno</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeName}
        />
      </View>
      <View>
        <Text style={{marginBottom: 6, marginLeft: 15, fontSize: 16, lineHeight: 21}}>Heslo</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangePassword}
        />
      </View>

      <View>
        <Text style={{marginBottom: 6, marginLeft: 15, fontSize: 16, lineHeight: 21}}>Potvrdenie hesla</Text>
        <TextInput
        style={styles.input}
        onChangeText={onChangeConfirmPassword}/>
      </View>

      <Pressable
          style={styles.button}
          onPress={() => RegisterApi({navigation}, user_name, user_password, user_confirm_password)}
        >
          <Text style={styles.text}>Registrovať sa</Text>
        </Pressable>

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