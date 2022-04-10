import { View, Button, Text } from 'react-native';

export default function RegistrationScreen({navigation}) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

    <Text>Rgistration screen</Text>
    <Button title="Sign up" onPress={() => alert("todo!")} />
    </View>
  );
}