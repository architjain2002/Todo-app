import React, { useState } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";

export default function App() {
  const [Todo, setTodo] = useState([
    { text: "work1", key: "1" },
    { text: "work2", key: "2" },
    { text: "work3", key: "2" },
  ]);
  return (
    <View style={styles.container}>
      {/* { header } */}
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
    alignItems: "center",
    justifyContent: "center",
  },
});
