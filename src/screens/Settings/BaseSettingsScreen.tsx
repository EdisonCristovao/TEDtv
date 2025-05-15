
import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'

const BaseSettingsScreen = ({ children }: { children: React.ReactNode }) => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#000000", "#1B1B1B", "transparent"]}
        locations={[0.025, 1]}
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 0 }}
        style={StyleSheet.absoluteFillObject}
      />
      {children}
    </View>
  )
}

export default BaseSettingsScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
})