
import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import TedLogo from './TedLogo'
import HeaderTitle from './HeaderTitle'

const DefaultHeader = ({ title }: { title: string }) => {
  return (
    <View style={styles.header}>
      <TedLogo />
      <HeaderTitle title={title} />
    </View>
  )
}

export default DefaultHeader

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 40,
    paddingHorizontal: 40,
    gap: 16,
  },
})