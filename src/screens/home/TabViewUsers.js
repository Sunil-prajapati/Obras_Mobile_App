import React,{useState} from 'react';
import {
  View,  
  StyleSheet, 
  useWindowDimensions,
  Dimensions,
} from 'react-native';
import {Colors} from '~/constants/Colors';
import {useSafeAreaInsets } from 'react-native-safe-area-context';
import { TabView, SceneMap,TabBar } from 'react-native-tab-view';
import {Fonts} from '~/constants/Fonts';
import Team from './Team';

const {width, height} = Dimensions.get('window')

const FirstRoute = () => (
    <Team Icon={1}/>
  );
  
  const SecondRoute = () => (
    <View style={{ flex: 1, backgroundColor: Colors.primary.background }} />
  );

  const ThirdRoute = () => (
    <View style={{ flex: 1, backgroundColor: Colors.primary.background }} />
  );
  const FourthRoute = () => (
    <View style={{ flex: 1, backgroundColor: Colors.primary.background }} />
  );

export default TabViewUsers = () => {
    const insets = useSafeAreaInsets()
    const style = styles(insets)
    const layout = useWindowDimensions();
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'team', title: 'Team' },
        { key: 'moderators', title: 'Moderators' },
        { key: 'admins', title: 'Admins' },
        { key: 'inactive', title: 'Inactive' },
      ]);
      const renderScene = SceneMap({
        team: FirstRoute,
        moderators: SecondRoute,
        admins: ThirdRoute,
        inactive: FourthRoute,
      });

      const renderTabBar = (props) => {
        return (
          <TabBar
            activeColor={Colors.primary.heading}
            inactiveColor={Colors.primary.secondGray}
            style={style.tabBarStyle}
            labelStyle={style.label}
            {...props}
            indicatorStyle={style.indicator}
          />
        );
      }
    return (
      <View style={style.container}>
        <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
            renderTabBar = {renderTabBar}
        />
      </View>
    )
}
const styles = (insets) => StyleSheet.create({
  container:{
    height:height,
  },
  tabBarStyle:{
    backgroundColor:Colors.primary.white,
    elevation: 0,
    marginHorizontal:"-5%"
  },
  label:{
    color:Colors.primary.heading, 
    fontSize: 10, 
    lineHeight:11,
    letterSpacing:0.2,
    fontFamily:Fonts.primary.bold,
  },
  indicator:{
    backgroundColor:Colors.primary.blue, 
    height: 2.2,
  }
})