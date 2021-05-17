import React, { useState } from "react";
import { View, TextInput, Button } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

import { auth } from "../../firebaseConfig";
import { landingStyles } from "../../styles";

const Login = () => {
  const [info, setInfo] = useState({
    email: "",
    password: "",
  });
  const [showPass, setShowPass] = useState(false);

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
        onChangeText={(value) =>
          setInfo({ ...info, email: value.toLowerCase().trim() })
        }
        style={landingStyles.textInput}
      />

      <View style={landingStyles.passwordContainer}>
        <TextInput
          placeholder="password"
          secureTextEntry={!showPass}
          onChangeText={(value) => setInfo({ ...info, password: value.trim() })}
          style={landingStyles.passwordInput}
        />
        {showPass ? (
          <Ionicons
            name="eye-outline"
            size={20}
            style={landingStyles.iconStyle}
            onPress={() => setShowPass(!showPass)}
          />
        ) : (
          <Ionicons
            name="eye-off-outline"
            size={20}
            style={landingStyles.iconStyle}
            onPress={() => setShowPass(!showPass)}
          />
        )}
      </View>

      <Button title="Sign In" onPress={() => signInUser()} />
    </View>
  );
};

export default Login;
