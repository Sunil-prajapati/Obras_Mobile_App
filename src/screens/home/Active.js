import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Colors } from "~/constants/Colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import FileIcon from "~/assets/icons/file.png";
import OutlineBtn from "~/components/OutlineBtn";
import { useNavigation } from '@react-navigation/native';
import mapMark from "~/assets/icons/map_marker.png";
import sunImg from "~/assets/icons/sun.png";
import { Fonts } from "~/constants/Fonts";
import profileImg from "~/assets/images/home/Bitmap.png";
import grayMoreImg from "~/assets/icons/GrayMore.png";
import { AuthContext } from "~/context/AuthContext";
import AddIcon from "~/components/AddIcon";
import Tooltip from "react-native-walkthrough-tooltip";
import crossImg from "~/assets/icons/cross.png";

const { width, height } = Dimensions.get("window");

const member = [
  {
    id: 0,
    image: profileImg,
  },
  {
    id: 1,
    image: profileImg,
  },
  {
    id: 2,
    image: profileImg,
  },
  {
    id: 3,
    image: profileImg,
  },
  {
    id: 5,
    image: profileImg,
  },
  {
    id: 6,
    image: profileImg,
  },
  {
    id: 7,
    image: profileImg,
  },
  {
    id: 8,
    image: profileImg,
  },
  {
    id: 9,
    image: profileImg,
  },
  {
    id: 10,
    image: profileImg,
  },
  {
    id: 12,
    image: profileImg,
  },
  {
    id: 16,
    image: profileImg,
  },
];

const projects = [
  {
    distance: "10 mi away",
    place: "Washington Place",
    address: "3145 Washington Boston, MA 90000",
    start: " 4:00am",
    team: " 4 ",
    temp: "81ºF",
  },
  {
    distance: "10 mi away",
    place: "Washington Place",
    address: "3145 Washington Boston, MA 90000",
    start: " 5:00am",
    team: " 2 ",
    temp: "71ºF",
  },
  {
    distance: "10 mi away",
    place: "Washington Place",
    address: "3145 Washington Boston, MA 90000",
    start: " 6:00am",
    team: " 3 ",
    temp: "65ºF",
  },
  {
    distance: "10 mi away",
    place: "Washington Place",
    address: "3145 Washington MA 90000",
    start: " 8:00am",
    team: "7 ",
    temp: "25ºF",
  },
];

export default Active = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const style = styles(insets);
  const [newProject, setNewProject] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [toolTipVisible, setToolTipVisible] = useState(false);
  const authContext = useContext(AuthContext);
  const [openToolTip, setOpenToolTip] = useState();
  const { grid } = authContext;

  const Project = () => {
    setNewProject(true);
    navigation.navigate("NewProject");
  };

  const addTeamMember = () => {
    navigation.navigate("AddUser");
    setClicked(!clicked);
  };

  const options = (id) => {
    setOpenToolTip(id);
    setToolTipVisible(!toolTipVisible);
  };

  const deactivate = () => {
    setToolTipVisible(!toolTipVisible);
  };

  const duplicate = () => {
    setToolTipVisible(!toolTipVisible);
  };

  return (
    <View style={style.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginBottom: height * 0.13 }}
      >
        {grid === true ? (
          <>
            {projects.map((project, index) => {
              return (
                <View style={style.boxContainer} key={index}>
                  <View style={style.headerContainer}>
                    {newProject == true ? (
                      <>
                        <View style={style.contOfTemp}>
                          <TouchableOpacity
                            style={style.temperatureContainer}
                            onPress={() => navigation.navigate("Weather")}
                          >
                            <Text style={style.title}>{project.temp}</Text>
                          </TouchableOpacity>
                          <Image source={sunImg} style={style.tempImg} />
                        </View>

                        <Tooltip
                          isVisible={
                            openToolTip === index ? toolTipVisible : null
                          }
                          content={
                            <View style={style.toolTipContainer}>
                              <View style={style.content}>
                                <View style={style.crossContainer}>
                                  <Image source={crossImg} />
                                </View>
                                <View style={style.navigationContainer}>
                                  <TouchableOpacity
                                    style={style.nav}
                                    onPress={() => deactivate()}
                                  >
                                    <Text style={style.text}>
                                      {"Deactivate project"}
                                    </Text>
                                  </TouchableOpacity>
                                  <TouchableOpacity
                                    style={style.nav}
                                    onPress={() => duplicate()}
                                  >
                                    <Text style={style.text}>
                                      {"Duplicate project"}
                                    </Text>
                                  </TouchableOpacity>
                                </View>
                              </View>
                            </View>
                          }
                          placement="bottom"
                          onClose={() => setToolTipVisible(!toolTipVisible)}
                          disableShadow={true}
                        >
                          <TouchableOpacity onPress={() => options(index)}>
                            <Image source={grayMoreImg} />
                          </TouchableOpacity>
                        </Tooltip>
                      </>
                    ) : null}
                  </View>
                  <TouchableOpacity
                    style={style.contentContainer}
                    onPress={() => navigation.navigate("Project")}
                  >
                    {newProject == false ? (
                      <View style={style.FileContainer}>
                        <Image source={FileIcon} />
                      </View>
                    ) : (
                      <View style={style.upperContainer}>
                        <Text style={style.distanceText}>
                          {project.distance}
                        </Text>
                        <Text style={style.cityText}>{project.place}</Text>
                        <View style={style.addressLine}>
                          <Image
                            style={style.mark}
                            source={mapMark}
                            style={{ alignSelf: "center", marginRight: 3 }}
                          />
                          <Text style={style.addressText}>
                            {project.address}
                          </Text>
                        </View>
                      </View>
                    )}
                    {newProject == false ? (
                      <View style={style.createProject}>
                        <Text style={style.createProjectText}>
                          {"Create a project"}
                        </Text>
                      </View>
                    ) : (
                      <View style={style.lowerContainer}>
                        <Text style={style.textTime}>
                          {"Daily Start: "}
                          <Text style={style.time}>{project.start}</Text>
                        </Text>
                        <Text style={style.teamText}>
                          {"Team members "}
                          <Text style={style.team}>{project.team}</Text>
                        </Text>
                      </View>
                    )}

                    {newProject == false ? (
                      <TouchableOpacity
                        style={style.button}
                        onPress={() => Project()}
                      >
                        <OutlineBtn text={"New project"} />
                      </TouchableOpacity>
                    ) : (
                      <>
                        {clicked ? (
                          <View style={style.imagesContainer}>
                            {member.map((person, index) => {
                              return (
                                <TouchableOpacity
                                  style={style.memberContainer}
                                  key={index}
                                  onPress={() =>
                                    navigation.navigate("TitleColor")
                                  }
                                >
                                  <Image
                                    style={style.avatarImage}
                                    source={person.image}
                                  />
                                </TouchableOpacity>
                              );
                            })}
                          </View>
                        ) : (
                          <TouchableOpacity
                            style={style.addTeamContainer}
                            onPress={() => addTeamMember()}
                          >
                            <AddIcon line={"Add team member"} />
                          </TouchableOpacity>
                        )}
                      </>
                    )}
                  </TouchableOpacity>
                </View>
              );
            })}
          </>
        ) : (
          <View style={style.condensedBoxContainer}>
            {projects.map((project, index) => {
              return (
                <View style={style.condensedContainer} key={index}>
                  <View style={style.condensedHeaderContainer}>
                    <Text style={style.title}>{""}</Text>
                    <Image source={grayMoreImg} />
                  </View>
                  <TouchableOpacity
                    style={style.contentContainer}
                    onPress={() => navigation.navigate("Project")}
                  >
                    {newProject == false ? (
                      <View style={style.FileContainer}>
                        <Image source={FileIcon} />
                      </View>
                    ) : (
                      <View style={style.upperContainer}>
                        <Text style={style.distanceText}>
                          {project.distance}
                        </Text>
                        <Text style={style.cityText}>{project.place}</Text>
                        <View style={style.addressLine}>
                          <Text style={style.addressText}>
                            {project.address}
                          </Text>
                        </View>
                      </View>
                    )}
                    {newProject == false ? (
                      <View style={style.createProject}>
                        <Text style={style.condensedCreateProjectText}>
                          {"Create a project"}
                        </Text>
                      </View>
                    ) : (
                      <View style={style.lowerContainer}>
                        <Text style={style.textTime}>
                          {"Daily Start: "}
                          <Text style={style.time}>{project.start}</Text>
                        </Text>
                        <Text style={style.teamText}>
                          {"Team members "}
                          <Text style={style.team}>{project.team}</Text>
                        </Text>
                      </View>
                    )}
                    {newProject == false ? (
                      <TouchableOpacity
                        style={style.button}
                        onPress={() => Project()}
                      >
                        <OutlineBtn text={"New project"} />
                      </TouchableOpacity>
                    ) : (
                      <>
                        {clicked ? (
                          <View style={style.imagesContainer}>
                            {member.map((person, index) => {
                              return (
                                <TouchableOpacity
                                  style={style.condensedMemberContainer}
                                  key={index}
                                  onPress={() =>
                                    navigation.navigate("TitleColor")
                                  }
                                >
                                  <Image
                                    style={style.avatarImage}
                                    source={person.image}
                                  />
                                </TouchableOpacity>
                              );
                            })}
                          </View>
                        ) : (
                          <TouchableOpacity
                            style={style.addTeamContainer}
                            onPress={() => addTeamMember()}
                          >
                            <AddIcon line={"Add team member"} icon={0} />
                          </TouchableOpacity>
                        )}
                      </>
                    )}
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = (insets) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.primary.background,
      paddingHorizontal: width * 0.05,
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
      marginTop: height * 0.02,
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
    condensedCreateProjectText: {
      fontSize: 18,
      lineHeight: 22,
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
    avatarImage: {
      width: width * 0.1,
      height: width * 0.1,
      borderRadius: (width * 0.1) / 2,
      borderColor: Colors.primary.green,
      borderWidth: 3.5,
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
