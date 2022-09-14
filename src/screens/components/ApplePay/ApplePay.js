import React from "react";
import { ApplePayButton, useApplePay } from "@stripe/stripe-react-native";
import { TouchableOpacity, View, Alert } from "react-native";

const ApplePay = ({ styles }) => {
  const { presentApplePay, confirmApplePayPayment, isApplePaySupported } =
    useApplePay();

  const pay = async () => {
    if (!isApplePaySupported) return;

    const { error } = await presentApplePay({
      cartItems: [
        {
          label: "Example item name",
          amount: "400.00",
          paymentType: "Immediate",
        },
      ],
      country: "NO",
      currency: "NOK",
      shippingMethods: [
        {
          amount: "20.00",
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
    } else {
      // const clientSecret = await fetchPaymentIntentClientSecret();
      const clientSecret =
        "pi_3LhYyaB9Bg3ozT7m1v6FlMB5_secret_wO2rweHrK2YlyahJdVyXRHFnC";

      const data = await confirmApplePayPayment(clientSecret);

      if (confirmError) {
        // handle error
        return Alert.alert("error", error);
      }

      Alert.alert("error", data);
    }
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
