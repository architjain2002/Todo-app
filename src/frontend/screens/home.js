import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ToastAndroid,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

// to generate unique ids for the array
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

// components in the app
import Header from "../components/header";
import TodoList from "../components/todolist";
import Form from "../components/form";

export default function Home() {
  const [Todo, setTodo] = useState([
    { text: "work1", key: uuidv4() },
    { text: "work2", key: uuidv4() },
    { text: "work3", key: uuidv4() },
  ]);

  const presshandler = (key) => {
    setTodo((prevTodo) => {
      return prevTodo.filter((todo) => todo.key != key);
    });
  };
  const submitHandler = (text) => {
    if (text.length != 0)
      setTodo((prevTodo) => {
        return [{ text: text, key: uuidv4() }, ...prevTodo];
      });
    else {
      ToastAndroid.show(
        "Please Enter characters more than 1!",
        ToastAndroid.SHORT,
        "green"
      );
    }
  };
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Header />
        <View style={styles.content}>
          <Form submitHandler={submitHandler} />
          <View style={styles.list}>
            <FlatList
              data={Todo}
              renderItem={({ item }) => (
                <TodoList item={item} presshandler={presshandler} />
              )}
            />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },
  content: {
    padding: 40,
  },
  list: {
    marginTop: 20,
  },
});
