import React,{useState,useEffect,useCallback,useRef,useContext} from 'react';
import {
    View,
    StyleSheet, 
    Dimensions,
    TouchableOpacity,
    ImageBackground,
    Image,
    Text,
    TextInput,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {Colors} from '~/constants/Colors';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import SubHeader from '~/components/SubHeader';
import { Fonts } from '~/constants/Fonts';
import { Bubble, GiftedChat,InputToolbar,Actions, Composer,Day,Time,Avatar} from 'react-native-gifted-chat';
import profileImg from '~/assets/images/home/Bitmap.png';
import BottomSheet from 'reanimated-bottom-sheet';
import Camera from '~/assets/icons/Shape.png';
import Oval from '~/assets/images/signUp/Oval.png';
import messageIcon from '~/assets/icons/message_icon.png';
import attachment from '~/assets/icons/Attach.png';
import message from '~/assets/icons/message.png';
import { AuthContext } from '../../context/AuthContext';
import { UserContext } from '../../context/UserContext';
import {useRoute} from '@react-navigation/native';
import {launchImageLibrary} from 'react-native-image-picker';
import {uploadMessageImages, getMessagePicture} from '../../utils/api';
import uuid from 'react-native-uuid';
import ImageResizer from 'react-native-image-resizer';
const {width, height} = Dimensions.get('window')

export default ChattingScreen = (props) => {
    const route = useRoute();
    const  {item} = props.route.params;
    const insets = useSafeAreaInsets()
    const style = styles(insets)
    const sheetRef = useRef();
    const [messages, setMessages] = useState([]);
    const authContext = useContext(AuthContext);
    const userContext = useContext(UserContext)
    const {currentAuth} = authContext;
    const { adminCurrentAuthId, count, setCount} = userContext
    const [imageLoading, setImageLoading] = useState(false);
    const [messageImage, setMessageImage] = useState(null);
    const {lastName, email,selectedProfession,projectTitle,name,profileImg,phone} = item;
    const [details] =useState([
    {
        title:"Team Member",
        subTitle:`${name} ${lastName}`,
        id:0,
    },
    {
      title:"Title",
      subTitle:selectedProfession,
        id:1,
    },
    {
      title:"Project",
      subTitle:projectTitle,
      id:2,
    },
    {
      title:"Phone",
      subTitle:`${phone == null ?  "": `${phone}`} `,
      id:3,
    },
    {
      title:"Email",
      subTitle:email,
      id:4,
  },
    ])

    useEffect(() => { 
      var subscription = firestore()
        .collection('chat')      
        .doc(adminCurrentAuthId+ '-' +route.params.userId)
        .collection('messages')
        .orderBy('createdAt', 'desc')
        .onSnapshot(
          (querySnapshot) => {         
            if (querySnapshot._docs) {        
              let fetchedTexts = [];
              querySnapshot.forEach((doc) => {
                const data = doc.data();
                if (data.createdAt) {
                  let text = {
                    _id: data._id,
                    text: data.text,
                    createdAt: data.createdAt.toDate(),
                    user: data.user,
                    receiverId: data.receiverId,
                    image: data.image,
                  };
                  fetchedTexts.push(text);
                } else {
                  let text = {
                    _id: data._id,
                    text: data.text,
                    createdAt: new Date(),
                    user: data.user,
                  };
                  fetchedTexts.push(text);
                }
              });
              setMessages(fetchedTexts);
            } else {
              setMessages();
            }
          },
          (error) => {
            console.log('error listening for message changes', error);
          },
        );
  
      return () => subscription()
      }, [route.params.userId])    
      const onSend = useCallback((messages = []) => {
        const messageArray = messages[0];
        const customMessage = {
          ...messageArray,
          senderId:adminCurrentAuthId,
          receiverId: route.params.userId,
          image: '',
          createdAt: new Date(),
        };
        setMessages(previousMessages => GiftedChat.append(previousMessages, customMessage))
        firestore()
        .collection('chat')
        .doc(adminCurrentAuthId+ '-' +route.params.userId)
        .collection('messages')
        .add({
          ...customMessage,
          createdAt: firestore.FieldValue.serverTimestamp(),
        });
      }, [])

      const options = {
        title: 'Select Image',
        noData: true,
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
      };

      const openPicker = () => {
        launchImageLibrary(options, async (response) => {
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else {
            setMessageImage(response.assets[0].uri);
            let newWidth = 200;
            let newHeight = 200;
            let compressFormat = 'JPEG';
            let quality = 600;
            let rotation = 0;
            let outputPath = null;
            let imageUri = response.assets[0].uri;
            ImageResizer.createResizedImage(
              imageUri,
              newWidth,
              newHeight,
              compressFormat,
              quality,
              rotation,
              outputPath,
            )
              .then((resizeResponse) => {
                let uri = resizeResponse.uri;
                let uploadUri =
                  Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
                let user = {};
                user['_id'] = route.params.userId;
                let imageMessage = {
                  _id: uuid.v4(),
                  createdAt: new Date(),
                  senderId:adminCurrentAuthId,
                  receiverId: route.params.userId,
                  text: '',
                  image: uploadUri,
                  messageType: 'image',
                  user: user,
                };
                setMessages((previousMessages) =>
                  GiftedChat.append(previousMessages, imageMessage),
                );
                setImageLoading(true);
                uploadMessageImages(
                  uploadUri,
                  response.assets[0].fileName,
                  route.params.userId,
                  setError,
                  onSuccess,
                );
                function onSuccess(imgName) {
                  getMessagePicture(imgName, route.params.userId, fetchSuccess);
                  function fetchSuccess(url) {
                    firestore()
                      .collection('chat')
                      .doc(adminCurrentAuthId + '-' +route.params.userId)
                      .collection('messages')
                      .add({
                        ...imageMessage,
                        createdAt: firestore.FieldValue.serverTimestamp(),
                      });
                    setImageLoading(false);
                  }
                }
              })
              .catch((err) => {
                console.log('image resizing error => ', err);
                setImageLoading(false);
              });
          }
        });
      };

     
      const renderBubble = (props) => {
          return(
            <Bubble
                {...props}
                wrapperStyle={{
                    left:{
                        backgroundColor:Colors.primary.white,
                        borderTopRightRadius: 15,
                        borderTopLeftRadius: 15,
                        borderBottomLeftRadius: 0,
                        borderBottomRightRadius: 15
                    },
                    right:{
                      fontFamily:Fonts.primary.regular,
                      borderTopRightRadius: 15,
                      borderTopLeftRadius: 15,
                      borderBottomLeftRadius: 15,
                      borderBottomRightRadius: 0
                    }
                }}
                textStyle={{
                    left:{
                      color: Colors.primary.heading,
                      fontFamily: Fonts.primary.regular,
                      fontSize:15,
                      lineHeight:22,
                    },
                    right:{
                      color: Colors.primary.white,
                      fontFamily: Fonts.primary.regular,
                      fontSize:15,
                      lineHeight:22,
                    }
                }}
            />
          )
      }

      const renderInputToolbar = props => {
        return(
          <InputToolbar
            {...props}
            containerStyle={{
              backgroundColor: Colors.primary.inputBackground,
              paddingVertical:"0.4%",
            }}
            primaryStyle={{ alignItems: 'center' }}
          />
        )
      }

      const renderComposer = (props) => (
        <Composer
            {...props}
            textInputStyle={style.textInputMessage}
        >
            <TextInput style={style.textInputMessage} ></TextInput>
        </Composer>
      )

      const renderActions = (props) => (
        <Actions
            {...props}
            containerStyle={style.actionContainer}
            icon={() => (
                <Image style={style.attachment} source={attachment} />
            )}
            options={{
                'Choose From Library': () => {
                    console.log('Choose From Library');
                    openPicker();
                },
                Cancel: () => {
                    console.log('Cancel');
                },
            }}
            optionTintColor="#222B45"
        />
      )
      function setError() {
        alert('message not sent');
      }
      const renderAvatar = (props) => (
        <Avatar
          {...props}
          containerStyle={{
            left: style.avatarContainerLeft,
            right: style.avatarContainerRight,
          }}
          imageStyle={{
            left: style.avatarLeft,
            right: style.avatarRight,
          }}
        />
      );
      const renderChatEmpty = () => {
        return (
          <View style={style.noMessageContainer}>
              <Image source={message}/>
              <Text style={style.noMsg}>{"No messages"}</Text>
          </View> 
        )
    }

      const renderHeader = () => {
        return (
          <View style={style.header}>
            <View style={style.panelHeader}>
              <View style={style.panelHandle} />
              <Text style={style.name}>{"Team Member"}</Text>
            </View>
          </View>
        )
      }

      const renderContent = () => {      
        return (
          <View style={style.bottomSheetContainer}>
            <View style={style.profileImg}>       
            {!profileImg ?
                <ImageBackground style={style.imgContainer} source={Oval}>
                  <Image source={Camera}/>
                </ImageBackground>
                :
                <ImageBackground style={style.imgContainer} source={{uri:profileImg}}>
                <Image style={style.imgContainer} source={{uri:profileImg}}/>
              </ImageBackground>
                }
            </View>
            {details.map((item,index) => { 
              return(
                <View style={style.inputView} key={index}>
                  <View style={style.phoneContainer}>
                      <View style={{flexDirection:"column"}}>
                        <Text style={style.title}>{item.title}</Text>
                        <Text style={style.subTitle}>{item.subTitle}</Text>
                      </View>
                  </View>
                </View>
              ) 
             })} 
          </View>
        )
      }
      const renderDay = (props) => {
        return <Day {...props} textStyle={style.textChatDay} />;
      };

      const renderTime = (props) => {
        return (
          <Time
            {...props}
            textStyle={{
              left: style.timeLeft,
              right: style.timeRight,
            }}
          />
        );
      };

    return(
        <SafeAreaView style={style.container}>
            <TouchableOpacity onPress={() => sheetRef.current.snapTo(0)}>              
               <View style={{justifyContent: 'space-between'}}>            
            <SubHeader name={name}/>       
            </View>
            </TouchableOpacity> 
             <View style={style.sheetContainer}>
                <GiftedChat
                    messages={messages}
                    onSend={messages => onSend(messages)}
                    user={{
                      _id:route.params.userId,
                        name: name,
                        avatar: profileImg,
                    }}
                    renderBubble={renderBubble}
                    renderComposer={renderComposer}
                    renderActions={renderActions}
                    renderChatEmpty={messages.length < 1 ? renderChatEmpty : null}
                    renderDay={renderDay}
                    renderTime={renderTime}
                    renderAvatar={renderAvatar}
                    showUserAvatar={true}
                    alwaysShowSend={false}
                    useNativeDriver={true}
                    scrollToBottom
                    placeholder={"Type message"}
                    renderInputToolbar={renderInputToolbar}
                    messagesContainerStyle={{ transform: [ { scaleY: messages.length === 0 ? -1 : 1} ] }}
                />
             </View>
             <BottomSheet
                ref={sheetRef}
                snapPoints={[height * 0.85, "-10%"]}
                initialSnap={1}
                enabledGestureInteraction={true}
                renderContent={renderContent}
                renderHeader={renderHeader}
              />
        </SafeAreaView>
    )
}

const styles = (insets) => StyleSheet.create({
    container:{
        backgroundColor: Colors.primary.blue,
        justifyContent: 'space-between',
        flex:1,
    },
    sheetContainer:{
        width:width,
        height:height,
        backgroundColor:Colors.primary.background,
        flex:1
    },
    header: {
      backgroundColor: Colors.primary.blue,
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
        backgroundColor: Colors.primary.darkerBlue,
        marginBottom:'2%'
    },
    profileImg:{
      marginTop:25,
      alignItems:'center',
     
    },
    imgContainer:{
      width:109,
      height:109,         
      alignItems:'center',
      justifyContent:'center',                                                                           
  },
  imageHeaderUser: {
    width:  50,
    height: 50,
    borderRadius: (width * 50) / 2,
    borderWidth:1,
    borderColor:'red'
  },
  bottomSheetContainer:{
    backgroundColor:Colors.primary.white,
    height,
  },
  inputView:{
    flexDirection:'row',
    justifyContent:"space-between",
    borderBottomWidth:1,
    borderColor:Colors.primary.secondGray,
    marginHorizontal:"5%",
    paddingVertical:"4%",
  },
  title:{
    fontSize:13,
    lineHeight:15,
    letterSpacing:0.5,
    textTransform:'uppercase',
    color:Colors.primary.gray,
    fontFamily:Fonts.primary.semiBold,
  },
  subTitle:{
    fontSize:15,
    lineHeight:22,
    color:Colors.primary.heading,
    fontFamily:Fonts.primary.regular,
    marginTop:"2.5%"
  },
  phoneContainer:{
    flexDirection:'row',
    justifyContent:"space-between",
    width:width * 0.9,
  },
  name:{
    fontSize:17,
    lineHeight:22,
    color:Colors.primary.white,
    letterSpacing:-0.408,
    fontFamily:Fonts.primary.semiBold
  },
  textInputMessage:{
    borderRadius: 5,
    padding: 5,
    color: Colors.primary.lightGray,
    fontFamily: Fonts.primary.regular,
    backgroundColor: Colors.primary.inputBackground,
    marginLeft: "5%",
  },

  actionContainer:{
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 4,
    marginRight: 4,
    marginBottom: 0,
  },
  attachment:{
    width: 24,
    height: 23,
    marginRight: 24,
  },

  noMessageContainer:{
    alignItems:'center',
    flexDirection:'column',
    marginTop:height * 0.15,
  },
  
  noMsg:{
    fontSize:24,
    lineHeight:28,
    color:Colors.primary.heading,
    fontFamily:Fonts.primary.regular,
    marginTop:"3%",
  },
})