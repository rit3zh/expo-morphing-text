import { DEFAULT_TEXT_STYLE } from "@/constants/text-styles";
import { morphCharContainerStyles } from "@/styles";
import React from "react";
import { Text } from "react-native";
import Animated from "react-native-reanimated";

import { useMorphCharAnimation } from "@/hooks/use-morph-animation";
import type {
  ComposedTextStyle,
  MorphCharHookReturnType,
  MorphCharProps,
} from "@/typings";

const MorphingCharacter: React.NamedExoticComponent<MorphCharProps> &
  React.FunctionComponent<MorphCharProps> &
  React.FC<MorphCharProps> = React.memo(
  ({
    char,
    fontSize,
    fontStyle,
    color,
    animationDuration,
  }: MorphCharProps): React.ReactNode &
    React.ReactElement &
    React.JSX.Element => {
    const { animatedStyle }: MorphCharHookReturnType =
      useMorphCharAnimation<number>(animationDuration);

    // const [fontLoaded] = useFonts({
    //   Elingston: require("@/assets/fonts/Elingston.otf"),
    // });

    const textStyle: ComposedTextStyle = {
      fontSize: fontSize as NonNullable<typeof fontSize>,
      color: color as NonNullable<typeof color>,
      ...DEFAULT_TEXT_STYLE,
      includeFontPadding: false,
      // fontFamily: fontLoaded ? "Elingston" : undefined,
    } as const;

    return (
      <Animated.View
        style={[morphCharContainerStyles.charWrapper, animatedStyle]}
      >
        <Text
          style={[
            textStyle,
            {
              includeFontPadding: false,
            },
            fontStyle,
          ]}
        >
          {char}
        </Text>
      </Animated.View>
    );
  }
);

MorphingCharacter.displayName = "MorphChar";

export { MorphingCharacter };
