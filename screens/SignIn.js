import { View, Button, Text } from 'react-native';

export default function SignIn({navigation}) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Sign in screen</Text><Button title="Sign in" onPress={() => alert("todo!")} />
        <Button title="Register" onPress={() => navigation.push("Registration")} />
      </View>
    );
  }