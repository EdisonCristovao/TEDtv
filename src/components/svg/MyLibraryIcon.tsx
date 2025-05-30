import { View, Text } from 'react-native'
import React from 'react'
import Svg, { Path } from 'react-native-svg'
import { IconProps } from '../../@types/global'
import { scaledPixels } from '../../hooks/useScale'

const MyLibraryIcon = ({ size = 28, color = "#616161" }: IconProps) => {
  const iconSize = scaledPixels(size);
  return (
    <Svg width={iconSize} height={(iconSize * 22) / 19} viewBox="0 0 19 22" fill="none">
      <Path d="M15.093 2.32352C16.193 2.45152 17 3.40052 17 4.50852V20.0015L9.5 16.2515L2 20.0015V4.50852C2 3.40052 2.806 2.45152 3.907 2.32352C7.62319 1.89216 11.3768 1.89216 15.093 2.32352Z" stroke={color} strokeWidth="2.5" stroke-linecap="round" stroke-linejoin="round" />
    </Svg>

  )
}

export default MyLibraryIcon