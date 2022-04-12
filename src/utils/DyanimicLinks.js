import { navigate } from "./navigationRef";


export default DyanimicLinks = link => {
  let SignUpLink = JSON.stringify(link !== null ? link.url : null).split("=");

  let adminIdLink = SignUpLink[8]?.split("&");
  let forEmail = SignUpLink[9]?.split("&");
  let adminId = adminIdLink[0];
  let companyName = SignUpLink[10].replace(/"/g, "");
  let email = forEmail[0];

  let SignUpDetails = {
    adminId: adminId,
    email: email,
    companyName: companyName,
  };

  
 

  if (adminId && email !== "") {
    navigate({
      name: "WorkerSignUp",
      params: {
        SignUpDetails,
      },
    });
  } else {
    alert("link is not available");
  }
};
