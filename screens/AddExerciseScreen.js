import * as React from 'react';
import { View, StyleSheet, TextInput, Text, TouchableOpacity} from 'react-native';
import {IconButton} from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';

const addExerciseApi = ({navigation}, name, body_parts, image, description) => {
  console.log({name, body_parts, image, description})
  return fetch(global.API_URL + 'users/login/', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      body_parts: body_parts,
      image: image,
      description: description
    })
  })
  .then((response) => response.json())
  .then((json) => {
    console.log(json);

    if (json['status'] === 'success'){
      navigation.navigate('Home')
    }
    else{
      alert("Nespravne udaje")
    }
  })
  .catch((error) => {
    console.log(error);
  })
};

export default function AddExerciseScreen({navigation}) {
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const [name, onChangeName] = React.useState();
  const [description, onChangeDescription] = React.useState();

    const styles = StyleSheet.create({
        input: {
          paddingVertical: 12,
          paddingHorizontal: 15,
          borderRadius: 15,
          fontSize: 19,
          width: 250,
          borderWidth: 1.5,
          marginBottom: 0,
          backgroundColor: "transparent"
        },
        button1: {
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: 15,
          paddingHorizontal: 15,
          width: 250,
          borderRadius: 4,
          elevation: 3,
          backgroundColor: "rgb(21, 9, 65)",
          borderRadius: 20,
          marginBottom: 0,
          marginTop: 20 
        },
        button2: {
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 15,
            paddingHorizontal: 15,
            width: 200,
            borderRadius: 4,
            elevation: 3,
            backgroundColor: "rgb(21, 9, 65)",
            borderRadius: 20,
            marginBottom: 0,
            marginTop: 20 
          },
        text: {
          fontSize: 18,
          lineHeight: 21,
          fontWeight: 'bold',
          letterSpacing: 0.25,
          color: 'white',
        },
        textNazov: {
            marginBottom: 6, 
            marginLeft: -130,
            fontSize: 16,
            lineHeight: 21, 
            fontWeight: 'bold',
        },
        textBodyparts: {
            borderWidth: 2,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            paddingVertical: 5,
            paddingHorizontal: 25,
            marginLeft: 5,
            fontSize: 17,
          },
          textMidNazov: {
            fontSize: 24,
            fontWeight: 'bold',
            letterSpacing: 0.25,
            marginLeft: 40,
          },
          textScroll: {
            fontSize: 20,
            marginHorizontal: 40,
            marginVertical: 5,
          },
      });
    

    return(
    <View style={{flex: 1}}>

            <View style ={{flex: 0.250, flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                <IconButton icon='arrow-left-circle' size={45} 
                    onPress={() => navigation.goBack()}
                />
            </View>

        <View style={{flex: 0.9, flexDirection:'column',alignItems:'center'}}>
        <Text style={styles.textNazov}>Názov cvičenia</Text>
        <TextInput 
          style={styles.input}
          onChangeText={onChangeName}
          />
 
        <TouchableOpacity 
          style={styles.button1}
          onPress={pickImage}
        >
          <Text style={styles.text}>Nahrať obrázok...</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button2}>
          <Text style={styles.text}>Nastaviť časti tela</Text>
        </TouchableOpacity>
        </View>

        <View style={{flex: 0.85, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
              <Text style={styles.textBodyparts}>Hrudník</Text>
              <Text style={styles.textBodyparts}>Biceps</Text>
              <Text style={styles.textBodyparts}>Triceps</Text>
        </View>

        <View style={{flex: 0.65 , flexDirection: 'column', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'flex-start'}}>
              <Text style={styles.textMidNazov}>Popis cvičenia: </Text>
              <TextInput 
          style={styles.input}
          onChangeText={onChangeDescription}
          />
        </View>

        <View style ={{flex: 0.65, flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
            <TouchableOpacity 
              style={styles.button2}
              onPress={() => addExerciseApi({navigation}, "name", "1,2", "test", "test")}
            >
            <Text style={styles.text}>Pridať</Text>
            </TouchableOpacity>
        </View>
    </View>
      );
}