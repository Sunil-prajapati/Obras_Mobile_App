import React,{useEffect,useState} from 'react';
import {
    View, 
    Text, 
    StyleSheet, 
    Dimensions,
    TouchableOpacity,
    Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {Colors} from '~/constants/Colors';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Fonts } from '../../constants/Fonts';
import Header from '~/components/Header';
import TabViewUsers from './TabViewUsers';

const {width, height} = Dimensions.get('window')

export default Users = () => {

    const navigation = useNavigation()
    const insets = useSafeAreaInsets()
    const style = styles(insets)

    const addUser =  () => {}
    
    return (
        <SafeAreaView style={style.container}>
            <Header name={"Users"}  plusImg={1} pulsIconClick={addUser}/>
            <View style={style.sheetContainer}>
                <TabViewUsers />
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
})