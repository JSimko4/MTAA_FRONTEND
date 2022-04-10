import React, { Component } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

function MaterialButtonHamburger(props) {
  return (
    <TouchableOpacity style={[styles.container, props.style]}>
      <Icon name="menu" style={styles.caption}></Icon>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#3F51B5",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.35,
    shadowRadius: 5,
    elevation: 2
  },
  caption: {
    color: "#fff",
    fontSize: 24
  }
});

export default MaterialButtonHamburger;
