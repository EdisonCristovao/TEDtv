import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { scaledPixels } from '../hooks/useScale'

const HeaderTitle = ({ title }: { title: string }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  )
}

export default HeaderTitle

const styles = StyleSheet.create({
  title: {
    fontSize: scaledPixels(24),
    fontWeight: 'bold',
    color: 'white',
  },
  container: {
    flexDirection: 'row',
    borderColor: 'white',
    borderLeftWidth: scaledPixels(1),
    paddingLeft: scaledPixels(16),
  },
})
