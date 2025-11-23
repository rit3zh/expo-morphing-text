import type {
  AnimatedViewProps,
  LayoutChar,
  MorphingCharactersListComponent,
  MorphingCharactersListProps,
  MorphingCharReturn,
} from "@/typings/index";
import React from "react";
import Animated from "react-native-reanimated";
import { MorphingCharacter } from "../morph-character";

interface MorphingCharacterProps
  extends React.ComponentProps<typeof MorphingCharacter> {}

const MorphingCharactersListInner: React.NamedExoticComponent<
  Readonly<MorphingCharactersListProps>
> = React.memo<Readonly<MorphingCharactersListProps>>(
  ({
    chars,
    entering,
    exiting,
    layout,
    fontSize,
    fontStyle,
    color,
    animationDuration,
  }: Readonly<MorphingCharactersListProps>): MorphingCharReturn => {
    const renderCharacter = React.useCallback(
      (
        c: Readonly<LayoutChar>
      ): React.ReactElement<AnimatedViewProps, typeof Animated.View> => {
        const morphCharProps: MorphingCharacterProps = {
          char: c.char,
          fontSize,
          color,
          animationDuration,
          fontStyle,
        };
        return (
          <Animated.View
            key={c.layoutId}
            layout={layout}
            entering={entering}
            exiting={exiting}
          >
            <MorphingCharacter {...morphCharProps} />
          </Animated.View>
        );
      },
      [layout, entering, exiting, fontSize, color, animationDuration, fontSize]
    );

    return <>{chars.map(renderCharacter)}</>;
  },
  (
    prevProps: Readonly<MorphingCharactersListProps>,
    nextProps: Readonly<MorphingCharactersListProps>
  ): boolean => {
    return (
      prevProps.chars === nextProps.chars &&
      prevProps.entering === nextProps.entering &&
      prevProps.exiting === nextProps.exiting &&
      prevProps.layout === nextProps.layout &&
      prevProps.fontSize === nextProps.fontSize &&
      prevProps.color === nextProps.color &&
      prevProps.fontStyle === nextProps.fontStyle &&
      prevProps.animationDuration === nextProps.animationDuration
    );
  }
);

MorphingCharactersListInner.displayName = "MorphingCharactersList";

export const MorphingCharactersList: MorphingCharactersListComponent =
  MorphingCharactersListInner as MorphingCharactersListComponent;

const _typeCheck: React.NamedExoticComponent<
  Readonly<MorphingCharactersListProps>
> = MorphingCharactersList;

export default MorphingCharactersList;
