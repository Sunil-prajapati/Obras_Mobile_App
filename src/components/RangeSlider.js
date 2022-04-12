import React,{useCallback} from 'react';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';
import {Colors} from '~/constants/Colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Slider from 'rn-range-slider';

export default RangeSlider = () => {
    const insets = useSafeAreaInsets()
    const style = styles(insets)
    const renderThumb = useCallback(() => <View style={style.thumb} />, []);
    const renderRail = useCallback(() => <View style={style.rail} />, []);
    const renderRailSelected = useCallback(() => <View style={style.railSelected} />, []);
    const renderLabel = useCallback(value => (<View style={styles.label}>
        <Text style={styles.labelText}>{value}</Text>
      </View>), []);
    const renderNotch = useCallback(() => <View style={style.notch} />, []);
    const handleValueChange = useCallback((low, high) => {
    low;
    high;
    }, []);
    
    return(
        <Slider
            style={style.slider}
            min={0}
            max={30}
            step={1}
            renderThumb={renderThumb}
            renderRail={renderRail}
            renderRailSelected={renderRailSelected}
            renderLabel={renderLabel}
            renderNotch={renderNotch}
            onValueChanged={handleValueChange}
            disableRange={true}
      />
    )
}

const styles = (insets) => StyleSheet.create({
    slider: {

    },
    thumb: {
        width:25,
        height:25,
        borderWidth: 1,
        borderColor: Colors.primary.white,
        backgroundColor:Colors.primary.white,
        borderRadius:25/2,
        shadowOffset:{  width: 1,  height: 1,  },
        shadowColor: Colors.primary.black,
        shadowOpacity: 0.5,
        elevation: 3,
    },
    rail: {
        flex: 1,
        height: 14,
        borderRadius: 6,
        backgroundColor: Colors.primary.secondGray,
    },
    railSelected: {
        height: 14,
        backgroundColor: Colors.primary.blue,
        borderRadius: 6,
    },
    notch: {
        width: 8,
        height: 8,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderTopColor: Colors.primary.black,
        borderLeftWidth: 4,
        borderRightWidth: 4,
        borderTopWidth: 8,
    },
})