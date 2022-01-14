import React, { useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import * as Google from "expo-google-app-auth";
export default function Auth(props) {
  const navigationHandler = () => {
    props.navigation.navigate("Home");
  };
  //   const googleAuthHandler = () => {
  //     const config = {
  //       iosClientId:
  //         "758016975871-qed8a2cvkvff86g3qjdqfp950sjlnfr5.apps.googleusercontent.com",
  //       androidClientId:
  //         "758016975871-co4n3k6ruk9k1cqgc0r0r8sd1oa7ejle.apps.googleusercontent.com",
  //       scope: ["profile", "email"],
  //     };
  //     Google.logInAsync(config)
  //       .then((result) => {
  //         const { type, user } = result;
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   };
  return (
    <View style={styles.container}>
      <Text>hello world</Text>
      <Button title="To home" onPress={navigationHandler} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
