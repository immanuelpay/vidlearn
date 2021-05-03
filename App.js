import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Home from './src/screens/Home'
import SplashScreen from './src/screens/SplashScreen'
import PlaylistShow from './src/screens/PlaylistShow'

const Stack = createStackNavigator()

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='SplashScreen' screenOptions={{headerShown: false}}>
        <Stack.Screen name='SplashScreen' component={SplashScreen} />
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='PlaylistShow' component={PlaylistShow} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App