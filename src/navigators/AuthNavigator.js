import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import Landing from "~/screens/auth/Landing";
import Signup from "~/screens/auth/SignUp";
import SignIn from "~/screens/auth/SignIn";
import WorkerSignUp from "~/screens/auth/WorkerSignIn/WorkerSignUp";
import CompleteYourProfile from "~/screens/auth/CompleteYourProfile";
import InviteFriends from "~/screens/auth/InviteFriends";
import InviteContent from "~/screens/auth/InviteContent";
import TermsCondition from "~/screens/auth/TermsCondition";
import Subscribe from "~/screens/auth/Subscribe";
import WorkerProfile from "~/screens/auth/WorkerSignIn/WorkerProfile";
import ProjectOwnerSign from "~/screens/auth/ProjectOwnerSign";

const AuthStack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <AuthStack.Navigator
      name="Landing"
      initialRouteName="Landing"
      screenOptions={{
        headerShown: false,
      }}
    >
      <AuthStack.Screen name="Landing" component={Landing} />
      <AuthStack.Screen name="SignUp" component={Signup} />
      <AuthStack.Screen
        name="CompleteYourProfile"
        component={CompleteYourProfile}
      />
      <AuthStack.Screen name="InviteFriends" component={InviteFriends} />
      <AuthStack.Screen name="InviteContent" component={InviteContent} />
      <AuthStack.Screen name="TermsCondition" component={TermsCondition} />
      <AuthStack.Screen name="Subscribe" component={Subscribe} />
      <AuthStack.Screen name="WorkerSignUp" component={WorkerSignUp} />
      <AuthStack.Screen name="WorkerProfile" component={WorkerProfile} />
      <AuthStack.Screen name="SignIn" component={SignIn} />
      <AuthStack.Screen name="ProjectOwnerSign" component={ProjectOwnerSign} />
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;
