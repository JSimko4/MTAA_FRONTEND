
import * as React from 'react';
import { View, StyleSheet, Button, Image, FlatList, Text } from 'react-native';

export default function ExercisesScreen({route, navigation}) {
    const { exercises } = route.params;
    console.log(exercises)
    console.log(route.params)
    
    const styles = StyleSheet.create({
    });
  
    return (
        <FlatList
            data={exercises}
            keyExtractor={item => item.id}
            renderItem={( item ) => (
                <View>
                    {console.log(item)}
                    <Text>{item.name}</Text>
                    <Image
                        style={{width: '200px', height: '200px'}}
                        source={{uri: global.API_URL+item.image_path}}
                    />
                    <Button
                        title='Detail'
                        onPress={() => navigation.navigate("ExerciseDetail", {exercise: item})}
                    />
                </View>
            )}
        />
    );
}