import { View, Text } from 'react-native'
import React from 'react'
import { SpatialNavigation } from 'react-tv-space-navigation'
import { SpatialNavigationView } from 'react-tv-space-navigation'
import { DrawerContentComponentProps } from '@react-navigation/drawer'
import SettingsDrawerItem from './SettingsDrawerItem'

const SettingsDrawer = ({ }: DrawerContentComponentProps) => {
  return (
    <SpatialNavigationView direction="vertical">
      <SettingsDrawerItem />
    </SpatialNavigationView>
  )
}

export default SettingsDrawer