import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchUser } from "../redux/actions";

import { mainStyles } from "../styles";

const Main = () => {
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

const mapDispatchProps = (dispatch) =>
  bindActionCreators(
    {
      fetchUser,
    },
    dispatch
  );

export default connect(null, mapDispatchProps)(Main);
