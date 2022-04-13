import React, { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import { View, Text, Image } from "react-native";
import { globalStyles } from "../../styles/global";
import { ChevronLeft, Eye } from "../../library/icons";
import { colors } from "../../res/palette";
import { Button, Input } from "react-native-elements";
import { styles } from "./styles";
import TextField from "../../library/components/TextField";
import { Snackbar } from "react-native-paper";
import { accountCreate } from "../../redux";
import { Formik } from "formik";
import * as yup from "yup";

const signUpValidationSchema = yup.object().shape({
  // fullName: yup
  //   .string()
  //   .matches(/(\w.+\s).+/, "Enter at least 2 names")
  //   .required("Full name is required"),
  // phoneNumber: yup
  //   .string()
  //   .matches(/(01)(\d){8}\b/, "Enter a valid phone number")
  //   .required("Phone number is required"),
  email: yup
    .string()
    .email("Please enter valid email")
    .required("Email is required"),
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

const SignUpScreen = ({ navigation, dispatch }) => {
  const [secureTextEntryToggle, setSecureTextEntryToggle] = useState(true);
  const { isAuth, error, status } = useSelector((state) => state.account);

  const [inputPasswordBorder, setInputPasswordBorder] = useState(false);
  const [inputPasswordConfirmationBorder, setInputPasswordConfirmationBorder] =
    useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snacbarMessage, setSnacbarMessage] = useState("");
  const dismissSnackbar = () => setSnackbarVisible(false);

  const signInNavigation = () => {
    navigation.navigate("SignIn");
  };

  useEffect(() => {
    if (error === "invalid_grant" && status === 422) {
      setSnacbarMessage(error);

      setTimeout(() => {
        setSnackbarVisible(true);
      }, 2000);
      dismissSnackbar();
    } else if (status === 404) {
      setSnacbarMessage("Server not found or Network Error");
      setSnackbarVisible(true);

      setTimeout(() => {
        dismissSnackbar();
      }, 2000);
    } else if (status === 200) {
      setSnacbarMessage("Account Created Successfully!🙂🙂, Now you can LogIn");
      setSnackbarVisible(true);
      setTimeout(() => {
        dispatch(
          accountCreate({
            user: {
              email: "",
              password: "",
              password_confirmation: "",
            },
          })
        );
        dismissSnackbar();
        signInNavigation();
      }, 2000);
    }
  }, [isAuth, error]);

  return (
    <View style={globalStyles.container}>
      <ChevronLeft
        size={24}
        style={styles.backButton}
        onPress={navigation.goBack}
      />

      <Image
        style={styles.loginLogo}
        source={require("../../../assets/images/logo-mark.png")}
      />
      <Text style={{ ...styles.title, left: 27 }}>bli med i familien vår</Text>
      <View
        style={[
          globalStyles.containerFluid,
          { justifyContent: "space-evenly" },
        ]}
      >
        <Formik
          validationSchema={signUpValidationSchema}
          initialValues={{
            email: "",
            password: "",
            confirmPassword: "",
          }}
          onSubmit={(values) => {
            try {
              dispatch(
                accountCreate({
                  user: {
                    email: values.email,
                    password: values.password,
                    password_confirmation: values.passwordConfirmation,
                  },
                })
              );
            } catch (error) {
              console.error(error);
              console.log(error);
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
            <View style={{ ...styles.mainContainer, top: 330 }}>
              <TextField
                placeholder="Email"
                inputStyle={styles.inputStyle}
                containerStyle={{
                  ...styles.containerStyle,
                  ...globalStyles.mb16,
                }}
                inputContainerStyle={styles.inputContainerStyle}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
              />
              {errors.email && (
                <Text style={{ ...styles.errorText }}>{errors.email}</Text>
              )}

              <Input
                placeholder="Password"
                secureTextEntry={secureTextEntryToggle}
                onFocus={() => setInputPasswordBorder(true)}
                onBlur={() => setInputPasswordBorder(false)}
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
                <Text style={{ ...styles.errorText }}>{errors.password}</Text>
              )}

              <Input
                placeholder="Password Confirmation"
                secureTextEntry={secureTextEntryToggle}
                onFocus={() => setInputPasswordConfirmationBorder(true)}
                onBlur={() => setInputPasswordConfirmationBorder(false)}
                value={values.confirmPassword}
                containerStyle={[
                  styles.inputMainContainer,
                  { borderWidth: inputPasswordConfirmationBorder ? 1 : 0 },
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
                onChangeText={handleChange("confirmPassword")}
              />
              {errors.confirmPassword && (
                <Text style={{ ...styles.errorText }}>
                  {errors.confirmPassword}
                </Text>
              )}

              <Button
                title="Opprett konto"
                buttonStyle={styles.buttonBlockStyle}
                titleStyle={globalStyles.latoBold16}
                containerStyle={{ alignSelf: "center" }}
                onPress={handleSubmit}
              />
              <View style={styles.footer}>
                <Text style={styles.label}>Har du allerede en konto?</Text>
                <Text
                  style={styles.footerAction}
                  onPress={() => navigation.navigate("SignIn")}
                >
                  {" "}
                  Logg inn
                </Text>
              </View>
            </View>
          )}
        </Formik>
        <View>
          <Text
            style={{
              ...styles.footerAction,
              alignSelf: "center",
              position: "absolute",
              top: 270,
            }}
            onPress={() => navigation.navigate("SignIn")}
          >
            {" "}
            Vilkår for bruk & personvernerklæring
          </Text>
        </View>
      </View>
      <Snackbar visible={snackbarVisible} onDismiss={dismissSnackbar}>
        {`${snacbarMessage}`}
      </Snackbar>
    </View>
  );
};

export default connect()(SignUpScreen);
