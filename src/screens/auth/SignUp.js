import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from '@react-navigation/native';
import { Colors } from "~/constants/Colors";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import Input from "~/components/Input";
import DisableBtn from "~/components/DisableBtn";
import { Fonts } from "../../constants/Fonts";
import { AuthContext } from "../../context/AuthContext";
import { signUpWithEmail } from "../../utils/auth/";

const { width, height } = Dimensions.get("window");

export default Signup = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [accountDetails, setAccountDetails] = useState({
    company: null,
    firstName: null,
    lastName: null,
    email: null,
    password: null,
  });
  const [signUpDisabled, setSignUpDisabled] = useState(true);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const authContext = useContext(AuthContext);
  const { setCurrentAuth } = authContext;
  const style = styles(insets);

  useEffect(() => {
    const isEmpty = Object.values(accountDetails).some((x) => x === null);
    isEmpty ? setSignUpDisabled(true) : setSignUpDisabled(false);
  }, [
    accountDetails.company,
    accountDetails.firstName,
    accountDetails.lastName,
    accountDetails.email,
    accountDetails.password,
  ]);

  const pressContinue = () => {
    navigation.navigate("CompleteYourProfile");
    // signUpWithEmail(accountDetails.email, accountDetails.password,setCurrentAuth, setEmailError, setPasswordError, onSuccess)
  };

  return (
    <SafeAreaView style={style.container}>
      <View style={style.sheetContainer}>
        <View style={style.contentContainer}>
          <Text style={style.heading}>{"Let’s set up your account"}</Text>
          <View style={style.inputContainer}>
            <Input
              placeHolder={"Company"}
              inputHeading={"company"}
              value={accountDetails.company}
              onChange={(e) =>
                setAccountDetails({ ...accountDetails, company: e })
              }
            />
          </View>
          <View style={style.inputContainer}>
            <Input
              placeHolder={"First Name"}
              inputHeading={"First name"}
              value={accountDetails.firstName}
              onChange={(e) =>
                setAccountDetails({ ...accountDetails, firstName: e })
              }
            />
          </View>
          <View style={style.inputContainer}>
            <Input
              placeHolder={"Last Name"}
              inputHeading={"Last name"}
              value={accountDetails.lastName}
              onChange={(e) =>
                setAccountDetails({ ...accountDetails, lastName: e })
              }
            />
          </View>
          <View style={style.inputContainer}>
            <Input
              placeHolder={"myemail.com"}
              inputHeading={"work email address"}
              value={accountDetails.email}
              onChange={(e) =>
                setAccountDetails({ ...accountDetails, email: e })
              }
            />
          </View>
          <View style={style.inputContainer}>
            <Input
              placeHolder={"***********"}
              inputHeading={"password"}
              password
              value={accountDetails.password}
              onChange={(e) =>
                setAccountDetails({ ...accountDetails, password: e })
              }
            />
          </View>
          <TouchableOpacity
            style={style.btnContainer}
            onPress={() => pressContinue()}
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

const styles = (insets) =>
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
      fontFamily: Fonts.primary.regular,
    },
    inputContainer: {
      marginTop: 30,
    },
    btnContainer: {
      marginTop: 40,
    },
  });
