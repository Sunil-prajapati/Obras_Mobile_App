import React, { useState, useContext, useEffect } from "react";
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
import { launchImageLibrary } from "react-native-image-picker";

const { width, height } = Dimensions.get("window");

export default CompleteYourProfile = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [accountDetails, setAccountDetails] = useState({
    industry: null,
    address: null,
    EIN: null,
  });
  const style = styles(insets);
  const [profilePic, setProfilePic] = useState(null);
  const [signUpDisabled, setSignUpDisabled] = useState(true);

  useEffect(() => {
    const isEmpty = Object.values(accountDetails).some(x => x === null);
    isEmpty ? setSignUpDisabled(true) : setSignUpDisabled(false);
  }, [accountDetails.industry, accountDetails.address, accountDetails.EIN]);

  const options = {
    title: "Select Avatar",
    noData: true,
    storageOptions: {
      skipBackup: true,
      path: "images",
    },
  };

  const openPicker = () => {
    launchImageLibrary(options, async response => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else {
        setProfilePic(response.assets[0].uri);
      }
    });
  };

  return (
    <SafeAreaView style={style.container}>
      <View style={style.sheetContainer}>
        <View style={style.contentContainer}>
          <Text style={style.heading}>{"Complete your profile"}</Text>
          <TouchableOpacity
            style={style.profileImg}
            onPress={() => openPicker()}
          >
            {profilePic == null ? (
              <ImageBackground style={style.imgContainer} source={Oval}>
                <Image source={Camera} />
              </ImageBackground>
            ) : (
              <View style={style.imgContainer}>
                <Image style={style.proImg} source={{ uri: profilePic }} />
              </View>
            )}
          </TouchableOpacity>
          <View style={style.inputContainer}>
            <Input
              placeHolder={"Type"}
              inputHeading={"industry"}
              value={accountDetails.industry}
              onChange={e =>
                setAccountDetails({ ...accountDetails, industry: e })
              }
            />
          </View>
          <View style={style.inputContainer}>
            <Input
              placeHolder={"Location"}
              inputHeading={"address"}
              value={accountDetails.address}
              onChange={e =>
                setAccountDetails({ ...accountDetails, address: e })
              }
            />
          </View>
          <View style={style.inputContainer}>
            <Input
              placeHolder={"00000"}
              inputHeading={"EIN"}
              value={accountDetails.EIN}
              onChange={e => setAccountDetails({ ...accountDetails, EIN: e })}
            />
          </View>
          <TouchableOpacity
            style={style.btnContainer}
            onPress={() => navigation.navigate("InviteFriends")}
            disabled={signUpDisabled}
          >
            <DisableBtn
              text={"Continue"}
              customStyle={{
                backgroundColor: signUpDisabled
                  ? Colors.primary.lightGray
                  : Colors.primary.blue,
              }}
            />
          </TouchableOpacity>
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
      borderRadius: (height * 109) / 2,
      resizeMode: "cover",
    },
  });
