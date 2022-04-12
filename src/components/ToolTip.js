import React,{useContext} from 'react';
import { View, Text,Image, StyleSheet, Dimensions,TouchableOpacity } from 'react-native';
import {Colors} from '~/constants/Colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Tooltip from 'react-native-walkthrough-tooltip';
import moreImg from '~/assets/icons/More.png';
import crossImg from '~/assets/icons/cross.png';
import { Fonts } from '../constants/Fonts';
import { AuthContext } from '~/context/AuthContext';

const { width, height } = Dimensions.get('window')

export default ToolTip = ({setVisible,action}) => {
    const insets = useSafeAreaInsets()
    const style = styles(insets)
    const authContext = useContext(AuthContext)
    const { setGrid } = authContext;

    const condensedView = () => {
        setGrid(false)
        action()
    }
    const gridView = () => {
        setGrid(true)
        action()
    }
    return (
        <View>
            <Tooltip
                isVisible={setVisible}
                content={
                    <View style={style.container}>
                        <View style={style.content}>
                            <View style={style.crossContainer}>
                                <Image  source={crossImg}/>
                            </View>
                            <View style={style.navigationContainer}>
                                <TouchableOpacity style={style.nav} onPress={() => condensedView()}>
                                    <Text style={style.text}>{"Condensed view"}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={style.nav} onPress={() => gridView()}>
                                    <Text style={style.text}>{"Grid view"}</Text>
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
                <Image  source={moreImg}/>
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