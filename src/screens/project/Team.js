import React, { useRef, useContext,useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import { Colors } from "~/constants/Colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AddIcon from "~/components/AddIcon";
import { Fonts } from "~/constants/Fonts";
import profileImg from "~/assets/images/home/Bitmap.png";
import messageIcon from "~/assets/icons/messageIconBorder.png";
import { UserContext } from "~/context/UserContext";
import { ProjectContext } from "../../context/ProjectContext";
import { useNavigation } from '@react-navigation/native';
import { useRoute } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

export default Team = () => {
  const route = useRoute();
  const id = route.params.params;
  const insets = useSafeAreaInsets();
  const projectContext = useContext(ProjectContext);
  const userContext = useContext(UserContext);
  const { projects, setAssignuserLength } = projectContext;
  const { users,setCount } = userContext;
  const navigation = useNavigation();
  const style = styles(insets);

  const chatUserList = [];
  projects?.map((data, i) => {
    if (data.projectId == id) {
      chatUserList.push(data);
    }
  });

  const assignUserDetails = chatUserList.map(assignEmplopyee => {
    return assignEmplopyee.assignedEmployees.map(userRestDetails => {
      return userRestDetails.userRestDetails;
    });
  });

  const handleNavigateFunctions = userDetails => { 
    navigation.navigate("TeamMemberDetail", {
      userDetail: userDetails,
    });
  };

  return (
    <View style={style.container}>
      {assignUserDetails[0].map((userDetails, index) => {      
        return userDetails.userId === users.userId ? null : (
          <View style={style.chatPersonContainer} key={index}>
            <View style={style.rightSide} key={index}>
              <TouchableOpacity
                onPress={() => handleNavigateFunctions(userDetails)}
              >
                {userDetails.profileImg == null ? (
                  <Image
                    style={style.avatarImage}
                    source={{
                      uri: userDetails.profileImg,
                    }}
                  />
                ) : (
                  <Image style={style.avatarImage} source={profileImg} />
                )}
              </TouchableOpacity>
              <View style={style.nameContainer}>
                <Text style={style.name}>{userDetails.name}</Text>
                <Text style={style.occupation}>
                  {userDetails.selectedProfession}
                </Text>
              </View>
            </View>
            <TouchableOpacity style={style.iconContainer} 
              onPress={()=>
                navigation.navigate(
                  {name: 'Chatting',
                  params: {item: userDetails}, 
              })              
            }>
              <Image source={messageIcon} />
            </TouchableOpacity>
          </View>
        );
      })}
      {/*       
      <View style={style.viewContainer}>
        <AddIcon line={"Add team member"} />
      </View>
      <View style={style.viewContainer}></View>
      <View style={style.viewContainer}></View>
      <View style={style.viewContainer}></View> */}
    </View>
  );
};

const styles = insets =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.primary.background,
      paddingHorizontal: width * 0.03,
    },
    viewContainer: {
      height: height * 0.08,
      backgroundColor: Colors.primary.white,
      alignItems: "center",
      marginTop: height * 0.02,
    },
    chatPersonContainer: {
      height: height * 0.085,
      backgroundColor: Colors.primary.white,
      flexDirection: "row",
      alignItems: "center",
      borderColor: Colors.primary.secondGray,
      borderTopWidth: 0.5,
      justifyContent: "space-between",
    },
    nameContainer: {
      flexDirection: "column",
      paddingHorizontal: "4%",
      justifyContent: "space-between",
      height: "57%",
    },
    name: {
      fontSize: 15,
      lineHeight: 22,
      fontFamily: Fonts.primary.semiBold,
      color: Colors.primary.heading,
    },
    occupation: {
      fontSize: 13,
      lineHeight: 15,
      fontFamily: Fonts.primary.semiBold,
      color: Colors.primary.gray,
    },
    avatarImage: {
      width: width * 0.12,
      height: width * 0.12,
      borderRadius: (width * 0.12) / 2,
      borderColor: Colors.primary.green,
      borderWidth: 2,
    },
    iconContainer: {
      paddingHorizontal: width * 0.04,
    },
    rightSide: {
      flexDirection: "row",
      paddingHorizontal: width * 0.04,
    },
  });
