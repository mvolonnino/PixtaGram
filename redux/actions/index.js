import db, { auth } from "../../firebaseConfig";

import {
  USER_STATE_CHANGE,
  USER_POSTS_STATE_CHANGE,
  USER_LOGOUT,
  USER_FOLLOWING_STATE_CHANGE,
  USERS_POSTS_STATE_CHANGE,
  USERS_DATA_STATE_CHANGE,
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

export function fetchUserFollowing() {
  console.log("fetching user following...");

  return (dispatch) => {
    db.collection("following")
      .doc(auth.currentUser.uid)
      .collection("userFollowing")
      .onSnapshot((snapshot) => {
        let following = snapshot.docs.map((doc) => {
          const uid = doc.id;

          return uid;
        });
        dispatch({
          type: USER_FOLLOWING_STATE_CHANGE,
          following,
        });
        for (let i = 0; i < following.length; i++) {
          dispatch(fetchUsersData(following[i]));
        }
      });
  };
}

export function fetchUsersData(uid) {
  return (dispatch, getState) => {
    const foundUser = getState().usersState.users.some(
      (user) => user.uid === uid
    );

    if (!foundUser) {
      db.collection("users")
        .doc(uid)
        .get()
        .then((snapshot) => {
          if (snapshot.exists) {
            let user = snapshot.data();
            user.uid = snapshot.id;

            dispatch({
              type: USERS_DATA_STATE_CHANGE,
              user,
            });
            dispatch(fetchUsersFollowingPosts(user.uid));
          } else {
            console.log("user does not exist...");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
}

export function fetchUsersFollowingPosts(uid) {
  console.log("fetching user posts...");

  return (dispatch, getState) => {
    db.collection("posts")
      .doc(uid)
      .collection("userPosts")
      .orderBy("createdAt", "asc")
      .get()
      .then((snapshot) => {
        // const uid = snapshot.query.EP.path.segments[1];
        // console.log("snapshot in fetch user following posts => ", {
        //   snapshot,
        //   uid,
        // });

        const findUser = getState().usersState.users.find(
          (user) => user.uid === uid
        );

        let posts = snapshot.docs.map((doc) => {
          const data = doc.data();
          const uid = doc.id;

          return { uid, ...data, findUser };
        });
        dispatch({
          type: USERS_POSTS_STATE_CHANGE,
          posts,
          uid,
        });
        console.log(getState());
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
        console.log("error signing out user => ", { err });
      });
  };
}
