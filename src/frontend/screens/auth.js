import React, { useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
// import * as Google from "expo-google-app-auth";
import * as Google from "expo-auth-session/providers/google";
export default function Auth(props) {
  const navigationHandler = () => {
    props.navigation.navigate("Home");
  };
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId:
      "758016975871-v2ro7gjfeigr7ma67b2visi8dupuuqd8.apps.googleusercontent.com",

    iosClientId:
      "758016975871-qed8a2cvkvff86g3qjdqfp950sjlnfr5.apps.googleusercontent.com",
    androidClientId:
      "758016975871-co4n3k6ruk9k1cqgc0r0r8sd1oa7ejle.apps.googleusercontent.com",
    // webClientId: "GOOGLE_GUID.apps.googleusercontent.com",
  });
  React.useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response;
    }
  }, [response]);
  return (
    <View style={styles.container}>
      <Text>hello world</Text>
      <Button title="To home" onPress={navigationHandler} />
      <Button
        disabled={!request}
        title="Login"
        onPress={() => {
          promptAsync();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
