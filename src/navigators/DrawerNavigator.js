import React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "~/screens/home/Home";
import NewProject from "~/screens/project/NewProject";
import Location from "~/screens/home/Location";
import DrawerContent from "../navigators/DrawerContent";
import Messages from "~/screens/home/Messages";
import Notification from "~/screens/home/Notification";
import Account from "~/screens/home/Account";
import AccountDetails from "~/screens/home/AccountDetails";
import Users from "~/screens/home/Users";
import Project from "~/screens/project/Project";
import Company from "~/screens/home/Company";
import AddUser from "~/screens/home/AddUser";
import Weather from "~/screens/project/Weather";
import TitleColor from "~/screens/addUser/TitleColor";
import Schedule from "~/screens/project/Schedule";
import AddUserIndex from "~/screens/addUser/Index";
import UserTitle from "~/screens/addUser/UserTitle";
import Chatting from "~/screens/home/ChattingScreen";
import TeamMemberDetail from "../screens/users/TeamMemberDetail";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      headerMode="none"
      drawerContent={props => <DrawerContent {...props} />}
    >
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="NewProject" component={NewProject} />
      <Drawer.Screen name="Location" component={Location} />
      <Drawer.Screen name="Messages" component={Messages} />
      <Drawer.Screen name="Notification" component={Notification} />
      <Drawer.Screen name="Account" component={Account} />
      <Drawer.Screen name="AccountDetails" component={AccountDetails} />
      <Drawer.Screen name="Users" component={Users} />
      <Drawer.Screen name="Project" component={Project} />
      <Drawer.Screen name="Company" component={Company} />
      <Drawer.Screen name="AddUser" component={AddUser} />
      <Drawer.Screen name="Weather" component={Weather} />
      <Drawer.Screen name="TeamMemberDetail" component={TeamMemberDetail} />
      <Drawer.Screen name="TitleColor" component={TitleColor} />
      <Drawer.Screen name="Schedule" component={Schedule} />
      <Drawer.Screen name="AddUserIndex" component={AddUserIndex} />
      <Drawer.Screen name="UserTitle" component={UserTitle} />
      <Drawer.Screen name="Chatting" component={Chatting} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
