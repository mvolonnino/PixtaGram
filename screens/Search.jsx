import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TextInput,
  FlatList,
  StyleSheet,
  ScrollView,
} from "react-native";

import db from "../firebaseConfig";
require("firebase/firestore");

const Search = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  console.log({ users });

  const fetchUsers = (searchParam) => {
    console.log(searchParam);
    db.collection("users")
      .where("nameSearchArr", "array-contains", searchParam)
      .get()
      .then((snapshot) => {
        let users = snapshot.docs.map((doc) => {
          const data = doc.data();
          const doc_id = doc.id;

          return { doc_id, ...data };
        });
        setUsers(users);
      });
  };

  const renderItem = ({ item }) => (
    <View key={item.doc_id}>
      <Text>{item.displayName}</Text>
    </View>
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
          keyExtractor={(item) => item.doc_id}
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
