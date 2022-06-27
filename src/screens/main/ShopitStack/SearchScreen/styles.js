import { StyleSheet, Dimensions } from "react-native";
import { globalStyles } from "../../../../styles/global";
import { colors } from "../../../../res/palette";

export const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    // justifyContent: cente,
  },

  input: {
    marginVertical: 16,
    width: "90%",
    borderWidth: 1,
    borderColor: colors.black,
    height: 50,
    paddingLeft: 10,
  },
});
