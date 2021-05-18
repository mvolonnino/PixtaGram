import db from "../firebaseConfig";

const handleUnFollow = (currentUserUID, passedUID) => {
  db.collection("following")
    .doc(currentUserUID)
    .collection("userFollowing")
    .doc(passedUID)
    .delete({});
};

export default handleUnFollow;
