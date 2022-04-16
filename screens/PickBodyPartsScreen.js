import React from "react";
import { Text, StyleSheet, View, TouchableHighlight } from "react-native";
import CheckBox from 'expo-checkbox';
import {IconButton} from 'react-native-paper';


function count_checked(checkboxes){
    let count = 0;

    for (let i = 0; i < checkboxes.length; i++){
        if (checkboxes[i].value)
            count++;
    }

    return count;
}

export default class FilterScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      checkboxes: [],
    };
    this.navigation = this.props.navigation;
    this.body_parts = this.props.route.params.body_parts;

    this.exercise_name = this.props.route.params.exercise_name;
    this.exercise_image = this.props.route.params.exercise_image;
    this.exercise_description = this.props.route.params.exercise_description;

    console.log(this.exercise_name, this.exercise_image, this.exercise_description)

    this.addBodyParts = this.addBodyParts.bind(this);
  }

  addBodyParts(){
    const checkboxes = this.state.checkboxes;
    const navigation = this.navigation;

    let body_parts_string = "";
    for (let i=0; i < checkboxes.length; i++){
      let checkbox = checkboxes[i];
      if (checkbox.value){
        body_parts_string = body_parts_string.concat(checkbox.id+',');
      }
    }

    body_parts_string = body_parts_string.slice(0, -1)

    navigation.navigate("AddExercise", 
      {
        body_parts: this.body_parts, 
        body_parts_string: body_parts_string,
        exercise_name : this.exercise_name, 
        exercise_description: this.exercise_description, 
        exercise_image: this.exercise_image
      }
    )
  };
  
    async componentDidMount() {
      setTimeout(() => {
        const data = this.body_parts;
        this.setState({
          checkboxes: data.map(x => {
            x['value'] = false;
            return x;
          }),
          count: 0
        });
      }, 1000);
    }

    render() {      
      return (
        <View>
          <View style ={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', 
                         height: 60, backgroundColor: '#e0e0e0'}}>
            <IconButton icon='arrow-left-circle' size={45} 
                onPress={() => this.navigation.goBack()}
            />
        </View>
        <View style = {{flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
          <Text style ={{marginLeft: -100, marginTop: 15, fontSize: 16, lineHeight: 21, fontWeight: 'bold',}}>Filtrovanie podľa časti tela: ({this.state.count}/3)</Text>
          {this.state.checkboxes.length > 0 &&
            this.state.checkboxes.map(checkbox => (
              <View style = {{flexDirection:'column', alignItems:'center', justifyContent:'center', marginTop: 25}}>
                <View style = {{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                <View style = {{marginLeft: 20, flexDirection: 'row', alignItems:'flex-start'}}>
                <CheckBox
                  onValueChange={value =>
                    this.setState(state => {
                      const index = state.checkboxes.findIndex(
                        x => x.id === checkbox.id
                      );
                      if (count_checked(state.checkboxes) >= 3 && value){
                        return {
                            checkboxes: state.checkboxes,
                        };
                      }
                      else
                        return {
                            checkboxes: [
                            ...state.checkboxes.slice(0, index),
                            { id: checkbox.id, name: checkbox.name, value },
                            ...state.checkboxes.slice(index+1),
                            ],
                            count: count_checked(
                                [   ...state.checkboxes.slice(0, index),
                                    { id: checkbox.id, name: checkbox.name, value },
                                    ...state.checkboxes.slice(index+1)]
                                )
                            };
                        })
                      }
                      value={checkbox.value}
                      key={checkbox.id}
                    />
                    <Text>{checkbox.name}</Text>
                    </View> 
                    </View>
                  </View>
                ))}
                <View style = {{alignItems:'center', }}>
                <TouchableHighlight
                style={styles.button1}
                onPress={() => this.addBodyParts(this.exercise_name, this.exercise_image, this.exercise_description)}
                >
                <Text style={styles.text}>PRIDAŤ</Text>
            </TouchableHighlight>
            </View>
          </View>
        </View>
      );
    }
  }

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: "center",
  },
  name: {
    margin: 8,
  },
  button1: {
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
    marginTop: 45, 
  },
  text: {
  fontSize: 14,
  lineHeight: 21,
  fontWeight: 'bold',
  letterSpacing: 0.25,
  color: 'white',
  },
});