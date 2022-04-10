import { View, Button, Text } from 'react-native';
import globals from '../globals'

const loginApi = ({navigation}) => {
  return fetch(globals.API_URL + 'login/', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: "email",
      password: "password"
    })
  })
  .then((response) => response.json())
  .then((json) => {
    console.log(json);

    if(json['access_token'] !== undefined){
      navigation.navigate('Home', {access_token: json['access_token']})
    }
    else{
      alert("nespravne udaje")
    }
  })
  .catch((error) => {
    console.log(error);
  })
};

export default function LoginScreen({navigation}) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

    <Text>Login screen</Text>
    <Button title="Sign up" onPress={() => loginApi({navigation})} />
    </View>
  );
}