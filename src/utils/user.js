import firestore from "@react-native-firebase/firestore";

export const updateUser = (data, onSuccess) => {
  data.updatedAt = new Date();
  firestore()
    .collection("users")
    .doc(data.userId)
    .update(data)
    .then(() => {
      onSuccess("update user Projects  Successfully");
    })
    .catch((e) => {
      console.log("update user Projects  error", e);
    });
};
