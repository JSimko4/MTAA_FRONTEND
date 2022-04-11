import * as React from 'react';
import { View, StyleSheet, Image, TextInput, Text, TouchableOpacity, ScrollView, ImageBackground, Pressable } from 'react-native';
import {IconButton} from 'react-native-paper';

export default function AddExerciseScreen({navigation}) {

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
        <TextInput style={styles.input}/>
 

        <Pressable style={styles.button1}>
          <Text style={styles.text}>Nahrať obrázok...</Text>
        </Pressable>

        <Pressable style={styles.button2}>
          <Text style={styles.text}>Nastaviť časti tela</Text>
        </Pressable>
        </View>

        <View style={{flex: 0.85, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
              <Text style={styles.textBodyparts}>Hrudník</Text>
              <Text style={styles.textBodyparts}>Biceps</Text>
              <Text style={styles.textBodyparts}>Triceps</Text>
        </View>

        <View style={{flex: 0.65 , flexDirection: 'column', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'flex-start'}}>
              <Text style={styles.textMidNazov}>Popis cvičenia: </Text>
              <ScrollView>
                <Text style={styles.textScroll}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed d
                  Lorem ipsum dolor s

                </Text>
              </ScrollView>
        </View>

        <View style ={{flex: 0.65, flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
            <Pressable style={styles.button2}>
            <Text style={styles.text}>Pridať</Text>
            </Pressable>
        </View>






    </View>
      );










    
}