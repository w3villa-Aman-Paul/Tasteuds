import React, { useState, useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { View, Text } from "react-native";
import { globalStyles } from "../../styles/global";
import { ChevronLeft, Eye } from "../../library/icons";
import { colors } from "../../res/palette";
import { Button, Input } from "react-native-elements";
import { styles } from "./styles";
import { userLogin } from "../../redux";
import TextField from "../../library/components/TextField";
import { Snackbar } from "react-native-paper";
import { Formik } from "formik";
import * as yup from "yup";

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

  const { isAuth, error, status, saving } = useSelector((state) => state.auth);
  const dismissSnackbar = () => setSnackbarVisible(false);

  // const handleLogin = () => {
  //   dispatch(
  //     userLogin({
  //       username: email,
  //       password: password,
  //       grant_type: "password",
  //     })
  //   );
  // };

  useEffect(() => {
    if (error === "invalid_grant" && status === 400) {
      setSnacbarMessage("You Have entered a wrong Email or Password");

      setTimeout(() => {
        setSnackbarVisible(true);
      }, 2000);
    } else {
      dismissSnackbar();
    }
  }, [isAuth, error]);

  return (
    <View style={globalStyles.container}>
      <ChevronLeft
        size={24}
        style={styles.backButton}
        onPress={navigation.goBack}
      />
      <Text style={styles.title}>Welcome Back!</Text>
      <Formik
        validationSchema={loginValidationSchema}
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => {
          console.log(values);
          try {
            dispatch(
              userLogin({
                username: values.email,
                password: values.password,
                grant_type: "password",
              })
            );
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
              placeholder="Email"
              inputStyle={styles.inputStyle}
              containerStyle={[styles.containerStyle, globalStyles.mb16]}
              inputContainerStyle={styles.inputContainerStyle}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
              keyboardType="email-address"
            />
            {errors.email && (
              <Text style={[styles.errorText, { marginBottom: 2 }]}>
                {errors.email}
              </Text>
            )}

            <Input
              placeholder="Password"
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
              title="Password help ?"
              type="clear"
              containerStyle={{ alignSelf: "flex-end" }}
              titleStyle={styles.formClearActionButton}
              onPress={() => navigation.navigate("ForgotPassword")}
            />
            <Button
              title="Login to Spree Shop"
              buttonStyle={styles.buttonBlockStyle}
              titleStyle={globalStyles.latoBold16}
              onPress={handleSubmit}
            />
            <View style={styles.footer}>
              <Text style={styles.label}>Don't have an account ? </Text>
              <Text
                style={styles.footerAction}
                onPress={() => navigation.navigate("SignUp")}
              >
                {" "}
                Signup
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
