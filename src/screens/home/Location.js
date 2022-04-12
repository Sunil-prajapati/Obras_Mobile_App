import React from 'react';
import {
    View, 
    Text, 
    StyleSheet, 
    Dimensions,
} from 'react-native';
import {Colors} from '~/constants/Colors';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import Input from '~/components/Input';
import SubHeader from '~/components/SubHeader';

const {width, height} = Dimensions.get('window')

export default Location = () => {
    const insets = useSafeAreaInsets()
    const style = styles(insets)
    return(
        <SafeAreaView style={style.container}>
            <SubHeader name={"Location"}/>
            <View style={style.sheetContainer}>
                <View style={style.inputContainer}>
                    <Input placeHolder={"Placeholder"} inputHeading={"address"}/>
                </View>
                <View style={style.inputContainer}>
                    <Input placeHolder={"Placeholder"} inputHeading={"City"}/>
                </View>
                <View style={style.inputContainer}>
                    <Input placeHolder={"Placeholder"} inputHeading={"state"}/>
                </View>
                <View style={style.inputContainer}>
                    <Input placeHolder={"Placeholder"} inputHeading={"zip"}/>
                </View>
            </View>
        </SafeAreaView>
    );
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
    inputContainer:{
        marginTop:30,
        paddingHorizontal:"4.27%",
    },
    
})