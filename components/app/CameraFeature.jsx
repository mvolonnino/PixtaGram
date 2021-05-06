import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, Button } from "react-native";
import { Camera } from "expo-camera";
import { MaterialIcons } from "react-native-vector-icons/";
import * as ImagePicker from "expo-image-picker";

export default function CameraFeature({ setGalleryPermission }) {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasGalleryPermission, setHasGalleryPermission] = useState(false);
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

  const handleGalleryPermission = () => {
    if (!hasGalleryPermission) {
      (async () => {
        if (Platform.OS !== "web") {
          let {
            status,
          } = await ImagePicker.requestMediaLibraryPermissionsAsync();
          console.log({ status });
          if (status === "denied") {
            setHasGalleryPermission(false);
            alert("Sorry, we need camera roll permissions to make this work!");
          }
          if (status === "granted") {
            setHasGalleryPermission(true);
          }
        }
      })();
    } else {
      pickImage();
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
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
          <View style={styles.iconContainer}>
            <MaterialIcons
              name="close"
              size={45}
              color="white"
              onPress={() => setImage(null)}
              style={styles.closeIcon}
            />
            <MaterialIcons
              name="camera"
              size={45}
              color="white"
              onPress={() => handleTakePicture()}
            />
            <MaterialIcons
              name="add-photo-alternate"
              size={45}
              color="white"
              onPress={() => handleGalleryPermission()}
              style={styles.galleryPickerIcon}
            />
          </View>
        </View>
        {image ? (
          <Image
            source={{ uri: image }}
            style={frontFacing ? styles.frontCameraPic : styles.backCameraPic}
          />
        ) : (
          <View style={styles.noImageContainer}>
            <Text style={styles.noImageText}>
              Take a picture or choose from your gallery to see image here
            </Text>
          </View>
        )}
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
  takePictureBackground: {
    backgroundColor: "#051426",
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  galleryPickerIcon: {
    position: "absolute",
    right: 10,
  },
  closeIcon: {
    position: "absolute",
    left: 10,
  },
  noImageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noImageText: {
    fontSize: 16,
    textAlign: "center",
  },
});
