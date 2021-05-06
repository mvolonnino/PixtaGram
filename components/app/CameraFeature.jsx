import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, Button } from "react-native";
import { Camera } from "expo-camera";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export default function CameraFeature() {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [frontFacing, setFrontFacing] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasCameraPermission(status === "granted");
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

  if (hasCameraPermission === null) {
    return <View />;
  }
  if (hasCameraPermission === false) {
    return (
      <View style={styles.noPermissionContainer}>
        <Text style={styles.noPermission}>No access to camera</Text>;
      </View>
    );
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
      <MaterialIcons
        name="flip-camera-android"
        onPress={() => handleCameraSwitch()}
        size={40}
        color="gray"
        style={styles.flipCameraIcon}
      />
      <View style={styles.pictureContianer}>
        <View style={styles.takePictureBackground}>
          <MaterialIcons
            name="camera"
            size={45}
            color="white"
            onPress={() => handleTakePicture()}
            style={styles.takePictureIcon}
          />
        </View>
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
    position: "relative",
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
  noPermissionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noPermission: {
    color: "red",
  },
  flipCameraIcon: {
    alignSelf: "flex-end",
    position: "absolute",
    top: 10,
    right: 10,
  },
  takePictureIcon: {
    alignSelf: "center",
  },
  takePictureBackground: {
    backgroundColor: "#051426",
  },
});
