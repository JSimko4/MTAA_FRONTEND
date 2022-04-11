import * as React from 'react';
import { View, StyleSheet, Image, TextInput, Text, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import {IconButton} from 'react-native-paper';

export default function ExerciseDetailScreen({navigation}) {
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
        //marginLeft: 40,
        //marginRight: 30,
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
          source={require("../assets/images/icon.png")}
          style = {styles.image}
          resizeMode="cover">

          <IconButton icon='arrow-left-circle' size={45} 
                    onPress={() => navigation.goBack()}/>
          
          </ImageBackground>
          

          <View style={{flex: 2}}>
            <View style={{alignItems: 'center'}}>
            <Text style={styles.textNazov}>Názov cvicenia</Text>
            </View>

            <View style={{flexDirection: 'row', marginTop: 20, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={styles.textBodyparts}>Hrudník</Text>
              <Text style={styles.textBodyparts}>Biceps</Text>
              <Text style={styles.textBodyparts}>Triceps</Text>
            </View>
          </View>

          <View style={{flex: 5}}>
            <View style={{flexDirection: 'row', flexWrap: 'wrap', marginBottom: 15, alignItems: 'center', justifyContent: 'flex-start'}}>
              <Text style={styles.textMidNazov}>Autor: </Text>
              <Text style={styles.text1}>Ja</Text>
            </View>

            <View style={{flexDirection: 'column', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'flex-start', flex: 1}}>
              <Text style={styles.textMidNazov}>Popis cvičenia: </Text>
              <ScrollView>
                <Text style={styles.textScroll}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed d

                </Text>
              </ScrollView>
           </View>
          </View>

          <View style={{flexDirection: 'column', marginBottom: 15, alignItems: 'center', justifyContent: 'flex-start'}}>
            <Text>Si kokot</Text>
          </View>
  
        </View>
    );
  }