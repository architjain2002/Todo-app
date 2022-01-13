import React, { useState } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";

import Header from "./components/header";

export default function App() {
  const [Todo, setTodo] = useState([
    { text: "work1", key: "1" },
    { text: "work2", key: "2" },
    { text: "work3", key: "3" },
  ]);
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>
        {/* {content} */}
        <View style={styles.list}>
          <FlatList
            data={Todo}
            renderItem={({ item }) => <Text>{item.text}</Text>}
          />
        </View>
      </View>
    </View>
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
