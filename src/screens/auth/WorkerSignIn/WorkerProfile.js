import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";

import { useNavigation } from '@react-navigation/native';
import { Colors } from "~/constants/Colors";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import Input from "~/components/Input";
import DisableBtn from "~/components/DisableBtn";
import Oval from "~/assets/images/signUp/Oval.png";
import Camera from "~/assets/icons/Shape.png";
import AddIcon from "~/components/AddIcon";
import { uploadProfilePicture, getProfilePicture } from "../../../utils/api";
import { launchImageLibrary } from "react-native-image-picker";
import { updateUser } from "~/utils/user";
import { AuthContext } from "~/context/AuthContext";
import { UserContext } from "~/context/UserContext";
import { loginWithEmail } from "~/utils/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { checkWorkerUserSignUp } from "../../../utils/auth";
import { updateProject } from "~/utils/project";
import { ProjectContext } from "../../../context/ProjectContext";

const { width, height } = Dimensions.get("window");

export default CompleteYourProfile = props => {
  const { userCredentials } = props.route.params;
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [accountDetails, setAccountDetails] = useState({
    name: null,
    lastName: null,
    note: null,
  });
  const [signUpDisabled, setSignUpDisabled] = useState(true);
  const [buttonChange, setButtonChange] = useState(true);
  const [profilePic, setProfilePic] = useState(null);
  const authContext = useContext(AuthContext);
  const { currentAuth, setCurrentUser } = authContext;
  const userContext = useContext(UserContext);
  const projectContext = useContext(ProjectContext);
  const { getUser, users } = userContext;
  const { projects, getProjects } = projectContext;
  const style = styles(insets);

  useEffect(() => {
    getProjects();
    getUser();
    const isEmpty = Object.values(accountDetails).some(x => x === null);
    isEmpty ? setSignUpDisabled(true) : setSignUpDisabled(false);
    const isText = Object.values(accountDetails).some(x => x === null);
    isText ? setButtonChange(false) : setButtonChange(true);
  }, [accountDetails.name, accountDetails.lastName, accountDetails.note]);

  function setError() {}

  const openPicker = () => {
    launchImageLibrary(options, async response => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else {
        setProfilePic(response.assets[0].uri);
        uploadProfilePicture(response.assets[0].uri, setError, onSuccess);
      }
    });
  };

  const onSuccess = result => {
    if (result == "success") {
      getProfilePicture(currentAuth.uid, setProfilePic);
    } else {
      alert("something went wrong");
    }
  };

  const options = {
    title: "Select Avatar",
    noData: true,
    storageOptions: {
      skipBackup: true,
      path: "images",
    },
  };

  const handleSaveUser = () => {
    (users.name = accountDetails.name),
      (users.lastName = accountDetails.lastName);
    (users["note"] = accountDetails.note),
      (users["profileImg"] = profilePic),
      updateUser(users, updateSuccess);
    // updateProject();
  };

  function updateSuccess(msg) {
    console.log(msg);
    loginWithEmail(
      userCredentials.email,
      userCredentials.password,
      setCurrentUser,
      loginSuccess
    );
  }

  async function loginSuccess(msg) {

    checkWorkerUserSignUp(
      userCredentials.email,
      setCurrentUser,
      successSignUpCheck
    );
    console.log(msg);
  }
  function successSignUpCheck(msg) {
    console.log(msg);
  }
  return (
    <SafeAreaView style={style.container}>
      <KeyboardAwareScrollView>
        <View style={style.sheetContainer}>
          <View style={style.contentContainer}>
            <Text style={style.heading}>{"Complete your profile"}</Text>
            <View style={style.profileImg}>
              <TouchableOpacity
                style={style.imgContainer}
                onPress={() => openPicker()}
              >
                <View style={style.imgContainer}>
                  {profilePic == null ? (
                    <ImageBackground style={style.imgContainer} source={Oval}>
                      <Image source={Camera} />
                    </ImageBackground>
                  ) : (
                    <Image style={style.proImg} source={{ uri: profilePic }} />
                  )}
                </View>
              </TouchableOpacity>
            </View>
            <View style={style.inputContainer}>
              <Input
                placeHolder={"First Name"}
                inputHeading={"First Name"}
                value={accountDetails.name}
                onChange={e =>
                  setAccountDetails({ ...accountDetails, name: e })
                }
              />
            </View>
            <View style={style.inputContainer}>
              <Input
                placeHolder={"Last Name"}
                inputHeading={"last Name"}
                value={accountDetails.lastName}
                onChange={e =>
                  setAccountDetails({ ...accountDetails, lastName: e })
                }
              />
            </View>
            <View style={style.inputContainer}>
              <Input
                placeHolder={"Placeholder"}
                inputHeading={"Notes"}
                value={accountDetails.note}
                onChange={e =>
                  setAccountDetails({ ...accountDetails, note: e })
                }
              />
            </View>
            <View style={style.credentialContainer}>
              <Text style={style.credential}>{"Credential"}</Text>
              <Text style={style.none}>{"None"}</Text>
            </View>
            <AddIcon line={"Add credential"} />
            <TouchableOpacity
              style={style.btnContainer}
              onPress={() => handleSaveUser()}
            >
              <DisableBtn
                text={buttonChange ? "Done" : "Continue"}
                customStyle={{
                  backgroundColor: signUpDisabled
                    ? Colors.primary.lightGray
                    : Colors.primary.blue,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = insets =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.primary.blue,
      justifyContent: "space-between",
    },
    sheetContainer: {
      width: width,
      height: height,
      backgroundColor: Colors.primary.white,
      marginTop: height * 0.1,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
    contentContainer: {
      height: height,
      paddingHorizontal: width * 0.1,
    },
    heading: {
      fontSize: 24,
      lineHeight: 28,
      alignSelf: "center",
      paddingTop: height * 0.07,
    },
    inputContainer: {
      marginTop: 30,
    },
    btnContainer: {
      marginTop: 40,
    },
    profileImg: {
      marginTop: 25,
      alignItems: "center",
    },
    imgContainer: {
      width: 109,
      height: 109,
      alignItems: "center",
      justifyContent: "center",
    },
    proImg: {
      width: 109,
      height: 109,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: (height * 109) / 2,
      resizeMode: "cover",
    },
    credentialContainer: {
      width: width * 0.77,
      height: height * 0.05,
      display: "flex",
      justifyContent: "space-between",
      flexDirection: "row",
      backgroundColor: Colors.primary.white,
      marginTop: height * 0.02,
      borderBottomWidth: 1,
      borderColor: Colors.primary.line,
    },
    credential: {
      alignSelf: "center",
      paddingLeft: 10,
      color: Colors.primary.textOne,
    },
    none: {
      alignSelf: "center",
      paddingRight: 10,
      color: Colors.primary.lightGray,
    },
  });
