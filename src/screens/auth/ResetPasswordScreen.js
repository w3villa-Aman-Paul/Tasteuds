import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { globalStyles } from "../../styles/global";
import { ChevronLeft, Eye } from "../../library/icons";
import { colors } from "../../res/palette";
import { Input, Button } from "react-native-elements";
import { styles } from "./styles";
import { Formik } from "formik";
import * as yup from "yup";
import { accountLogout, accountUpdate, userLogout } from "../../redux";
import { connect } from "react-redux";
import { Snackbar } from "react-native-paper";
import { useSelector } from "react-redux";

const signUpValidationSchema = yup.object().shape({
  password: yup
    .string()
    // .matches(/\w*[a-z]\w*/, "Password must have a small letter")
    // .matches(/\w*[A-Z]\w*/, "Password must have a capital letter")
    // .matches(/\d/, "Password must have a number")
    // .matches(
    //   /[!@#$%^&*()\-_"=+{}; :,<.>]/,
    //   "Password must have a special character"
    // )
    .min(6, ({ min }) => `Password must be at least ${min} characters`)
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords do not match")
    .required("Confirm password is required"),
});

const ResetPasswordScreen = ({ navigation, dispatch }) => {
  const [newPasswordSecureEntryToggle, setNewPasswordSecureEntryToggle] =
    useState(true);
  const [confPasswordSecureEntryToggle, setConfPasswordSecureEntryToggle] =
    useState(true);

  const [inputPasswordBorder, setInputPasswordBorder] = useState(false);
  const [inputConfPasswordBorder, setInputConfPasswordBorder] = useState(false);

  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snacbarMessage, setSnacbarMessage] = useState("");
  const { isAuth, error, status, saving } = useSelector((state) => state.auth);

  const dismissSnackbar = () => setSnackbarVisible(false);

  // useEffect(() => {
  //   if (status === 200) {
  //     setSnacbarMessage("Password Changed Successfully");
  //     setSnackbarVisible(true);

  //     setTimeout(() => {
  //       dismissSnackbar();
  //     }, 2000);
  //   }
  // }, [status]);

  return (
    <View style={globalStyles.container}>
      <ChevronLeft
        size={24}
        style={styles.backButton}
        onPress={navigation.goBack}
      />
      <Text style={styles.title}>Reset Password</Text>
      <Text style={[styles.label, globalStyles.mt16, globalStyles.mb32]}>
        Hi User. Create new password for your Spree Shop account.
      </Text>

      <Formik
        validationSchema={signUpValidationSchema}
        initialValues={{
          password: "",
          confirmPassword: "",
        }}
        onSubmit={(values) => {
          try {
            dispatch(
              accountUpdate({
                user: {
                  password: values.password,
                  password_confirmation: values.passwordConfirmation,
                },
              })
            );

            dispatch(userLogout());
            dispatch(accountLogout());
          } catch (error) {
            console.error(error);
            console.log(error);
          }

          navigation.navigate("SignIn");
        }}
      >
        {({ handleChange, handleSubmit, values, errors }) => (
          <View style={globalStyles.containerFluid}>
            <Input
              placeholder="New Password"
              onFocus={() => setInputPasswordBorder(true)}
              onBlur={() => setInputPasswordBorder(false)}
              secureTextEntry={newPasswordSecureEntryToggle}
              containerStyle={[
                styles.inputMainContainer,
                { borderWidth: inputPasswordBorder ? 1 : 0 },
              ]}
              inputStyle={styles.inputStyle}
              inputContainerStyle={styles.inputContainerStyle}
              value={values.password}
              rightIcon={
                <Eye
                  size={24}
                  style={{ color: colors.gray }}
                  onPress={() =>
                    setNewPasswordSecureEntryToggle(
                      !newPasswordSecureEntryToggle
                    )
                  }
                />
              }
              onChangeText={handleChange("password")}
            />
            {errors.password && (
              <Text style={[styles.errorText, { marginBottom: 2 }]}>
                {errors.password}
              </Text>
            )}

            <Input
              placeholder="Re-enter Password"
              onFocus={() => setInputConfPasswordBorder(true)}
              onBlur={() => setInputConfPasswordBorder(false)}
              secureTextEntry={confPasswordSecureEntryToggle}
              containerStyle={[
                styles.inputMainContainer,
                { borderWidth: inputConfPasswordBorder ? 1 : 0 },
              ]}
              inputStyle={styles.inputStyle}
              inputContainerStyle={styles.inputContainerStyle}
              value={values.confirmPassword}
              rightIcon={
                <Eye
                  size={24}
                  style={{ color: colors.gray }}
                  onPress={() =>
                    setConfPasswordSecureEntryToggle(
                      !confPasswordSecureEntryToggle
                    )
                  }
                />
              }
              onChangeText={handleChange("confirmPassword")}
            />
            {errors.confirmPassword && (
              <Text style={[styles.errorText, { marginBottom: 2 }]}>
                {errors.confirmPassword}
              </Text>
            )}

            <Button
              title="Submit & Login"
              buttonStyle={styles.buttonBlockStyle}
              titleStyle={globalStyles.latoBold16}
              onPress={handleSubmit}
            />
          </View>
        )}
      </Formik>

      <Snackbar visible={snackbarVisible} onDismiss={dismissSnackbar}>
        {`${snacbarMessage}`}
      </Snackbar>
    </View>
  );
};

export default connect()(ResetPasswordScreen);
