import React from 'react';
import { View, Text, StyleSheet, Dimensions, } from 'react-native';
import {Colors} from '~/constants/Colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {Fonts} from '~/constants/Fonts';

const { width, height } = Dimensions.get('window')

export default DisableBtn = ({text,customStyle}) => {
    const insets = useSafeAreaInsets()
    const style = styles(insets)
    return (
        <View style={[style.container,customStyle]}>
            <Text style={style.btnText}>
                {text}
            </Text>
        </View>
    )
}

const styles = (insets) => StyleSheet.create({
    container:{
        height:45,
        backgroundColor: Colors.primary.lightGray,
        borderRadius:4,
        justifyContent:'center',
        alignItems:'center',
    },
    btnText:{
        color: Colors.primary.white,
        fontSize:15,
        lineHeight:21,
        fontFamily:Fonts.primary.semiBold,

    }
});