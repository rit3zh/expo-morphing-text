import { MorphingText } from "@/components/morphing-text";
import { Ionicons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import * as Symbols from "expo-symbols";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  LinearTransition,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const WIDTH = Dimensions.get("window").width;

const words: string[] = [
  "Elegant",
  "Minimal",
  "Modern",
  "Refined",
  "Timeless",
  "Pure",
];

const isIOS: boolean = Platform.OS === "ios";

const AVAILABLE_WIDTH = WIDTH - 100;
const GAP = 6;
const calculateSegmentSizes = (totalItems: number) => {
  const totalGaps = (totalItems - 1) * GAP;
  const availableForSegments = AVAILABLE_WIDTH - totalGaps;

  const activeWidth = Math.min(48, availableForSegments * 0.2);
  const remainingWidth = availableForSegments - activeWidth;
  const inactiveWidth = Math.max(20, remainingWidth / (totalItems - 1));

  return {
    inactive: Math.min(inactiveWidth, 24),
    active: Math.min(activeWidth, 48),
  };
};

const segmentSizes = calculateSegmentSizes(words.length);

const ProgressSegment: React.FC<{ isActive: boolean }> = ({ isActive }) => {
  const dotProgress = useSharedValue<number>(isActive ? 1 : 0);

  useEffect(() => {
    dotProgress.value = withSpring<number>(isActive ? 1 : 0);
  }, [isActive]);

  const dotAnimatedStylz = useAnimatedStyle<ViewStyle>(() => {
    return {
      width: interpolate(
        dotProgress.value,
        [0, 1],
        [segmentSizes.inactive, segmentSizes.active],
        Extrapolation.CLAMP
      ),
      height: 3,
      backgroundColor: isActive ? "#ffffff" : "#2a2a2e",
      opacity: interpolate(
        dotProgress.value,
        [0, 1],
        [0.3, 1],
        Extrapolation.CLAMP
      ),
      borderRadius: 2,
    };
  });

  return <Animated.View style={dotAnimatedStylz} />;
};

const AnimatedCounter: React.FC<{ index: number; total: number }> = ({
  index,
  total,
}) => {
  const targetValue = useSharedValue<number>(index);
  const animatedValue = useSharedValue<number>(index);

  useEffect(() => {
    targetValue.value = index;
    animatedValue.value = withTiming<number>(index, { duration: 400 });
  }, [index]);

  const animatedStylz = useAnimatedStyle<ViewStyle>(() => {
    const progress = animatedValue.value % 1;
    const isAnimating = progress > 0.01 && progress < 0.99;

    return {
      opacity: isAnimating
        ? interpolate(progress, [0, 0.5, 1], [1, 0.4, 1], Extrapolation.CLAMP)
        : 1,
      transform: [
        {
          translateY: isAnimating
            ? interpolate(
                progress,
                [0, 0.5, 1],
                [0, -3, 0],
                Extrapolation.CLAMP
              )
            : 0,
        },
        {
          scale: isAnimating
            ? interpolate(
                progress,
                [0, 0.5, 1],
                [1, 0.95, 1],
                Extrapolation.CLAMP
              )
            : 1,
        },
      ],
    };
  });

  return (
    <View style={styles.counterContainer}>
      <Animated.View style={animatedStylz}>
        <Text style={styles.counterNumber}>
          {String(index + 1).padStart(2, "0")}
        </Text>
      </Animated.View>
      <Text style={styles.counterTotal}>
        / {String(total).padStart(2, "0")}
      </Text>
    </View>
  );
};

export default function Index(): React.JSX.Element {
  const [index, setIndex] = useState<number>(0);
  const textScale = useSharedValue<number>(1);

  // const [fontLoaded] = useFonts({
  //   Elingston: require("@/assets/fonts/Elingston.otf"),
  // });

  useEffect(() => {
    textScale.value = withSequence<number>(
      withSpring<number>(0.96, { stiffness: 200 }),
      withSpring<number>(1, { stiffness: 150 })
    );
  }, [index]);

  const next = (): void => setIndex((i) => (i + 1) % words.length);
  const prev = (): void =>
    setIndex((i) => (i - 1 + words.length) % words.length);

  const textContainerAnimatedStyle = useAnimatedStyle<ViewStyle>(() => {
    return {
      transform: [{ scale: textScale.value }],
    };
  });

  return (
    <React.Fragment>
      <Stack.Screen
        options={{
          title: "App",
        }}
      />
      <ScrollView
        contentContainerStyle={styles.root}
        contentInsetAdjustmentBehavior="always"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <View style={styles.content}>
            <Animated.View
              layout={LinearTransition}
              style={[styles.textContainer, textContainerAnimatedStyle]}
            >
              <MorphingText text={words[index]} fontSize={50} color="#ffffff" />
            </Animated.View>

            <View style={styles.progressBar}>
              {words.map((_, i) => (
                <ProgressSegment key={i} isActive={i === index} />
              ))}
            </View>

            <AnimatedCounter index={index} total={words.length} />

            <View style={styles.navigation}>
              <Pressable
                onPress={prev}
                style={({ pressed }) => [
                  styles.navButton,
                  pressed && styles.navButtonPressed,
                ]}
              >
                {isIOS ? (
                  <Symbols.SymbolView
                    name="arrow.left"
                    size={20}
                    tintColor="#ffffff"
                    weight="medium"
                  />
                ) : (
                  <Ionicons name="arrow-back" size={20} color="#ffffff" />
                )}
              </Pressable>

              <View style={styles.navDivider} />

              <Pressable
                onPress={next}
                style={({ pressed }) => [
                  styles.navButton,
                  pressed && styles.navButtonPressed,
                ]}
              >
                {isIOS ? (
                  <Symbols.SymbolView
                    name="arrow.right"
                    size={20}
                    tintColor="#ffffff"
                    weight="medium"
                  />
                ) : (
                  <Ionicons name="arrow-forward" size={20} color="#ffffff" />
                )}
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#0b0b0d",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    bottom: isIOS ? 80 : -40,
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
    width: "100%",
  },
  textContainer: {
    position: "relative",
    alignItems: "center",
    marginBottom: 80,
  },
  textBackdrop: {
    position: "absolute",
    width: 400,
    height: 200,
    backgroundColor: "#ffffff",
    opacity: 0.015,
    borderRadius: 200,
    top: "50%",
    left: "50%",
    transform: [{ translateX: -200 }, { translateY: -100 }],
  },
  progressBar: {
    flexDirection: "row",
    gap: GAP,
    marginBottom: 40,
    paddingHorizontal: 20,
    maxWidth: AVAILABLE_WIDTH,
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "nowrap",
  },
  counterContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    marginBottom: 48,
  },
  counterNumber: {
    fontSize: 28,
    fontWeight: "300",
    color: "#ffffff",
    fontVariant: ["tabular-nums"],
    letterSpacing: 2,
  },
  counterTotal: {
    fontSize: 18,
    fontWeight: "300",
    color: "#5a5a5f",
    fontVariant: ["tabular-nums"],
    letterSpacing: 1.5,
    marginLeft: 4,
  },
  navigation: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1a1a1d",
    borderRadius: 100,
    paddingHorizontal: 8,
    paddingVertical: 8,
    gap: 4,
    borderWidth: 1,
    borderColor: "#2a2a2e",
  },
  navButton: {
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
  },
  navButtonPressed: {
    backgroundColor: "#2a2a2e",
  },
  navDivider: {
    width: 1,
    height: 24,
    backgroundColor: "#2a2a2e",
  },
});
