import React, { useContext } from "react";
import { AuthContext } from "~/context/AuthContext";
import AuthNavigator from "./AuthNavigator";
import HomeNavigator from "./HomeNavigator";

export default function RootNavigator() {
  const authContext = useContext(AuthContext);
  const { currentUser } = authContext;

  return (
    <>
      {currentUser === null ? (
        <AuthNavigator />
      ) : (
        <>
          <HomeNavigator />
        </>
      )}
    </>
  );
}
