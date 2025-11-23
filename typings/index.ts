import React from "react";
import type {
  Animated,
  ColorValue,
  StyleProp,
  TextStyle,
  ViewStyle,
} from "react-native";
import type {
  BaseAnimationBuilder,
  ComplexAnimationBuilder,
  EntryOrExitLayoutType,
  FadeIn,
  FadeOut,
  LayoutAnimationFunction,
  SharedValue,
  WithTimingConfig,
} from "react-native-reanimated";

interface LayoutChar {
  readonly char: string;
  readonly layoutId: string;
}

interface AnimationConfig {
  readonly duration: number;
  readonly easing?: WithTimingConfig["easing"];
}

interface MorphCharProps {
  readonly char: string;
  readonly fontSize: number;
  readonly color: string;
  readonly animationDuration: number;
  readonly fontStyle?: StyleProp<TextStyle>;
}

interface UseMorphingTextOptions {
  text: string;
  animationDuration?: number;
}

interface MorphingTextReturnType {
  readonly chars: readonly LayoutChar[];
  readonly entering: FadeIn;
  readonly exiting: FadeOut;
  readonly layout: ComplexAnimationBuilder;
}
interface MorphingTextProps {
  readonly text: string;
  readonly fontSize?: number;
  readonly color?: string;
  readonly style?: StyleProp<ViewStyle>;
  readonly fontStyle?: StyleProp<TextStyle>;
  readonly animationDuration?: number;
}

interface MorphCharHookReturnType {
  animatedStyle: StyleProp<ViewStyle>;
  opacity: SharedValue<number>;
  scale: SharedValue<number>;
}

interface ComposedTextStyle extends TextStyle {
  readonly fontSize: NonNullable<MorphCharProps["fontSize"]>;
  readonly color: ColorValue;
  readonly includeFontPadding: false;
}

interface MorphingCharactersListProps {
  chars: readonly LayoutChar[];
  entering: EntryOrExitLayoutType;
  exiting: EntryOrExitLayoutType;
  layout:
    | typeof BaseAnimationBuilder
    | BaseAnimationBuilder
    | LayoutAnimationFunction
    | undefined;
  fontSize: number;
  color: string;
  fontStyle?: StyleProp<TextStyle>;
  animationDuration: number;
}

interface MorphingCharReturn
  extends React.ReactElement<
    React.ComponentProps<typeof React.Fragment>,
    typeof React.Fragment
  > {}

interface AnimatedViewProps
  extends React.ComponentProps<typeof Animated.View> {}

interface MorphingCharactersListComponent
  extends React.NamedExoticComponent<Readonly<MorphingCharactersListProps>> {
  displayName: string;
}

export type {
  AnimatedViewProps,
  AnimationConfig,
  ComposedTextStyle,
  LayoutChar,
  MorphCharHookReturnType,
  MorphCharProps,
  MorphingCharactersListComponent,
  MorphingCharactersListProps,
  MorphingCharReturn,
  MorphingTextProps,
  MorphingTextReturnType,
  UseMorphingTextOptions,
};
