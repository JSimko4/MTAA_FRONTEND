import * as React from 'react';
import { View, StyleSheet, Image, FlatList, Text, TouchableOpacity } from 'react-native';
import {IconButton} from 'react-native-paper';

const exercisesApi = ({navigation}, user_id) => {
    return fetch(global.API_URL + 'exercises/' + user_id + '/all')
    .then((response) => response.json())
    .then((json) => {
      if (json['status'] === 'success'){      
        navigation.navigate('Exercises', {exercises: json['data'], user_id: user_id})
      }
      else{
        alert("Nespravne udaje")
      }
    })
    .catch((error) => {
      console.log(error);
    })
  };


export default function UsersScreen({route, navigation}) {
    const users = route.params.users;

    const styles = StyleSheet.create({
        button: {
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 15,
            paddingHorizontal: 15,
            borderRadius: 4,
            elevation: 3,
            backgroundColor: "rgb(21, 9, 65)",
            borderRadius: 20,
            marginTop: 15,

            flexDirection:'row', flex:0.6,
          },
    });
  
    return (
        <View>
            <View style ={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', 
            height: 60, backgroundColor: '#e0e0e0'}}>
                <IconButton icon='arrow-left-circle' size={45} 
                    onPress={() => navigation.goBack()}
                />
            </View>
            
            <FlatList
                contentContainerStyle={{ paddingBottom: 60}}
                data={users}
                renderItem={( {item} ) => (
                  item.id != global.logged_user_id ?  
                    <View style ={{ flexDirection:'row', flex:1, justifyContent:'space-evenly', alignItems:'center',
                                    marginTop: 20}}>
                        <TouchableOpacity 
                            style ={styles.button}

                            onPress={() => exercisesApi({navigation}, item.id)}
                        >
                        <Text style ={{fontSize: 19, fontWeight: 'bold', color: 'white'}}>
                            {item.name.toUpperCase()}
                        </Text>
                        </TouchableOpacity>
                    </View>
                    : null
                )}
            />
        </View>
    );
}