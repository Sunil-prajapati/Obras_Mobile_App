import React, { useState, createContext, useContext, useEffect } from "react";
import firestore from "@react-native-firebase/firestore";
import { AuthContext } from "./AuthContext";

export const ProjectContext = createContext();
export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [projectTtle, setProjectTitle] = useState(null);
  const [assignUserLength, setAssignuserLength] = useState([]);
  const authContext = useContext(AuthContext);
  const { currentUser } = authContext;

  const getProjects = async () => {
    try {
      let projects = [];
      const project = await firestore()
        .collection("projects")
        .where("adminId", "==", currentUser.adminId)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(documentSnapshot => {
            let singleProject = {
              ...documentSnapshot.data(),
            };
            projects.push(singleProject);
          });
          setProjects(projects);
        });
      return () => project();
    } catch {
      () => console.log("error");
    }
  };

  return (
    <ProjectContext.Provider
      value={{
        getProjects,
        projects,
        projectTtle,
        setProjectTitle,
        assignUserLength,
        setAssignuserLength,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};
