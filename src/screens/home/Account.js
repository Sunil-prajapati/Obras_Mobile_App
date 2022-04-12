import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from '@react-navigation/native';
import { Colors } from "~/constants/Colors";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Fonts } from "~/constants/Fonts";
import TitleInput from "~/components/TitleInput";
import TextToggle from "~/components/TextToggle";
import Header from "~/components/Header";
import profileImgs from "~/assets/images/home/Bitmap.png";
import { UserContext } from "../../context/UserContext";

const { width, height } = Dimensions.get("window");

export default Messages = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const style = styles(insets);
  const [isOn, setIsOn] = useState(false);
  const [toggleId, setToggleId] = useState();
  const userContext = useContext(UserContext);
  const { users, isLoading, companyName,getCompanyDetails} = userContext;

  const toggleHandler = id => {
    setIsOn(!isOn);
    setToggleId(id);
  };

  useEffect(() => {
    getCompanyDetails()
  }, [])
  
  return (
    <SafeAreaView style={style.container}>
      <Header name={"Account"} />
      <View style={style.sheetContainer}>
        <View style={style.userInfoSection}>
          <View style={style.userInfoRow}>
            {isLoading == true ? (
              <ActivityIndicator size="small" color="#0000ff" />
            ) : (
              <Image
                style={style.avatarImage}
                source={{ uri: users.profileImg }}
              />
            )}

            <View style={style.userInfo}>
              <Text style={style.name}>{users?.name}</Text>
              <Text style={style.role}>{users?.selectedProfession}</Text>
            </View>
          </View>
        </View>
        <View style={style.headingContainer}>
          <Text style={style.heading}>{"Company"}</Text>
        </View>
        {/* <TouchableOpacity onPress={() => navigation.navigate("Company")}> */}
        <TitleInput
          isCircle={0}
          //pass througn deeplinking title Name then render
          text={companyName}
          isArrowIcon={0}
        />
        {/* </TouchableOpacity> */}
        <View style={style.headingContainer}>
          <Text style={style.heading}>{"Account"}</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("AccountDetails")}>
          <TitleInput isCircle={0} text={"Account details"} isArrowIcon={0} />
        </TouchableOpacity>
        {/* <TitleInput isCircle={0} text={"Subscription"} isArrowIcon={0} /> */}
        <View style={style.headingContainer}>
          <Text style={style.heading}>{"Notifications"}</Text>
        </View>
        <TextToggle
          text={"Push notifications"}
          setOn={toggleId === 0 ? isOn : false}
          action={() => toggleHandler(0)}
        />
        <TextToggle
          text={"Email"}
          setOn={toggleId === 1 ? isOn : false}
          action={() => toggleHandler(1)}
        />
        <View style={style.headingContainer}>
          <Text style={style.heading}>{"Display"}</Text>
        </View>
        <TextToggle
          text={"Dark mode"}
          setOn={toggleId === 2 ? isOn : false}
          action={() => toggleHandler(2)}
        />
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
    },
    userInfoSection: {
      width: "100%",
      height: height * 0.13,
      justifyContent: "center",
      backgroundColor: Colors.primary.background,
    },
    userInfoRow: {
      flexDirection: "row",
      marginTop: height * 0.02,
      alignItems: "center",
      paddingLeft: width * 0.04,
    },
    userInfo: {
      marginLeft: width * 0.04,
      flexDirection: "column",
    },
    avatarImage: {
      // backgroundColor: "red",
      width: width * 0.15,
      height: width * 0.15,
      borderRadius: (width * 0.15) / 2,
    },
    name: {
      fontSize: 16,
      color: Colors.primary.headingTextColor,
      fontFamily: Fonts.primary.bold,
      lineHeight: 19,
      marginBottom: 5,
    },
    role: {
      fontSize: 13,
      color: Colors.primary.gray,
      fontFamily: Fonts.primary.regular,
      textTransform: "uppercase",
      lineHeight: 15,
      letterSpacing: 0.5,
    },
    headingContainer: {
      justifyContent: "flex-end",
      backgroundColor: Colors.primary.inputBackground,
      height: height * 0.05,
    },
    heading: {
      paddingBottom: "1%",
      fontSize: 12,
      color: Colors.primary.accountHeading,
      fontFamily: Fonts.primary.bold,
      textTransform: "uppercase",
      lineHeight: 22,
      paddingLeft: "5%",
    },
  });
