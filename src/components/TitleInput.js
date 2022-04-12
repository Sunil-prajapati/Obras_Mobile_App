import React from 'react';
import { View, Text,Image, StyleSheet, } from 'react-native';
import {Colors} from '~/constants/Colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import arrow from '~/assets/icons/Disclosure_Indicators.png';
import questionMark from '~/assets/icons/questionMark.png';

export default TitleInput = ({isCircle,text,isArrowIcon}) => {
    const insets = useSafeAreaInsets()
    const style = styles(insets)
    return (
        <View style={[style.container]}>
            <Text style={style.inputHeading}>
                {text}
            </Text>
            <View style={style.arrowContainer}>
                {isCircle == 1?(
                    <View style={style.round}></View>
                ):null}
                <Image source={isArrowIcon == 1?arrow:questionMark} style={style.arrow}/>
            </View>
        </View>
    )
}

const styles = (insets) => StyleSheet.create({
    container:{
        backgroundColor: Colors.primary.white,
        borderBottomWidth:1,
        borderColor:Colors.primary.line,
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
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
    }
});
