import { Image, StyleSheet } from 'react-native'
import React from 'react'
import { scaledPixels } from '../hooks/useScale'
const TedLogo = () => {
  return (
    <Image source={require('../assets/ted-logo.png')} style={styles.logo} />
  )
}

export default TedLogo

const styles = StyleSheet.create({
  logo: {
    width: scaledPixels(99),
    height: scaledPixels(33),
  },
})