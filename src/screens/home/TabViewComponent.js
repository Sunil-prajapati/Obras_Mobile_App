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
import Active from './Active';
import {Fonts} from '~/constants/Fonts';
import Inactive from './Inactive';

const {width, height} = Dimensions.get('window')

const FirstRoute = () => (
      <Active />
  );
  
  const SecondRoute = () => (
    <Inactive />
  );

export default TabViewComponent = () => {
    const insets = useSafeAreaInsets()
    const style = styles(insets)
    const layout = useWindowDimensions();
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'active', title: 'ACTIVE' },
        { key: 'inActive', title: 'INACTIVE' },
      ]);
      const renderScene = SceneMap({
        active: FirstRoute,
        inActive: SecondRoute,
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
  },
  label:{
    color:Colors.primary.heading, 
    fontSize: 12, 
    lineHeight:11,
    letterSpacing:0.5,
    fontFamily:Fonts.primary.bold,
  },
  indicator:{
    backgroundColor:Colors.primary.blue, 
    height: 2.2,
  }
})