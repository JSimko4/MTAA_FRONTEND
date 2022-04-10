import { View, Button, Text } from 'react-native';

export default function LoginScreen({navigation}) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

    <Text>Login screen</Text>
    <Button title="Sign up" onPress={() => alert("todo!")} />
    </View>
  );
}