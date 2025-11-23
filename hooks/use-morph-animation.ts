import type { MorphCharHookReturnType } from "@/typings/index";
import { useEffect } from "react";
import type { ViewStyle } from "react-native";
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

export const useMorphCharAnimation: <T extends number>(
  duration?: T
) => MorphCharHookReturnType = <T extends number>(
  duration?: T
): MorphCharHookReturnType => {
  const _duration = duration ?? 300;

  const opacity = useSharedValue<number>(0);
  const scale = useSharedValue<number>(0.85);

  const animatedStyle = useAnimatedStyle<ViewStyle>(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  useEffect(() => {
    opacity.value = withTiming<number>(1, { duration: _duration });
    scale.value = withTiming<number>(1, { duration: _duration });

    return () => {
      opacity.value = withTiming<number>(0, { duration: _duration });
      scale.value = withTiming<number>(0.85, { duration: _duration });
    };
  }, [duration]);

  return {
    animatedStyle,
    opacity,
    scale,
  };
};
