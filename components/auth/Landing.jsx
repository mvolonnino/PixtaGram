import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Button } from "react-native-elements";

import { landingStyles } from "../../styles";

export default function Landing({ navigation }) {
  return (
    <View style={landingStyles.container}>
      <Text style={styles.landingText}>PixtaGram!</Text>

      <Button
        title="Register"
        onPress={() => navigation.navigate("Register")}
        buttonStyle={styles.landingBtns}
      />
      <Button
        title="Login"
        onPress={() => navigation.navigate("Login")}
        buttonStyle={styles.landingBtns}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  landingBtns: {
    width: 200,
    margin: 10,
    backgroundColor: "#051426",
  },
  landingText: {
    fontSize: 40,
    color: "#051426",
  },
});
