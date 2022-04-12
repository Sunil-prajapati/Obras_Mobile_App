import React, { useState, useContext,useEffect} from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { useNavigation } from '@react-navigation/native';
import { Colors } from "~/constants/Colors";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Fonts } from "~/constants/Fonts";
import message from "~/assets/icons/message.png";
import Header from "~/components/Header";
import { UserContext } from "../../context/UserContext";

const messages = [
  {
    id: 100,
    name: "Mason Group",
    message: "Lorem ipsum dolor sit ame…",
    time: "4:08 PM",
    isGroup: true,
    date: "12/31/2022",
    image: "https://homepages.cae.wisc.edu/~ece533/images/zelda.png",
  },
  {
    id: 101,
    name: "Charlie Hughes",
    message: "Lorem ipsum dolor sit ame…",
    time: "4:08 PM",
    isGroup: false,
    date: "12/31/2022",
    image: "https://homepages.cae.wisc.edu/~ece533/images/zelda.png",
  },
  {
    id: 102,
    name: "John Smith",
    message: "Lorem ipsum dolor sit ame…",
    time: "4:08 PM",
    isGroup: false,
    date: "12/31/2022",
    image: "https://homepages.cae.wisc.edu/~ece533/images/zelda.png",
  },
  {
    id: 103,
    name: "Charlie Hughes",
    message: "Lorem ipsum dolor sit ame…",
    time: "4:08 PM",
    isGroup: true,
    date: "12/31/2022",
    image: "https://homepages.cae.wisc.edu/~ece533/images/zelda.png",
  },
  {
    id: 104,
    name: "Jason Potter",
    message: "Lorem ipsum dolor sit ame…",
    time: "4:08 PM",
    isGroup: false,
    date: "12/31/2022",
    image: "https://homepages.cae.wisc.edu/~ece533/images/zelda.png",
  },
];

const { width, height } = Dimensions.get("window");

export default Messages = () => { 
  const navigation = useNavigation();
  const userContext = useContext(UserContext);
  const { users,chatUsers,adminCurrentAuthId} = userContext;
  const insets = useSafeAreaInsets();
  const [messages , setMessages] = useState([])
  const style = styles(insets);
  const [shortedUsers, setShortedUsers] = useState()
  const RightArrow = require("../../assets/icons/Disclosure_Indicators.png");
  const onItemClick = (userId,name,profileImg,item) => {
    navigation.navigate("Chatting", { userId: userId,name,profileImg,item});
  };
  const addMessage = () => {};
  const searchClick = () => {}; 

  useEffect(() => {
    const shortedUser = []
    chatUsers?.map(user => {  
    if(user.adminId == adminCurrentAuthId )   {
        chatUsers.splice(user.adminId , 1);
    }
    shortedUser.push(user)
    setShortedUsers(shortedUser)
  }) 
  },[])
   
  const renderMessageListItem = ({ item }) => {  
    return (  
      <TouchableOpacity onPress={() => onItemClick(item.userId,item.name,item.profileImg, item)}>    
        <View style={style.chatListContainer}>
          <Image style={style.avatarImage} source={{ uri: item.profileImg }} />
          <View style={style.nameContainer}>
            <View style={style.nameTimeView}>
              <Text style={style.name}>{item.name}</Text>
              <Text style={style.time}>{item.time}</Text>
            </View>
            <Text style={style.message}>{item.message}</Text>
          </View>
           <Image style={style.rightArrow} source={RightArrow} />
        </View>
      </TouchableOpacity>
    )
  };

  return (
    <SafeAreaView style={style.container}>
      <Header
        name={"Messages"}
        plusImg={1}
        pulsIconClick={addMessage}
        searchIcon={1}
        searchIconClick={searchClick}
      />
      <View style={style.sheetContainer}>
        {/* <View style={style.noMessageContainer}>
              <Image source={message}/>
              <Text style={style.noMsg}>{"No messages"}</Text>
            </View> */}
       
        <FlatList
          data={shortedUsers}
          renderItem={renderMessageListItem}
          keyExtractor={(item, id) => item.userId}
          style={{
            borderRightWidth: 0.4,
            borderRightColor: Colors.primary.line,
          }}
        />
    
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
    sheetContainer: {
      width: width,
      height: height,
      backgroundColor: Colors.primary.white,
    },
    chatListContainer: {
      height: height * 0.09,
      backgroundColor: Colors.primary.white,
      flexDirection: "row",
      alignItems: "center",
      paddingLeft: "3%",
      borderBottomColor: Colors.primary.secondGray,
      borderBottomWidth: 0.5,
    },
    avatarImage: {
      width: width * 0.12,
      height: width * 0.12,
      borderRadius: (width * 0.12) / 2,
      borderColor: Colors.primary.green,
      borderWidth: 2,
    },
    nameContainer: {
      flexDirection: "column",
      paddingLeft: width * 0.03,
    },
    nameTimeView: {
      width: width * 0.72,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    name: {
      fontSize: 16,
      lineHeight: 22,
      fontFamily: Fonts.primary.semiBold,
      color: Colors.primary.heading,
    },
    time: {
      fontSize: 16,
      lineHeight: 22,
      fontFamily: Fonts.primary.regular,
      color: Colors.primary.lightGray,
    },
    message: {
      fontSize: 17,
      lineHeight: 22,
      letterSpacing: -0.4,
      fontFamily: Fonts.primary.regular,
      color: Colors.primary.lightGray,
    },
    rightArrow: {
      width: width * 0.03,
      height: height * 0.02,
      marginLeft: width * 0.025,
      alignSelf: "center",
    },
  });
