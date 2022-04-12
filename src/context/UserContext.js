import React, { useState, createContext, useContext } from "react";
import firestore from "@react-native-firebase/firestore";
import { AuthContext } from "./AuthContext";
import { log } from "react-native-reanimated";

export const UserContext = createContext();
export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [chatUsers, setChatUsers] = useState([])
  const authContext = useContext(AuthContext);
  const { currentAuth, currentUser } = authContext;
  const [companyName, setCompanyName] = useState(null);
  const [adminCurrentAuthId,setAdminCurrentAuthId] = useState(null)
  const [count, setCount] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const getUser = () => {
    setIsLoading(true);
    const user =  firestore()
      .collection("users")
      .where("email", "==", currentAuth?.email)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          let singleUser = {
            userId: documentSnapshot.id,
            ...documentSnapshot.data(),
          };
          setUsers(singleUser);
          setIsLoading(false);
        });
      })
      .catch(err => {
        console.log(err), setIsLoading(false);
      });
    return () => user();
  };

  const getUsersMsgList = () => {
    let chatUsers = [];
    const chatUser = firestore()
      .collection('users')
      .where('adminId', '==',currentUser?.adminId || currentAuth?.uid)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((documentSnapshot) => {
          let singleUser = {
            userId: documentSnapshot.id,
            ...documentSnapshot.data(),
          };
          chatUsers.push(singleUser);
        });
        setChatUsers(chatUsers);
      });
    return () => chatUser();
  };
  
  const getAdminIdCurrentAuth = () => {
   const CurrentAdminId = firestore()
   .collection('workerSignedUp')
   .where('email', '==', currentAuth?.email)
   .get()
   .then((querySnapshot) => {
    querySnapshot.forEach((documentSnapshot) => {
      let workerSignUpDetail = {
        adminId: documentSnapshot.adminId,
        ...documentSnapshot.data(),
      }; 
      setAdminCurrentAuthId(workerSignUpDetail.adminId)
    });
   })
   return () => CurrentAdminId()
  }

  const getCompanyDetails = data => {
    const companyDetails = firestore()
      .collection("admins")
      .doc(users.adminId)
      .get()
      .then(querySnapshot => {
        setCompanyName(querySnapshot.data().company);
      })
      .catch(err => {
        console.log(err), setIsLoading(false);
      });
    return () => companyDetails();
  };
 
  return (
    <UserContext.Provider
      value={{
        getUser,
        users,
        isLoading,
        companyName,
        setCompanyName,
        getUsersMsgList,
        chatUsers,
        count,
        setCount,
        getCompanyDetails,
        getAdminIdCurrentAuth,
        adminCurrentAuthId
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
