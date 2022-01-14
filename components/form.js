import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";

export default function Form(props) {
  const [text, settext] = useState("");
  const changeHandler = (val) => {
    settext(val);
  };
  return (
    <View>
      <TextInput
        placeholder="new todo ..."
        onChangeText={changeHandler}
        style={styles.inputStyle}
      />
      <Button
        onPress={() => {
          props.submitHandler(text);
        }}
        title="add todo"
        color="#000B49"
      />
    </View>
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
