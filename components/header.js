import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Header() {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Current Todos</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  header: {
    height: 80,
    // width: 100,
    paddingTop: 50,
    backgroundColor: "green",
  },
  title: {
    textAlign: "center",
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});
