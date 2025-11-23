import { useMorphingText } from "@/hooks/use-morph-text";
import { coreStyles } from "@/styles";
import { MorphingTextProps } from "@/typings";
import React from "react";
import { View } from "react-native";
import { MorphingCharactersList } from "./morphing-char-list";

export const MorphingText: React.NamedExoticComponent<
  Readonly<MorphingTextProps>
> &
  React.FC<Readonly<MorphingTextProps>> &
  React.FunctionComponent<Readonly<MorphingTextProps>> = React.memo(
  ({
    text,
    fontSize = 40,
    color = "#000",
    style,
    fontStyle,
    animationDuration = 250,
  }: Readonly<MorphingTextProps>): React.ReactNode & React.JSX.Element => {
    const { chars, entering, exiting, layout } = useMorphingText<
      Readonly<MorphingTextProps>
    >({
      text,
      animationDuration,
    });

    return (
      <View style={[coreStyles.row, style]}>
        <MorphingCharactersList
          chars={chars}
          entering={entering}
          fontStyle={fontStyle}
          exiting={exiting}
          layout={layout}
          fontSize={fontSize}
          color={color}
          animationDuration={animationDuration}
        />
      </View>
    );
  }
);

MorphingText.displayName = "MorphingText";

export default MorphingText;
