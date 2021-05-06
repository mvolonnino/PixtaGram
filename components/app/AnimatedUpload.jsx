import React, { useState, useEffect } from "react";
import { StyleSheet, Text } from "react-native";
import AnimatedLoader from "react-native-animated-loader";

const AnimatedUpload = ({ uploading }) => {
  return (
    <AnimatedLoader
      visible={uploading}
      overlayColor="rgba(5, 20, 38, .99)"
      source={require("../../assets/lottie/60207-loader-106.json")}
      animationStyle={styles.lottie}
      speed={1}
    >
      <Text style={styles.uploadingText}>Uploading image...</Text>
    </AnimatedLoader>
  );
};

const styles = StyleSheet.create({
  lottie: {
    width: 300,
    height: 300,
  },
  uploadingText: {
    color: "white",
  },
});

export default AnimatedUpload;
