import React,{useState,useRef} from 'react';
import { View, Text, StyleSheet, Dimensions,TouchableOpacity,Image,Platform } from 'react-native';
import {Colors} from '~/constants/Colors';
import {Fonts} from '~/constants/Fonts';
import { useSafeAreaInsets,SafeAreaView} from 'react-native-safe-area-context';
import ToggleSwitch from 'toggle-switch-react-native';
import ActiveBtn from '~/components/ActiveBtn';
import RBSheet from "react-native-raw-bottom-sheet";
import SettingImg from '~/assets/icons/setting.png';

const {width, height} = Dimensions.get('window')

const settings = [
    {
        title:"Repeat schedule",
        text:'Repeat current schedule daily',
    },
    {
        title:"Notifications",
        text:'Automatically send team notifications when new schedule is published.',
    },
]


export default Setting = () => {
    const insets = useSafeAreaInsets()
    const style = styles(insets)
    const [isOn, setIsOn] = useState(false);
    const refRBSheet = useRef()

    const openSettingScreen = () => {
        refRBSheet.current.open()
    }

    return(
        <SafeAreaView style={style.container}>
            <TouchableOpacity style={style.settingIcon} onPress={() => openSettingScreen()}>
                <Image  source={SettingImg}/>
            </TouchableOpacity>
            <View style={{flex:1}}>
                <RBSheet
                    ref={refRBSheet}
                    closeOnDragDown={true}
                    animationType="slide"
                    height={height * 0.92}
                    closeOnPressMask={true}
                    customStyles={{
                        wrapper: {
                        backgroundColor: "transparent",
                        },
                        draggableIcon: {
                            backgroundColor: Colors.primary.background,
                        },
                        container: {
                            backgroundColor: Colors.primary.background,
                            borderTopLeftRadius: 10,
                            borderTopRightRadius: 10,
                        }
                    }}
                >
                    <View style={style.header}>
                        <Text style={style.heading}>{"Schedule Settings"}</Text>
                    </View>
                    <View style={style.contentContainer}>
                        {settings.map((setting,index) => {
                            return(
                                <View style={style.viewContainer} key={index}>
                                    <View style={[style.toggleContainer]}>
                                        <Text style={style.inputHeading}>
                                            {setting.title}
                                        </Text>
                                        <View style={style.arrowContainer}>
                                            <ToggleSwitch
                                                isOn={isOn}
                                                onColor={Colors.primary.secondGray}
                                                offColor={Colors.primary.blue}
                                                size="large"
                                                onToggle={() => setIsOn(!isOn)}
                                            />
                                        </View>
                                    </View>
                                    <Text style={style.line}>{setting.text}</Text>
                                </View>
                            )
                        })}
                        <TouchableOpacity style={style.btnContainer} onPress={() => null}>
                            <ActiveBtn text={"Save"}/>
                        </TouchableOpacity>
                    </View>
                </RBSheet>
             </View>
        </SafeAreaView>
    )
}

const styles = (insets) => StyleSheet.create({
    container:{
        justifyContent: 'space-between',
        flex:1,
    },
    header:{
        backgroundColor: Colors.primary.blue,
        height: height * 0.06,
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
        justifyContent:"center",
        alignItems:'center',
        marginTop:Platform.OS == "android"?"-6.5%":"-6%",
    },
    heading:{
        fontSize:17,
        lineHeight:22,
        letterSpacing:0.4,
        color:Colors.primary.white,
        fontFamily:Fonts.primary.semiBold,
    },
    contentContainer:{
        height:height,
        paddingHorizontal:width * 0.05,
    },
    toggleContainer:{
        backgroundColor: Colors.primary.white,
        borderColor:Colors.primary.line,
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        borderRadius:5,
        height:height * 0.07,
    },
    inputHeading:{
        fontSize:17,
        color:Colors.primary.heading,
        lineHeight:22,
        letterSpacing:0.24,
        paddingVertical:12,
        paddingLeft:"4.27%",
    },
    arrowContainer:{
        paddingHorizontal:20,
        paddingVertical:12,
        display:'flex',
        flexDirection:'row',
    },
    arrow:{
        width:8,
        height:16,
    },
    round:{
        backgroundColor:Colors.primary.lightGray,
        width:20,
        height:20,
        borderRadius:20/2,
        marginHorizontal:20
    },
    line:{
        fontSize:15,
        color:Colors.primary.lightGray,
        lineHeight:22,
        fontFamily:Fonts.primary.regular,
        marginVertical:height * 0.01,
    },
    viewContainer:{
        flexDirection:'column',
        marginTop:height * 0.03,
    },
    btnContainer:{
        marginTop:40,
    },
    settingIcon:{
        alignSelf:'flex-end',
        justifyContent:"center",
    }
})