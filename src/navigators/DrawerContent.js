import React, { useContext } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { AuthContext } from "~/context/AuthContext";
import { Fonts } from "~/constants/Fonts";
import { Colors } from "~/constants/Colors";
import profileImg from "~/assets/images/home/Bitmap.png";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserContext } from "../context/UserContext";

const { width, height } = Dimensions.get("window");

export default DrawerContent = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const style = styles(insets);
  const authContext = useContext(AuthContext);
  const { setCurrentUser, currentUser, setCurrentAuth } = authContext;
  const userContext = useContext(UserContext);
  const { users, isLoading } = userContext;

  const logout = async () => {
    await AsyncStorage.clear();
    setCurrentUser(null);
    setCurrentAuth(null);
    if (currentUser === null) {
      navigation.navigate("SignIn");
    }
  };

  return (
    <SafeAreaView style={style.drawerContent}>
      <StatusBar hidden />
      <View style={style.drawerContent}>
        <View style={style.userInfoSection}>
          <View style={style.userInfoRow}>
            {users.profileImg === null ? (
              <Image style={style.avatarImage} source={profileImg} />
            ) : isLoading == true ? (
              <ActivityIndicator size="small" color="#0000ff" />
            ) : (
              <Image
                style={style.avatarImage}
                source={{
                  uri: users.profileImg,
                }}
              />
            )}
            <View style={style.userInfo}>
              <Text style={style.name}>{users.name}</Text>
              <Text style={style.role}>{users.selectedProfession}</Text>
            </View>
          </View>
        </View>
        <View style={style.drawerSection}>
          <TouchableOpacity
            style={style.itemContainer}
            onPress={() => navigation.navigate("Home")}
          >
            <Text style={style.textItems}>Main</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={style.itemContainer}
            onPress={() => navigation.navigate("Schedule")}
          >
            <Text style={style.textItems}>Schedule</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={style.itemContainer}
            onPress={() => navigation.navigate("Messages")}
          >
            <Text style={style.textItems}>Messages</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
            style={style.itemContainer}
            onPress={() => navigation.navigate("Notification")}
          >
            <Text style={style.textItems}>Notifications</Text>
          </TouchableOpacity> */}
          <TouchableOpacity
            style={style.itemContainer}
            onPress={() => navigation.navigate("Account")}
          >
            <Text style={style.textAccount}>Account</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={style.itemContainer}
            onPress={() => logout()}
          >
            <Text style={style.textItems}>Log out</Text>
          </TouchableOpacity>
        </View>
        <View style={style.bottomDrawerSection}>
          <Image
            style={style.bottomImage}
            source={require("../assets/images/home/drawer_bottom_img.png")}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = insets =>
  StyleSheet.create({
    drawerContent: {
      flex: 1,
    },
    userInfoSection: {
      width: "100%",
      height: height * 0.1,
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
      width: width * 0.15,
      height: width * 0.15,
      borderRadius: (width * 0.15) / 2,
      borderColor: Colors.primary.green,
      borderWidth: 3,
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
    drawerSection: {
      marginTop: height * 0.02,
      flexDirection: "column",
    },
    itemContainer: {
      borderWidth: 0.5,
      borderColor: Colors.primary.inputBorderColor,
    },
    textItems: {
      fontSize: 15,
      lineHeight: 22,
      color: Colors.primary.headingTextColor,
      fontFamily: Fonts.primary.regular,
      paddingVertical: height * 0.013,
      paddingLeft: width * 0.05,
    },
    textAccount: {
      fontSize: 15,
      lineHeight: 22,
      color: Colors.primary.headingTextColor,
      fontFamily: Fonts.primary.regular,
      paddingTop: height * 0.03,
      paddingLeft: width * 0.05,
    },
    bottomDrawerSection: {
      flex: 1,
      justifyContent: "flex-end",
      alignItems: "flex-end",
    },
    bottomImage: {
      resizeMode: "contain",
    },
  });
