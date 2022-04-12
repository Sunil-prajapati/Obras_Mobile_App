import React, { useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  Platform,
} from "react-native";
import { useNavigation } from '@react-navigation/native';
import { Colors } from "~/constants/Colors";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Fonts } from "~/constants/Fonts";
import RBSheet from "react-native-raw-bottom-sheet";
import ActiveBtn from "~/components/ActiveBtn";
import SearchBar from "~/components/SearchBar";
import messageIcon from "~/assets/icons/check.png";
import profileImg from "~/assets/images/home/Bitmap.png";

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
    occupation: "Carpenter",
  },
  {
    name: "Charlie Hughes",
    occupation: "Mason",
  },
  {
    name: "Jason Potter",
    occupation: "Carpenter ",
  },
];

export default AddUser = () => {
  const insets = useSafeAreaInsets();
  const style = styles(insets);
  const refRBSheet = useRef();

  const openAddUser = () => {
    refRBSheet.current.open();
  };

  return (
    <SafeAreaView>
      <TouchableOpacity style={style.doneBtn} onPress={() => openAddUser()}>
        <ActiveBtn text={"Invite"} />
      </TouchableOpacity>
      <View style={{ flex: 1 }}>
        <RBSheet
          ref={refRBSheet}
          animationType="slide"
          closeOnDragDown={true}
          height={height * 0.95}
          closeOnPressMask={true}
          customStyles={{
            wrapper: {
              backgroundColor: "transparent",
            },
            draggableIcon: {
              backgroundColor: Colors.primary.background,
            },
            container: {
              backgroundColor: Colors.primary.background,
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            },
          }}
        >
          <View style={style.header}>
            <View style={style.headerContent}>
              <Text>{"             "}</Text>
              <Text style={style.heading}>{"Add Users"}</Text>
              <TouchableOpacity onPress={() => refRBSheet.current.close()}>
                <Text style={style.heading}>{"Done"}</Text>
              </TouchableOpacity>
            </View>
          </View>
          <SearchBar />
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
                {index === 0 ? (
                  <TouchableOpacity
                    style={style.iconContainer}
                    onPress={() => null}
                  >
                    <Image source={messageIcon} />
                  </TouchableOpacity>
                ) : null}
              </View>
            );
          })}
        </RBSheet>
      </View>
    </SafeAreaView>
  );
};

const styles = insets =>
  StyleSheet.create({
    doneBtn: {
      paddingHorizontal: width * 0.06,
      marginTop: (Platform.OS = "android" ? "4%" : 0),
    },
    header: {
      backgroundColor: Colors.primary.blue,
      height: height * 0.06,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      justifyContent: "center",
      marginTop: "-6%",
    },
    heading: {
      fontSize: 17,
      lineHeight: 22,
      letterSpacing: 0.4,
      color: Colors.primary.white,
      fontFamily: Fonts.primary.semiBold,
    },
    headerContent: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingHorizontal: "4.27%",
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
