import { StyleSheet } from "react-native";

const morphCharContainerStyles = StyleSheet.create({
  charWrapper: {
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
});

const coreStyles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export { coreStyles, morphCharContainerStyles };
