import React from "react";
import { Text, StyleSheet, View } from "react-native";
import CheckBox from 'expo-checkbox';

function count_checked(checkboxes){
    let count = 0;

    for (let i = 0; i < checkboxes.length; i++){
        if (checkboxes[i].value)
            count++;
    }

    return count;
}

export default class FilterScreen extends React.Component {
    state = {
      checkboxes: [],
    };
  
    async componentDidMount() {
      setTimeout(() => {
        const data = [{ id: 1, label: 'prsia' }, { id: 2, label: 'nohy' },
        { id: 3, label: 'prsia' }, { id: 4, label: 'nohy' } ];
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
        <View style={styles.container}>
          <Text>Filtrovanie podľa časi tela ({this.state.count}/3)</Text>
          {this.state.checkboxes.length > 0 &&
            this.state.checkboxes.map(checkbox => (
              <View>
                <Text>{checkbox.label}</Text>
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
                            { id: checkbox.id, label: checkbox.label, value },
                            ...state.checkboxes.slice(index+1),
                            ],
                            count: count_checked(
                                [   ...state.checkboxes.slice(0, index),
                                    { id: checkbox.id, label: checkbox.label, value },
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
        </View>
      );
    }
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: "center",
  },
  label: {
    margin: 8,
  },
});