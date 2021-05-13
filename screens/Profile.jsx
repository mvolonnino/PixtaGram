import React from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";

import { mainStyles } from "../styles";

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
  posts: store.userState.posts,
});

const Profile = () => {
  return (
    <View style={mainStyles.container}>
      <Text>Profile Screen</Text>
    </View>
  );
};

export default Profile;
