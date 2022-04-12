import React from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import { Colors } from "~/constants/Colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import arrow from "~/assets/icons/Disclosure_Indicators.png";

const { width, height } = Dimensions.get("window");

export default ArrowInput = ({}) => {
  const insets = useSafeAreaInsets();
  const style = styles(insets);
  return (
    <View style={[style.container]}>
      <View style={style.textsContainer}>
        <Text style={style.inputHeading}>{"Invite"}</Text>
        <Text style={[style.input]}>{"Team member"}</Text>
      </View>
      <View style={style.arrowContainer}>
        <Image source={arrow} style={style.arrow} />
      </View>
    </View>
  );
};

const styles = insets =>
  StyleSheet.create({
    container: {
      backgroundColor: Colors.primary.white,
      borderBottomWidth: 1,
      borderColor: Colors.primary.lightGray,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
    },
    input: {
      fontSize: 17,
      color: Colors.primary.lightGray,
      letterSpacing: 0.5,
      lineHeight: 22,
      paddingBottom: 6,
    },
    inputHeading: {
      fontSize: 15,
      color: Colors.primary.heading,
      marginBottom: 5,
      lineHeight: 20,
      letterSpacing: 0.24,
    },
    textsContainer: {
      display: "flex",
      flexDirection: "column",
    },
    arrowContainer: {
      paddingHorizontal: 20,
      paddingVertical: 12,
    },
    arrow: {
      width: 8,
      height: 16,
    },
  });
