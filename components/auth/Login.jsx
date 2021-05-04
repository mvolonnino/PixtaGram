import React, { useState } from "react";
import { View, TextInput, Button } from "react-native";

import { auth } from "../../firebaseConfig";
import { landingStyles } from "../../styles/Landing";

const Login = () => {
  const [info, setInfo] = useState({
    email: "",
    password: "",
  });

  const signInUser = () => {
    const { email, password } = info;

    auth
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        console.log("User signed in => ", res);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <View style={landingStyles.container}>
      <TextInput
        placeholder="email"
        onChangeText={(email) => setInfo({ ...info, email })}
        style={landingStyles.textInput}
      />
      <TextInput
        placeholder="password"
        secureTextEntry={true}
        onChangeText={(password) => setInfo({ ...info, password })}
        style={landingStyles.textInput}
      />

      <Button title="Sign In" onPress={() => signInUser()} />
    </View>
  );
};

export default Login;
