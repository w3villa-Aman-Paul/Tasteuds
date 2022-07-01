import { StyleSheet } from "react-native";
import { globalStyles } from "../../styles/global";
import { colors } from "../../res/palette";
import { color } from "react-native-reanimated";

export const styles = StyleSheet.create({
  backButton: {
    ...globalStyles.title,
    ...globalStyles.mt48,
    color: colors.black,
  },
  title: {
    ...globalStyles.title,
    ...globalStyles.mt16,
    fontSize: 22,
    color: "#3A3A59",
  },
  mainContainer: {
    ...globalStyles.container,
    flex: 0.6,
    justifyContent: "flex-start",
  },
  inputMainContainer: {
    ...globalStyles.mb16,
    backgroundColor: "#fff",
    height: 52,
    borderRadius: 4,
    borderColor: "#0000",
  },
  containerStyle: {
    backgroundColor: "#fff",
    height: 52,
    borderRadius: 4,
  },
  inputStyle: {
    ...globalStyles.latoRegular16,
  },
  inputContainerStyle: {
    paddingLeft: 5,
    borderBottomColor: "#fff",
  },
  errorText: {
    fontSize: 10,
    color: "red",
    marginBottom: 10,
  },
  formClearActionButton: {
    // ...globalStyles.textPrimary,
    color: "rgba(0, 0, 0, 0.65)",
    ...globalStyles.latoRegular14,
  },
  buttonBlockStyle: {
    backgroundColor: "#ED3358",
    borderRadius: 10,
    height: 48,
    width: 150,
  },
  footer: {
    ...globalStyles.mt32,
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",
  },
  label: {
    ...globalStyles.textSecondary,
    ...globalStyles.latoRegular16,
  },
  footerAction: {
    ...globalStyles.textPrimary,
    ...globalStyles.latoRegular16,
  },
  inputRoundedBackground: {
    height: 52,
    borderRadius: 26,
    backgroundColor: "#ffffff",
    shadowColor: "rgba(0, 0, 0, 0.05)",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 8,
    shadowOpacity: 1,
    borderStyle: "solid",
    borderWidth: 1,
  },
  inputRoundedContainer: {
    width: 73,
  },
  screenLogo: {
    flex: 0.4,
    marginTop: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  loginLogo: {
    width: 200,
    height: 100,
    resizeMode: "contain",
  },
  primaryColor: {
    backgroundColor: colors.primary,
  },
  btnLink: {
    backgroundColor: colors.btnLink,
  },
});
