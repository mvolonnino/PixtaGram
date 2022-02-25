import db from "../firebaseConfig";

const handleFollow = (currentUserUID, passedUID) => {
  db.collection("following")
    .doc(currentUserUID)
    .collection("userFollowing")
    .doc(passedUID)
    .set({})
    .catch((error) => console.log("error following user => ", { error }));
};

export default handleFollow;
