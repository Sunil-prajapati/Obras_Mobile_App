import React from 'react';
import { View, Text,TextInput, StyleSheet, Dimensions, } from 'react-native';
import {Colors} from '~/constants/Colors';
import { Fonts } from '../constants/Fonts';

const { width, height } = Dimensions.get('window')

export default MultilineInput = ({
    inpStyle,
    placeHolder,
    inputHeading,
}) => {
    return (
        <View style={[styles.container]}>
            <Text style={styles.inputHeading}>{inputHeading}</Text>
            <TextInput
                multiline
                numberOfLines={5}
                placeholder={placeHolder}
                style={[styles.input,inpStyle]}
                placeholderTextColor={Colors.primary.lightGray}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
    },
    input:{
        fontSize: 15,
        color: Colors.primary.black,
        letterSpacing:0.5,
        backgroundColor: Colors.primary.inputBackground,
        paddingVertical:8,
        paddingLeft:"4.31%",
        borderWidth:1,
        borderRadius:5,
        borderColor:Colors.primary.inputBorderColor,
        fontFamily: Fonts.primary.regular,
        height: height * 0.15,
    },
    inputHeading:{
        fontSize:13,
        color:Colors.primary.gray,
        marginBottom:5,
        textTransform:'uppercase',
        fontFamily: Fonts.primary.medium,
    }
});
