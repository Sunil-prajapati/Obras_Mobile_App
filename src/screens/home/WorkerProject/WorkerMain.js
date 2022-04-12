import React, { useEffect, useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { Colors } from "~/constants/Colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Fonts } from "~/constants/Fonts";
import mapMark from "~/assets/icons/map_marker.png";
import profileImg from "~/assets/images/home/Bitmap.png";
import moment from "moment";
import WeatherApi from "../../../utils/WeatherApi";
import { UserContext } from "../../../context/UserContext";
import { useNavigation } from '@react-navigation/native';
import { ProjectContext } from "../../../context/ProjectContext";

const { width, height } = Dimensions.get("window");

export default WorkerMain = props => {
  const projectContext = useContext(ProjectContext);
  const { projects } = projectContext;
  const navigation = useNavigation();
  const allProjects = props.allProjects;
  const insets = useSafeAreaInsets();
  const userContext = useContext(UserContext);
  const { users } = userContext;
  const style = styles(insets);
  useEffect( () => {
    // Anything in here is fired on component mount.
 }, []);

  return (
    <View style={style.sheetContainer}>
      <ScrollView style={{ marginBottom: height * 0.13 }}>
        {projects?.map((project, index) => {
          if (
            moment().format("Do YYYY") ===
            moment(project.projectStartDate).format("Do YYYY")
          )
           {
            return (
              <View style={style.boxContainer} key={index}>
                <View style={style.headerContainer}>
                  <WeatherApi city={project.city} />
                </View>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("Project", {
                      params: project.projectId,
                    })
                  }
                >
                  <View style={style.upperContainer}>
                    <Text style={style.distanceText}>10 miles away</Text>
                    <View style={style.temperatureContainer}>
                      <Text style={style.cityText}>{project.projectTitle}</Text>
                    </View>
                    <View style={style.addressLine}>
                      <Image
                        style={style.mark}
                        source={mapMark}
                        style={{ alignSelf: "center", marginRight: 3 }}
                      />
                      <Text style={style.addressText}>
                        {project.address} {""} {project.city} {""}
                        {project.state}
                      </Text>
                    </View>
                  </View>
                  <View style={style.lowerContainer}>
                    <Text style={style.textTime}>
                      {"Daily Start: "}
                      <Text style={style.time}>
                        {moment(project.dailyStartTime).format("h:mm a")}
                      </Text>
                    </Text>
                    <Text style={style.teamText}>
                      {"Team members "}
                      <Text style={style.team}>
                        {project.assignedEmployees.length}
                      </Text>
                    </Text>
                  </View>
                </TouchableOpacity>
                <View style={style.imagesContainer}>
                  <View style={style.condensedMemberContainer} key={index}>
                    {project?.assignedEmployees.map((userRestDetail, index) => {
                      return userRestDetail.userRestDetails.profileImg ==
                        null ? (
                        <Image
                          key={index}
                          style={[
                            style.avatarImage,
                            {
                              borderColor:
                                userRestDetail.userRestDetails
                                  .professionColor !== ""
                                  ? userRestDetail.userRestDetails
                                      .professionColor
                                  : "#fff",
                            },
                          ]}
                          source={profileImg}
                        />
                      ) : (
                        <Image
                          key={index}
                          style={[
                            style.avatarImage,
                            {
                              borderColor:
                                userRestDetail.userRestDetails
                                  .professionColor !== ""
                                  ? userRestDetail.userRestDetails
                                      .professionColor
                                  : "#fff",
                            },
                          ]}
                          source={{
                            uri: userRestDetail.userRestDetails.profileImg,
                          }}
                        />
                      );
                    })}
                  </View>
                </View>
              </View>
            );
            // }
          }
        })}
      </ScrollView>
    </View>
  );
};

const styles = insets =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.primary.background,
      paddingHorizontal: width * 0.05,
    },
    sheetContainer: {
      width: width,
      height: height,
      backgroundColor: Colors.primary.white,
      marginTop: height * 0.02,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
    headerContainer: {
      alignItems: "center",
      backgroundColor: Colors.primary.inputBorderColor,
      justifyContent: "space-between",
      paddingVertical: 5,
      height: height * 0.05,
      flexDirection: "row",
      paddingHorizontal: 10,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
    },
    condensedHeaderContainer: {
      alignItems: "center",
      backgroundColor: Colors.primary.inputBorderColor,
      justifyContent: "space-between",
      paddingVertical: 5,
      height: height * 0.025,
      flexDirection: "row",
      paddingHorizontal: 10,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
    },
    contOfTemp: {
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
    },
    boxContainer: {
      borderRadius: 10,
      margin: height * 0.02,
    },
    condensedBoxContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
    },
    condensedContainer: {
      borderRadius: 10,
      marginTop: height * 0.02,
      width: width * 0.4,
    },
    title: {
      fontSize: 24,
      textAlign: "center",
      color: Colors.primary.heading,
      backgroundColor: "transparent",
      lineHeight: 32,
      paddingLeft: 10,
    },
    distanceText: {
      fontSize: 14,
      lineHeight: 22,
      color: Colors.primary.lightGray,
      fontFamily: Fonts.primary.regular,
    },
    cityText: {
      fontSize: 15,
      lineHeight: 22,
      color: Colors.primary.heading,
      fontFamily: Fonts.primary.semiBold,
    },
    addressText: {
      fontSize: 15,
      lineHeight: 22,
      color: Colors.primary.lightGray,
      fontFamily: Fonts.primary.regular,
    },
    contentContainer: {
      backgroundColor: Colors.primary.white,
    },
    upperContainer: {
      borderBottomWidth: 1,
      borderColor: Colors.primary.border,
      paddingVertical: 10,
      paddingLeft: 10,
    },
    lowerContainer: {
      paddingLeft: 10,
    },
    textTime: {
      fontSize: 15,
      lineHeight: 22,
      color: Colors.primary.heading,
      fontFamily: Fonts.primary.regular,
    },
    time: {
      fontWeight: "bold",
    },
    teamText: {
      fontSize: 15,
      lineHeight: 22,
      color: Colors.primary.heading,
      marginTop: 5,
      fontFamily: Fonts.primary.regular,
    },
    team: {
      fontWeight: "bold",
    },
    addTeamContainer: {
      display: "flex",
      flexDirection: "row",
      marginVertical: "7%",
      alignSelf: "center",
      paddingHorizontal: width * 0.01,
    },
    avatarImage: {
      width: width * 0.15,
      height: width * 0.15,
      borderRadius: (width * 0.15) / 2,
      // borderColor: Colors.primary.green,
      borderWidth: 3,
    },
    FileContainer: {
      alignItems: "center",
      justifyContent: "center",
      height: height * 0.1,
    },
    createProject: {
      alignItems: "center",
    },
    createProjectText: {
      fontSize: 24,
      lineHeight: 28,
      color: Colors.primary.heading,
      fontFamily: Fonts.primary.regular,
    },

    button: {
      marginTop: height * 0.025,
      width: width * 0.35,
      alignSelf: "center",
      marginBottom: height * 0.06,
    },
    mark: {
      alignSelf: "center",
      alignItems: "baseline",
    },
    address: {
      flexDirection: "row",
      alignItems: "center",
    },
    addressLine: {
      flexDirection: "row",
    },
    temperatureContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    tempImg: {
      marginLeft: "3%",
      width: width * 0.05,
      height: height * 0.05,
    },
    memberContainer: {
      flexDirection: "row",
      marginHorizontal: "1%",
      marginVertical: "3%",
      flexWrap: "wrap",
    },
    condensedMemberContainer: {
      flexDirection: "row",
      marginHorizontal: "2.5%",
      marginVertical: "3%",
      flexWrap: "wrap",
    },

    imagesContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
    },
    toolTipContainer: {
      width: width * 0.6,
    },
    crossContainer: {
      flexDirection: "row",
      justifyContent: "flex-end",
    },
    content: {
      paddingHorizontal: width * 0.02,
      paddingTop: height * 0.01,
      paddingBottom: height * 0.03,
    },
    navigationContainer: {
      flexDirection: "column",
      justifyContent: "space-between",
    },
    nav: {
      paddingVertical: height * 0.02,
      borderBottomWidth: 1,
      borderColor: Colors.primary.secondGray,
    },
    text: {
      fontSize: 17,
      lineHeight: 20,
      letterSpacing: -0.48,
      color: Colors.primary.textOne,
      fontFamily: Fonts.primary.regular,
    },
  });
