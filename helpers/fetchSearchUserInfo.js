import db from "../firebaseConfig";

const fetchSearchUserPosts = (uid) => {
  const results = db
    .collection("users")
    .doc(uid)
    .get()
    .then((snapshot) => {
      if (snapshot.exists) {
        let user = snapshot.data();
        return user;
      }
      console.log("this user doesnt not exist");
    })
    .catch((err) => {
      return err;
    });

  return results;
};

export default fetchSearchUserPosts;
