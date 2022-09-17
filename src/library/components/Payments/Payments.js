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
import {
  CardField,
  PaymentIntents,
  useStripe,
  createToken,
} from "@stripe/stripe-react-native";
import { useSelector } from "react-redux";
import { HOST } from "../../../res/env";

const Payments = (styles) => {
  const { token } = useSelector((state) => state.checkout.cart);
  const Account = useSelector((state) => state.account.account);

  const [spreeToken, setSpreeToken] = useState(null);
  const [card, setCard] = useState(null);

  const { createPaymentMethod, handleCardAction, paymentIntentError } =
    useStripe();

  // const subscribe = async () => {
  //   try {
  //     //sending request
  //     const response = await fetch(
  //       `${HOST}/api/v2/storefront/checkout/payment_intent`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           "X-Spree-Order-Token": `${token}`,
  //         },
  //       }
  //     );

  //     // console.log(response);
  //     const data = response.json();

  //     if (!response.ok) return Alert.alert(data.message);

  //     const secret = await data;
  //     console.log(secret.intent.client_secret);
  //     setClientSecret(secret.intent.client_secret);

  //     const initsheet = await stripe.initPaymentSheet({
  //       paymentIntentClientSecret: secret.intent.client_secret,
  //       allowsDelayedPaymentMethods: true,
  //       applePay: {
  //         merchantCountryCode: "NO",
  //       },
  //     });
  //     if (initsheet.error) {
  //       console.log(initsheet.error.message);
  //       return Alert.alert(initsheet.error.message);
  //     }
  //     const presentSheet = await stripe.presentPaymentSheet({
  //       clientSecret,
  //     });

  //     if (presentSheet.error) {
  //       console.log("presentSheet date", presentSheet.error.message);
  //       return Alert.alert(presentSheet.error.message);
  //     }

  //     console.log(presentSheet, "/n", initsheet);

  //     Alert.alert("Payment complete, thank you");
  //   } catch (error) {
  //     Alert.alert("Something went wrong");
  //   } cardName, profileId, cvv, month, year
  // };

  const pay = async () => {
    // Gather customer billing information (for example, email)
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

    // Send the PaymentMethod to your server to create a PaymentIntent
    const response = await fetch(
      `${HOST}/api/v2/storefront/checkout/payment_intent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Spree-Order-Token": `${token}`,
        },
        body: JSON.stringify({ payment_method_id: paymentMethod.id }),
      }
    );
    const resData = await response.json();

    console.log("resData", resData);

    const result = await createToken(card);

    if (result.error) {
      // Inform the customer that there was an error.
      console.log(result.error);
    } else {
      // console.log("token", result.token.id);
      // Send the token to your server.
      const temp = result.token.id;
      setSpreeToken(temp);
    }

    if (resData?.error) {
      // Error creating or confirming PaymentIntent
      Alert.alert("Error", paymentIntentError);
      return;
    }

    if (
      resData.intent.client_secret &&
      resData.intent.status !== "requires_action"
    ) {
      // Payment succeeded
      Alert.alert("Success", "The payment was confirmed successfully!");
    }

    if (
      resData?.intent?.client_secret &&
      resData.intent.status === "requires_action"
    ) {
      // ...continued below
      const { error, paymentIntent } = await handleCardAction(
        resData.intent.client_secret
      );

      console.log("paymentIntent", paymentIntent);

      if (error) {
        Alert.alert(`Error code: ${error.code}`, error.message);
      } else if (paymentIntent) {
        if (
          (paymentIntent.status === paymentIntent.status) ===
          "RequiresConfirmation"
        ) {
          // Confirm the PaymentIntent again on your server
          const response = await fetch(
            `${HOST}/api/v2/storefront/checkout/payment_intent`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ payment_intent_id: paymentIntent.id }),
            }
          );
          const { error, success } = await response.json();
          if (error) {
            // Error during confirming Intent
            Alert.alert("Error", error);
          } else if (success) {
            console.log("stripeToken2", result.token.id);
            Alert.alert("Success", "The payment was confirmed successfully!");
            styles.handlePaymentConfirmation({
              cardName: card.brand,
              profileId: result.token.id,
              month: card.expiryMonth,
              year: card.expiryYear,
              last4: card.last4,
              brand: card.brand,
            });
          }
        } else {
          // Payment succedeed
          console.log("stripeToken2", result.token.id);
          Alert.alert("Success", "The payment was confirmed successfully!");
          styles.handlePaymentConfirmation({
            cardName: card.brand,
            profileId: result.token.id,
            month: card.expiryMonth,
            year: card.expiryYear,
            last4: card.last4,
            brand: card.brand,
          });
        }
      }
    }
  };

  return (
    <View
      style={[
        styles.payment_btn,
        { flexDirection: "column", elevation: 5, paddingBottom: 10 },
      ]}
      // onPress={() => setIsOpen(true)}
      // onPress={subscribe}
    >
      {/* <Image
        source={require("../../../../assets/images/Header-Icon/cardpay.png")}
        style={styles.img_style}
      /> */}
      {/* <Text style={{ marginLeft: 10, fontSize: 14 }}>KORTBETALING</Text> */}
      {/* <Button title="Create Payment" onPress={subscribe} /> */}
      {/* <View> */}
      <CardField
        postalCodeEnabled={false}
        placeholders={{
          number: "4242 4242 4242 4242",
        }}
        cardStyle={{
          backgroundColor: "#FFFFFF",
          textColor: "#000000",
        }}
        style={{
          width: "100%",
          height: 50,
          // marginVertical: 30,
        }}
        onCardChange={(cardDetails) => {
          console.log("cardDetails", cardDetails);
          setCard(cardDetails);
        }}
        onFocus={(focusedField) => {
          console.log("focusField", focusedField);
        }}
      />

      <Button title="Create Payment" onPress={pay} />
      {/* </View> */}
    </View>
  );
};

export default Payments;
