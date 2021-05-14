import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchUser, fetchUserPosts } from "../redux/actions/index";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Feed, Profile, Search } from "./index";
import { handleTabIcon } from "../helpers";

const Tab = createBottomTabNavigator();

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
  posts: store.userState.posts,
});

const mapDispatchProps = (dispatch) =>
  bindActionCreators(
    {
      fetchUser,
      fetchUserPosts,
    },
    dispatch
  );

const EmptyScreen = () => {
  return null;
};

const Main = ({ fetchUser, fetchUserPosts, currentUser, posts }) => {
  useEffect(() => {
    if (!currentUser) {
      fetchUser();
    }

    if (posts.length === 0) {
      fetchUserPosts();
    }
  }, []);

  return (
    <Tab.Navigator
      initialRouteName="Feed"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) =>
          handleTabIcon({
            route,
            focused,
            color,
            size,
          }),
      })}
      tabBarOptions={{
        activeTintColor: "cyan",
        inactiveTintColor: "lightgray",
        showLabel: false,
        style: {
          backgroundColor: "#051426",
        },
      }}
    >
      <Tab.Screen name="Feed" component={Feed} />
      <Tab.Screen
        name="AddContainer"
        component={EmptyScreen}
        listeners={({ navigation }) => ({
          tabPress: (event) => {
            event.preventDefault();
            navigation.navigate("Add");
          },
        })}
      />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default connect(mapStateToProps, mapDispatchProps)(Main);
