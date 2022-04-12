import React from 'react';
import { View, Text, StyleSheet, } from 'react-native';
import {Colors} from '~/constants/Colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ToggleSwitch from 'toggle-switch-react-native';

export default TextToggle = ({text,action,setOn}) => {
    const insets = useSafeAreaInsets()
    const style = styles(insets)
    return (
        <View style={[style.container]}>
            <Text style={style.inputHeading}>
                {text}
            </Text>
            <View style={style.arrowContainer}>
            <ToggleSwitch
                isOn={setOn}
                onColor={Colors.primary.secondGray}
                offColor={Colors.primary.blue}
                size="large"
                onToggle={() => action()}
            />
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
        alignItems:'center',
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