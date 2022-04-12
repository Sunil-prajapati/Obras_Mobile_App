import React from 'react';
import {View, Text, StyleSheet, Image, Dimensions} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {Colors} from '~/constants/Colors';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native-gesture-handler';

const {width, height} = Dimensions.get('window')

export default Landing = () => {

  const navigation = useNavigation()
  const insets = useSafeAreaInsets()

  const landingBg = require('~/assets/images/landing/landingBg.png')
  const style = styles(insets)

  const openSignUpBottomSheet = () => {
    navigation.navigate('Subscribe')
  }

  return (
    <SafeAreaView style={style.container} >
      <View style={style.imageContainer} >
        <Image source={landingBg} style={style.topImage} />
      </View>
      <View style={style.bottomContainer} >
        <View style={style.buttonContainer} >
          <TouchableOpacity style={style.getStartedButton} onPress={() => openSignUpBottomSheet()} >
            <Text style={style.buttonText} >Let's get started</Text>
          </TouchableOpacity>
          <TouchableOpacity style={style.signIn} onPress={() => navigation.navigate('SignIn')}>
            <Text style={style.signInText} >Sign In</Text>
          </TouchableOpacity>
          <View style={style.privacyContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('TermsCondition',{TermOrPrivacy:0})}>
              <Text style={style.termsText}>{'Terms & Conditions'}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('TermsCondition',{TermOrPrivacy:1})}>
              <Text style={style.termsText}>{'Privacy Policy'}</Text>
            </TouchableOpacity>
          </View>
        </View>
        
      </View>
    </SafeAreaView>
  );

}


// Styles
const styles = (insets) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary.blue,
    justifyContent: 'space-between'
  },
  imageContainer: {
    backgroundColor:'red',
    justifyContent:'flex-start',
    width: width
  },
  topImage: {
    width: width,
    resizeMode: 'cover',
    position: 'absolute',
  },
  bottomContainer: {
    height: '30%',
    justifyContent: 'center',
    backgroundColor: Colors.primary.white,
    marginBottom: -insets.bottom
  },
  buttonContainer: {
    justifyContent:'space-around',
    paddingHorizontal: 16,
    paddingBottom: insets.bottom+12,
    paddingTop: 16,
    flex: 1,
  },
  getStartedButton: {
    backgroundColor: Colors.primary.orange,
    height: 45,
    marginTop: 6,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4
  },
  buttonText: {
    fontSize: 15,
    fontWeight: '600',
    color: 'white'
  },
  signIn: {
    height: 45,
    marginVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Colors.primary.blue,
    borderWidth: 1.5,
    borderRadius: 4
  },
  signInText: {
    color: Colors.primary.blue,
    fontSize: 15,
    fontWeight: '600'
  },
  privacyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  termsText: {
    color: Colors.primary.darkGray,
    fontSize: 14
  }

});
