import { View, Button, Text } from 'react-native';

export default function HomeScreen({navigation}) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>HOME SCREEN</Text>
        <Button title="Login" onPress={() => navigation.push("Login")} />
        <Button title="Register" onPress={() => navigation.push("Registration")} />
      </View>
    );
  }