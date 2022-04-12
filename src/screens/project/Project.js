import React, { useState, useContext } from "react";
import {
  View,
  StyleSheet,
  useWindowDimensions,
  Dimensions,
} from "react-native";
import { Colors } from "~/constants/Colors";
import {
  useSafeAreaInsets,
  SafeAreaView,
} from "react-native-safe-area-context";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { Fonts } from "~/constants/Fonts";
import SubHeader from "~/components/SubHeader";
import Team from "./Team";
import Details from "./Details";
import { useNavigation } from '@react-navigation/native';
import { ProjectContext } from "../../context/ProjectContext";

const { width, height } = Dimensions.get("window");

const FirstRoute = () => <Details />;
const SecondRoute = () => <Team />;

export default Project = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const style = styles(insets);
  const projectContext = useContext(ProjectContext);
  const { projectTtle, assignUserLength } = projectContext;
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "details", title: "details" },
    { key: "team", title: `Team` },
  ]);
  const renderScene = SceneMap({
    details: FirstRoute,
    team: SecondRoute,
  });

  const renderTabBar = props => {
    return (
      <TabBar
        activeColor={Colors.primary.heading}
        inactiveColor={Colors.primary.secondGray}
        style={style.tabBarStyle}
        labelStyle={style.label}
        {...props}
        indicatorStyle={style.indicator}
      />
    );
  };

  const assignUserClick = () => {
    navigation.navigate("AddUser");
  };
  return (
    <SafeAreaView style={style.mainContainer}>
      <SubHeader
        name={projectTtle}
        assignUserIcon={1}
        assignUser={assignUserClick}
      />
      <View style={style.sheetContainer}>
        <View style={style.container}>
          <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
            renderTabBar={renderTabBar}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = insets =>
  StyleSheet.create({
    mainContainer: {
      flex: 1,
      backgroundColor: Colors.primary.blue,
      justifyContent: "space-between",
    },
    sheetContainer: {
      width: width,
      height: height,
      backgroundColor: Colors.primary.white,
    },
    container: {
      height: height,
    },
    tabBarStyle: {
      backgroundColor: Colors.primary.white,
      elevation: 0,
    },
    label: {
      color: Colors.primary.heading,
      fontSize: 12,
      lineHeight: 11,
      letterSpacing: 0.2,
      fontFamily: Fonts.primary.bold,
    },
    indicator: {
      backgroundColor: Colors.primary.blue,
      height: 2.2,
    },
  });
