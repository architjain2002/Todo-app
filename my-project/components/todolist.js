import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

export default function TodoList(props) {
  return (
    <TouchableOpacity onPress={() => props.presshandler(props.item.key)}>
      <Text style={styles.textStyle}>{props.item.text}</Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  textStyle: {
    padding: 16,
    marginTop: 16,
    borderWidth: 1,
    borderStyle: "dashed",
    borderRadius: 10,
  },
});
