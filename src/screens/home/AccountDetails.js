import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  Image,
  ActivityIndicator,
} from "react-native";
import { Colors } from "~/constants/Colors";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import Oval from "~/assets/images/signUp/Oval.png";
import Camera from "~/assets/icons/Shape.png";
import SubHeader from "~/components/SubHeader";
import { UserContext } from "../../context/UserContext";
import { Fonts } from "../../constants/Fonts";
import Input from "../../components/Input";
import { updateUser } from "../../utils/user";
import { launchImageLibrary } from "react-native-image-picker";
import { uploadProfilePicture, getProfilePicture } from "../../utils/api";

const { width, height } = Dimensions.get("window");

export default AccountDetails = () => {
  const insets = useSafeAreaInsets();
  const [userFirstName, setUserFirstName] = useState(null);
  const [userLastName, setUserLastName] = useState(null);
  const [profilePicUser, setProfilePicUser] = useState(null);
  const [editable, setEditable] = useState(false);
  const userContext = useContext(UserContext);
  const [inputDisabled, setInputDisabled] = useState(false);
  const { users, isLoading } = userContext;
  const style = styles(insets);

  useEffect(() => {
    setProfilePicUser(users.profileImg);
    setUserFirstName(users.name);
    setUserLastName(users.lastName);
  }, []);

  const edit = () => {
    setInputDisabled(true);
    setEditable(true);
  };

  const save = () => {
    setInputDisabled(false);
    setEditable(false);
    users.name = userFirstName;
    users.lastName = userLastName;
    users["profileImg"] = profilePicUser;
    updateUser(users, updateSuccess);
  };
  const updateSuccess = msg => {
    alert(msg);
  };
  const openPicker = () => {
    launchImageLibrary(options, async response => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else {
        setProfilePicUser(response.assets[0].uri);
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

  return (
    <SafeAreaView style={style.container}>
      <View style={style.sheetContainer}>
        <SubHeader name={"Account Details"} />
        <View style={style.contentContainer}>
          <View style={style.profileImg}>
            <TouchableOpacity
              style={style.imgContainer}
              onPress={editable === true ? () => openPicker() : null}
            >
              <View style={style.imgContainer}>
                {profilePicUser == null ? (
                  <ImageBackground style={style.imgContainer} source={Oval}>
                    <Image source={Camera} />
                  </ImageBackground>
                ) : isLoading == true ? (
                  <ActivityIndicator size="small" color="#0000ff" />
                ) : (
                  <Image
                    style={style.proImg}
                    source={{ uri: profilePicUser }}
                  />
                )}
              </View>
            </TouchableOpacity>
          </View>
          <View style={style.inputContainer}>
            <Input
              placeHolder={"First Name"}
              inputHeading={"First Name"}
              isEditable={editable}
              value={userFirstName}
              onChange={userFirstName => setUserFirstName(userFirstName)}
            />
          </View>
          <View style={style.inputContainer}>
            <Input
              isEditable={editable}
              placeHolder={"Last Name"}
              inputHeading={"Last Name"}
              value={userLastName}
              onChange={userLastName => setUserLastName(userLastName)}
            />
          </View>
          {inputDisabled === false ? (
            <TouchableOpacity onPress={() => edit()}>
              <View style={style.btnContainer}>
                <Text style={style.textMessage}>Edit</Text>
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => save()}>
              <View style={style.btnContainer}>
                <Text style={style.textMessage}>Save</Text>
              </View>
            </TouchableOpacity>
          )}
        </View>
      </View>
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
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      flex: 1,
    },
    contentContainer: {
      height: height * height * 0.02,
      paddingHorizontal: width * 0.1,
    },
    heading: {
      fontSize: 24,
      lineHeight: 28,
      alignSelf: "center",
      paddingTop: height * 0.08,
    },
    inputContainer: {
      marginVertical: height * 0.03,
    },
    btnContainer: {
      marginTop: 40,
      backgroundColor: Colors.primary.blue,
      alignItems: "center",
      justifyContent: "center",
      height: height * 0.06,
    },
    textMessage: {
      color: Colors.primary.white,
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
      marginTop: height * 0.03,
    },
    proImg: {
      width: 109,
      height: 109,
      borderRadius: (height * 109) / 2,
      resizeMode: "cover",
    },
    textValue: {
      width: width * 281,
      fontSize: width * 15,
      lineHeight: width * 22,
      marginTop: height * 10,
      paddingBottom: height * 10,
      fontFamily: Fonts.primary.regular,
      color: Colors.primary.heading,
      borderBottomWidth: 0.5,
      borderBottomColor: Colors.primary.secondGray,
    },
  });
