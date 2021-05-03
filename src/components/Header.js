import React from 'react'
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native'
import headerLogo from '../img/brand/white.png'
import PopularPlaylists from './PopularPlaylists'

const Home = () => {
  return (
      <View style={styles.header}>
        <Image source={headerLogo} />
      </View>
  )
}

const styles = StyleSheet.create({
  header: {
    height: 75,
    backgroundColor: '#e6373d',
    justifyContent: 'center',
    borderBottomRightRadius: 25,
  },
})

export default Home