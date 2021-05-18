import db from "../firebaseConfig";

const handleFollow = (currentUserUID, passedUID) => {
  db.collection("following")
    .doc(currentUserUID)
    .collection("userFollowing")
    .doc(passedUID)
    .set({});
};

export default handleFollow;
