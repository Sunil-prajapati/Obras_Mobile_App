import "react-native-gesture-handler";
import React, { useState, useContext, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthContext, AuthProvider } from "./src/context/AuthContext";
import RootNavigator from "./src/navigators/RootNavigator";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SplashScreen from "react-native-splash-screen";
import { UserProvider } from "./src/context/UserContext";
import { ProjectProvider } from "./src/context/ProjectContext";
import dynamicLinks from "@react-native-firebase/dynamic-links";
import { setNavigator } from "./src/utils/navigationRef";
import DyanimicLinks from "./src/utils/DyanimicLinks";
function App() {
  const [initializing, setInitializing] = useState(true);
  const authContext = useContext(AuthContext);
  const { currentUser } = authContext;

  const handleDynamicLink = async (link) => {
    DyanimicLinks(link);
  };

  async function backGround() {
    try {
      await dynamicLinks()
        .getInitialLink()
        .then((link) => {
          DyanimicLinks(link);
        });
    } catch {
      (error) => console.log("backGround error in app.js", error);
    }
  }

  useEffect(() => {
    SplashScreen.hide();
    const ForegroundDeepLink = dynamicLinks().onLink(handleDynamicLink);
    backGround();
    if (initializing) setInitializing(false);
    return () => ForegroundDeepLink();
  }, [currentUser]);

  if (initializing) return null;
  return (
    <SafeAreaProvider>
      <NavigationContainer
        ref={(navigator) => {
          setNavigator(navigator);
        }}
      >
        <RootNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default () => {
  return (
    <AuthProvider>
      <UserProvider>
        <ProjectProvider>
          <App />
        </ProjectProvider>
      </UserProvider>
    </AuthProvider>
  );
};
