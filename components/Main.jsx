import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchUser } from "../redux/actions";

import { mainStyles } from "../styles";

const Main = ({ fetchUser, currentUser }) => {
  console.log({ currentUser });

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <View style={mainStyles.container}>
      <Text>Main Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
});
const mapDispatchProps = (dispatch) =>
  bindActionCreators(
    {
      fetchUser,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchProps)(Main);
