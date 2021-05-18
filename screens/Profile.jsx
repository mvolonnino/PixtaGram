import React, { useEffect, useState } from "react";
import { View, Text, Image, FlatList, StyleSheet, Button } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Avatar } from "react-native-elements";

import { fetchUserPosts, signOutUser } from "../redux/actions";
import { ProfileSkeleton } from "../components/app";
import db, { auth } from "../firebaseConfig";
import { fetchSearchUserPosts, fetchSearchUserInfo } from "../helpers";

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
  posts: store.userState.posts,
});

const mapDispatchProps = (dispatch) =>
  bindActionCreators(
    {
      fetchUserPosts,
      signOutUser,
    },
    dispatch
  );

const Profile = ({ signOutUser, posts, currentUser, route }) => {
  const [userPosts, setUserPosts] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [passedUID, setPassedUID] = useState(route.params.profile.uid);

  useEffect(() => {
    setUser(null);
    setUserPosts([]);
    setLoading(true);
    setPassedUID(route.params.profile.uid);
  }, [route.params.profile.uid]);

  useEffect(() => {
    if (passedUID === auth.currentUser.uid) {
      setUser(currentUser);
      setUserPosts(posts);
    } else {
      setLoading(true);
      fetchSearchUserInfo(passedUID)
        .then((res) => {
          setUser(res);
        })
        .catch((error) => {
          console.log({ error });
        });
      fetchSearchUserPosts(passedUID)
        .then((res) => {
          setUserPosts(res);
        })
        .catch((error) => {
          console.log({ error });
        });
    }
  }, [passedUID]);

  useEffect(() => {
    if (posts.length === 0) {
      fetchUserPosts();

      if (posts.length === 0) {
        setLoading(false);
      }
    }
    if (posts.length > 0) {
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    }
  }, [passedUID]);

  return (
    <View style={styles.container}>
      {loading ? (
        <ProfileSkeleton />
      ) : userPosts.length === 0 ? (
        <View style={styles.noPostContainer}>
          <FontAwesome name="frown-o" size={60} />
          <Text>No Posts To Show!</Text>
        </View>
      ) : (
        <>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                position: "relative",
                backgroundColor: "#051426",
                borderRadius: 50,
              }}
            >
              <Avatar
                rounded
                size={55}
                icon={{ name: "user", type: "font-awesome" }}
              />
              <Avatar.Accessory
                style={{ position: "absolute", right: 0, bottom: 0 }}
                size={20}
              />
            </View>
            <View style={styles.infoContainer}>
              <Text>{user?.displayName}</Text>
              <Text>{user?.email}</Text>
            </View>
          </View>
          <View style={styles.postsContainer}>
            <FlatList
              numColumns={3}
              horizontal={false}
              data={userPosts}
              renderItem={({ item }) => (
                <View style={styles.imageContainer}>
                  <Image
                    source={{ uri: item.downloadURL }}
                    style={styles.image}
                  />
                </View>
              )}
              keyExtractor={(item) => item.uid}
            />
          </View>
        </>
      )}
      <View>
        <Button title="Logout" onPress={() => signOutUser()} />
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
  infoContainer: {
    margin: 20,
  },
  postsContainer: {
    flex: 1,
  },
  noPostContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
});

export default connect(mapStateToProps, mapDispatchProps)(Profile);
