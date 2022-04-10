import { View, Button, Text } from 'react-native';

export default function HomeScreen({navigation}) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>HOME SCREEN</Text><Button title="Sign in" onPress={() => alert("todo!")} />
        <Button title="Register" onPress={() => navigation.push("Registration")} />
      </View>
    );
  }