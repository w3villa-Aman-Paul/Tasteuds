import React, { useMemo, useRef } from "react";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { TouchableOpacity, View } from "react-native";

const CustomBackdrop = ({ animatedIndex, style, isVisible }) => {
  // animated variables
  const containerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      animatedIndex.value,
      [1, 1],
      [1, 1],
      Extrapolate.CLAMP
    ),
  }));

  // styles
  const containerStyle = useMemo(
    () => [
      style,
      {
        backgroundColor: "transparent",
      },
      containerAnimatedStyle,
    ],
    [style, containerAnimatedStyle]
  );

  const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

  return <AnimatedTouchable style={containerStyle} onPress={() => {}} />;
};

export default CustomBackdrop;
