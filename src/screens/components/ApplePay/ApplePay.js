import React from "react";
import {
  ApplePayButton,
  confirmPaymentSheetPayment,
  useApplePay,
} from "@stripe/stripe-react-native";
import { TouchableOpacity, View, Alert } from "react-native";
import { useSelector } from "react-redux";
import { HOST } from "../../../res/env";

const ApplePay = ({ styles, address, handlePaymentConfirmation }) => {
  const { cart } = useSelector((state) => state.checkout);
  const { token } = useSelector((state) => state.checkout.cart);
  const Address = useSelector((state) => state.checkout.address);
  const { presentApplePay, confirmApplePayPayment, isApplePaySupported } =
    useApplePay();

  const fetchPaymentIntentClientSecret = async () => {
    // Fetch payment intent created on the server, see above
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

    console.log("response: ", data);

    return data.data;
  };

  const pay = async () => {
    if (Address.length === 0) {
      return Alert.alert("Plase enter the address first");
    }

    if (!isApplePaySupported) return;

    const presentData = await presentApplePay({
      cartItems: [
        {
          label: "Total Amount",
          amount: cart?.total,
          paymentType: "Immediate",
        },
      ],
      country: "NO",
      currency: "NOK",
      shippingMethods: [
        {
          amount: cart?.total,
          identifier: "DPS",
          label: "Courier",
          detail: "Delivery",
          type: "final",
        },
      ],
      requiredShippingAddressFields: ["emailAddress", "phoneNumber"],
      requiredBillingContactFields: ["phoneNumber", "name"],
    });

    // if (error) {
    //   // handle error
    //   console.log(error);
    //   return;
    // }

    console.log("presentapplepay", presentData);

    const { intentId, paymentIntent, ephemeralKey, customer } =
      await fetchPaymentIntentClientSecret();

    console.log("secret", paymentIntent, ephemeralKey, customer);

    let clientSecret = paymentIntent;

    const data = await confirmApplePayPayment(clientSecret);
    console.log("confirm", data);

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
    console.log(res);

    if (res.message === "Success") {
      handlePaymentConfirmation();
    } else {
      Alert.alert("An error occurred. Please try again.");
    }

    if (data.error) {
      // handle error
      return Alert.alert("error", error);
    }

    // Alert.alert("error", data);
  };
  // ...

  return (
    <View>
      {isApplePaySupported && (
        <TouchableOpacity style={styles}>
          <ApplePayButton
            onPress={pay}
            type="plain"
            buttonStyle="white"
            borderRadius={4}
            style={{
              width: "100%",
              height: 50,
            }}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ApplePay;
