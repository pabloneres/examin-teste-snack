import React, { Component } from 'react'
import { StatusBar } from "expo-status-bar";
import { View, ImageBackground, Image } from 'react-native'

import LogoFullWhite from '~/assets/svg/logo_full_white.svg'
import { UIViewScreen } from '~/components'

class Splash extends Component {
    constructor(props) {
        super(props)

    }

    render() {
        return (
            <View 
                style={{flex: 1, alignItems: "center", backgroundColor: "#AF804D", alignItems: "center", justifyContent: "center"}}
            >
                <StatusBar style='light' backgroundColor='#AF804D'/>
                <LogoFullWhite/>
            </View>
        )
    }
}

export default Splash
