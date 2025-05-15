// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import { create } from "react-native-pixel-perfect";
import { Dimensions, PixelRatio, Platform } from 'react-native';

const isIOS = Platform.OS === 'ios';

const designResolution = {
  width: 1920,
  height: 1080,
};

export const scaledPixels = create(designResolution);
