import React, { useState } from "react";
import { View, TextInput, Image, StyleSheet, Button } from "react-native";
import firebase from "firebase";
import db, { auth } from "../firebaseConfig";
require("firebase/firestore");
require("firebase/firebase-storage");
import uuid from "uuid";
import { manipulateAsync, SaveFormat } from "expo-image-manipulator";

import { AnimatedUpload } from "../components/app";
import { compressImage } from "../helpers";

const Save = (props) => {
  const { image } = props.route.params;
  const [caption, setCaption] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleUploadImage = async () => {
    const id = uuid.v4();
    const childPath = `post/${auth.currentUser.uid}/${id}`;
    const blob = await compressImage(image);

    setUploading(true);

    const task = firebase.storage().ref().child(childPath).put(blob);

    const taskProgress = (snapshot) => {
      console.log(`trasferred: ${snapshot.bytesTransferred}`);
    };

    const taskCompleted = () => {
      task.snapshot.ref.getDownloadURL().then((snapshot) => {
        savePostData(snapshot);
      });
    };

    const taskError = (snapshot) => {
      console.log(snapshot);
    };

    task.on("state_changed", taskProgress, taskError, taskCompleted);
  };

  const savePostData = (downloadURL) => {
    db.collection("posts")
      .doc(auth.currentUser.uid)
      .collection("userPosts")
      .add({
        downloadURL,
        caption,
        createdAt: firebase.firestore.Timestamp.now(),
      })
      .then(() => {
        props.navigation.popToTop();
        setUploading(false);
      })
      .then(() => {
        console.log("post saved successfully!");
      })
      .catch((err) => {
        console.log("error saving post => ", err);
      });
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.captionContianer}>
        <TextInput
          placeholder="Enter a caption... "
          placeholderTextColor="white"
          onChangeText={(value) => setCaption(value)}
          style={styles.captionText}
        />
      </View>
      <Button title="Upload Image" onPress={() => handleUploadImage()} />
      {uploading ? <AnimatedUpload uploading={uploading} /> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#06182e",
  },
  image: {
    aspectRatio: 1,
  },
  captionContianer: {
    padding: 10,
    backgroundColor: "#06182e",
  },
  captionText: {
    color: "white",
  },
});

export default Save;
