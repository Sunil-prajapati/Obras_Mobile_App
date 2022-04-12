import React from 'react';
import {
    View, 
    Text, 
    StyleSheet, 
    Dimensions,
    TouchableOpacity,
    ScrollView,
    Image
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {Colors} from '~/constants/Colors';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Fonts } from '~/constants/Fonts';
import file from '~/assets/icons/file.png';
import Header from '~/components/Header';

const notificationsArray = [
    {
        id:0,
        from:"New Message from Sam B.",
        message:'Permits never got delivered and we’re…',
        time:'20 min ago',
    },
    {
        id:1,
        from:"New Message From John S.",
        message:'Meeting location has changed. Here’s…',
        time:'22 min ago',
    },
    {
        id:2,
        from:"New Message From Dominique W.",
        message:'Can you meet me at the other location?',
        time:'30 min ago',
    },
]

const {width, height} = Dimensions.get('window')

export default Notification = () => {
    const navigation = useNavigation()
    const insets = useSafeAreaInsets()
    const style = styles(insets)

    return(
        <SafeAreaView style={style.container}>
             <Header name={"Notifications"} />
            <View style={style.sheetContainer}>
                {notificationsArray.map((notification,index) => {
                    return(
                        <View style={style.notificationContainer} key={index}>
                            <Text style={style.sender}>{notification.from}</Text>
                            <View style={style.messageContainer}>
                                <Text style={style.message}>{notification.message}</Text>
                                {notification.id !== 2?(
                                    <View style={style.recentCircle}></View>
                                ):null}
                                
                            </View>
                            <Text style={style.time}>{notification.time}</Text>
                        </View>
                    )
                 })}
                {/* <View style={style.noMessageContainer}>
                    <Image source={file}/>
                    <Text style={style.noMsg}>{"No notifications"}</Text>
                </View> */}
            </View>

        </SafeAreaView>
    )
}

const styles = (insets) => StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: Colors.primary.blue,
        justifyContent: 'space-between'
    },
    sheetContainer:{
        width:width,
        height:height,
        backgroundColor:Colors.primary.background,
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
    notificationContainer:{
        flexDirection:'column',
        backgroundColor:Colors.primary.white,
        paddingVertical:"3%",
        borderWidth:1,
        borderColor:Colors.primary.inputBorderColor,
    },
    sender:{
        fontSize:13,
        lineHeight:15,
        letterSpacing:0.5,
        textTransform:'uppercase',
        color:Colors.primary.gray,
        fontFamily:Fonts.primary.semiBold,
        paddingVertical:"1%",
        paddingHorizontal:"3%",
    },
    message:{
        fontSize:15,
        lineHeight:22,
        color:Colors.primary.heading,
        fontFamily:Fonts.primary.regular,
        paddingVertical:"1%",
        paddingHorizontal:"3%",
    },
    time:{
        fontSize:12,
        lineHeight:22,
        color:Colors.primary.lightGray,
        fontFamily:Fonts.primary.regular,
        paddingVertical:"1%",
        paddingHorizontal:"3%",
    },
    messageContainer:{
        flexDirection:"row",
        justifyContent:'space-between',
        alignItems:"center",
    },
    recentCircle:{
        width:10,
        height:10,
        borderRadius:10/2,
        backgroundColor:Colors.primary.blue,
        marginRight:"7%",
    }   
    
})