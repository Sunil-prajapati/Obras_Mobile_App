import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import {Colors} from '~/constants/Colors';
import { SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import SubHeader from '~/components/SubHeader';
import Input from '~/components/Input';

const { width, height } = Dimensions.get('window')

export default Company = () => {

    const insets = useSafeAreaInsets()
    const style = styles(insets)
    return (
        <SafeAreaView style={style.container}>
            <View style={style.sheetContainer}>
                <SubHeader name={"Company"}/>
                <View style={style.inputContainer}>
                    <Input placeHolder={"Lighthouse Masonry, Inc"} inputHeading={"Company"}/>
                </View>
                <View style={style.inputContainer}>
                    <Input placeHolder={"Jeff Doyle"} inputHeading={"Full name"}/>
                </View>
                <View style={style.inputContainer}>
                    <Input placeHolder={"Construction"} inputHeading={"Industry"}/>
                </View>
                <View style={style.inputContainer}>
                    <Input placeHolder={"150 John Vertente Blvd. New Bedford, MA"} inputHeading={"Address"}/>
                </View>
                <View style={style.inputContainer}>
                    <Input placeHolder={"00-00000"} inputHeading={"EIN"}/>
                </View>
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
        backgroundColor:Colors.primary.white,
    },
    inputContainer:{
        marginTop:30,
        paddingHorizontal:"4.27%",
    },
})