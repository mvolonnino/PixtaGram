import db, { auth } from "../../firebaseConfig";

import {
  USER_STATE_CHANGE,
  USER_POSTS_STATE_CHANGE,
  USER_LOGOUT,
} from "../constants/index";

export function fetchUser() {
  return (dispatch) => {
    db.collection("users")
      .doc(auth.currentUser.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          dispatch({
            type: USER_STATE_CHANGE,
            currentUser: snapshot.data(),
          });
        } else {
          console.log("user does not exist...");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function fetchUserPosts() {
  return (dispatch) => {
    db.collection("posts")
      .doc(auth.currentUser.uid)
      .collection("userPosts")
      .orderBy("createdAt", "asc")
      .get()
      .then((snapshot) => {
        let posts = snapshot.docs.map((doc) => {
          const data = doc.data();
          const doc_id = doc.id;

          return { doc_id, ...data };
        });
        dispatch({
          type: USER_POSTS_STATE_CHANGE,
          posts,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function signOutUser() {
  return (dispatch) => {
    auth
      .signOut()
      .then(() => {
        dispatch({
          type: USER_LOGOUT,
        });
      })
      .catch((err) => {
        console.log("error signing out user => ", err);
      });
  };
}
