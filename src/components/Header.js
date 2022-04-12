import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import { Colors } from "~/constants/Colors";
import { Fonts } from "~/constants/Fonts";
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MenuBurger from "~/assets/icons/MenuBurger.png";
import AddImage from "~/assets/icons/plus.png";
import ToolTip from "~/components/ToolTip";
import UserToolTip from "../screens/home/userToolTip";
import searchImg from "~/assets/icons/searchIon.png";
import notificationImg from "~/assets/icons/notification.png";

const { width, height } = Dimensions.get("window");

export default Header = ({
  name,
  addImage,
  plusImg,
  more,
  addUserClick,
  searchIcon,
  searchIconClick,
  home,
  notification,
}) => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const style = styles(insets);
  const [toolTipVisible, setToolTipVisible] = useState(false);
  const [userToolTipVisible, userSetToolTipVisible] = useState(false);

  const toggleDrawer = () => {
    navigation.toggleDrawer();
  };
  
  return (
    <View style={style.headerContainer}>
      <View style={style.leftSide}>
        <TouchableOpacity onPress={() => toggleDrawer()}>                                                                  
        
          <Image source={MenuBurger} />
        </TouchableOpacity>
        <Text style={style.projects}>{name}</Text>
        {more === 1 ? (
          <ToolTip
            setVisible={toolTipVisible}
            action={() => setToolTipVisible(!toolTipVisible)}
          />
        ) : null}
      </View>
      <View style={style.rightSide}>
        {addImage === 1 ? (
          <TouchableOpacity onPress={() => addUserClick()}>
            <Image style={style.plusIcon} source={AddImage} />
          </TouchableOpacity>
        ) : null}
        {searchIcon === 1 ? (
          <TouchableOpacity
            onPress={() => searchIconClick()}                                   
            style={{ marginRight: "7%" }}
          >
            <Image source={searchImg} />
          </TouchableOpacity>
        ) : null}
        {plusImg === 1 ? ( 
          <UserToolTip
            userSetVisible={userToolTipVisible}
            action={() =>
              home === 1
                ? navigation.navigate("NewProject")
                : userSetToolTipVisible(!userToolTipVisible)
            }
          />
        ) : null}
        {notification === 1 ? <Image source={notificationImg} /> : null}
      </View>
    </View>
  );
};

const styles = (insets) =>
  StyleSheet.create({
    headerContainer: {
      width,
      height: height * 0.08,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
    },
    leftSide: {
      display: "flex",
      flexDirection: "row",
      width: width * 0.6,
      alignItems: "center",
      paddingLeft: "4.27%",
    },
    projects: {
      fontSize: 28,
      lineHeight: 41,
      color: Colors.primary.white,
      fontFamily: Fonts.primary.bold,
      paddingLeft: 10,
    },
    rightSide: {
      display: "flex",
      flexDirection: "row",
      width: width * 0.4,
      alignItems: "center",
      paddingRight: "4.27%",
      justifyContent: "flex-end",
    },
    plusIcon: {
      marginRight: "10%",
    },
  });
