import React from 'react';
import {
    View,
    Text,
    StyleSheet, 
    Dimensions,
    TouchableOpacity,
} from "react-native";
import { useNavigation } from '@react-navigation/native';
import {Colors} from '~/constants/Colors';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import TitleInput from '~/components/TitleInput';
import OvalBtn from '~/components/OvalBtn';
import Input from '~/components/Input';
import {Fonts} from '~/constants/Fonts';
import AddUser from './AddUser';

const {width, height} = Dimensions.get('window');

const type = [
    {
        text:"Admin",
    },
    {
        text:"Moderator",
    },
    {
        text:"Team member",
    },
]

const inputFields = [
    {
        placeholder:"0000000",
        heading:"Employee ID"
    },
    {
        placeholder:"myemail@somewhere.com",
        heading:"Email address"
    },
    {
        placeholder:"First name",
        heading:"First name"
    },
    {
        placeholder:"Last name",
        heading:"Last name"
    },
    {
        placeholder:"Preferred name",
        heading:"Type"
    },
]

const permission = [
    {
        name:"All projects",
    },
    {
        name:"Assigned projects",
    },
]


export default Index = () => {

    const navigation = useNavigation()
    const insets = useSafeAreaInsets()
    const style = styles(insets)
    return(
        <SafeAreaView style={style.container}>
             <View style={style.header}>
                <Text style={style.heading}>{"New User"}</Text>
             </View>
            <View style={style.sheetContainer}>
                <View style={style.contentContainer}>
                    <TitleInput isCircle={1} text={"Title"} isArrowIcon={1}/>
                    <Text style={style.type}>{"Type"}</Text>
                    <View style={style.ovalBtnContainer}>
                        {type.map((name,index) => {
                            return(
                                <TouchableOpacity key={index} onPress={() => navigation.navigate('UserTitle')}>
                                    <OvalBtn text={name.text}/>
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                    {inputFields.map((fieldsData,index) => {
                        return(
                            <View style={style.inputContainer} key={index}>
                                <Input placeHolder={fieldsData.placeholder} inputHeading={fieldsData.heading}/>
                            </View>
                        );
                    })}
                    <View style={style.permissionPart}>
                        <Text style={style.type}>
                            Project permissions
                        </Text>
                        <View style={style.ovalBtnContainer}>
                            {permission.map((name,index) => {
                                return(
                                    <View key={index}>
                                        <OvalBtn text={name.name}/>
                                    </View>
                                )
                            })}
                        </View>
                        <AddUser />
                    </View>
                </View>
            </View> 
        </SafeAreaView>
    )
}

const styles = (insets) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primary.white,
        justifyContent: 'space-between',
    },
    sheetContainer:{
        width:width,
        height:height,
        backgroundColor:Colors.primary.white,
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
    },
    header:{
        backgroundColor: Colors.primary.blue,
        height: height * 0.06,
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
        justifyContent:"center",
        alignItems:'center'
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
        marginTop:height * 0.03
    },
    type:{
        fontSize:13,
        textTransform:'uppercase',
        marginTop:15,
        letterSpacing:1,
        color:Colors.primary.gray
    },
    ovalBtnContainer:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-around',
        marginTop:10
    },
    inputContainer:{
        marginTop:30,
    },
    permissionPart:{
        marginVertical:height * 0.03,
    },
})