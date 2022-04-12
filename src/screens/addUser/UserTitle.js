import React from 'react';
import { View, StyleSheet, Dimensions,TouchableOpacity,} from 'react-native';
import {Colors} from '~/constants/Colors';
import { useSafeAreaInsets,SafeAreaView} from 'react-native-safe-area-context';
import OutlineBtn from '~/components/OutlineBtn';
import { useNavigation } from '@react-navigation/native';
import Input from '~/components/Input';
import SubHeader from '~/components/SubHeader';

const { width, height } = Dimensions.get('window')

const ColorsTitle = [
    {
        id:0,
        color:Colors.primary.green
    },
    {
        id:1,
        color:Colors.primary.darkOrange
    },
    {
        id:2,
        color:Colors.primary.red
    },
    {
        id:3,
        color:Colors.primary.blue
    },
    {
        id:5,
        color:Colors.primary.skyBlue
    },
    {
        id:6,
        color:Colors.primary.purple
    },
    {
        id:7,
        color:Colors.primary.gray
    },
    {
        id:8,
        color:Colors.primary.lightYellow
    },
    {
        id:9,
        color:Colors.primary.parrot
    },
    {
        id:10,
        color:Colors.primary.pink,
    },
]



export default UserTitle = () => {

    const navigation = useNavigation()
    const insets = useSafeAreaInsets()
    const style = styles(insets)

    return (
        <SafeAreaView style={style.container}>
             <SubHeader name={"Title"}/>
            <View style={style.sheetContainer}>
                <View style={style.contentContainer}>
                    <Input placeHolder={"Ex. Mason, Laborer, Electrician"} inputHeading={"Title"}/>
                    <View style={style.colorsContainer}>
                        {ColorsTitle.map((colName,index) => {
                            return(
                            <TouchableOpacity style={style.colorRow} key={index} onPress={() => null}>
                                <View style={[style.roundCircle,{backgroundColor:colName.color}]}>
                                </View>
                            </TouchableOpacity>
                            );
                        })}
                    </View>
                    <TouchableOpacity style={style.btnContainer} onPress={() => null}>
                        <OutlineBtn text={"Create"}/> 
                    </TouchableOpacity>
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
    contentContainer:{
        height:height,
        paddingHorizontal:width * 0.1,
        marginTop:height * 0.04,
    },
    crossContainer:{
        justifyContent:"flex-end",
        flexDirection:"row",
        marginVertical:height * 0.03
    },
    colorsContainer:{
        flexDirection:'row',
        flexWrap:"wrap",
        marginVertical:height * 0.03,
    },
    colorRow:{
        flexDirection:"row",
        marginTop: height * 0.02,
        marginHorizontal:width * 0.03,
    },
    roundCircle:{
        width:35,
        height:35,
        borderRadius:35/2,
    },
    btnContainer:{
        marginHorizontal:width * 0.03,
    },
})