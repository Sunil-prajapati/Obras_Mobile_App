import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import { Colors } from "~/constants/Colors";
import { Fonts } from "~/constants/Fonts";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import profileImg from "~/assets/images/home/Bitmap.png";
import messageIcon from "~/assets/icons/messageIconBorder.png";

const { width, height } = Dimensions.get("window");

const person = [
  {
    name: "Sam Robinson",
    occupation: "Mason",
  },
  {
    name: "Charlie Hughes",
    occupation: "Mason",
  },
  {
    name: "John Smith",
    occupation: "Mason",
  },
  {
    name: "Charlie Hughes",
    occupation: "Mason",
  },
  {
    name: "Jason Potter",
    occupation: "Mason",
  },
];

export default Team = () => {
  const insets = useSafeAreaInsets();
  const style = styles(insets);
  return (
    <View style={style.container}>
      {person.map((person, index) => {
        return (
          <View style={style.chatPersonContainer} key={index}>
            <View style={style.rightSide}>
              <Image style={style.avatarImage} source={profileImg} />
              <View style={style.nameContainer}>
                <Text style={style.name}>{person.name}</Text>
                <Text style={style.occupation}>{person.occupation}</Text>
              </View>
            </View>
            <TouchableOpacity style={style.iconContainer} onPress={() => null}>
              <Image source={messageIcon} />
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
};

const styles = insets =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.primary.background,
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
