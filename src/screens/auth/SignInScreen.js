import React, { useState, useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { View, Text, Image, KeyboardAvoidingView } from "react-native";
import { globalStyles } from "../../styles/global";
import { ChevronLeft, Eye } from "../../library/icons";
import { colors } from "../../res/palette";
import { Button, Input } from "react-native-elements";
import { styles } from "./styles";
import { retrieveAddress, userLogin } from "../../redux";
import TextField from "../../library/components/TextField";
import { Snackbar } from "react-native-paper";
import { Formik } from "formik";
import * as yup from "yup";
import ShopitStackNavigator from "../../navigations/ShopitStackNavigator";

const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter valid email")
    .required("Email Address is Required"),
  password: yup
    .string()
    .min(6, ({ min }) => `Password must be at least ${min} characters`)
    .required("Password is required"),
});

const SignInScreen = ({ navigation, dispatch }) => {
  const [secureTextEntryToggle, setSecureTextEntryToggle] = useState(true);
  const [inputPasswordBorder, setInputPasswordBorder] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snacbarMessage, setSnacbarMessage] = useState("");

  const { isAuth, error, status, saving, access_token } = useSelector(
    (state) => state.auth
  );
  const dismissSnackbar = () => setSnackbarVisible(false);

  useEffect(() => {
    if (error === "invalid_grant" && status === 400) {
      setSnacbarMessage("You Have entered a wrong Email or Password");
      setSnackbarVisible(true);

      setTimeout(() => {
        dismissSnackbar();
      }, 2000);
    } else if (status === 404) {
      setSnacbarMessage("Server not found or Network Error");
      setSnackbarVisible(true);

      setTimeout(() => {
        dismissSnackbar();
      }, 2000);
    } else if (status === 200) {
      navigation.navigate("Shop");
    }
  }, [isAuth, error]);

  return (
    <View style={globalStyles.container}>
      <ChevronLeft
        size={24}
        style={styles.backButton}
        onPress={navigation.goBack}
      />

      <View style={styles.screenLogo}>
        <Image
          style={styles.loginLogo}
          source={require("../../../assets/images/logo-mark.png")}
        />
        <Text style={{ ...styles.title, textAlign: "center" }}>
          Logg inn for å fortsette
        </Text>
      </View>

      <Formik
        validationSchema={loginValidationSchema}
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values) => {
          console.log(values);
          try {
            await dispatch(
              userLogin({
                username: values.email,
                password: values.password,
                grant_type: "password",
              })
            );

            // if (isAuth) {
            //   dispatch();
            // }
          } catch (err) {
            console.log("error", err);
          }
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          isValid,
        }) => (
          <View style={styles.mainContainer}>
            <TextField
              placeholder="E-mail eller telefonnummer"
              inputStyle={styles.inputStyle}
              containerStyle={[styles.containerStyle, globalStyles.mb16]}
              inputContainerStyle={styles.inputContainerStyle}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
              keyboardType="email-address"
            />
            {errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}

            <Input
              placeholder="Passord"
              secureTextEntry={secureTextEntryToggle}
              onFocus={() => setInputPasswordBorder(true)}
              onBlur={handleBlur("password")}
              value={values.password}
              containerStyle={[
                styles.inputMainContainer,
                { borderWidth: inputPasswordBorder ? 1 : 0 },
              ]}
              inputStyle={styles.inputStyle}
              inputContainerStyle={styles.inputContainerStyle}
              rightIcon={
                <Eye
                  size={24}
                  style={{ color: colors.gray }}
                  onPress={() =>
                    setSecureTextEntryToggle(!secureTextEntryToggle)
                  }
                />
              }
              onChangeText={handleChange("password")}
            />
            {errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}
            <Button
              title="LOGG INN"
              buttonStyle={styles.buttonBlockStyle}
              containerStyle={{ alignSelf: "center" }}
              titleStyle={globalStyles.latoBold16}
              onPress={handleSubmit}
            />
            <Button
              title="Glemt passord?"
              type="clear"
              containerStyle={{ alignSelf: "center" }}
              titleStyle={styles.formClearActionButton}
              onPress={() => navigation.navigate("ForgotPassword")}
            />

            <View style={styles.footer}>
              <Text style={styles.label}>Ingen konto enda? </Text>
              <Text
                style={styles.footerAction}
                onPress={() => navigation.navigate("SignUp")}
              >
                Opprett bruker
              </Text>
            </View>
          </View>
        )}
      </Formik>

      <Snackbar visible={snackbarVisible} onDismiss={dismissSnackbar}>
        {`${snacbarMessage}`}
      </Snackbar>
    </View>
  );
};

export default connect()(SignInScreen);
