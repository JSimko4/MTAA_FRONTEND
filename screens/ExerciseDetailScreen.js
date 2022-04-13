import * as React from 'react';
import { View, StyleSheet, Image, TextInput, Text, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import {IconButton} from 'react-native-paper';

function renderBodyParts(styles, body_parts) {
  return body_parts.map((obj, index) => {
    const key = index;
    return <Text style={styles.textBodyparts} key={key}>{obj.name}</Text>
  });
}

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

export default function ExerciseDetailScreen({route, navigation}) {
    const exercise = route.params.exercise;
    const body_parts = exercise.body_parts;

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
              
              <IconButton icon='pencil' size={40} 
                  onPress={() => this.navigation.goBack()}
              />
              
              <IconButton icon='phone' size={40} 
                  onPress={() => navigation.navigate('Call')}
              />
              
              <IconButton icon='trash-can' size={40} 
                  onPress={() => deleteExerciseApi({navigation}, exercise.id)}
              />
          </View>
  
        </View>
    );
  }