import React, { useState } from "react";
import { View, Button, TextInput, StyleSheet } from "react-native";

import { auth } from "../../firebaseConfig";
import { landingStyles } from "../../styles/Landing";

const Register = () => {
  const [info, setInfo] = useState({
    email: "",
    password: "",
    name: "",
  });

  const registerUser = () => {
    const { email, password, name } = info;

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        console.log("registered new user => ", { res });
      })
      .catch((error) => {
        console.log({ error });
      });
  };

  return (
    <View style={landingStyles.container}>
      <TextInput
        placeholder="Name"
        onChangeText={(name) => setInfo({ ...info, name })}
        style={landingStyles.textInput}
      />
      <TextInput
        placeholder="Email"
        onChangeText={(email) => setInfo({ ...info, email })}
        style={landingStyles.textInput}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={(password) => setInfo({ ...info, password })}
        style={landingStyles.textInput}
      />
      <Button title="Register" onPress={() => registerUser()} />
    </View>
  );
};

export default Register;
