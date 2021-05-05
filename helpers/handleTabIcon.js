import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Fontisto from "react-native-vector-icons/Fontisto";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";

const handleTabIcon = ({ route, focused, color, size }) => {
  let iconName;
  size = focused ? 30 : 24;
  switch (route.name) {
    case "Feed":
      iconName = focused ? "home" : "home-outline";
      return <Ionicons name={iconName} size={size} color={color} />;
    case "Add":
      size = 24;
      iconName = focused ? "picture" : "picture";
      return focused ? (
        <Fontisto name={iconName} size={size} color={color} />
      ) : (
        <SimpleLineIcons name={iconName} size={size} color={color} />
      );
    case "Profile":
      iconName = focused ? "user" : "user-o";
      return <FontAwesome name={iconName} size={size} color={color} />;
    default:
      return;
  }
};

export default handleTabIcon;
