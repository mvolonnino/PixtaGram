import React, { useState } from "react";
import { View, Button, TextInput, StyleSheet, Alert } from "react-native";
import firebase from "firebase";
import Ionicons from "react-native-vector-icons/Ionicons";

import { auth } from "../../firebaseConfig";
import { landingStyles } from "../../styles";

const Register = () => {
  const [info, setInfo] = useState({
    email: "",
    password: "",
    displayName: "",
  });
  const [showPass, setShowPass] = useState(false);

  const registerUser = () => {
    const { email, password, displayName } = info;

    if (email && password && displayName && displayName.length <= 20) {
      const nameSearchArr = displayName
        .split("")
        .map((e, i) => displayName.slice(0, i + 1));

      auth
        .createUserWithEmailAndPassword(email, password)
        .then((res) => {
          console.log("registered new user => ", { res });
          firebase
            .firestore()
            .collection("users")
            .doc(auth.currentUser.uid)
            .set({
              displayName,
              email,
              nameSearchArr,
            });
        })
        .catch((error) => {
          console.log({ error });
        });
    }

    if (displayName.length > 20) {
      Alert.alert(
        "Too many characters..",
        "displayName must be less than 15 characters!",
        {
          text: "OK",
        }
      );
    }
  };

  return (
    <View style={landingStyles.container}>
      <TextInput
        placeholder="Display Name"
        onChangeText={(value) =>
          setInfo({ ...info, displayName: value.trim() })
        }
        style={landingStyles.textInput}
      />
      <TextInput
        placeholder="Email"
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
      <Button title="Register" onPress={() => registerUser()} />
    </View>
  );
};

export default Register;
