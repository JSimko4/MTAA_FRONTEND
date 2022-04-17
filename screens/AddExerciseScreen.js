import * as React from 'react';
import { View, StyleSheet, TextInput, Text, TouchableOpacity} from 'react-native';
import {IconButton} from 'react-native-paper';
import DocumentPicker from 'react-native-document-picker';

const addExerciseApi = ({navigation}, name, body_parts, image, description) => {

  const data = new FormData();
  data.append('name', name);
  data.append('body_parts', body_parts);
  data.append('description', description);

  if (image != null && image[0] != null) {
    data.append('image', image[0]);
  }

  return fetch(global.API_URL + 'exercises/'+ global.logged_user_id + '/save_exercise/', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data; ',
      'access-token-api': global.access_token
    },
    body: data
  })
  .then((response) => response.json())
  .then((json) => {
    if (json['status'] === 'success'){
      navigation.navigate('Home')
    }
    else{
      alert("Nesprávne zadané údaje")
    }
  })
  .catch((error) => {
    console.log(error);
  })
};

function renderBodyParts(styles, body_parts, body_parts_string) {
  if (body_parts_string == undefined || body_parts_string == null)
    return null;
  
  let body_parts_split = body_parts_string.split(",");
  let picked_body_parts = [];

  for (let i=0; i < body_parts_split.length; i++){
    picked_body_parts.push(body_parts[body_parts_split[i]-1]);
  }

  return picked_body_parts.map((obj, index) => {
    const key = index;
    return <Text style={styles.textBodyparts} key={key}>{obj.name}</Text>
  });
}

export default function AddExerciseScreen({route, navigation}) {
  const [name, onChangeName] = React.useState(exercise_name);
  const [description, onChangeDescription] = React.useState(exercise_description);
  const [image, setImage] = React.useState(exercise_image);

  const exercise_name = route.params.exercise_name;
  const exercise_image = route.params.exercise_image;
  const exercise_description = route.params.exercise_description;
  const body_parts = route.params.body_parts;
  const body_parts_string = route.params.body_parts_string;


  

  const selectFile = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });

      setImage(res);
    } catch (err) {
      setImage(null);
      if (DocumentPicker.isCancel(err)) {
        alert('Canceled');
      } else {
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };

  const styles = StyleSheet.create({
      input: {
        paddingVertical: 12,
        paddingHorizontal: 15,
        borderRadius: 15,
        fontSize: 19,
        width: 300, //250
        height: 75,
        borderWidth: 1.5,
        marginBottom: 0,
        backgroundColor: "transparent",
        textAlignVertical: 'top',
      },
      inputNazov: {
        paddingVertical: 12,
        paddingHorizontal: 15,
        borderRadius: 15,
        fontSize: 19,
        width: 250, //250
        borderWidth: 1.5,
        marginBottom: 0,
        backgroundColor: "transparent",
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

          <View style ={{flex: 3, flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginTop: 3}}>
              <IconButton icon='arrow-left-circle' size={45} 
                  onPress={() => navigation.goBack()}
              />
          </View>

      <View style={{flex: 27.9, flexDirection:'column',alignItems:'center'}}>  
      <Text style={styles.textNazov}>Názov cvičenia</Text>
      <TextInput 
        style={styles.inputNazov}
        onChangeText={onChangeName}
        maxLength={19}
        />

      <TouchableOpacity 
        style={styles.button1}
        onPress={selectFile}
      >
        <Text style={styles.text}>{image != null ? 'Obrázok bol nahratý' : 'Nahrať obrázok...'}</Text> 
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.button2}
        onPress={() =>
          navigation.navigate(
            "PickBodyParts", 
            { 
              destination_back: "AddExercise", 
              exercise_name : name, 
              exercise_description: description, 
              exercise_image: image,
              body_parts: body_parts 
            }
          )
        }
      >
        <Text style={styles.text}>Nastaviť časti tela</Text>
      </TouchableOpacity>
      

      <View style={{flex: 9.15, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
      {renderBodyParts(styles, body_parts, body_parts_string)}
      </View> 
      </View>


      <View style={{flex: 11.8, flexDirection: 'column', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', marginLeft: 50}}>
        <Text style={styles.textMidNazov}>Popis cvičenia: </Text>
        <TextInput 
          style={styles.input}
          onChangeText={onChangeDescription}
          numberOfLines={1}
          multiline={true}
          maxLength={254}
        />
      </View>

      <View style ={{flex: 7.3, flexDirection:'column', justifyContent:'center', alignItems:'center', marginBottom: 20}}>
          <TouchableOpacity 
            style={styles.button2}
            onPress={() => addExerciseApi({navigation}, name, body_parts_string, image, description)}
          >
          <Text style={styles.text}>Pridať</Text>
          </TouchableOpacity>
      </View>
  </View>
    );
}

    // <Text style={styles.text}>{image != null ? image[0].name : 'Nahrať obrázok...'}</Text> 