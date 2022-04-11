
import * as React from 'react';
import { View, StyleSheet, Button, Image, FlatList, Text, TouchableOpacity } from 'react-native';

export default function ExercisesScreen({route, navigation}) {
    const exercises = route.params.exercises;

    const styles = StyleSheet.create({
    });
  
    return (
        <FlatList
            data={exercises}
            renderItem={( {item} ) => (
                <View style ={{ flexDirection:'row', flex:1, justifyContent:'space-evenly', alignItems:'center',
                                marginTop: 20}}>
                    <TouchableOpacity  
                        style ={{flex:3, alignItems:'center', justifyContent:'center'}}
                        onPress={() => navigation.navigate("ExerciseDetail", {exercise: item})}
                    >
                        <Image
                            style={{width: 110, height: 110}}
                            source={{uri: global.API_URL+item.image_path}}
                        />
                    </TouchableOpacity >
                    
                    <TouchableOpacity 
                        style ={{flexDirection:'row', flex:5, alignItems:'center', justifyContent:'center'}}
                        onPress={() => navigation.navigate("ExerciseDetail", {exercise: item})}
                    >
                    <Text style ={{fontSize: 19, fontWeight: 'bold'}}
                    >{item.name.toUpperCase()}</Text>
                    </TouchableOpacity>
                </View>
            )}
        />
    );
}