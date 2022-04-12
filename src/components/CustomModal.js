import React from 'react';
import { View, Text, StyleSheet, Dimensions,ImageBackground,Image,TouchableOpacity } from 'react-native';
import {Colors} from '~/constants/Colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Dialog, { DialogContent,SlideAnimation } from 'react-native-popup-dialog';
import Oval from '~/assets/images/signUp/Oval.png';
import File from '~/assets/icons/file.png';
import { Fonts } from '../constants/Fonts';

const { width, height } = Dimensions.get('window')

export default CustomModal = ({
        setVisible,
        callBack,
        skip,
        heading,
        activeBtnText,
        otherBtnText,
        changeSText,
        ChildrenStyle
    }) => {
    const insets = useSafeAreaInsets()
    const style = styles(insets)

    return(
        <Dialog
            visible={setVisible}
            onHardwareBackPress={() => callBack()}
            onTouchOutside={() => callBack()}
            dialogAnimation={new SlideAnimation({
            slideFrom: 'bottom',
            })}
        >   
            <DialogContent >
                <View style={style.contentContainer}>
                    <ImageBackground style={style.imgContainer} source={Oval}>
                        <Image source={File}/>
                    </ImageBackground>
                    <View style={style.textContainer}>
                        <Text style={[style.text,ChildrenStyle]}>
                           {heading}
                        </Text>
                    </View>
                    <View>
                        <Text style={style.changesText}>{changeSText}</Text>
                    </View>
                    <TouchableOpacity style={style.goBtn} onPress={() => callBack()}>
                        <Text style={style.btnText}>{activeBtnText}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={style.skipContainer} onPress={() => skip()}>
                        <Text style={style.skipText}>{otherBtnText}</Text>
                    </TouchableOpacity>
                </View>
            </DialogContent>
        </Dialog>
    )
}

const styles = (insets) => StyleSheet.create({
    contentContainer:{
        width:width * 0.60,
        alignItems:'center',
        marginTop:height * 0.05,
    },
    imgContainer:{
        width:80,
        height:80,
        alignItems:'center',
        justifyContent:'center'
    },
    textContainer:{
        marginVertical:"5%"
    },
    text:{
        fontSize:15,
        lineHeight:22,
        color:Colors.primary.text,
    },
    goBtn:{
        width:width * 0.40,
        height:45,
        backgroundColor: Colors.primary.blue,
        borderRadius:4,
        justifyContent:'center',
        alignItems:'center',
        marginTop:"5%"
    },
    btnText:{
        color: Colors.primary.white,
        fontSize:15,
        lineHeight:21,
    },
    skipContainer:{
        width:width * 0.40,
        height:45,
        justifyContent:'center',
        alignItems:'center',
    },
    skipText:{
        color: Colors.primary.text,
        fontSize:15,
        lineHeight:22,
    },
    changesText:{
        color: Colors.primary.heading,
        fontSize:15,
        lineHeight:22,
        fontFamily:Fonts.primary.regular,
    }
    
})