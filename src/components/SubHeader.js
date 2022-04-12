import React from 'react';
import {
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity,
    Dimensions,
    Image,
} from 'react-native';
import {Colors} from '~/constants/Colors';
import { Fonts } from '~/constants/Fonts';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const {width, height} = Dimensions.get('window');

export default SubHeader = ({name,assignUserIcon,assignUser}) => {

    const navigation = useNavigation()
    const insets = useSafeAreaInsets()
    const style = styles(insets)
    return (
        <View style={style.headerContainer}>
            <View style={style.leftSide}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={style.back}>{"<"}</Text>
                </TouchableOpacity>
            </View>
            <Text style={style.heading}>{name}</Text>
            <View style={style.rightSide}>
                {/* {assignUserIcon == 1?(
                    <TouchableOpacity onPress={() => assignUser()}>
                        <Image source={AddImage}/>
                    </TouchableOpacity>
                ):null} */}               
            </View>
        </View>
    );
}

const styles = (insets) => StyleSheet.create({
    headerContainer:{
        width,
        height:height * 0.08,
        flexDirection:'row',
        justifyContent:'space-between',
        backgroundColor: Colors.primary.blue,
    },
    leftSide:{
        flexDirection:'row',
        paddingLeft:"4.27%",
        alignItems:'center'
    },
    heading:{
        fontSize:17,
        lineHeight:22,
        color:Colors.primary.white,
        fontFamily:Fonts.primary.semiBold,
        alignSelf:'center',
    },
    back:{
        fontSize:30,
        color:Colors.primary.white,
        paddingLeft:5,
        fontWeight:"bold",
    },
    rightSide:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        paddingRight:"4.27%",
        justifyContent:'flex-end',
    },
})