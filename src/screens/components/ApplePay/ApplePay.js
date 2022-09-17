import React from "react";
import {
  ApplePayButton,
  confirmPaymentSheetPayment,
  useApplePay,
} from "@stripe/stripe-react-native";
import { TouchableOpacity, View, Alert } from "react-native";
import { useSelector } from "react-redux";
import { HOST } from "../../../res/env";

const ApplePay = ({ styles, address }) => {
  const { cart } = useSelector((state) => state.checkout);
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
        },
        body: JSON.stringify({
          currency: "NOK",
        }),
      }
    );

    const { client_secret } = response;

    console.log("response: ", response);

    return client_secret;
  };

  const pay = async () => {
    if (!isApplePaySupported) return;

    const { error } = await presentApplePay({
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

    if (error) {
      // handle error
      console.log(error);
      return;
    }

    const clientSecret = await fetchPaymentIntentClientSecret();

    // const clientSecret = await fetchPaymentIntentClientSecret();
    // const clientSecret =
    // "pi_3LidrOB9Bg3ozT7m12Shdh1F_secret_oqfOlidxuor6VrRXDeoDhQdkX";
    console.log("clientSecret: ", clientSecret);

    const result = await createToken(card);

    console.log("result: ", result);

    const data = await confirmApplePayPayment(clientSecret);

    if (confirmError) {
      // handle error
      return Alert.alert("error", error);
    }

    Alert.alert("error", data);
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
