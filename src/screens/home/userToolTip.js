import React from 'react';
import { View, Text,Image, StyleSheet, Dimensions,TouchableOpacity } from 'react-native';
import {Colors} from '~/constants/Colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Tooltip from 'react-native-walkthrough-tooltip';
import PlusImg from '~/assets/icons/addProfile.png';
import crossImg from '~/assets/icons/cross.png';
import { Fonts } from '~/constants/Fonts';

const { width, height } = Dimensions.get('window')

export default UserToolTip = ({userSetVisible,action}) => {
    const insets = useSafeAreaInsets()
    const style = styles(insets)

    const Invite = () => {
        action()
    }
    const Import = () => {
        action()
    }
    return (
        <View>
            <Tooltip
                isVisible={userSetVisible}
                content={
                    <View style={style.container}>
                        <View style={style.content}>
                            <View style={style.crossContainer}>
                                <Image  source={crossImg}/>
                            </View>
                            <View style={style.navigationContainer}>
                                <TouchableOpacity style={style.nav} onPress={() => Invite()}>
                                    <Text style={style.text}>{"Invite new user "}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={style.nav} onPress={() => Import()}>
                                    <Text style={style.text}>{"Import users"}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                }
                placement="bottom"
                onClose={() => action()}
                disableShadow={true}
            > 
            <TouchableOpacity style={style.touchable} onPress={() => action()}>
                <Image  source={PlusImg}/>
            </TouchableOpacity>  
            </Tooltip>
            
        </View>
    )
}

const styles = (insets) => StyleSheet.create({
    touchable:{
        marginLeft:width * 0.02,
    },
    container:{
        width: width * 0.6,  
    },
    crossContainer:{
        flexDirection:'row',
        justifyContent:'flex-end'
    },
    content:{
        paddingHorizontal:width * 0.02,
        paddingTop: height * 0.01,
        paddingBottom: height * 0.03,
    },
    navigationContainer:{
        flexDirection:'column',
        justifyContent:"space-between",
    },
    nav:{
        paddingVertical:height * 0.02,
        borderBottomWidth:1,
        borderColor:Colors.primary.secondGray,
    },
    text:{
        fontSize:17,
        lineHeight:20,
        letterSpacing:-0.48,
        color:Colors.primary.textOne,
        fontFamily:Fonts.primary.regular,
    }
})