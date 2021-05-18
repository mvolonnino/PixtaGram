import db, { auth } from "../../firebaseConfig";

import {
  USER_STATE_CHANGE,
  USER_POSTS_STATE_CHANGE,
  USER_LOGOUT,
} from "../constants/index";

export function fetchUser() {
  console.log("fetching user info...");

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
  console.log("fetching user posts...");

  return (dispatch) => {
    db.collection("posts")
      .doc(auth.currentUser.uid)
      .collection("userPosts")
      .orderBy("createdAt", "asc")
      .onSnapshot((snapshot) => {
        let posts = snapshot.docs.map((doc) => {
          const data = doc.data();
          const uid = doc.id;

          return { uid, ...data };
        });
        dispatch({
          type: USER_POSTS_STATE_CHANGE,
          posts,
        });
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
