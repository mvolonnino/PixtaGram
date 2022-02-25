import React, { useEffect, useState } from "react";
import { View, Text, Image, FlatList, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Avatar } from "react-native-elements";

import { signOutUser } from "../redux/actions";
import { ProfileSkeleton } from "../components/app";
import { auth } from "../firebaseConfig";
import {
  fetchSearchUserPosts,
  fetchSearchUserInfo,
  handleUnFollow,
  handleFollow,
} from "../helpers";

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
  following: store.userState.following,
  users: store.usersState.users,
  usersLoaded: store.usersState.usersLoaded,
});

const mapDispatchProps = (dispatch) =>
  bindActionCreators(
    {
      signOutUser,
    },
    dispatch
  );

const Feed = ({ following, usersLoaded, users }) => {
  const [posts, setPosts] = useState([]);
  console.log(
    { usersLoaded },
    { following },
    following.length,
    { posts },
    { users }
  );

  useEffect(() => {
    let firestorePosts = [];
    if (usersLoaded == following.length) {
      for (let i = 0; i < following.length; i++) {
        const user = users.find((el) => el.uid === following[i]);

        if (user !== undefined) {
          firestorePosts = [...firestorePosts, ...user.posts];
        }
      }

      firestorePosts.sort(function (x, y) {
        return x.createdAt < y.createdAt;
      });

      setPosts(firestorePosts);
    } else if (usersLoaded > following.length) {
      const userArr = [];
      posts.map((post, i) => {
        const user = post.user;
        if (user.uid === following) userArr.push(post);
      });
      console.log(userArr);
    }
  }, [usersLoaded, following]);

  return (
    <View style={styles.container}>
      <View style={styles.postsContainer}>
        <FlatList
          numColumns={1}
          horizontal={false}
          data={posts}
          renderItem={({ item }) => (
            <View style={styles.imageContainer}>
              <Text style={styles.userName}>{item.user.displayName}</Text>
              <Image source={{ uri: item.downloadURL }} style={styles.image} />
              <Text style={styles.userName}>{item.caption}</Text>
            </View>
          )}
          keyExtractor={(item) => item.uid}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    padding: 20,
  },
  postsContainer: {
    flex: 1,
  },
  image: {
    flex: 1,
    aspectRatio: 1 / 1,
  },
  imageContainer: {
    flex: 1 / 3,
    borderWidth: 1,
    borderColor: "#051426",
    margin: 1,
  },
  userName: {
    flex: 1,
  },
});

export default connect(mapStateToProps, mapDispatchProps)(Feed);
