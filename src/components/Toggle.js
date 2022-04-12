import React from 'react';
import {Colors} from '~/constants/Colors';
import ToggleSwitch from 'toggle-switch-react-native';

export default Toggle = ({action,setOn}) => {
    return(
            <ToggleSwitch
                isOn={setOn}
                onColor={Colors.primary.secondGray}
                offColor={Colors.primary.blue}
                size="large"
                onToggle={() => action()}
            />
    )
}
