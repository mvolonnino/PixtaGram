import React, { useState } from "react";
import { Text, View, TextInput, FlatList } from "react-native";

import db from "../firebaseConfig";
require("firebase/firestore");

const Search = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = (searchParam) => {
    console.log({ searchParam });
    db.collection("users")
      .where("name", ">=", searchParam)
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
  return (
    <View>
      <TextInput
        onChange={(searchParam) => fetchUsers(searchParam)}
        placeholder="Search users..."
      />

      <FlatList
        numColumns={1}
        horizontal={false}
        data={users}
        renderItem={({ item }) => <Text>{item.name}</Text>}
      />
    </View>
  );
};

export default Search;
