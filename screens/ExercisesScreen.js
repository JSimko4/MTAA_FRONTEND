import * as React from 'react';
import { View, StyleSheet, Image, FlatList, Text, TouchableOpacity } from 'react-native';
import {IconButton} from 'react-native-paper';

const bodyPartsApi = ({navigation}) => {
    return fetch(global.API_URL + 'exercises/body_parts/')
    .then((response) => response.json())
    .then((json) => {
        if (json['status'] === 'success'){  
        console.log(json['data']);
        navigation.navigate('Filter', {body_parts: json['data']})
        }
        else{
        alert("Nepodarilo sa načítať časti tela")
        }
    })
    .catch((error) => {
        console.log(error);
    })
};

const navigateToAdd = ({navigation}) => {
    return fetch(global.API_URL + 'exercises/body_parts/')
    .then((response) => response.json())
    .then((json) => {
        if (json['status'] === 'success'){  
        console.log(json['data']);
        navigation.navigate("AddExercise", 
                            {body_parts: json['data'], exercise_name : null, 
                            exercise_description: null, exercise_image: null}
                            )
        }
        else{
        alert("Nepodarilo sa načítať časti tela")
        }
    })
    .catch((error) => {
        console.log(error);
    })
};

function renderFilterButton(user_id, navigation){
    if(user_id != global.logged_user_id)
        return null;

    return <IconButton icon='menu' size={45} 
        onPress={() => bodyPartsApi({navigation})}
    />
 }

function renderAddButton(user_id, navigation){
    if(user_id != global.logged_user_id)
        return <View style ={{ height: 25}}/>
    
    return (
    <View style ={{flexDirection:'row', justifyContent:'center', alignItems:'center', 
                   height: 70, marginVertical: 15}}>
        <IconButton 
            icon='plus-circle' size={60} 
            onPress={() => navigateToAdd({navigation})}
        />
    </View>
    )
}

export default function ExercisesScreen({route, navigation}) {
    const exercises = route.params.exercises;
    const user_id = route.params.user_id;

    const styles = StyleSheet.create({
        icon: {
            paddingVertical: 12,
            paddingHorizontal: 15,
            borderRadius: 15,
            fontSize: 19,
            width: 250,
            borderWidth: 1.5,
            marginBottom: 35,
            backgroundColor: "transparent"
        }
    });
  
    return (
        <View>
            <View style ={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', 
            height: 60, backgroundColor: '#e0e0e0'}}>
                <IconButton icon='arrow-left-circle' size={45} 
                    onPress={() => navigation.goBack()}
                />
                { renderFilterButton(user_id, navigation) }
            </View>
            
            <FlatList
                contentContainerStyle={{ paddingBottom: 60}}
                data={exercises}
                renderItem={( {item} ) => (
                    <View style ={{ flexDirection:'row', flex:1, justifyContent:'space-evenly', alignItems:'center',
                                    marginTop: 20}}>
                        <TouchableOpacity  
                            style ={{flex:3, alignItems:'center', justifyContent:'center'}}
                            onPress={() => navigation.navigate("ExerciseDetail", {exercise: item, user_id: user_id})}
                        >
                            <Image
                                style={{width: 110, height: 110}}
                                source={{uri: global.API_URL+item.image_path}}
                            />
                        </TouchableOpacity >
                        
                        <TouchableOpacity 
                            style ={{flexDirection:'row', flex:5, alignItems:'center', justifyContent:'center'}}
                            onPress={() => navigation.navigate("ExerciseDetail", {exercise: item, user_id: user_id})}
                        >
                        <Text style ={{fontSize: 19, fontWeight: 'bold'}}>
                            {item.name.toUpperCase()}
                        </Text>
                        </TouchableOpacity>
                    </View>
                )}
                ListFooterComponent={() => renderAddButton(user_id, navigation)}
            />
        </View>
    );
}