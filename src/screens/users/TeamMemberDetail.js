import React, { useState,useContext,useRef } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import Input from "../../components/Input";
import { Colors } from "../../constants/Colors";
import { Fonts } from "../../constants/Fonts";
import userProfile from "../../assets/images/home/Bitmap.png";
import messageIcon from "~/assets/icons/messageIconBorder.png";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from '@react-navigation/native';
import { UserContext } from "../../context/UserContext";
import BottomSheet from 'reanimated-bottom-sheet';
import Oval from '~/assets/images/signUp/Oval.png';
import Camera from '~/assets/icons/Shape.png';
import Animated from 'react-native-reanimated';
const { width, height } = Dimensions.get("window");

export default function TeamMemberDetail() {
  const route = useRoute();
  const sheetRef = useRef();
  const navigation = useNavigation();
  const userContext = useContext(UserContext);
  const {setCount} = userContext;
  const userRestDetail = route.params.userDetail;
  const insets = useSafeAreaInsets();
  const [inputDisabled, setInputDisabled] = useState(false);
  const style = styles(insets);
  const {lastName, email,selectedProfession,projectTitle,name,profileImg,phone} =userRestDetail;
  const [details] =useState( [
    {
        title:"Team Member",
        subTitle:`${name} ${lastName}`,
        id:0,
    },
    {
      title:"Title",
      subTitle:selectedProfession,
        id:1,
    },
    {
      title:"Project",
      subTitle:projectTitle,
      id:2,
    },
    {
      title:"Phone",
      subTitle:`${phone == null ?  "": `${phone}`} `,
      id:3,
    },
    {
      title:"Email",
      subTitle:email,
      id:4,
  },
    ])

  const renderContent = () => {      
    return (
      <View style={style.bottomSheetContainer}>
        <View style={style.profileImg}>       
        {!profileImg ?
            <ImageBackground style={style.imgContainer} source={Oval}>
              <Image source={Camera}/>
            </ImageBackground>
            :
            <ImageBackground style={style.imgContainer} source={{uri:profileImg}}>
            <Image source={{uri:profileImg}}/>
          </ImageBackground>
            }
        </View>
        {details.map((item,index) => { 
          return(
            <View style={style.inputView} key={index}>
              <View style={style.phoneContainer}>
                  <View style={{flexDirection:"column"}}>
                    <Text style={style.title}>{item.title}</Text>
                    <Text style={style.subTitle}>{item.subTitle}</Text>
                  </View>
                {/* {item.id === 3?(
                  <Image source={messageIcon}/>
                ):null} */}
              </View>
            </View>
          ) 
         })} 
      </View>
    )
  }

  return (
    <SafeAreaView style={style.container}>
     <TouchableOpacity >              
        <View style={{justifyContent: 'space-between'}}>            
           <SubHeader name={name}/>  
         </View>
      </TouchableOpacity> 
      
      <BottomSheet
       ref={sheetRef}
       snapPoints={[height * 0.99, "-5%"]}
       initialSnap={1}
       enabledGestureInteraction={false}
       renderContent={renderContent}
      //  renderHeader={renderHeader}
      />
    </SafeAreaView>
  );
}

const styles = () =>
  StyleSheet.create({
    container: {
      justifyContent: "space-between",
      backgroundColor: Colors.primary.blue,
    },
  
    header: {
      backgroundColor: Colors.primary.blue,
      paddingVertical: height * 0.01,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
    panelHeader: {
        alignItems: 'center',
    },
    panelHandle: {
        width: width * 0.15,
        height: height * 0.008,
        borderRadius: 4,
        backgroundColor: Colors.primary.darkerBlue,
        marginBottom:'2%'
    },
    profileImg:{
      marginTop:25,
      alignItems:'center',
 
    },
    imgContainer:{
      width:109,
      height:109,
      alignItems:'center',
      justifyContent:'center',
      borderRadius: 109/2,
  },
  imageHeaderUser: {
    width: 50,
    height: 50,
    borderRadius: (width * 50) / 2,
    borderWidth:1,
    borderColor:'red'
  },
  bottomSheetContainer:{
    backgroundColor:Colors.primary.white,
    height,
  },
  inputView:{
    flexDirection:'row',
    justifyContent:"space-between",
    borderBottomWidth:1,
    borderColor:Colors.primary.secondGray,
    marginHorizontal:"5%",
    paddingVertical:"4%",
  },
  title:{
    fontSize:13,
    lineHeight:15,
    letterSpacing:0.5,
    textTransform:'uppercase',
    color:Colors.primary.gray,
    fontFamily:Fonts.primary.semiBold,
  },
  subTitle:{
    fontSize:15,
    lineHeight:22,
    color:Colors.primary.heading,
    fontFamily:Fonts.primary.regular,
    marginTop:"2.5%"
  },
  phoneContainer:{
    flexDirection:'row',
    justifyContent:"space-between",
    width:width * 0.9,
  },
  name:{
    fontSize:17,
    lineHeight:22,
    color:Colors.primary.white,
    letterSpacing:-0.408,
    fontFamily:Fonts.primary.semiBold
  },
  textInputMessage:{
    borderRadius: 5,
    padding: 5,
    color: Colors.primary.lightGray,
    fontFamily: Fonts.primary.regular,
    backgroundColor: Colors.primary.inputBackground,
    marginLeft: "5%",

  },
  actionContainer:{
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 4,
    marginRight: 4,
    marginBottom: 0,
  },
  attachment:{
    width: 24,
    height: 23,
    marginRight: 24,
  },
  noMessageContainer:{
    alignItems:'center',
    flexDirection:'column',
    marginTop:height * 0.15,
  },
  noMsg:{
    fontSize:24,
    lineHeight:28,
    color:Colors.primary.heading,
    fontFamily:Fonts.primary.regular,
    marginTop:"3%",
  },
  sheetContainer:{
    width:width,
    height:height,
    backgroundColor:Colors.primary.background,
    flex:1
},
  });
