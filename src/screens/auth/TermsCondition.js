import React from 'react';
import {View,Text,Dimensions,StyleSheet,ScrollView} from "react-native";
import {Colors} from '~/constants/Colors';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

const {width, height} = Dimensions.get('window')

export default TermsCondition = (props) => {
    const {TermOrPrivacy} = props.route.params;
    const insets = useSafeAreaInsets()
    const style = styles(insets)
    return(
        <SafeAreaView style={style.container}>
            <View style={style.headingContainer}>
                <Text style={style.heading}>
                    {TermOrPrivacy == 0?"Terms and Conditions":"Private Policy"}
                </Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} style={style.sheetContainer}>
                <Text style={style.text}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nulla facilisi cras fermentum odio eu feugiat pretium nibh ipsum. At imperdiet dui accumsan sit amet nulla. Commodo nulla facilisi nullam vehicula. Nisl nisi scelerisque eu ultrices vitae. Pulvinar pellentesque habitant morbi tristique senectus et netus et. Pretium lectus quam id leo in vitae turpis. Amet luctus venenatis lectus magna. Turpis tincidunt id aliquet risus feugiat in. Amet porttitor eget dolor morbi non arcu risus. Fringilla ut morbi tincidunt augue. Fames ac turpis egestas sed tempus urna. In cursus turpis massa tincidunt dui ut. Vel quam elementum pulvinar etiam non. Ligula ullamcorper malesuada proin libero nunc. Augue neque gravida in fermentum et sollicitudin. Quis varius quam quisque id diam vel. Diam maecenas ultricies mi eget.
                    Est ullamcorper eget nulla facilisi etiam dignissim diam quis. Consequat ac felis donec et odio pellentesque diam. Urna neque viverra justo nec ultrices dui. Tempus iaculis urna id volutpat lacus laoreet non curabitur. Consequat semper viverra nam libero justo. Sed blandit libero volutpat sed cras ornare. Ut consequat semper viverra nam libero justo laoreet sit. Id diam maecenas ultricies mi eget mauris pharetra et. Nisl tincidunt eget nullam non nisi est sit. Pretium lectus quam id leo in vitae turpis massa. Enim praesent elementum facilisis leo vel fringilla est ullamcorper. Eu augue ut lectus arcu bibendum at varius vel pharetra. Sit amet nulla facilisi morbi tempus iaculis urna. Lobortis scelerisque fermentum dui faucibus. Orci a scelerisque purus semper eget duis at tellus. Blandit volutpat maecenas volutpat blandit aliquam etiam erat velit scelerisque. Cursus turpis massa tincidunt dui ut ornare lectus sit. Eu lobortis elementum nibh tellus molestie nunc.
                </Text>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = (insets) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primary.blue,
        justifyContent: 'space-between',
    },
    sheetContainer:{
        width:width,
        height:height,
        backgroundColor:Colors.primary.white,
        marginTop:height * 0.02,
        paddingHorizontal:12,
        paddingTop:2
    },
    headingContainer:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        marginTop:height * 0.02,
    },
    heading:{
        fontSize:17,
        lineHeight:22,
        letterSpacing:0.4,
        color:Colors.primary.white,
        alignSelf:'center'
    },
    text:{
        fontSize:15,
        lineHeight:22,
        color:Colors.primary.heading,
    }

})