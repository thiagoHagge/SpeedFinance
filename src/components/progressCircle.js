import React from 'react';
import Svg, { Circle, Defs, LinearGradient, Stop, Text } from 'react-native-svg';

const size = 115;
const strokeWidth = 17;
const radius = (size - strokeWidth) / 2;
const circumference = 2 * radius * Math.PI;

export function ProgressCircle({progress}) {
  const convertProgress = (progress * 6.29 - 6.29) * -1
  const strokeDashoffset = convertProgress * radius;
  return (
    <Svg width={size} height={size} style={{ borderRadius: size/2 }} >
      <Defs>
        <LinearGradient id="grad" x1="0" y1="1" x2="1" y2="0">
          <Stop offset="0" stopColor="#10bf21" stopOpacity="1" />
          <Stop offset="1" stopColor="#086011" stopOpacity="1" />
        </LinearGradient>
      </Defs>
      <Circle 
        stroke="#FFFFFF"
        fill="none"
        cx={size/2}
        cy={size/2}
        r={radius}
        strokeDasharray={`${circumference} ${circumference}`}
        {...{ strokeWidth }}
      />
      <Circle 
        stroke="url(#grad)"
        fill="none"
        cx={size/2}
        cy={size/2}
        r={radius}
        strokeDasharray={`${circumference} ${circumference}`}
        {...{ strokeWidth, strokeDashoffset }}
      />
      <Text
        fill="#ffffff"
        stroke="none"
        fontSize="18"
        fontWeight="bold"
        x="50"
        y="63"
        textAnchor="middle"
      >
        {progress * 100}%
      </Text>
    </Svg>
  )
}