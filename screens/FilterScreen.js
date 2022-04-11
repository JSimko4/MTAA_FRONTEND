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
    this.filterIt = this.filterIt.bind(this);
  }

  filterIt(){
    const checkboxes = this.state.checkboxes;
    const navigation = this.navigation;

    let filter_string = "";
    for (let i=0; i < checkboxes.length; i++){
      let checkbox = checkboxes[i];
      if (checkbox.value){
        filter_string = filter_string.concat(checkbox.id+',');
      }
    }

    filter_string = filter_string.slice(0, -1)

    return fetch(global.API_URL + 'exercises/' + global.user_id + '/filter_exercises/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          body_parts: filter_string
      })
    })
    .then((response) => response.json())
    .then((json) => {  
      if (json['status'] === 'success'){
        navigation.navigate('Exercises', {exercises: json['data'], user_id: global.user_id})
      }
      else{
        alert("Musí byť zvolený aspoň jedna časť tela na vyfiltrovanie")
      }
    })
    .catch((error) => {
      console.log(error);
    })
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
          <Text>Filtrovanie podľa časi tela ({this.state.count}/3)</Text>
          {this.state.checkboxes.length > 0 &&
            this.state.checkboxes.map(checkbox => (
              <View>
                <Text>{checkbox.name}</Text>
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
              </View>
            ))}
                    <TouchableHighlight
            style={styles.button}
            onPress={() => this.filterIt()}
            >
            <Text style={styles.text}>FILTROVAŤ</Text>
        </TouchableHighlight>
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
});