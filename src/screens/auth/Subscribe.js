import React,{useState} from 'react';
import {
    View, 
    Text, 
    StyleSheet, 
    Dimensions,
    TouchableOpacity,
    Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {Colors} from '~/constants/Colors';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import ActiveBtn from '~/components/ActiveBtn';
import ToggleBtn from '~/components/Toggle';
import Slider from '~/components/RangeSlider';
import { Fonts } from '~/constants/Fonts';

const {width, height} = Dimensions.get('window')

export default Subscribe =() => {
    const navigation = useNavigation()
    const insets = useSafeAreaInsets()
    const style = styles(insets)
    const [isOn, setIsOn] = useState(false);

    const toggleHandler = () => {
        setIsOn(!isOn)
    }

    return (
        <SafeAreaView style={style.container} >
            <View style={style.sheetContainer}>
                <View style={style.contentContainer}>
                    <Text style={style.heading}>
                        {"Pay as you grow"}
                    </Text>
                    <View style={style.toggleContainer}>
                        <Text style={style.billText}>{"Bill Monthly"}</Text>
                        <ToggleBtn setOn={isOn} action={toggleHandler}/>
                        <Text style={style.billText}>{"Bill Yearly"}</Text>
                    </View>
                    <View style={style.sliderContainer}>
                        <Slider/>
                        <Text style={style.sliderText}>{"Number of team members"}</Text>
                    </View>
                    <View style={style.box}>
                        <View style={style.innerContent}>
                            <Text style={style.prize}>
                                {"$350 "}
                                <Text style={style.monthOryear}>{" per month"}</Text>
                            </Text>
                            <Text style={style.feature}>{"Features"}</Text>
                            <Text style={style.featureText}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eget felis eget nunc lobo mattis. Morbi tempus iaculis urna id volutpat. Eu ultrices vitae auctor eu. 
                            </Text>
                        </View>
                    </View>
                    <View style={style.btnContainer}>
                        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                            <ActiveBtn text={"Subscribe"}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => null} style={style.termCondition}>
                            <Text style={style.termsText}>{"Terms & Conditions"}</Text>
                        </TouchableOpacity>
                        <View style={style.btnContainer}>
                            <Text style={style.bottomText}>
                                Lorem Ipsum, giving information on its origins,
                                 as well as a random Lipsum generator.
                            </Text>
                        </View>
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
        justifyContent: 'space-between'
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
        paddingHorizontal:width * 0.1,
    },
    heading:{
        fontSize:24,
        lineHeight:28,
        alignSelf:'center',
        paddingTop:height * 0.07,
        fontFamily: Fonts.primary.regular
    },
    toggleContainer:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-around',
        marginTop:height * 0.02,
        alignItems:'center',
        paddingHorizontal:width * 0.09,
    },
    billText:{
        fontSize:14,
        lineHeight:16,
        color:Colors.primary.heading,
    },
    sliderContainer:{
        marginTop:height * 0.04,

    },
    sliderText:{
        paddingLeft:12,
        paddingTop:4,
        color:Colors.primary.lightGray,
        fontFamily: Fonts.primary.regular
    },
    box:{
        width: width * 0.8,
        height: height * 0.3,
        backgroundColor:Colors.primary.inputBackground,
        marginTop:"6%",
        borderRadius:10,
    },
    innerContent:{
        padding:"5%"
    },
    prize:{
        fontSize:36,
        lineHeight:42,
        color:Colors.primary.heading,
        fontFamily: Fonts.primary.bold,
        paddingTop:Platform.OS == 'ios'? 0: "5%",
    },
    monthOryear:{
        fontSize:15,
        lineHeight:22,
        color:Colors.primary.text,
    },
    feature:{
        fontSize:15,
        lineHeight:22,
        color:Colors.primary.text,
        marginTop:"6%",
        fontFamily: Fonts.primary.bold
    },
    featureText:{
        fontSize:15,
        lineHeight:22,
        color:Colors.primary.text,
        marginTop:"2%",
        fontFamily: Fonts.primary.regular
    },
    btnContainer:{
        marginTop: height * 0.02,
        paddingHorizontal:width * 0.015
    },
    termCondition:{
        alignItems:'center',
        height:height * 0.05,
        justifyContent:'center'
    },
    termsText:{
        fontSize:14,
        lineHeight:16,
        color:Colors.primary.darkGray,
        fontFamily: Fonts.primary.medium
    },
    bottomText:{
        fontSize:12,
        lineHeight:16,
        color:Colors.primary.darkGray,
        alignSelf:'center',
        fontFamily: Fonts.primary.regular,
        textAlign: 'center'
    }   
})