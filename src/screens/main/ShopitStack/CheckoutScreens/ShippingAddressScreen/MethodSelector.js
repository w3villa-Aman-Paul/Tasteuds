import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  TouchableOpacity,
} from "react-native";
import { Platform } from "react-native";
import { initStripe, useStripe } from "@stripe/stripe-react-native";

const MethodSelector = ({ onPress, paymentMethod, style }) => {
  return (
    <TouchableOpacity style={style} onPress={onPress}>
      {/* If there's no paymentMethod selected, show the options */}
      {!paymentMethod && (
        <Pressable
          onPress={onPress}
          style={{
            flexDirection: "row",
            paddingVertical: 8,
            alignItems: "center",
          }}
        >
          {Platform.select({
            ios: (
              <Image
                source={require("../../../../../../assets/images/Header-Icon/ipay.png")}
                style={{ height: 40, width: 50, resizeMode: "contain" }}
              />
            ),
            android: <Text style={styles.boldText}>Google Pay</Text>,
          })}
          <View style={[styles.selectButton, { marginLeft: 16 }]}>
            <Text style={[styles.boldText, { color: "#007DFF" }]}>Card</Text>
          </View>
        </Pressable>
      )}
      {/* If there's a paymentMethod selected, show it */}
      {!!paymentMethod && (
        <Pressable
          onPress={onPress}
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingVertical: 8,
          }}
        >
          {paymentMethod.label.toLowerCase().includes("apple") && (
            <Text style={styles.boldText}>Apple Pay</Text>
          )}
          {paymentMethod.label.toLowerCase().includes("google") && (
            <Text style={styles.boldText}>Google Pay</Text>
          )}
          {!paymentMethod.label.toLowerCase().includes("google") &&
            !paymentMethod.label.toLowerCase().includes("apple") && (
              <View style={[styles.selectButton, { marginRight: 16 }]}>
                <Text style={[styles.boldText, { color: "#007DFF" }]}>
                  {paymentMethod.label}
                </Text>
              </View>
            )}
          <Text style={[styles.boldText, { color: "#007DFF", flex: 1 }]}>
            Change payment method
          </Text>
        </Pressable>
      )}
    </TouchableOpacity>
  );
};

const CartInfo = ({ products, cart }) => {
  return (
    <View>
      {Object.keys(cart).map((productId) => {
        const product = products.filter((p) => p.id === productId)[0];
        const quantity = cart[productId];
        return (
          <View
            key={productId}
            style={[{ flexDirection: "row" }, styles.productRow]}
          >
            <Text style={{ flexGrow: 1, fontSize: 17 }}>
              {quantity} x {product.name}
            </Text>
            <Text style={{ fontWeight: "700", fontSize: 17 }}>
              {quantity * product.price}$
            </Text>
          </View>
        );
      })}
    </View>
  );
};

const AppleCheckoutScreen = ({
  navigateBack,
  publishableKey,
  clientSecret,
  merchantName,
}) => {
  const [paymentMethod, setPaymentMethod] = useState();
  const { initPaymentSheet, presentPaymentSheet, confirmPaymentSheetPayment } =
    useStripe();

  useEffect(() => {
    (async () => {
      await initStripe({
        publishableKey,
        // Only if implementing applePay
        // Set the merchantIdentifier to the same
        // value in the StripeProvider and
        // striple plugin in app.json
        merchantIdentifier: "merchant.com.tastebuds",
      });

      // Initialize the PaymentSheet with the paymentIntent data,
      // we will later present and confirm this
      await initializePaymentSheet();
    })();
  }, []);

  const initializePaymentSheet = async () => {
    const { error, paymentOption } = await initPaymentSheet({
      paymentIntentClientSecret: clientSecret,
      customFlow: true,
      merchantDisplayName: merchantName,
      style: "alwaysDark", // If darkMode
      googlePay: true, // If implementing googlePay
      applePay: true, // If implementing applePay
      merchantCountryCode: "NO", // Countrycode of the merchant
      testEnv: __DEV__, // Set this flag if it's a test environment
    });
    if (error) {
      console.log(error);
    } else {
      // Upon initializing if there's a paymentOption
      // of choice it will be filled by default
      setPaymentMethod(paymentOption);
    }
  };

  const handleSelectMethod = async () => {
    const { error, paymentOption } = await presentPaymentSheet({
      confirmPayment: false,
    });
    if (error) {
      alert(`Error code: ${error.code}`, error.message);
    }
    setPaymentMethod(paymentOption);
  };
  const handleBuyPress = async () => {
    if (paymentMethod) {
      const response = await confirmPaymentSheetPayment();

      if (response.error) {
        alert(`Error ${response.error.code}`);
        console.error(response.error.message);
      } else {
        alert("Purchase completed!");
      }
    }
  };

  const products = [
    {
      price: 10,
      name: "Pizza Pepperoni",
      id: "pizza-pepperoni",
    },
    {
      price: 12,
      name: "Pizza 4 Fromaggi",
      id: "pizza-fromaggi",
    },
    {
      price: 8,
      name: "Pizza BBQ",
      id: "pizza-bbq",
    },
  ];

  const [cart, setCart] = useState(
    Object.fromEntries(products.map((p) => [p.id, 0]))
  );

  return (
    <View style={styles.screen}>
      <CartInfo cart={cart} products={products} />
      <MethodSelector onPress={handleSelectMethod} />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignSelf: "stretch",
          marginHorizontal: 24,
        }}
      >
        <Pressable onPress={navigateBack}>
          <Text style={[styles.textButton, styles.boldText]}>Back</Text>
        </Pressable>
        <Pressable style={styles.buyButton} onPress={handleBuyPress}>
          <Text style={[styles.boldText, { color: "white" }]}>Buy</Text>
        </Pressable>
      </View>
    </View>
  );
};

export { MethodSelector, CartInfo, AppleCheckoutScreen };

const styles = StyleSheet.create({
  // ...
  buyButton: {
    backgroundColor: "#007DFF",
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 8,
  },
  textButton: {
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 8,
    color: "#007DFF",
  },
  selectButton: {
    borderColor: "#007DFF",
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 8,
    borderWidth: 2,
  },
  boldText: {
    fontSize: 17,
    fontWeight: "700",
  },
});
