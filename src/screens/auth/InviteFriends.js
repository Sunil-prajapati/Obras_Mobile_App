import React from 'react';
import {
    View,
    Text,
    StyleSheet, 
    Dimensions,
    TouchableOpacity,
} from "react-native";

import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import ArrowInput from '~/components/ArrowInput';
import DisableBtn from '~/components/DisableBtn';
import AddIcon from '~/components/AddIcon';
import { Fonts } from '../../constants/Fonts';
import {Colors} from '~/constants/Colors';

const {width, height} = Dimensions.get('window');

export default InviteFriends = () => {
    const navigation = useNavigation()
    const insets = useSafeAreaInsets()
    const style = styles(insets)

    return (
         <SafeAreaView style={style.container} >
              <View style={style.sheetContainer}> 
                <View style={style.contentContainer}>
                    <Text style={style.heading}>
                            {"Invite Team Members"}
                    </Text>
                    <TouchableOpacity 
                        style={style.InputTextContainer} 
                        onPress={() => navigation.navigate('InviteContent')}
                    >
                        <ArrowInput />
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={style.InputTextContainer} 
                        onPress={() => navigation.navigate('InviteContent')}
                    >
                        <ArrowInput />
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={style.InputTextContainer} 
                        onPress={() => navigation.navigate('InviteContent')}
                    >
                        <ArrowInput />
                    </TouchableOpacity>
                    <AddIcon line={"Add team member"}/>
                    <View style={style.lineContainer}>
                        <Text style={style.line}>
                            {"You can also import using: CSV and XLS file"}
                        </Text>
                    </View>
                    <View style={style.buttonsContainer}>
                        <TouchableOpacity onPress={() => navigation.navigate('InviteContent')}>
                            <DisableBtn text={"Invite"}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => null} style={style.skipBtnContainer}>
                            <Text style={style.skipBtn}>
                                Skip
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
              </View> 
        </SafeAreaView>
    )
}

const styles = (insets) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primary.blue,
        justifyContent: 'space-between',
    },
    sheetContainer:{
        width:width,
        height:height,
        backgroundColor:Colors.primary.white,
        marginTop:height * 0.1,
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
    },
    contentContainer:{
        height:height,
        paddingHorizontal:width * 0.04,
    },
    heading:{
        fontSize:24,
        lineHeight:28,
        alignSelf:'center',
        paddingTop:height * 0.07,
        fontFamily: Fonts.primary.regular
    },
    InputTextContainer:{
        marginTop:25
    },
    addTeamContainer:{
        display:'flex',
        flexDirection:'row',
        marginTop:25,
    },
    iconContainer:{
        backgroundColor:Colors.primary.blue,
        width:35,
        height:35,
        alignItems:'center',
        borderRadius:35/2
    },
    plusIcon:{
        fontSize:25,
        color:Colors.primary.white,
    },
    textContainer:{
        justifyContent:'center',
    },
    textAdd:{
        paddingHorizontal:10,
        fontSize:18,
        lineHeight:22,
        color:Colors.primary.blue,
        fontWeight:'bold',
        letterSpacing:0.5
    },
    lineContainer:{
        marginTop:height * 0.08,
        borderBottomWidth:1,
        width:width * 0.8,
        marginHorizontal:width * 0.05,
    },
    line:{
        fontSize:15,
        lineHeight:22,
        alignSelf:"center",
        
    },
    buttonsContainer:{
        display:'flex',
        flexDirection:'column',
        marginVertical:"7%",
        paddingHorizontal:width * 0.03,
    },
    skipBtnContainer:{
        justifyContent:'center',
        alignItems:'center',
        marginTop:"8%"
    },
    skipBtn:{
        fontSize:15,
        lineHeight:22,
        color:Colors.primary.heading,
    }
})

