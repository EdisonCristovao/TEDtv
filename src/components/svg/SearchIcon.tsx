import React from 'react'
import Svg, { Path } from "react-native-svg";
import { IconProps } from '../../@types/global';
import { scaledPixels } from '../../hooks/useScale';

const SearchIcon = ({ size = 32, color = "#616161" }: IconProps) => {
  const iconSize = scaledPixels(size);
  return (
    <Svg width={iconSize} height={iconSize} viewBox="0 0 25 25" fill="none" >
      <Path d="M23 23L16.9371 16.9371M16.9371 16.9371C18.578 15.2962 19.4999 13.0706 19.4999 10.7499C19.4999 8.42932 18.578 6.20373 16.9371 4.5628C15.2962 2.92187 13.0706 2 10.7499 2C8.42932 2 6.20373 2.92187 4.5628 4.5628C2.92187 6.20373 2 8.42932 2 10.7499C2 13.0706 2.92187 15.2962 4.5628 16.9371C6.20373 18.578 8.42932 19.4999 10.7499 19.4999C13.0706 19.4999 15.2962 18.578 16.9371 16.9371Z" stroke={color} strokeWidth="2.5" stroke-linecap="round" stroke-linejoin="round" />
    </Svg>

  )
}

export default SearchIcon