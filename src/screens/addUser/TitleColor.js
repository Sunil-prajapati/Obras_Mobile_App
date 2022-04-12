import React,{useState} from 'react';
import { View, Text, StyleSheet, Dimensions,Image,TouchableOpacity,Animated,TouchableHighlight,} from 'react-native';
import {Colors} from '~/constants/Colors';
import { useSafeAreaInsets,SafeAreaView} from 'react-native-safe-area-context';
import OutlineBtn from '~/components/OutlineBtn';
import { useNavigation } from '@react-navigation/native';
import Input from '~/components/Input';
import crossImg from '~/assets/icons/cross.png';
import trashImg from '~/assets/icons/trash.png';
import { Fonts } from '../../constants/Fonts';
import { SwipeListView } from 'react-native-swipe-list-view';

const { width, height } = Dimensions.get('window')

const ColorsTitle = [
    {
        id:0,
        color:Colors.primary.green
    },
    {
        id:1,
        color:Colors.primary.darkOrange
    },
    {
        id:2,
        color:Colors.primary.red
    },
    {
        id:3,
        color:Colors.primary.blue
    },
    {
        id:5,
        color:Colors.primary.skyBlue
    },
    {
        id:6,
        color:Colors.primary.purple
    },
    {
        id:7,
        color:Colors.primary.gray
    },
    {
        id:8,
        color:Colors.primary.lightYellow
    },
    {
        id:9,
        color:Colors.primary.parrot
    },
    {
        id:10,
        color:Colors.primary.pink,
    },
]

const occupations = [
    {
        title:"Mason",
        color:Colors.primary.parrot
    },
    {
        title:"Laborer",
        color:Colors.primary.purple
    },
    {
        title:"Electrician",
        color:Colors.primary.darkOrange
    },
    {
        title:"Plumber",
        color:Colors.primary.skyBlue
    },
]

export default TitleColor = () => {
    const navigation = useNavigation()
    const insets = useSafeAreaInsets()
    const style = styles(insets)
    const [listData,setListData] = useState(
        occupations.map((occupationsItem,index) => ({
            key:`${index}`,
            title:occupationsItem.title,
            color:occupationsItem.color,
        }))
    )

    const closeRow = (rowMap,rowKey) => {
        if(rowMap[rowKey]){
            rowMap[rowKey].closeRow()
        }
    }

    const deleteRow = (rowMap,rowKey) => {
        closeRow(rowMap,rowKey)
        const newData = [...listData]
        const prevIndex = listData.findIndex(item => item.key === rowKey)
        newData.splice(prevIndex,1)
        setListData(newData)
    }

    const onRowDidOpen = rowKey => {
        console.log('This row opened', rowKey);
    };


    const VisibleItem = props => {
        const {
            data,
            rowHeightAnimatedValue,
            removeRow,
            leftActionState,
            rightActionState
        } = props;

        if(rightActionState){
            Animated.timing(rowHeightAnimatedValue, {
                toValue: 0,
                duration: 200,
                useNativeDriver: false,
        }).start(() => {
            removeRow();
        });
        }

        return (
            <Animated.View styles={[style.rowFront,{height:rowHeightAnimatedValue}]}>
                <TouchableHighlight onPress={() => null} style={style.rowFrontVisible}>
                    <View style={style.listContainer}>
                        <Text style={style.title}>{data.item.title}</Text>
                        <View style={[style.circle,{backgroundColor:data.item.color}]}></View>
                    </View>
                </TouchableHighlight>
            </Animated.View>
        )
    }

    const renderItem = (data,rowMap) => {
        const rowHeightAnimatedValue = new Animated.Value(60)
        return (
            <VisibleItem 
             data={data}
             rowHeightAnimatedValue={rowHeightAnimatedValue} 
             removeRow={() => deleteRow(rowMap,data.item.key)}/>
        );
    }

    const HiddenItemWithAction = props => {
        const {
            onClose,
            onDelete,
            leftActionActivated,
            rightActionActivated,
            rowActionAnimatedValue,
            rowHeightAnimatedValue,
        } = props

        if(rightActionActivated){
            Animated.spring(rowActionAnimatedValue, {
                toValue: 500,
                useNativeDriver: false
              }).start();
        }

        return(
            <Animated.View style={[style.rowBack,{height:rowHeightAnimatedValue}]}>
                <Text style={{color:Colors.primary.white}}>LEFT</Text>
                    <TouchableOpacity style={[style.backRightBtn,style.backRightBtnLeft]} onPress={onClose}>
                        <Image source={crossImg} />
                    </TouchableOpacity>
                <Animated.View style={[style.backRightBtn,style.backRightBtnRight],{width:rowActionAnimatedValue}}>
                <View style={{height:40}}>
                    <TouchableOpacity style={[style.backRightBtn,style.backRightBtnRight]} onPress={onDelete}>
                        
                            <Image  source={trashImg} style={{width:40,height:35}}/>
                        
                    </TouchableOpacity>
                    </View>
                </Animated.View>
            </Animated.View>
        )
    }

    const renderHiddenItem = (data,rowMap) => { 
        const rowActionAnimatedValue = new Animated.Value(75)
        const rowHeightAnimatedValue = new Animated.Value(60)
        return(
            <HiddenItemWithAction
                data={data}
                rowMap={rowMap}
                rowActionAnimatedValue={rowActionAnimatedValue}
                rowHeightAnimatedValue={rowHeightAnimatedValue}
                onClose={() => closeRow(rowMap,data.item.key)}
                onDelete={() => deleteRow(rowMap,data.item.key)}
            />
        )
    }

    return (
        <SafeAreaView style={style.container}>
            <View style={style.sheetContainer}>
                <View style={style.contentContainer}>
                    <TouchableOpacity style={style.crossContainer} onPress={() => navigation.goBack()}>
                        <Image source={crossImg}/>
                    </TouchableOpacity>
                    <View style={style.inputContainer}>
                        <Input placeHolder={"Ex. Mason, Laborer, Electrician"} inputHeading={"Title"}/>
                    </View>
                    <View style={style.colorsContainer}>
                        {ColorsTitle.map((colName,index) => {
                            return(
                            <TouchableOpacity style={style.colorRow} key={index} onPress={() => null}>
                                <View style={[style.roundCircle,{backgroundColor:colName.color}]}>
                                </View>
                            </TouchableOpacity>
                            );
                        })}
                    </View>
                    <TouchableOpacity style={style.btnContainer} onPress={() => null}>
                        <OutlineBtn text={"Create"}/> 
                    </TouchableOpacity>

                    <View style={style.bottomContainer}>
                        <Text style={style.swipe}>{"Swipe left to delete"}</Text>
                    </View>

                    <SwipeListView
                        data={listData}
                        renderItem={renderItem}
                        renderHiddenItem={renderHiddenItem}
                        leftOpenValue={75}
                        rightOpenValue={-150}
                        disableRightSwipe
                        onRowDidOpen={onRowDidOpen}
                        leftActivationValue={100}
                        rightActivationValue={-200}
                        leftActionValue={0}
                        rightActionValue={-500}
                    />
                </View>  
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
        marginTop:height * 0.1,
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
    },
    contentContainer:{
        height:height,
        paddingHorizontal:width * 0.1,
    },
    inputContainer:{
    },
    crossContainer:{
        justifyContent:"flex-end",
        flexDirection:"row",
        marginVertical:height * 0.03
    },
    colorsContainer:{
        flexDirection:'row',
        flexWrap:"wrap",
        marginVertical:height * 0.03,
    },
    colorRow:{
        flexDirection:"row",
        marginTop: height * 0.02,
        marginHorizontal:width * 0.03,
    },
    roundCircle:{
        width:35,
        height:35,
        borderRadius:35/2,
    },
    btnContainer:{
        marginHorizontal:width * 0.03,
    },
    listContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center', 
        borderTopWidth:0.5,
        borderBottomWidth:0.5,
        borderColor:Colors.primary.line,
        paddingVertical:height * 0.013,
    },
    title:{
        fontSize:17,
        lineHeight:22,
        letterSpacing:0.4,
        color:Colors.primary.heading,
        fontFamily:Fonts.primary.regular,
    },
    circle:{
        width:10,
        height:10,
        borderRadius: 10/2,
    },bottomContainer:{
        marginTop: height * 0.02,
    },
    swipe:{
        fontSize:13,
        lineHeight:25,
        letterSpacing:0.4,
        color:Colors.primary.lightGray,
        fontFamily:Fonts.primary.regular,
    },
    backRightBtn: {
        alignItems: 'flex-end',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75,
        paddingRight: 17,
    },
    backRightBtnLeft: {
        backgroundColor:Colors.primary.white,
        right: 75,
      },
      backRightBtnRight: {
        backgroundColor: Colors.primary.white,
        right: 0,
      },
      rowFrontVisible: {
        backgroundColor: Colors.primary.white,
        borderRadius: 5,
        padding: 7,
      },
      rowFront: {
        borderRadius: 5,
        shadowColor: '#999',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
      },
      rowBack: {
        alignItems: 'center',
        backgroundColor:Colors.primary.background,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
})