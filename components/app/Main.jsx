import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchUser } from "../../redux/actions";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Feed } from "../app";

const Tab = createBottomTabNavigator();

const Main = ({ fetchUser, currentUser }) => {
  console.log({ currentUser });

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <Tab.Navigator>
      <Tab.Screen name="Feed" component={Feed} />
    </Tab.Navigator>
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
