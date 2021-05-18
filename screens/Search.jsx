import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TextInput,
  FlatList,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import db from "../firebaseConfig";
require("firebase/firestore");

const Search = ({ navigation }) => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  const fetchUsers = (searchParam) => {
    db.collection("users")
      .where("nameSearchArr", "array-contains", searchParam)
      .get()
      .then((snapshot) => {
        let users = snapshot.docs.map((doc) => {
          const data = doc.data();
          const uid = doc.id;

          return { uid, ...data };
        });
        setUsers(users);
      });
  };

  const renderItem = ({ item }) => (
    <ScrollView key={item.uid}>
      <TouchableOpacity
        onPress={() => navigation.navigate("Profile", { profile: item })}
      >
        <Text>{item.displayName}</Text>
      </TouchableOpacity>
    </ScrollView>
  );

  useEffect(() => {
    if (search) {
      fetchUsers(search);
    } else {
      setSearch("");
      setUsers([]);
    }
  }, [search]);

  return (
    <View style={styles.container}>
      <TextInput
        onChangeText={(value) => setSearch(value)}
        placeholder="Search users..."
      />

      {search && users.length > 0 ? (
        <FlatList
          numColumns={1}
          horizontal={false}
          data={users}
          renderItem={renderItem}
          keyExtractor={(item) => item.uid}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 50,
    padding: 20,
  },
});

export default Search;
