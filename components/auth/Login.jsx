import React, { useState } from "react";
import { View, TextInput, Button } from "react-native";

import { auth } from "../../firebaseConfig";
import { landingStyles } from "../../styles";

const Login = () => {
  const [info, setInfo] = useState({
    email: "",
    password: "",
  });

  const signInUser = () => {
    const { email, password } = info;
    console.log({ info });

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
        onChangeText={(value) =>
          setInfo({ ...info, email: value.toLowerCase().trim() })
        }
        style={landingStyles.textInput}
      />
      <TextInput
        placeholder="password"
        secureTextEntry={true}
        onChangeText={(value) => setInfo({ ...info, password: value.trim() })}
        style={landingStyles.textInput}
      />

      <Button title="Sign In" onPress={() => signInUser()} />
    </View>
  );
};

export default Login;
