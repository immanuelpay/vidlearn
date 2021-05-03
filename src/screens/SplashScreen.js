import React, { Component } from 'react'
import { View, Image, Text } from 'react-native'
import Logo from '../img/favicon.png'
import { StackActions } from '@react-navigation/native'

class SplashScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }

    componentDidMount() {
        setTimeout(() => {
            this.props.navigation.dispatch(StackActions.replace('Home'))
        }, 3000);
    }

    render() {
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Image source={Logo} />
                <Text style={{fontSize: 30, fontWeight: 'bold', letterSpacing: 7}}>VidLearn</Text>
                <Text style={{fontSize: 12}}>Exercises with Video Learning</Text>
            </View>
        );
    }
}

export default SplashScreen;