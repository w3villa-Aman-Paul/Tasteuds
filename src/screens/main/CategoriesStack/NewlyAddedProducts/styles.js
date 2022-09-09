import { StyleSheet } from "react-native";
import { colors } from "../../../../res/palette";

export const styles = StyleSheet.create({
  notFound: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  notFoundText: {
    fontSize: 25,
    color: colors.btnLink,
    textAlign: "center",
  },
});
