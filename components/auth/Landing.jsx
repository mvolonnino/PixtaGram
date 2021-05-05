import React from "react";
import { Text, View, StyleSheet, Button } from "react-native";

import { landingStyles } from "../../styles";

export default function Landing({ navigation }) {
  return (
    <View style={landingStyles.container}>
      <Button
        title="Register"
        onPress={() => navigation.navigate("Register")}
      />
      <Button title="Login" onPress={() => navigation.navigate("Login")} />
    </View>
  );
}
