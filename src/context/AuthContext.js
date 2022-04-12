import React, { useState, createContext, useEffect } from "react";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { getProfilePicture } from "../utils/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUserType } from "../utils/localStorage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [initializing, setInitializing] = useState(true);
  const [currentAuth, setCurrentAuth] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [onboarding, setOnboarding] = useState(false);
  const [userTypeIsUser, setUserTypeIsUser] = useState(null);

  function onAuthStateChanged(auth) {
    setCurrentAuth(auth);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    getUserType().then(res => {
      setUserTypeIsUser(res);
    });
    return subscriber;
  }, [userTypeIsUser]);

  async function checkUser() {
    try {
      let isUser = await AsyncStorage.getItem("isUser");
      if (JSON.parse(isUser) == false) {
        if (currentAuth && JSON.parse(isUser) !== null) {
          const subscriber = await firestore()
            .collection("admins")
            .doc(currentAuth.uid)
            .onSnapshot(documentSnapshot => {
              if (documentSnapshot.exists) {
                let user = {
                  id: currentAuth.uid,
                  ...documentSnapshot.data(),
                };
                setCurrentUser(user);
              } else {
                // setCurrentUser(null);
                console.log("1");
                setOnboarding(true);
              }
            });
          return () => subscriber();
        } else {
          setCurrentUser(null);
          console.log("2");
        }
      } else if (JSON.parse(isUser) == true) {
        if (currentAuth) {
          const workerSubscriber = await firestore()
            .collection("users")
            .where("email", "==", currentAuth.email)
            .get()
            .then(querySnapshot => {
              querySnapshot.forEach(documentSnapshot => {
                let singleUser = {
                  id: documentSnapshot.userId,
                  ...documentSnapshot.data(),
                };
                setCurrentUser(singleUser);
              });
            });
          return () => workerSubscriber();
        } else {
          // setCurrentUser(null);
          console.log("3");
        }
      } else {
        console.log("local storage is null");
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    checkUser();
  }, [currentAuth]);

  useEffect(() => {
    // getProfilePicture(currentAuth.uid, setHeadshot)
  }, [currentUser]);

  if (initializing) return null;
  return (
    <AuthContext.Provider
      value={{
        currentAuth,
        setCurrentAuth,
        currentUser,
        setCurrentUser,
        onboarding,
        setOnboarding,
        userTypeIsUser,
        setUserTypeIsUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
