export const segmentGraphemes: <T extends string>(text: T) => string[] = <
  T extends string
>(
  text: T
): string[] => {
  if (typeof Intl.Segmenter === "function") {
    return Array.from(
      new Intl.Segmenter(undefined, { granularity: "grapheme" }).segment(text),
      (segment) => segment.segment
    );
  }
  return Array.from(text);
};
