import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from '@react-navigation/native';
import { Colors } from "~/constants/Colors";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import TabViewComponent from "./TabViewComponent";
import CustomModal from "~/components/CustomModal";
import Header from "~/components/Header";
import Setting from "../project/Setting";
import { AuthContext } from "~/context/AuthContext";
import { UserContext } from "../../context/UserContext";
import { ProjectContext } from "../../context/ProjectContext";
import WorkerMain from "./WorkerProject/WorkerMain";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get("window");

export default Home = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const style = styles(insets);
  const authContext = useContext(AuthContext); 
  const { currentUser, setUserTypeIsUser, userTypeIsUser,currentAuth } = authContext;
  const [isModalVisible, setModalVisible] = useState(false);
  const userContext = useContext(UserContext);
  const { getUser,getUsersMsgList,getAdminIdCurrentAuth } = userContext;
  const projectContext = useContext(ProjectContext);
  const { getProjects, projects } = projectContext;

  const modalHandler = () => {
    setModalVisible(false);
    navigation.navigate("NewProject");
  };

  const skipHandle = () => {
    setModalVisible(false);
    navigation.navigate("Home");
  };

  const createNewProject = () => {
    navigation.navigate("NewProject");
  };

  const addNewUser = () => {
    navigation.navigate("AddUserIndex");
  };

  async function checkUserType() {
    let checkUser = await AsyncStorage.getItem("isUser");
    if (checkUser == "true" && checkUser !== null) {
      setUserTypeIsUser(true);
    } else {
      setUserTypeIsUser(false);
    }
  }
  let allProjects = [];
  projects?.map((item, index) => {
    item.assignedEmployees.map((data, i) => {
      if (data.userRestDetails.email == currentUser.email) {
        allProjects.push(item);
      }
    });
  });

  useEffect(() => {
    checkUserType();
    getProjects();   
    getUser();
    getUsersMsgList();
    getAdminIdCurrentAuth();
    let isMounted = true;
    setModalVisible(userTypeIsUser === false ? !isModalVisible : false);
    return () => {
      isMounted = false;
    };
  }, [currentUser]);

  return (
    <SafeAreaView style={style.container}>
      <View>
        <CustomModal
          setVisible={isModalVisible}
          callBack={modalHandler}
          skip={skipHandle}
          heading={"Get started by creating \n  your first project"}
          activeBtnText={"Go"}
          otherBtnText={"Skip"}
        />
        <Header
          name={userTypeIsUser === false ? "Projects" : "Today"}
          addImage={userTypeIsUser === false ? 1 : 0}
          plusImg={userTypeIsUser === false ? 1 : 0}
          notification={userTypeIsUser === true ? 1 : 0}
          pulsIconClick={createNewProject}
          more={userTypeIsUser === false ? 1 : 0}
          addUserClick={addNewUser}
          home={1}
        />
        {userTypeIsUser === false ? (
          <View style={style.timeContainer}>
            <TouchableOpacity onPress={() => navigation.navigate("Schedule")}>
              <Text style={style.time}>{"Monday 9,2020"}</Text>
            </TouchableOpacity>
            <View
              style={{
                justifyContent: "center",
                alignSelf: "center",
                marginTop: Platform.OS == "android" ? "2%" : "4%",
              }}
            >
              <Setting />
            </View>
          </View>
        ) : null}
        {userTypeIsUser === true ? (
          <WorkerMain allProjects={allProjects} />
        ) : (
          <TabViewComponent />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = insets =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.primary.blue,
      justifyContent: "space-between",
    },
    timeContainer: {
      width: width,
      height: height * 0.04,
      backgroundColor: Colors.primary.darkerBlue,
      flexDirection: "row",
      justifyContent: "space-between",
      paddingHorizontal: "4.27%",
      alignItems: "center",
    },
    time: {
      fontSize: 15,
      lineHeight: 18,
      color: Colors.primary.white,
    },
  });
