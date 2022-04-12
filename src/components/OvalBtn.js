import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import {Colors} from '~/constants/Colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window')

export default OvalBtn = ({text}) => {
    const insets = useSafeAreaInsets()
    const style = styles(insets)
    return (
        <View style={[style.container]}>
            <Text style={style.btnText}>
                {text}
            </Text>
        </View>
    )
}

const styles = (insets) => StyleSheet.create({
    container:{
        height:45,
        justifyContent:'center',
        alignItems:'center',
        borderWidth:1.5,
        borderColor:Colors.primary.lightGray,
        paddingHorizontal:10,
        borderRadius:20
    },
    btnText:{
        color: Colors.primary.lightGray,
        fontSize:15,
        lineHeight:21,
        letterSpacing:0.5,
    }
});