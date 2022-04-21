import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'

const splash = ({navigation}) => {
  
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('MainDrawerNavigator')
    }, 2000)
  },[])

  return (
    <View style={styles.container}>
      <View style={styles.body}>
          <Image style={styles.image} source={require('../../../assets/images/Header-Icon/header_logo.png')} />
      </View>
    </View>
  )
}

export default splash;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image:{
      height: 200,
      width: 180,
      resizeMode: 'contain' 
    }
})