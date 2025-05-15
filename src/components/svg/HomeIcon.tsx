import Svg, { Path } from "react-native-svg";
import React from 'react'
import { IconProps } from '../../@types/global'
import { scaledPixels } from "../../hooks/useScale";

const HomeIcon = ({ size = 36, color = "#616161" }: IconProps) => {
  const iconSize = scaledPixels(size);
  return (
    <Svg width={iconSize} height={(iconSize * 25) / 26} viewBox="0 0 26 25" fill="none">
      <Path d="M2 12.6632L12.1019 2.37815C12.5984 1.87395 13.4016 1.87395 13.8969 2.37815L24 12.6632M4.53846 10.079V21.7079C4.53846 22.4211 5.10708 23 5.80769 23H10.4615V17.4009C10.4615 16.6877 11.0302 16.1088 11.7308 16.1088H14.2692C14.9698 16.1088 15.5385 16.6877 15.5385 17.4009V23H20.1923C20.8929 23 21.4615 22.4211 21.4615 21.7079V10.079M8.76923 23H18.0769" stroke={color} strokeWidth="2.5" stroke-linecap="round" stroke-linejoin="round" />
    </Svg>
  )
}

export default HomeIcon