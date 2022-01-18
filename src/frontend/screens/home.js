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

export default function Home(props) {
  const [Todo, setTodo] = useState([]);
  const [currEmail, setEmail] = useState("");
  React.useEffect(() => {
    setEmail(props.navigation.getParam("Email"));
    console.log(props.navigation.getParam("Email"));
    setTodo[[]];
    var str = `http://192.168.0.104:3000/getTodo?Email=${props.navigation.getParam(
      "Email"
    )}`;
    console.log(str);
    // fetch(
    //   `http://192.168.0.104:3000/getTodo?Email=${props.navigation.getParam(
    //     "Email"
    //   )}`
    fetch(str)
      .then((data) => {
        return data.json();
      })
      .then((todos) => {
        console.log(todos);
        for (let index = 0; index < todos.length; index++) {
          setTodo((prevTodo) => {
            return [todos[index], ...prevTodo];
          });
        }
      });
  }, [currEmail]);
  const presshandler = (key) => {
    setTodo((prevTodo) => {
      // {props.navigation.getParam()}
      popTodoItem(key);
      return prevTodo.filter((todo) => todo.key != key);
    });
  };
  const submitHandler = (text) => {
    if (text.length != 0) {
      setTodo((prevTodo) => {
        const newTodoItem = {
          text: text,
          key: uuidv4(),
        };
        pushTodoItem(newTodoItem);
        return [newTodoItem, ...prevTodo];
      });
    } else {
      ToastAndroid.show(
        "Please Enter characters more than 1!",
        ToastAndroid.SHORT
      );
    }
  };

  // fetch request functions:

  async function popTodoItem(key) {
    data = {
      Email: props.navigation.getParam("Email"),
      key: key,
    };
    console.log(data);
    const response = await fetch("http://192.168.0.104:3000/todoDelete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }

  async function pushTodoItem(todoUpdateItem) {
    const todoFinalItem = Object.assign(
      { Email: props.navigation.getParam("Email") },
      todoUpdateItem
    );
    console.log(todoFinalItem);
    const response = await fetch("http://192.168.0.104:3000/todoUpdate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todoFinalItem),
    });
  }

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
