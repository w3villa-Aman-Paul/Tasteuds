import { StyleSheet } from "react-native";
import { globalStyles } from "../../../styles/global";
import { colors } from "../../../res/palette";

export const styles = StyleSheet.create({
  mainContainer: {
    ...globalStyles.containerFluid,
    backgroundColor: colors.white,
  },
  centeredContent: {
    ...globalStyles.containerFluid,
    ...globalStyles.centeredContent,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 100,
  },
  accountDetails: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  accountName: {
    ...globalStyles.latoBold16,
    color: colors.white,
    marginRight: 6,
  },
  profileDetails: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  profileName: {
    ...globalStyles.latoBold16,
    color: colors.white,
    marginTop: 5,
    marginBottom: 10,
    marginRight: 5,
  },
  profileContact: {
    ...globalStyles.latoBold12,
    color: colors.white,
    marginTop: 5,
  },
  jumbotron: {
    height: 200,
  },
  listContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    ...globalStyles.latoRegular16,
    ...globalStyles.textDark,
    flex: 1,
  },
  listIcon: {
    padding: 12,
  },
  buttonBlockStyle: {
    ...globalStyles.mt16,
    ...globalStyles.mb16,
    ...globalStyles.btnBlock,
    ...globalStyles.btnPrimary,
  },
  profile_container: {
    height: 250,
  },
  content: {
    backgroundColor: "#ffffff",
    elevation: 8,
    margin: 10,
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  inputBox: {
    flexDirection: "column",
    marginTop: 5,
    marginBottom: 5,
  },
  formText: {
    color: "#0080ff",
    marginBottom: 5,
    fontSize: 12,
  },
  formInput: {
    height: 50,
    backgroundColor: "#ffffff",
  },
  formBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  primary: {
    padding: 10,
    borderRadius: 10,
    marginRight: 5,
    backgroundColor: "#0080ff",
  },
  textBtn: {
    color: "#ffffff",
  },
  inputStyle: {
    ...globalStyles.latoRegular16,
  },
  inputContainerStyle: {
    paddingLeft: 5,
    borderBottomColor: "#fff",
  },
});
