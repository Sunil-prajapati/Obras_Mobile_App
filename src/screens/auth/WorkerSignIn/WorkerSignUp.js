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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { signUpWithEmail, workerSignedUp } from "../../../utils/auth";
import { AuthContext } from "../../../context/AuthContext";
import { ProjectContext } from "../../../context/ProjectContext";
import { error } from "react-native-gifted-chat/lib/utils";
import { onChange } from "react-native-reanimated";
import { UserContext } from "../../../context/UserContext";


const { width, height } = Dimensions.get("window");

export default WorkerSignUp = props => {
  const SignUpDetails = props.route.params.SignUpDetails;
  const navigation = useNavigation();
  const projectContext = useContext(ProjectContext);
  const { getProjects } = projectContext;
  const insets = useSafeAreaInsets();
  const [errors, setError] = useState({
    emailError: null,
    passwordError: null,
  });

  const [accountDetails, setAccountDetails] = useState({
    email: SignUpDetails?.email,
    password: null,
    confirmPassword: null,
  });
  const [signUpDisabled, setSignUpDisabled] = useState(true);
  const authContext = useContext(AuthContext);
  const { setCurrentAuth } = authContext;
  const userContext = useContext(UserContext);
  const { setCompanyName} = userContext;
  const style = styles(insets);

  useEffect( () => {
    setCompanyName(SignUpDetails.companyName);
    const isEmpty = Object.values(accountDetails).some(x => x === null);
    isEmpty ? setSignUpDisabled(true) : setSignUpDisabled(false);
    setError({ emailError: null });
    setError({ passwordError: null });
  }, [
    accountDetails.email,
    accountDetails.password,
    accountDetails.confirmPassword,
  ]);

  const onSuccess = userData => {
    workerSignedUp(SignUpDetails, workerSignUpSuccess);
    getProjects();
  };

  const workerSignUpSuccess = async () => {
    await AsyncStorage.setItem("isUser", "true");
    let userCredentials = {
      email: accountDetails.email,
      password: accountDetails.password,
    };
    navigation.navigate("WorkerProfile", { userCredentials });
    setAccountDetails({ email: null, password: null });
  };

   const pressContinue = () => {
    if (accountDetails.password === accountDetails.confirmPassword) {
      const { email, password } = accountDetails;
      signUpWithEmail(email, password, setError, onSuccess, setCurrentAuth);
    } else {
      alert("Passwords mismatch");
    }
  };

  return (
    <SafeAreaView style={style.container}>
      <View style={style.sheetContainer}>
        <View style={style.contentContainer}>
          <Text style={style.heading}>{"Complete your profile"}</Text>
          <View style={style.subContainer}>
            <View style={style.inputContainer}>
              <Input
                placeHolder={"myemail.com"}
                inputHeading={"Email address"}
                value={SignUpDetails?.email}
                error={errors.emailError}
                onChange={e =>
                  setAccountDetails({ ...accountDetails, email: e })
                }
              />
            </View>
            <View style={style.inputContainer}>
              <Input
                placeHolder={"***********"}
                password
                inputHeading={"Create Password"}
                error={errors.passwordError}
                value={accountDetails.password}
                onChange={e =>
                  setAccountDetails({ ...accountDetails, password: e })
                }
              />
            </View>
            <View style={style.inputContainer}>
              <Input
                placeHolder={"***********"}
                password
                inputHeading={"confirm Password"}
                error={errors.passwordError}
                value={accountDetails.confirmPassword}
                onChange={e =>
                  setAccountDetails({ ...accountDetails, confirmPassword: e })
                }
              />
            </View>
            <TouchableOpacity
              style={style.btnContainer}
              onPress={() => pressContinue()}
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
            <TouchableOpacity
              style={style.btnContainer}
              onPress={() => navigation.navigate("SignIn")}
            >
              <Text
                style={{
                  alignSelf: "center",
                }}
              >
                Login
              </Text>
            </TouchableOpacity>
          </View>
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
    subContainer: {
      marginTop: height * 0.04,
    },
  });
