import React from 'react';
import {
    View, 
    Text, 
    StyleSheet, 
    Dimensions,
    TouchableOpacity,
    ScrollView,
    Platform
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {Colors} from '~/constants/Colors';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Fonts } from '~/constants/Fonts';
import Input from '~/components/Input';
import TitleInput from '~/components/TitleInput';
import MultilineInput from '~/components/MultilineInput';
import ActiveBtn from '~/components/ActiveBtn';

const {width, height} = Dimensions.get('window')
    
export default Home = () => {
    const navigation = useNavigation()
    const insets = useSafeAreaInsets()
    const style = styles(insets)
    return(
        <>
            <SafeAreaView style={{ flex: 0, backgroundColor: Colors.primary.blue, }}/>
            <SafeAreaView style={style.container}>
                <View style={style.headerContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                        <Text style={style.cancelDone}>Cancel</Text>
                    </TouchableOpacity>
                    <Text style={style.newProject}>New Project</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                        <Text style={style.cancelDone}>Done</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView showsVerticalScrollIndicator={false} style={style.sheetContainer}>
                    <View style={style.projectTitleContainer}>
                        <Input placeHolder={"Placeholder"} inputHeading={"Project Title"}/>
                    </View>
                    <View style={style.titleInput}>
                        <TouchableOpacity onPress={() => navigation.navigate('Location')}>
                            <TitleInput isCircle={0} text={"Location"} isArrowIcon={0}/>
                        </TouchableOpacity>
                        <TitleInput isCircle={0} text={"Primary contact"} isArrowIcon={0}/>
                    </View>
                    <Text style={style.projectStart}>
                        {"Project start"}
                    </Text>
                    <View style={style.startDay}>
                        <Text style={style.startsText}>{"Starts"}</Text>
                        <Text style={style.startsText}>{"Aug 1, 2020      7:00am"}</Text>
                    </View>
                    <View style={style.startDay}>
                        <Text style={style.startsText}>{"Ends"}</Text>
                        <Text style={style.startsText}>{"Nov 1, 2020      7:00am"}</Text>
                    </View>
                    <Text style={style.projectStart}>
                        {"Daily"}
                    </Text>
                    <View style={style.startDay}>
                        <Text style={style.startsText}>{"Starts"}</Text>
                        <Text style={style.startsText}>{"7:00am"}</Text>
                    </View>
                    <View style={style.startDay}>
                        <Text style={style.startsText}>{"Ends"}</Text>
                        <Text style={style.startsText}>{"7:00am"}</Text>
                    </View>
                    <Text style={style.projectStart}>
                        {"Resources"}
                    </Text>
                    <View style={style.startDay}>
                        <Text style={style.startsText}>{"Vehicle"}</Text>
                    </View>
                    <View style={style.startDay}>
                        <Text style={style.startsText}>{"Equipment"}</Text>
                    </View>
                    <View style={style.notesContainer}>
                        <MultilineInput placeHolder={"Placeholder"} inputHeading={"notes"}/>
                    </View>
                    <View style={style.createBtn}>
                        <ActiveBtn text={"Create"}/>
                    </View>  
                </ScrollView>
            </SafeAreaView>
        </>
    );
}

const styles = (insets) => StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: Colors.primary.white,
        justifyContent: 'space-between'
    },
    sheetContainer:{
        width:width,
        height:height,
        backgroundColor:Colors.primary.background,
    },
    headerContainer:{
        width,
        height: height * 0.05,
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingHorizontal:"4.27%",
        borderBottomWidth:1,
        backgroundColor: Colors.primary.blue,
        marginTop:Platform.OS == "android"? 0:height * -0.054,
    },
    cancelDone:{
        fontSize:17,
        lineHeight:20,
        color:Colors.primary.white,
    },
    newProject:{
        fontSize:17,
        lineHeight:22,
        color:Colors.primary.white,
        letterSpacing:0.4,
    },
    projectTitleContainer:{
        paddingHorizontal:"4.27%",
        paddingTop:"5%",
        paddingBottom:"10%",
        borderBottomWidth:1,
        borderColor:Colors.primary.inputBackground,
    },
    projectStart:{
        marginVertical:"2%",
        fontSize:12,
        lineHeight:22,
        textTransform:'uppercase',
        paddingHorizontal:"4.27%",
        color:Colors.primary.black3,
        fontFamily:Fonts.primary.bold,
    },
    startDay:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        backgroundColor:Colors.primary.white,
        paddingVertical:"4%",
        paddingHorizontal:"4.27%",
        borderBottomWidth:0.3,
        borderColor:Colors.primary.darkBlack,
    },
    titleInput:{
        
    },
    startsText:{
        fontSize:17,
        lineHeight:22,
        color:Colors.primary.darkBlack,
        letterSpacing:0.4,
        fontFamily:Fonts.primary.regular,
    },
    notesContainer:{
        paddingHorizontal:"4.27%",
        marginVertical:"5%",
    },
    createBtn:{
        paddingHorizontal:"4.27%",
    }   
})