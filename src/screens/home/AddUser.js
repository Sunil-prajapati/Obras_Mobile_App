import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Image,
    PanResponder,
    Platform,
    Animated
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '~/constants/Colors';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import profileImg from '~/assets/images/home/Bitmap.png';
import cross from '~/assets/images/home/cross.png';
import SearchBar from '~/components/SearchBar';
import Tooltip from 'react-native-walkthrough-tooltip';
import crossImg from '~/assets/icons/cross.png';
import { Fonts } from '~/constants/Fonts';
import CustomModal from '~/components/CustomModal';
import BottomSheet from 'reanimated-bottom-sheet';
import { createDndContext } from "react-native-easy-dnd";
import { FlatList } from 'react-native-gesture-handler';
import { Fragment } from 'react';

const { width, height } = Dimensions.get('window')

const person1 = [
    {
        name:"Zero",
        occupation:"Mason",
        id:0,
    },
    {
        name:"Sam Robinson",
        occupation:"Mason",
        id:1,
    },
    {
        name:"Charlie Hughes",
        occupation:"Mason",
        id:2,
    },
    {
        name:"John Smith",
        occupation:"Mason",
        id:3,
    },
    {
        name:"Charlie Tony",
        occupation:"Mason",
        id:4,
    },
    {
        name:"Jason Potter",
        occupation:"Mason",
        id:5,
    },
    {
        name:"Jsix",
        occupation:"Mason",
        id:6,
    },
    {
        name:"seven",
        occupation:"Mason",
        id:7,
    },
    {
        name:"eight",
        occupation:"Mason",
        id:8,
    },
    {
        name:"ten",
        occupation:"Mason",
        id:10,
    },
    {
        name:"eleven",
        occupation:"Mason",
        id:11,
    },
    {
        name:"twelve",
        occupation:"Mason",
        id:12,
    },
]

const userDetails1 = [
    {
        id: 0,
        image: profileImg
    },
    {
        id: 1,
        image: profileImg
    },
    {
        id: 2,
        image: profileImg
    },
    {
        id: 3,
        image: profileImg
    },
    {
        id: 4,
        image: profileImg
    },
    {
        id: 5,
        image: profileImg
    },
    {
        id: 6,
        image: profileImg
    },
    {
        id: 7,
        image: profileImg
    },
    {
        id: 8,
        image: profileImg
    },
    {
        id: 9,
        image: profileImg
    },
]

export default AddUser = () => {

    const navigation = useNavigation()
    const insets = useSafeAreaInsets()
    const style = styles(insets)
    const [toolTipVisible, setToolTipVisible] = useState(false)
    const [isModalVisible, setModalVisible] = useState(false)
    const sheetRef = useRef();
    const { Provider, Droppable, Draggable } = createDndContext();
    const [person,setPerson] = useState(person1)
    const [userDetails,setUserDetails] = useState(userDetails1)
    const [isInnerScrollEnabled, setIsInnerScrollEnabled] = useState(false)

    // const pan = useState(new Animated.ValueXY())[0]
    // const panResponder = useState(
    //     PanResponder.create({
    //       onMoveShouldSetPanResponder: () => true,
    //       onPanResponderGrant: () => {
    //         pan.setOffset({
    //           x: pan.x._value,
    //           y: pan.y._value,
    //         });
    //       },
    //       onPanResponderMove: (event,gesture) => {
    //         pan.x.setValue(gesture.dx,)
    //         pan.y.setValue(gesture.dy,)  
    //       },
    //       onPanResponderRelease: () => {
    //         pan.flattenOffset();
    //       }
    //     })
    //   )[0];

    const renderContent = () => {
        return (
            <View style={style.contactListContainer} >
                <SearchBar />
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={person}
                    keyExtractor={(id) => id.toString()}
                    style={style.bottomContainer}
                    renderItem={({item,index}) => {
                        return(
                            <View >
                                <Draggable
                                    onDragStart={() => {
                                        console.log('Started draggging');
                                    }}
                                    onDragEnd={() => {
                                        console.log('Ended draggging');
                                    }}
                                    payload={Math.random(8024455)}
                                    bounceBack={false} 
                                    >
                                    {({ viewProps }) => {
                                    return (
                                        <View {...viewProps} style={[style.chatPersonContainer]} key={index}>
                                            <View style={style.rightSide}>
                                                <Image style={style.ContactAvatarImage} source={profileImg}/>
                                                <View style={style.nameContainer}>
                                                    <Text style={style.name}>{item.name}</Text>
                                                    <Text style={style.occupation}>{item.occupation}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    );
                                }}
                                </Draggable>
                            </View>
                        )
                    }}
                />
            </View>
        )
    }
    const renderHeader = () => {
        return (
            <View style={style.header}>
                <View style={style.panelHeader}>
                    <View style={style.panelHandle} />
                </View>
            </View>
        )
    }
    
    useEffect(() => {
        sheetRef.current.snapTo(0)
        return () => {
            console.log("cleanup")
        }
    }, [])

    const publish = () => {
        setToolTipVisible(!toolTipVisible)
    }

    const publishNow = () => {
        setModalVisible(!isModalVisible)
        setToolTipVisible(false)
    }

    const publishLater = () => {
        setToolTipVisible(false)
    }

    const modalHandler = () => {
        setModalVisible(false)
        setToolTipVisible(false)
        navigation.navigate('Home')
    }

    const skipHandle = () => {
        setModalVisible(false)
        setToolTipVisible(false)
    }

    return (
        <>
            <SafeAreaView style={{ flex: 0, backgroundColor: Colors.primary.blue, }}/>
            <SafeAreaView style={style.container}>
                <View style={style.headerContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                        <Text style={style.cancelDone}>Cancel</Text>
                    </TouchableOpacity>
                    <Text style={style.newProject}>Washington Place</Text>
                    <Tooltip
                        isVisible={toolTipVisible}
                        content={
                            <View style={style.toolTipContainer}>
                                <View style={style.content}>
                                    <View style={style.crossContainer}>
                                        <Image source={crossImg} />
                                    </View>
                                    <View style={style.navigationContainer}>
                                        <TouchableOpacity style={style.nav} onPress={() => publishNow()}>
                                            <Text style={style.text}>{"Publish now"}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={style.nav} onPress={() => publishLater()}>
                                            <Text style={style.text}>{"Publish later"}</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        }
                        placement="bottom"
                        onClose={() => setToolTipVisible(!toolTipVisible)}
                        disableShadow={true}
                    >
                    <TouchableOpacity onPress={() => publish()}>
                        <Text style={style.cancelDone}>Publish</Text>
                    </TouchableOpacity>
                    </Tooltip>
                </View>
                <CustomModal
                    setVisible={isModalVisible}
                    callBack={modalHandler}
                    skip={skipHandle}
                    heading={'         Are you sure you \n   want to publish schedule?'}
                    changeSText={"25 Team members updated"}
                    activeBtnText={"Confirm"}
                    otherBtnText={"Cancel"}
                    ChildrenStyle={{ fontSize: 18, lineHeight: 25, fontFamily: Fonts.primary.semiBold }}
                />
                <Provider>
                    <View showsVerticalScrollIndicator={false} style={style.sheetContainer}>
                        <Droppable
                            onEnter={() => {
                                console.log('Draggable entered');
                            }}
                            onLeave={() => {
                                console.log('Draggable left');
                            }}
                            onDrop={({ payload }) => {
                                console.log('Draggable with the following payload was dropped', payload);
                            }}
                            >
                            {({ active, viewProps }) => {
                                return (
                                    <View {...viewProps} style={[style.box,{backgroundColor:active? Colors.primary.blue: Colors.primary.white,}]}>
                                        <View style={style.imagesContainer}>
                                            {userDetails.map((user, index) => {
                                                return (
                                                    <View key={index} style={{ flexDirection: 'row', marginHorizontal: "5%", marginVertical: "2%" }}>
                                                        <Image
                                                            style={style.avatarImage}
                                                            source={user.image}
                                                        />
                                                        <TouchableOpacity style={style.crossImage} onPress={() => navigation.navigate('dragDrop')}>
                                                            <Image
                                                                source={cross}
                                                            />
                                                        </TouchableOpacity>
                                                    </View>
                                                )
                                            })}
                                        </View>
                                    </View>
                                );
                            }}
                        </Droppable>
                        <BottomSheet
                            ref={sheetRef}
                            snapPoints={[height * 0.6, Platform.OS == "android"?"3%":"1%"]}
                            initialSnap={1}
                            enabledContentTapInteraction
                            enabledGestureInteraction
                            enabledContentGestureInteraction
                            enabledInnerScrolling
                            renderContent={renderContent}
                            enabledInnerScrolling={true}
                            renderHeader={renderHeader}
                        />
                    </View>
                </Provider>
            </SafeAreaView>
        </>
    )
}

const styles = (insets) => StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: Colors.primary.white,
        justifyContent: 'space-between',
    },
    headerContainer: {
        width,
        height: height * 0.05,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: "4.27%",
        borderBottomWidth: 1,
        backgroundColor: Colors.primary.blue,
        marginTop:Platform.OS == "android"? 0:height * -0.054,
    },
    cancelDone: {
        fontSize: 17,
        lineHeight: 20,
        color: Colors.primary.white,
    },
    newProject: {
        fontSize: 17,
        lineHeight: 22,
        color: Colors.primary.white,
        letterSpacing: 0.4,
    },
    sheetContainer: {
        width: width,
        height: height,
        backgroundColor: Colors.primary.background,
        flex:1
    },
    box: {
        margin: "3%",
        borderRadius: 12,
        borderColor: Colors.primary.inputBorderColor,
    },
    avatarImage: {
        width: width * 0.15,
        height: width * 0.15,
        borderRadius: (width * 0.15) / 2,
        borderColor: Colors.primary.green,
        borderWidth: 3.5,
    },
    imagesContainer: {
        paddingVertical: "5%",
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    crossImage: {
        marginLeft: "-10%",
    },
    contactListContainer: {
        backgroundColor: Colors.primary.white,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    bottomContainer: {
        // marginBottom: height * 0.13,
        // height: height * 0.6,
    },
    toolTipContainer: {
        width: width * 0.6,
    },
    crossContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    content: {
        paddingHorizontal: width * 0.02,
        paddingTop: height * 0.01,
        paddingBottom: height * 0.03,
    },
    navigationContainer: {
        flexDirection: 'column',
        justifyContent: "space-between",
    },
    nav: {
        paddingVertical: height * 0.02,
        borderBottomWidth: 1,
        borderColor: Colors.primary.secondGray,
    },
    text: {
        fontSize: 17,
        lineHeight: 20,
        letterSpacing: -0.48,
        color: Colors.primary.textOne,
        fontFamily: Fonts.primary.regular,
    },
    header: {
        backgroundColor: Colors.primary.white,
        paddingVertical: height * 0.01,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    panelHeader: {
        alignItems: 'center',
    },
    panelHandle: {
        width: width * 0.15,
        height: height * 0.008,
        borderRadius: 4,
        backgroundColor: Colors.primary.secondGray,
    },
    chatPersonContainer:{
        height:height * 0.085,
        backgroundColor:Colors.primary.white,
        flexDirection:'row',
        alignItems:'center',
        borderColor:Colors.primary.secondGray,
        borderTopWidth:0.5,
        justifyContent:"space-between",
    },
    nameContainer:{
        flexDirection:'column',
        paddingHorizontal:"4%",
        justifyContent:'space-between',
        height:"57%",
    },
    name:{
        fontSize:15,
        lineHeight:22,
        fontFamily:Fonts.primary.semiBold,
        color:Colors.primary.heading,
    },
    occupation:{
        fontSize:13,
        lineHeight:15,
        fontFamily:Fonts.primary.semiBold,
        color:Colors.primary.gray,
    },
    ContactAvatarImage:{
        width: width * 0.12,
        height: width * 0.12,
        borderRadius: (width * 0.12) / 2,
        borderColor:Colors.primary.green,
        borderWidth:2,
    },
    rightSide:{
        flexDirection:'row',
        paddingHorizontal:width * 0.04,
    },
    secondHeight:{
        marginBottom:insets.bottom+12
    }
})