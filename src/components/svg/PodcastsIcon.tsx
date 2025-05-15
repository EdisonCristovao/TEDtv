import React from 'react'
import Svg, { Path } from 'react-native-svg'
import { IconProps } from '../../@types/global'
import { scaledPixels } from '../../hooks/useScale'

const PodcastsIcon = ({ size = 28, color = "#616161" }: IconProps) => {
  const iconSize = scaledPixels(size);
  return (
    <Svg width={iconSize} height={iconSize} viewBox="0 0 22 22" fill="none">
      <Path d="M2 13H5C5.53043 13 6.03914 13.2107 6.41421 13.5858C6.78929 13.9609 7 14.4696 7 15V18C7 18.5304 6.78929 19.0391 6.41421 19.4142C6.03914 19.7893 5.53043 20 5 20H4C3.46957 20 2.96086 19.7893 2.58579 19.4142C2.21071 19.0391 2 18.5304 2 18V11C2 8.61305 2.94821 6.32387 4.63604 4.63604C6.32387 2.94821 8.61305 2 11 2C13.3869 2 15.6761 2.94821 17.364 4.63604C19.0518 6.32387 20 8.61305 20 11V18C20 18.5304 19.7893 19.0391 19.4142 19.4142C19.0391 19.7893 18.5304 20 18 20H17C16.4696 20 15.9609 19.7893 15.5858 19.4142C15.2107 19.0391 15 18.5304 15 18V15C15 14.4696 15.2107 13.9609 15.5858 13.5858C15.9609 13.2107 16.4696 13 17 13H20" stroke={color} strokeWidth="2.5" stroke-linecap="round" stroke-linejoin="round" />
    </Svg>

  )
}

export default PodcastsIcon