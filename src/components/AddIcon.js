import React from 'react';
import { View, Text, StyleSheet,Image } from 'react-native';
import {Colors} from '~/constants/Colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import JAdd from '~/assets/icons/JAdd.png';

export default AddIcon = ({line,icon}) => {
    const insets = useSafeAreaInsets()
    const style = styles(insets)
    return (
        <View style={style.addTeamContainer}>
            {icon === 0 ?null: <Image source={JAdd}/>}
            <Text style={[style.textAdd,{fontSize:icon === 0?13:15,}]}>{line}</Text>
        </View>
    )
}

const styles = (insets) => StyleSheet.create({
    addTeamContainer:{
        flexDirection:'row',
        marginTop:25,
    },
    textAdd:{
        paddingHorizontal:10,
        lineHeight:22,
        color:Colors.primary.blue,
        fontWeight:'bold',
        letterSpacing:0.5
    },
})