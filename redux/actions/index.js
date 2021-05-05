import db, { auth } from "../../firebaseConfig";

import { USER_STATE_CHANGE } from "../constants/index";

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
