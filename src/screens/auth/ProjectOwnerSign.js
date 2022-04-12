import React, { useEffect, useState, useContext } from "react";
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
import { loginWithEmail } from "~/utils/auth";
import { AuthContext } from "~/context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get("window");

export default ProjectOwnerSign = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const style = styles(insets);
  const [accountDetails, setAccountDetails] = useState({
    email: null,
    password: null,
  });
  const [errors, setError] = useState({
    emailError: null,
    passwordError: null,
  });
  const [signUpDisabled, setSignUpDisabled] = useState(true);
  const authContext = useContext(AuthContext);
  const { setCurrentUser } = authContext;

  useEffect(() => {
    const isEmpty = Object.values(accountDetails).some((x) => x === null);
    isEmpty ? setSignUpDisabled(true) : setSignUpDisabled(false);
    setError({ emailError: null });
    setError({ passwordError: null });
  }, [accountDetails.email, accountDetails.password]);

  const SignIn = () => {
    loginWithEmail(
      accountDetails.email,
      accountDetails.password,
      setCurrentUser,
      loginSuccess,
      setError
    );
  };
  async function loginSuccess(msg) {
    await AsyncStorage.setItem("isUser", "false");
    console.log(msg);
  }
  return (
    <SafeAreaView style={style.container}>
      <View style={style.sheetContainer}>
        <View style={style.contentContainer}>
          <Text style={style.heading}>{"Sign in"}</Text>
          <View style={style.inputContainer}>
            <Input
              placeHolder={"myemail.com"}
              inputHeading={"Email address"}
              value={accountDetails.email}
              error={errors.emailError}
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
              error={errors.passwordError}
              value={accountDetails.password}
              onChange={(e) =>
                setAccountDetails({ ...accountDetails, password: e })
              }
            />
          </View>
          <TouchableOpacity
            style={style.btnContainer}
            onPress={() => SignIn()}
            disabled={signUpDisabled}
          >
            <DisableBtn
              text={"Sign in"}
              customStyle={{
                backgroundColor: signUpDisabled
                  ? Colors.primary.lightGray
                  : Colors.primary.blue,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={style.signupContainer}
            onPress={() => navigation.navigate("SignUp")}
          >
            <Text style={style.signUp}>{"Don’t have an account? Sign up"}</Text>
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
      marginTop: height * 0.06,
    },
    heading: {
      fontSize: 24,
      lineHeight: 28,
      alignSelf: "center",
      paddingTop: height * 0.07,
      fontFamily: Fonts.primary.regular,
      marginBottom: 15,
    },
    inputContainer: {
      marginVertical: height * 0.025,
    },
    btnContainer: {
      marginTop: height * 0.06,
    },
    signupContainer: {
      marginTop: height * 0.03,
      alignItems: "center",
      justifyContent: "center",
    },
    signUp: {
      fontSize: 14,
      lineHeight: 16,
      color: Colors.primary.heading,
      fontFamily: Fonts.primary.regular,
    },
  });
