import { View, Text, Alert, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import {
  GooglePayButton,
  useGooglePay,
  useStripe,
} from "@stripe/stripe-react-native";
import { useSelector } from "react-redux";
import { HOST } from "../../../res/env";

const GooglePay = ({ styles, address }) => {
  const { cart } = useSelector((state) => state.checkout);

  const { isGooglePaySupported, initGooglePay, presentGooglePay } =
    useGooglePay();
  const { createPaymentMethod, handleCardAction, paymentIntentError } =
    useStripe();

  //   useEffect(() => {
  //     const init = async () => {
  //       //   if (!(await isGooglePaySupported({ testEnv: true }))) {
  //       //     Alert.alert("Google Pay is not supported.");
  //       //     return;
  //       //   }

  //     };
  //     init();
  //   }, []);

  const fetchPaymentIntentClientSecret = async () => {
    // Fetch payment intent created on the server, see above
    const response = await fetch(
      `${HOST}/api/v2/storefront/checkout/payment_intent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ payment_method_id: paymentMethod.id }),
      }
    );
    const { clientSecret } = await response.json();

    return clientSecret;
  };

  const pay = async () => {
    const billingDetails = {
      email: "email@stripe.com",
      phone: "+48888000888",
      addressCity: "Houston",
      addressCountry: "US",
      addressLine1: "1459  Circle Drive",
      addressLine2: "Texas",
    };

    // Create payment method
    let { paymentMethod, error } = await createPaymentMethod({
      type: "Card",
      address: billingDetails,
      paymentMethodData: {
        billingDetails,
      },
    });

    console.log("paymentMethod:", paymentMethod);
    console.log("paymentMethodError", error);

    const initData = await initGooglePay({
      testEnv: true,
      merchantName: "Morten Fonsai",
      countryCode: "NO",
      billingAddressConfig: {
        format: "FULL",
        isPhoneNumberRequired: true,
        isRequired: false,
      },
      existingPaymentMethodRequired: false,
      isEmailRequired: true,
    });

    if (initData.error) {
      Alert.alert(error.code, error.message);
      return;
    }

    const clientSecret = await fetchPaymentIntentClientSecret();

    const checkGPay = await presentGooglePay({
      clientSecret,
      forSetupIntent: false,
    });

    if (checkGPay.error) {
      Alert.alert(checkGPay.error.code, checkGPay.error.message);
      return;
    } else {
      Alert.alert("Success", "The payment was confirmed successfully.");
    }
  };

  return (
    <View>
      <TouchableOpacity
        style={[styles, { elevation: 5 }]}
        onPress={() => pay()}
      >
        <View
          style={{
            width: "100%",
            height: 50,
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <Image
            source={require("../../../../assets/images/google.png")}
            style={{ width: 40, height: 40 }}
          />

          <Text style={{ fontSize: 20, fontFamily: "lato-medium" }}>
            Google Pay
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default GooglePay;
