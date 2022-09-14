import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  Button,
  TouchableOpacity,
  Image,
} from "react-native";
import { useStripe } from "@stripe/stripe-react-native";
import { useSelector } from "react-redux";

const Payments = (styles) => {
  const [name, setName] = useState("");
  const [clientSecret, setClientSecret] = useState(
    "pi_3LhqJ1B9Bg3ozT7m1bSKw2z1_secret_8U9BRINbM4JsiUW4A3X3brMCQ"
  );

  const stripe = useStripe();

  const subscribe = async () => {
    try {
      //sending request
      //   const response = await tokenHandler();
      //   const data = response.json();

      //   if (!response.ok) return Alert.alert(data.message);
      //   setClientSecret(data);
      //   console.log(data);

      const initsheet = await stripe.initPaymentSheet({
        paymentIntentClientSecret: clientSecret,
        allowsDelayedPaymentMethods: true,
        applePay: {
          merchantCountryCode: "NO",
        },
      });
      if (initsheet.error) {
        console.log(initsheet.error.message);
        return Alert.alert(initsheet.error.message);
      }
      const presentSheet = await stripe.presentPaymentSheet({
        clientSecret,
      });

      if (presentSheet.error) {
        console.log("presentSheet date", presentSheet.error.message);
        return Alert.alert(presentSheet.error.message);
      }

      console.log(presentSheet, "/n", initsheet);

      Alert.alert("Payment complete, thank you");
    } catch (error) {
      Alert.alert("Something went wrong");
    }
  };

  return (
    <TouchableOpacity
      style={styles.payment_btn}
      // onPress={() => setIsOpen(true)}
      onPress={subscribe}
    >
      <Image
        source={require("../../../../assets/images/Header-Icon/cardpay.png")}
        style={styles.img_style}
      />
      <Text style={{ marginLeft: 10, fontSize: 14 }}>KORTBETALING</Text>
      {/* <Button title="Create Payment" onPress={subscribe} /> */}
    </TouchableOpacity>
  );
};

export default Payments;
