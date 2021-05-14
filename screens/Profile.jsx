import React, { useEffect, useState } from "react";
import { View, Text, Image, FlatList, StyleSheet, Button } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchUserPosts, signOutUser } from "../redux/actions";
import LoadingAnimation from "../components/LoadingAnimation";

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

const Profile = ({ signOutUser, posts, currentUser }) => {
  const [loading, setLoading] = useState(true);
  console.log({ posts, currentUser });

  useEffect(() => {
    if (posts.length === 0) {
      fetchUserPosts();
    }
    if (posts.length > 0) {
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    }
  }, [posts]);

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text>{currentUser?.name}</Text>
        <Text>{currentUser?.email}</Text>
      </View>
      {loading ? (
        <LoadingAnimation />
      ) : (
        <View style={styles.postsContainer}>
          <FlatList
            numColumns={3}
            horizontal={false}
            data={posts}
            renderItem={({ item }) => (
              <View style={styles.imageContainer}>
                <Image
                  source={{ uri: item.downloadURL }}
                  style={styles.image}
                />
              </View>
            )}
          />
        </View>
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
    marginTop: 40,
  },
  infoContainer: {
    margin: 20,
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
  },
});

export default connect(mapStateToProps, mapDispatchProps)(Profile);
