import { useState, useEffect } from "react";
import db from "../firebaseConfig";

const useFirebase = (uid, param) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setIsLoading(true);
    switch (param) {
      case "fetchSearchedUserPosts":
        db.collection("posts")
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
            setData(posts);
          })
          .catch((error) => setError(error.message))
          .finally(setIsLoading(false));
        return;
      default:
        return;
    }
  }, [uid, param]);

  return { data, isLoading, error };
};

export default useFirebase;
