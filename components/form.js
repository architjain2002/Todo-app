import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";

export default function Form() {
  const [text, settext] = useState("");
  const changeHandler = (val) => {
    settext(val);
  };
  return (
    <TextInput
      placeholder="new todo ..."
      onChangeText={changeHandler}
      style={styles.inputStyle}
    />
  );
}
const styles = StyleSheet.create({
  inputStyle: {
    marginBottom: 10,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
});
