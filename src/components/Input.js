import React from "react";
import { View, Text, TextInput, StyleSheet, Dimensions } from "react-native";
import { Colors } from "~/constants/Colors";
import { Fonts } from "../constants/Fonts";

const { width, height } = Dimensions.get("window");

export default Input = ({
  inpStyle,
  placeHolder,
  type,
  isEditable,
  inputHeading,
  password,
  value,
  onChange,
  error,
}) => {
  const styles = style(error);
  return (
    <View style={[styles.container]}>
      <View style={styles.forgotContainer}>
        <Text style={styles.inputHeading}>{inputHeading}</Text>
        {type === "password" ? (
          <Text style={styles.forgotText}>{"Forgot password?"}</Text>
        ) : null}
      </View>
      <TextInput
        value={value}
        onChangeText={text => onChange(text)}
        secureTextEntry={password}
        placeholder={placeHolder}
        style={[styles.input, inpStyle]}
        placeholderTextColor={Colors.primary.lightGray}
        autoCapitalize="none"
        editable={isEditable}
        error={error}
      />
    </View>
  );
};

const style = error =>
  StyleSheet.create({
    container: {
      height: height * 0.05,
    },
    input: {
      fontSize: 15,
      color: Colors.primary.black,
      letterSpacing: 0.5,
      backgroundColor: Colors.primary.inputBackground,
      paddingVertical: 8,
      paddingLeft: "4.31%",
      borderWidth: 1,
      borderRadius: 5,
      borderColor: Colors.primary.inputBorderColor,
      fontFamily: Fonts.primary.regular,
      height: 40.63,
      borderColor: error && error !== null ? Colors.primary.red : null,
      borderWidth: error && error !== null ? 1 : null,
    },
    inputHeading: {
      fontSize: 13,
      color: Colors.primary.gray,
      marginBottom: 5,
      textTransform: "uppercase",
      fontFamily: Fonts.primary.medium,
      lineHeight: 15,
    },
    forgotContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    forgotText: {
      fontSize: 14,
      color: Colors.primary.gray,
      marginBottom: 5,
      textTransform: "uppercase",
      fontFamily: Fonts.primary.medium,
      lineHeight: 16,
    },
  });
