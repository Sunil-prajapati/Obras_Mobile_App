import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

export const signUpWithEmail = async (
  email,
  password,
  setError,
  onSuccess,
  setCurrentAuth
) => {
  auth()
    .createUserWithEmailAndPassword(email, password)
    .then(response => {
      setCurrentAuth(response.user);
      onSuccess(response.user);
    })
    .catch(err => {
      let error = err.message;
      console.log("authApi signUpWithEmail failed error", error);
      let message = null;
      if (error.includes("email")) {
        if (error.includes("invalid-email")) {
          message = "Invalid email address";
        }
        if (error.includes("email-already-in-use")) {
          message = "Email already exists";
        }
        setError({ emailError: message });
      }

      if (error.includes("password")) {
        message = "Password must be at least 6 characters";
        setError({ passwordError: message });
      }
    });
};

export const loginWithEmail = async (
  email,
  password,
  setCurrentUser,
  onSuccess,
  setError
) => {
  auth()
    .signInWithEmailAndPassword(email, password)
    .then(user => {
      setCurrentUser(user.user);
      onSuccess("login success");
    })
    .catch(err => {
      let error = err.message;
      console.log("authApi loginWithEmail failed error", error);

      let message = null;
      if (!error.includes("password")) {
        if (error.includes("user-not-found")) {
          message = "User not found";
        }
        if (error.includes("user-disabled")) {
          message = "User account has been disabled";
        }
        if (error.includes("invalid-email")) {
          message = "Invalid email address";
        }
        setError({ emailError: message });
      }

      if (error.includes("password")) {
        message = "Incorrect password";
        setError({ passwordError: message });
      }
    });
};

export const workerLoginWithEmail = async (
  email,
  password,
  onSuccess,
  setError
) => {
  auth()
    .signInWithEmailAndPassword(email, password)
    .then(user => {
      onSuccess("login success");
    })
    .catch(err => {
      let error = err.message;
      console.log("authApi loginWithEmail failed error", error);

      let message = null;
      if (!error.includes("password")) {
        if (error.includes("user-not-found")) {
          message = "User not found";
        }
        if (error.includes("user-disabled")) {
          message = "User account has been disabled";
        }
        if (error.includes("invalid-email")) {
          message = "Invalid email address";
        }
        setError({ emailError: message });
      }

      if (error.includes("password")) {
        message = "Incorrect password";
        setError({ passwordError: message });
      }
    });
};

export const checkWorkerUserSignUp = (email, setCurrentUser, success) => {
  firestore()
    .collection("workerSignedUp")
    .where("email", "==", email)
    .get()
    .then(querySnapshot => { 
      querySnapshot.forEach(documentSnapshot => {
        setCurrentUser(documentSnapshot.data());
        success("worker user exist");
      });
    });
};

export const logout = setCurrentAuth => {
  auth()
    .signOut()
    .then(() => {
      setCurrentAuth(null);
    });
};

export const workerSignedUp = (data, onSuccess) => {
  data.createdAt = new Date();
  firestore()
    .collection("workerSignedUp")
    .doc(data.adminId)
    .set(data)
    .then(() => {
      onSuccess("workerSignedUp Created successful");
    })
    .catch(e => {
      console.log("workerSignedUp createUser error", e);
    });
};
