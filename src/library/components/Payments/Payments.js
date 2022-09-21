import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  Button,
  TouchableOpacity,
  Image,
  Linking,
} from "react-native";
import {
  CardField,
  PaymentIntents,
  useStripe,
  createToken,
  useConfirmPayment,
  initPaymentSheet,
  presentPaymentSheet,
  confirmPaymentSheetPayment,
} from "@stripe/stripe-react-native";
import { useSelector } from "react-redux";
import { HOST } from "../../../res/env";

const Payments = (styles) => {
  const { token } = useSelector((state) => state.checkout.cart);
  const Account = useSelector((state) => state.account.account);

  const subscribe = async () => {
    try {
      const response = await fetch(
        `${HOST}/api/v2/storefront/checkout/payment_intent`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Spree-Order-Token": `${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) return Alert.alert(data.message);

      const { paymentIntent, ephemeralKey, customer, cartToken, intentId } =
        data.data;

      const initsheet = await initPaymentSheet({
        customerId: "cus_MT6T8EFMbytt7Q",
        // customerEphemeralKeySecret: ephemeralKey,
        paymentIntentClientSecret: paymentIntent,
        customFlow: true,
        merchantDisplayName: "Aman Paul",
        allowsDelayedPaymentMethods: true,
        style: "alwaysDark",
        googlePay: {
          merchantCountryCode: "IN",
          testEnv: true, // use test environment
        },
      });

      if (initsheet.error) {
        console.log(initsheet.error.message);
        return Alert.alert(initsheet.error.message);
      }
      const presentSheet = await presentPaymentSheet({
        clientSecret: paymentIntent,
      });

      if (presentSheet.error) {
        console.log("presentSheet", presentSheet.error.message);
        return Alert.alert(presentSheet.error.message);
      }

      const confirmSheet = await confirmPaymentSheetPayment();

      if (confirmSheet.error) {
        console.log("confirmSheet", confirmSheet.error.message);
        return Alert.alert(confirmSheet.error.message);
      }

      Alert.alert("Payment complete, thank you");

      const paymentStatus = await fetch(
        `${HOST}/api/v2/storefront/checkout/stripe_payment_status`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Spree-Order-Token": `${token}`,
          },
          body: JSON.stringify({
            payment_intent_id: intentId,
            payment_method_id: 3,
          }),
        }
      );

      const res = await paymentStatus.json();

      if (res.message === "Success") {
        styles.handlePaymentConfirmation();
      } else {
        Alert.alert("An error occurred. Please try again.");
      }
    } catch (error) {
      Alert.alert("Something went wrong");
    }
  };

  return (
    <TouchableOpacity
      style={[styles.payment_btn, { flexDirection: "row", elevation: 5 }]}
      onPress={subscribe}
    >
      <Image
        source={require("../../../../assets/images/Header-Icon/cardpay.png")}
        style={styles.img_style}
      />
      <Text style={{ marginLeft: 10, fontSize: 14 }}>KORTBETALING</Text>
    </TouchableOpacity>
  );
};

export default Payments;
