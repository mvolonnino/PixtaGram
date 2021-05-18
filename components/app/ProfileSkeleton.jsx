import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

const ProfileSkeleton = () => {
  return (
    <ScrollView style={styles.container}>
      <SkeletonPlaceholder>
        <View style={styles.userInfoContainer}>
          <View style={{ width: 60, height: 60, borderRadius: 50 }} />
          <View style={{ marginLeft: 20 }}>
            <View style={{ width: 120, height: 20, borderRadius: 4 }} />
            <View
              style={{ marginTop: 6, width: 80, height: 20, borderRadius: 4 }}
            />
          </View>
        </View>
        <View style={styles.userPostsContainer}>
          <View style={styles.userPosts} />
          <View style={styles.userPosts} />
          <View style={styles.userPosts} />
        </View>
        <View style={styles.userPostsContainer}>
          <View style={styles.userPosts} />
          <View style={styles.userPosts} />
          <View style={styles.userPosts} />
        </View>
      </SkeletonPlaceholder>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  userPostsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  userPosts: {
    margin: 3,
    width: 120,
    height: 120,
    aspectRatio: 1 / 1,
    borderRadius: 10,
  },
});
export default ProfileSkeleton;
