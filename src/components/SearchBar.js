import React from 'react';
import {
    StyleSheet,
    View,
    Image,
    TextInput,
    Dimensions
} from 'react-native';
import {Colors} from '~/constants/Colors';
import { Fonts } from '~/constants/Fonts';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import searchImg from '~/assets/icons/search.png';

const {width, height} = Dimensions.get('window')

export default SearchBar = () => {
    const insets = useSafeAreaInsets()
    const style = styles(insets)
    return (
        <View style={style.searchContainer}>
            <Image style={{marginLeft:'2%'}} source={searchImg}/>
            <TextInput style={style.searchBOX} placeholder={"Search"}/>
        </View>
    )
}
const styles = (insets) => StyleSheet.create({
    searchContainer:{
        marginHorizontal:"5%",
        marginTop:"3%",
        flexDirection:'row',
        alignItems:"center",
        marginBottom:"2%",
        backgroundColor:Colors.primary.inputBackground,
        borderRadius:10,
    },
    searchBOX:{
        padding:"2.5%",
        color:Colors.primary.lightGray,
        fontFamily:Fonts.primary.regular,
    }
})
