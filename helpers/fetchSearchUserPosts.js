import db from "../firebaseConfig";

const fetchSearchUserPosts = (uid) => {
  const results = db
    .collection("posts")
    .doc(uid)
    .collection("userPosts")
    .orderBy("createdAt", "asc")
    .get()
    .then((snapshot) => {
      let posts = snapshot.docs.map((doc) => {
        const data = doc.data();
        const uid = doc.id;

        return { uid, ...data };
      });
      return posts;
    })
    .catch((err) => {
      return err;
    });

  return results;
};

export default fetchSearchUserPosts;
