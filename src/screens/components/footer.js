import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { connect } from 'react-redux'

const Footer = () => {
  return (
    <View style={styles.container}>
      <View style={styles.footer_first}>
          <Image style={styles.image} source={require('../../../assets/images/Header-Icon/footer_icon.png')} />
      </View>
      <View style={styles.footer_second}>
          <Text style={styles.text_first}>Tastebuds</Text>
          <Text style={styles.text_second}>Thormøhlens Gate 51, 5006 Bergen</Text> 
          <Text style={styles.text_third}>hei@tastebuds.no</Text>
          <Text style={styles.text_second}>+47 916 19 927</Text>
      </View>
      <View style={styles.footer_third}>
        <Image style={styles.footer_image} source={require('../../../assets/images/Header-Icon/footer_fb.png')} /> 
        <Image style={styles.footer_image} source={require('../../../assets/images/Header-Icon/footer_insta.png')} /> 
      </View>
    </View>
  )
}

export default connect()(Footer);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#363554',
        width: '100%',
    },
    footer_first:{
        flex: 0.2,
        marginTop: 15,
        marginBottom: 15
    },
    footer_second:{
        flex: 0.6,
        marginTop: 20,
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    image:{
        resizeMode : 'contain',
        height: 45,
        width: 300,
    },
    text_first:{
        color: '#ffffff',
        fontSize: 16,
        fontFamily: 'normal',
        marginBottom: 5
    },
    text_second:{
        color: '#ffffff',
        fontSize: 12,
        marginBottom: 5
    },
    text_third:{
        color: '#FF234F',
        textAlign: 'center',
        marginBottom: 5
    },
    footer_third:{
        flex: 0.2,
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: "center",
    },
    footer_image:{
        height: 60,
        width: 60,
        resizeMode: 'contain'
    }
})