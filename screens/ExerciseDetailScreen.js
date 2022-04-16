import * as React from 'react';
import { View, StyleSheet, Text, ScrollView, ImageBackground } from 'react-native';
import {IconButton} from 'react-native-paper';

const copyExerciseApi = ({navigation}, exercise_id) => {
  return fetch(global.API_URL + 'exercises/copy_exercise/', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'access-token-api': global.access_token
    },
    body: JSON.stringify({
      user_id: global.logged_user_id,
      exercise_id: exercise_id
    })
  })
  .then((response) => response.json())
  .then((json) => {
    console.log(json);

    if (json['status'] === 'success'){
      navigation.navigate('Home')
    }
    else{
      alert("Pri kopirovani nastala chyba")
    }
  })
  .catch((error) => {
    console.log(error);
  })
};

const navigateToEdit = ({navigation}, exercise) => {
  return fetch(global.API_URL + 'exercises/body_parts/')
  .then((response) => response.json())
  .then((json) => {
      if (json['status'] === 'success'){  
        global.exercise_id = exercise.id;
        navigation.navigate("EditExercise", {body_parts: json['data'], exercise: exercise})
      }
      else{
        alert("Nepodarilo sa načítať časti tela")
      }
  })
  .catch((error) => {
      console.log(error);
  })
};

const deleteExerciseApi = ({navigation}, exercise_id) => {
  return fetch(global.API_URL + 'exercises/' + exercise_id + '/delete/', {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'access-token-api': global.access_token
    }
  })
  .then((response) => response.json())
  .then((json) => {
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

function renderBodyParts(styles, body_parts) {
  return body_parts.map((obj, index) => {
    const key = index;
    return <Text style={styles.textBodyparts} key={key}>{obj.name}</Text>
  });
}

function renderSaveButton(navigation, creator_id, user_id, exercise_id){
  if(creator_id == global.logged_user_id || user_id == global.logged_user_id)
      return null
  
  return (
    <IconButton 
      icon='content-save' size={40} 
      onPress={() => copyExerciseApi({navigation}, exercise_id)}
    />
  )
}

function renderCallButton(navigation, creator_id){
  if(creator_id == global.logged_user_id)
      return null
  
  return (
    <IconButton 
      icon='phone' size={40} 
      onPress={() => navigation.navigate('Call')}
    />
  )
}

function renderEditButton(navigation, user_id){
  if(user_id != global.logged_user_id)
      return null
  
  return (
    <IconButton 
      icon='pencil' size={40} 
      onPress={() => navigateToEdit({navigation}, exercise)}
    />
  )
}

function renderDeleteButton(navigation, user_id){
  if(user_id != global.logged_user_id)
      return null
  
  return (
    <IconButton 
      icon='trash-can' size={40} 
      onPress={() => deleteExerciseApi({navigation}, exercise.id)}
    />
  )
}

export default function ExerciseDetailScreen({route, navigation}) {
    const exercise = route.params.exercise;
    const user_id = route.params.user_id;
    const creator_id = exercise.creator_id;
    const body_parts = exercise.body_parts;

    console.log(exercise)

    const styles = StyleSheet.create({
      image: {
        width: '100%',
        flex: 4,
        marginTop: 0,
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
      textNazov: {
        fontSize: 36, 
        fontWeight: 'bold', 
        letterSpacing: 0.25,
        marginTop: 10,
        alignItems: 'center',
      },
      textMidNazov: {
        fontSize: 24,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        marginLeft: 40,
      },
      text1: {
        fontSize: 24,
        fontWeight: 'normal',
        letterSpacing: 0.25,
        marginLeft: 0,
        marginRight: 30,
      },
      text2: {
        fontSize: 1,
        fontWeight: 'normal',
        letterSpacing: 0.25,
      },
      textScroll: {
        fontSize: 20,
        marginHorizontal: 40,
        marginVertical: 5,
      },
    });
  
    return (
        <View style={{flexDirection: 'column', justifyContent: 'space-evenly', flex: 1}}>
          <ImageBackground
            source={{uri: global.API_URL+exercise.image_path}}
            style={styles.image}
            resizeMode="cover"
            >
              <IconButton icon='arrow-left-circle' size={45} onPress={() => navigation.goBack()}/>
          </ImageBackground>
          
          <View style={{flex: 2}}>
            <View style={{alignItems: 'center'}}>
            <Text style={styles.textNazov}>{exercise.name}</Text>
            </View>

            <View style={{flexDirection: 'row', marginTop: 20, justifyContent: 'center', alignItems: 'center'}}>
              {renderBodyParts(styles, body_parts)}
            </View>
          </View>

          <View style={{flex: 4}}>
            <View style={{flexDirection: 'row', flexWrap: 'wrap', marginBottom: 15, alignItems: 'center', justifyContent: 'flex-start'}}>
              <Text style={styles.textMidNazov}>Autor: </Text>
              <Text style={styles.text1}>{exercise.creator_name}</Text>
            </View>

            <View style={{flexDirection: 'column', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'flex-start', flex: 1}}>
              <Text style={styles.textMidNazov}>Popis cvičenia: </Text>
              <ScrollView>
                <Text style={styles.textScroll}>
                {exercise.description}
                </Text>
              </ScrollView>
           </View>
          </View>

          <View style={{backgroundColor: '#e0e0e0', flexDirection: 'row', 
                        alignItems: 'center', justifyContent: 'space-evenly'}}>

              {renderSaveButton(navigation, creator_id, user_id, exercise.id)}
              
              {renderEditButton(navigation, user_id)}

              {renderCallButton(navigation, creator_id)}

              {renderDeleteButton(navigation, user_id)}
          </View>
        </View>
    );
  }