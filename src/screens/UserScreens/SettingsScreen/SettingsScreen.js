import React, { useState } from 'react'
import { Switch } from 'react-native'
import { Text, View } from 'react-native'

export default function SettingsScreen() {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    return (
        <View>
            <Text>Dark Mode</Text>
            <Switch 
                trackColor={{false: '#767577', true: '#81b0ff'}}
                thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}>
                {/* TODO: Implement Dark mode switch functionality. */}
            </Switch>
        </View>
    )
}