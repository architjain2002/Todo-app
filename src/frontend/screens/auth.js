import React, { useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
// import * as Google from "expo-google-app-auth";
import * as Google from "expo-auth-session/providers/google";
export default function Auth(props) {
  const [EmailId, setEmailId] = useState("");

  async function fetchUserInfo(token) {
    const response = await fetch(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return await response.json();
  }

  function postUserAuthInfo(data) {
    const response = fetch("http://192.168.0.104:3000/authData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    console.log("auth data inserted");
    // return response.json();
  }

  const navigationHandler = (params_EmailId) => {
    props.navigation.navigate("Home", { Email: params_EmailId });
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
      const {
        authentication: { accessToken },
      } = response;
      fetchUserInfo(accessToken)
        .then((res) => {
          console.log(res);
          const data = {
            Name: res.name,
            Email: res.email,
            PhotoUrl: res.picture,
          };
          setEmailId(data.Email);
          console.log(EmailId);
          postUserAuthInfo(data);
          navigationHandler(EmailId);
          // .then(() => {
          //   console.log("auth data inserted");
          // })
          // .catch((err) => {
          //   console.log(data);
          //   console.log(err);
          // });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [response, EmailId]);
  return (
    <View style={styles.container}>
      <Text>hello world</Text>
      {/* <Button title="To home" onPress={navigationHandler} /> */}
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
