// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import { create } from "react-native-pixel-perfect";
import { Dimensions, PixelRatio, Platform } from 'react-native';

const isIOS = Platform.OS === 'ios';

const designResolution = {
  width: 1920,
  height: 1080,
};

const { width, height } = Dimensions.get('window');
const scale = PixelRatio.get();

const realWidth = width * scale;
const realHeight = height * scale;

console.log(`Resolução real: ${realWidth}x${realHeight}`);
console.log(`iOS:: ${isIOS}`);

export const scaledPixels = create(designResolution);
