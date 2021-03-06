import React from "react";
import {
  Ionicons,
  FontAwesome,
  MaterialIcons,
} from "react-native-vector-icons";

const handleTabIcon = ({ route, focused, color, size }) => {
  let iconName;
  size = 26;
  switch (route.name) {
    case "Feed":
      iconName = focused ? "home" : "home-outline";
      return <Ionicons name={iconName} size={size} color={color} />;
    case "AddContainer":
      iconName = focused ? "add-to-photos" : "add-to-photos";
      return <MaterialIcons name={iconName} size={size} color={color} />;
    case "Search":
      size = 28;
      iconName = focused ? "search" : "search-outline";
      return <Ionicons name={iconName} size={size} color={color} />;
    case "Profile":
      iconName = focused ? "user" : "user-o";
      return <FontAwesome name={iconName} size={size} color={color} />;
    default:
      return;
  }
};

export default handleTabIcon;
