
import * as React from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';

export default function ExercisesScreen({navigation}, exercises) {
    const styles = StyleSheet.create({
    });
  
    return (
        <FlatList
            data={exercises}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
                <View>
                    <Text>item.title</Text>
                    <Image>
                        style={{width: '200px', height: '200px'}}
                        source={{uri: global.API_URL+item.image_path}}
                    </Image>
                    <Button
                        title='Detail'
                        onPress={() => navigation.navigate("ExerciseDetail", {exercise: item})}
                    />
                </View>
            )}
        />
    );
}