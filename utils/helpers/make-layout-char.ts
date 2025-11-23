import type { LayoutChar } from "@/typings";
import { segmentGraphemes } from "./segment-graphemes";

export const makeLayoutChars: <T extends string, U extends string>(
  text: T,
  uid: U
) => readonly LayoutChar[] = <T extends string, U extends string>(
  text: T,
  uid: U
): readonly LayoutChar[] => {
  const segments = segmentGraphemes<string>(text);
  const counts = new Map<string, number>();

  return segments.map((grapheme): LayoutChar => {
    const normalized = grapheme === " " ? "\u00A0" : grapheme;
    const count = (counts.get(normalized) ?? 0) + 1;
    counts.set(normalized, count);

    return {
      char: normalized,
      layoutId: `${uid}-${normalized}-${count}`,
    };
  });
};
