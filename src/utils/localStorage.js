import AsyncStorage from "@react-native-async-storage/async-storage";
export const getUserType = async () => {
  try {
    let checkUser = await AsyncStorage.getItem("isUser");
    let isUserWorkerType = checkUser;
    if (isUserWorkerType == "true" && isUserWorkerType !== null) {
      return true;
    } else {
      return false;
    }
  } catch {
    (err) => console.log(err);
  }
};
