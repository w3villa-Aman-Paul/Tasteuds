import React from "react";
import { ApplePayButton, useApplePay } from "@stripe/stripe-react-native";
import { TouchableOpacity, View } from "react-native";

const ApplePay = ({ styles }) => {
  const { presentApplePay, confirmApplePayPayment, isApplePaySupported } =
    useApplePay();

  const pay = async () => {
    // if (!isApplePaySupported) return;
    // ...
    const { error } = await presentApplePay({
      cartItems: [
        {
          label: "Example item name",
          amount: "14.00",
          paymentType: "Immediate",
        },
      ],
      country: "US",
      currency: "USD",
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
      const clientSecret = await fetchPaymentIntentClientSecret();

      const { error: confirmError } = await confirmApplePayPayment(
        clientSecret
      );

      if (confirmError) {
        // handle error
      }
    }
  };
  // ...

  return (
    <View>
      {/* {isApplePaySupported && ( */}
      <TouchableOpacity>
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
      {/* )} */}
    </View>
  );
};

export default ApplePay;
