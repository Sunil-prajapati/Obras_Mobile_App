import firestore from "@react-native-firebase/firestore";

export const updateProject = (data, onSuccess) => {
  data.updatedAt = new Date();
  firestore()
    .collection("projects")
    // .doc(data.adminId)
    // .update({
    //   userRestDetail: userRestDetail.arrayUnion(data),
    // })
    .then(() => {
      onSuccess("update user Projects  Successfully");
    })
    .catch(e => {
      console.log("update user Projects  error", e);
    });
};
