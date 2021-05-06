import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, Button } from "react-native";
import { Camera } from "expo-camera";

export default function Add() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [frontFacing, setFrontFacing] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleTakePicture = async () => {
    if (camera) {
      const data = await camera.takePictureAsync();
      type === 1 ? setFrontFacing(true) : setFrontFacing(false);
      setImage(data.uri);
    }
  };

  const handleCameraSwitch = () => {
    setType(
      type === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <>
      <View style={styles.cameraContainer}>
        <Camera
          style={styles.fixedRatio}
          type={type}
          ratio={"1:1"}
          ref={(ref) => setCamera(ref)}
        ></Camera>
      </View>
      <Button
        style={styles.button}
        onPress={() => handleCameraSwitch()}
        title="Flip Image"
      />
      <View style={styles.pictureContianer}>
        <Button title="Take Picture" onPress={() => handleTakePicture()} />
        {image ? (
          <Image
            source={{ uri: image }}
            style={frontFacing ? styles.frontCameraPic : styles.backCameraPic}
          />
        ) : null}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cameraContainer: {
    flex: 1,
    flexDirection: "row",
  },
  fixedRatio: {
    flex: 1,
    aspectRatio: 1,
  },
  pictureContianer: {
    flex: 1,
  },
  backCameraPic: {
    flex: 1,
  },
  frontCameraPic: {
    flex: 1,
    transform: [{ scaleX: -1 }],
  },
});
