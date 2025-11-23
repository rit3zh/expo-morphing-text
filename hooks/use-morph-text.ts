import { MorphingTextReturnType, UseMorphingTextOptions } from "@/typings";
import { makeLayoutChars } from "@/utils/helpers/make-layout-char";
import { useId, useMemo } from "react";
import {
  type ComplexAnimationBuilder,
  FadeIn,
  FadeOut,
  LinearTransition,
} from "react-native-reanimated";

export const useMorphingText: <T extends Readonly<UseMorphingTextOptions>>(
  options?: T
) => MorphingTextReturnType = (
  options?: Readonly<UseMorphingTextOptions>
): MorphingTextReturnType => {
  const { text = "", animationDuration = 250 } = options ?? {};
  const uid: string = useId();

  const chars = useMemo(
    () => makeLayoutChars<string, string>(text, uid),
    [text, uid]
  );

  const entering = useMemo<FadeIn>(
    () => FadeIn.duration(animationDuration),
    [animationDuration]
  );

  const exiting = useMemo<FadeOut>(
    () => FadeOut.duration(animationDuration),
    [animationDuration]
  );

  const layout = useMemo<ComplexAnimationBuilder>(
    () => LinearTransition.springify().damping(14).stiffness(160).mass(0.24),
    []
  );

  return {
    chars,
    entering,
    exiting,
    layout,
  } as const;
};
