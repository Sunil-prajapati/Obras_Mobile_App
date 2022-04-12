import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import { Colors } from "~/constants/Colors";
import { Fonts } from "~/constants/Fonts";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import downArrow from "~/assets/icons/angle_down.png";
import mapMark from "~/assets/icons/map_marker.png";
import messageIcon from "~/assets/icons/message_icon.png";
import { ProjectContext } from "../../context/ProjectContext";
import { useRoute } from "@react-navigation/native";
import moment from "moment";

const { width, height } = Dimensions.get("window");

export default Details = () => {
  const route = useRoute();
  const id = route.params.params;
  const insets = useSafeAreaInsets();
  const style = styles(insets);
  const projectContext = useContext(ProjectContext);
  const { projects, setProjectTitle } = projectContext;

  let allProjectsDetail = [];
  projects?.map((data, i) => {
    if (data.projectId == id) {
      allProjectsDetail.push(data);
    }
  });

  return (
    <View style={style.sheetContainer}>
      {allProjectsDetail?.map(project => {
        setProjectTitle(project.projectTitle);
        return (
          <View>
            <View style={style.downArrow}>
              <Image source={downArrow} />
            </View>
            <View style={style.addressContainer}>
              <Text style={style.city}>{project.projectTitle}</Text>
              <View style={style.addressLine}>
                <Image style={style.mark} source={mapMark} />
                <Text style={style.line}>
                  {project.state} {project.address}
                </Text>
              </View>
            </View>
            <View style={style.projectStart}>
              <View style={style.start}>
                <Text style={style.heading}>{"Project Start"}</Text>
                <Text style={style.time}>
                  {moment(project.projectStartDate).format("MMMM Do YYYY")}
                </Text>
              </View>
              <View style={style.start}>
                <Text style={style.heading}>{"Project End"}</Text>
                <Text style={style.time}>
                  {moment(project.projectEndDate).format("MMMM Do YYYY")}
                </Text>
              </View>
            </View>
            <View style={style.projectStart}>
              <View style={style.start}>
                <Text style={style.heading}>{"Daily Start"}</Text>
                <Text style={style.time}>
                  {moment(project.dailyStartTime).format("h:mm a")}
                </Text>
              </View>
              <View style={style.start}>
                <Text style={style.heading}>{"Daily End"}</Text>
                <Text style={style.time}>
                  {moment(project.dailyEndTime).format("h:mm a")}
                </Text>
              </View>
            </View>
            <View style={style.contentContainer}>
              <View style={style.contactDetails}>
                <Text style={style.heading}>{"Primary Contact"}</Text>
                <Text style={style.line}>
                  {project.firstName} {project.lastName}
                </Text>
                <Text style={style.line}>{project.phone}</Text>
              </View>
              <Image source={messageIcon} />
            </View>
            <View style={style.contentContainer}>
              <View style={style.contactDetails}>
                <Text style={style.heading}>{"Secondary Contact"}</Text>
                <Text style={style.line}>
                  {project.secondaryFirstName} {project.secondaryLastName}
                </Text>
                <Text style={style.line}>{project.secondaryPhone}</Text>
              </View>
              <Image source={messageIcon} />
            </View>
            <View style={style.resourceContainer}>
              <Text style={style.heading}>{"Resources"}</Text>
              <Text style={style.line}>{project.resources}</Text>
            </View>
            <View style={style.resourceContainer}>
              <Text style={style.heading}>{"Notes"}</Text>
              <Text style={style.line}>{project.notes}</Text>
            </View>
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
    sheetContainer: {
      width: width,
      height: height,
      backgroundColor: Colors.primary.white,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
    header: {
      backgroundColor: Colors.primary.blue,
      height: height * 0.1,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      justifyContent: "center",
      alignItems: "center",
    },
    weatherText: {
      fontSize: 17,
      lineHeight: 22,
      letterSpacing: 0.4,
      color: Colors.primary.white,
      fontFamily: Fonts.primary.semiBold,
    },
    hrsContainer: {
      flexDirection: "row",
      alignItems: "center",
      borderTopWidth: 0.5,
      paddingHorizontal: width * 0.03,
      borderColor: Colors.primary.gray,
    },
    detailsContainer: {
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "center",
      borderRightWidth: 0.5,
      paddingHorizontal: "4.9%",
      paddingVertical: "1.5%",
      borderColor: Colors.primary.gray,
    },
    labourHrs: {
      fontSize: 15,
      lineHeight: 22,
      fontFamily: Fonts.primary.semiBold,
      color: Colors.primary.heading,
    },
    title: {
      fontSize: 12,
      lineHeight: 22,
      fontFamily: Fonts.primary.medium,
      color: Colors.primary.lightGray,
    },
    downArrow: {
      height: height * 0.02,
      backgroundColor: Colors.primary.lightGray,
      justifyContent: "center",
      alignItems: "center",
    },
    addressContainer: {
      flexDirection: "column",
      margin: "4%",
      paddingBottom: "3%",
      borderBottomWidth: 1,
      borderColor: Colors.primary.inputBorderColor,
      marginBottom: 0,
    },
    addressLine: {
      flexDirection: "row",
    },
    city: {
      fontSize: 15,
      lineHeight: 22,
      fontFamily: Fonts.primary.semiBold,
      color: Colors.primary.heading,
    },
    line: {
      fontSize: 15,
      lineHeight: 22,
      fontFamily: Fonts.primary.regular,
      color: Colors.primary.heading,
    },
    mark: {
      alignSelf: "center",
      marginRight: "2%",
    },
    projectStart: {
      flexDirection: "row",
      margin: "4%",
      justifyContent: "flex-start",
      borderBottomWidth: 1,
      borderColor: Colors.primary.inputBorderColor,
      paddingBottom: "3%",
      marginBottom: 0,
    },
    start: {
      flexDirection: "column",
    },
    heading: {
      fontSize: 13,
      lineHeight: 15,
      fontFamily: Fonts.primary.semiBold,
      color: Colors.primary.gray,
      width: width * 0.45,
    },
    time: {
      fontSize: 15,
      lineHeight: 22,
      fontFamily: Fonts.primary.regular,
      color: Colors.primary.heading,
    },
    contentContainer: {
      flexDirection: "row",
      margin: "4%",
      paddingBottom: "3%",
      borderBottomWidth: 1,
      borderColor: Colors.primary.inputBorderColor,
      justifyContent: "space-between",
      marginBottom: 0,
    },
    contactDetails: {
      flexDirection: "column",
    },
    resourceContainer: {
      flexDirection: "column",
      margin: "4%",
      paddingBottom: "3%",
      borderBottomWidth: 1,
      borderColor: Colors.primary.inputBorderColor,
      marginBottom: 0,
    },
  });
