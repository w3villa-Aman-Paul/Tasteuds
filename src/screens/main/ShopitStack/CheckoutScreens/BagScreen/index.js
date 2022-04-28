import * as React from "react";
import { View, Text, ScrollView, Image } from "react-native";
import { globalStyles } from "../../../../../styles/global";
import ProductCard from "../../../../../library/components/ProductCard";
import TextField from "../../../../../library/components/TextField";
import { styles } from "./styles";
import { checkoutStyles } from "../styles";
import { connect } from "react-redux";
import { Snackbar } from "react-native-paper";
import CheckoutDetailsCard from "../../../../../library/components/CheckoutDetailsCard";
import ActionButtonFooter from "../../../../../library/components/ActionButtonFooter";
import ActivityIndicatorCard from "../../../../../library/components/ActivityIndicatorCard";
import {
  getCart,
  removeLineItem,
  setQuantity,
  getDefaultCountry,
  getCountriesList,
} from "../../../../../redux";
import { useSelector } from "react-redux";
import { colors } from "react-native-elements";

const BagScreen = ({ navigation, dispatch, saving, cart }) => {
  const [promoCode, setPromoCode] = React.useState("");
  const [snackbarVisible, setSnackbarVisible] = React.useState(false);
  // const cart = useSelector((state) => state.checkout);

  const productList = useSelector((state) => state.products.productList);

  console.log(">>cart", cart.line_items);

  React.useEffect(() => {
    dispatch(getCart());
  }, []);

  const onDismiss = () => setSnackbarVisible(false);

  const handleToCheckout = async () => {
    await dispatch(getDefaultCountry());
    await dispatch(getCountriesList());
    navigation.navigate("ShippingAddress");
    // if(cart.state === "cart") {
    //   await dispatch(getDefaultCountry())
    //   await dispatch(getCountriesList())
    //   navigation.navigate('ShippingAddress')
    // } else  {
    //   navigation.navigate('CheckoutPayment')
    // }
  };

  // const handleVarientImage = (pro) => {

  //   const url = productList.map(ele => if(ele.id == pro))
  // }

  const handleRemoveLineItem = (lineItemId) => {
    dispatch(removeLineItem(lineItemId));
  };

  const handleIncrementQuantity = (lineItemId, lineItemQuantity) => {
    dispatch(
      setQuantity({
        line_item_id: lineItemId,
        quantity: lineItemQuantity + 1,
      })
    );
    setTimeout(() => {
      setSnackbarVisible(true);
    }, 1000);
  };

  const handleDecrementQuantity = (lineItemId, lineItemQuantity) => {
    if (lineItemQuantity === 1) {
      handleRemoveLineItem(lineItemId);
    } else {
      dispatch(
        setQuantity({
          line_item_id: lineItemId,
          quantity: lineItemQuantity - 1,
        })
      );
      setTimeout(() => {
        setSnackbarVisible(true);
      }, 1000);
    }
  };

  if (saving) {
    return <ActivityIndicatorCard />;
  } else
    return (
      <>
        <View style={globalStyles.containerFluid}>
          <ScrollView style={{ ...styles.bgWhite }}>
            <View
              style={{
                width: "90%",
                height: 100,
                alignSelf: "center",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  width: "90%",
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "flex-end",
                }}
              >
                <Text style={{ ...styles.fontProgress }}>Bestilling</Text>
                <Text
                  style={{ ...styles.fontProgress, ...styles.fontProgressBold }}
                >
                  Handlekurv
                </Text>
                <Text style={{ ...styles.fontProgress }}>Betaling</Text>
              </View>
              <View
                style={{
                  width: "90%",
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "flex-start",
                }}
              >
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <View style={styles.circle}></View>
                  <View style={styles.bar}></View>
                  <View style={{ ...styles.circle }}></View>
                  <View
                    style={{ ...styles.bar, ...styles.bgWhite, elevation: 3 }}
                  ></View>
                  <View
                    style={{
                      ...styles.circle,
                      ...styles.bgWhite,
                      elevation: 3,
                    }}
                  ></View>
                </View>
              </View>
            </View>

            <View
              style={{
                padding: 20,
                borderWidth: 1,
                borderRadius: 14,
                flex: 1,
                flexDirection: "row",
                elevation: 3,
                backgroundColor: "#fff",
                borderColor: "transparent",
                ...globalStyles.container,
                justifyContent: "center",
                alignItems: "center",
                height: 96,
              }}
            >
              <Image
                source={require("../../../../../../assets/images/components/color-truck.png")}
                resizeMode={"cover"}
                style={{ flex: 0.3, height: 87, width: 87, marginRight: 15 }}
              />
              <Text
                style={{
                  flex: 0.7,
                  fontFamily: "lato-medium",
                  fontSize: 14,
                  lineHeight: 17,
                }}
              >
                Bestiller du nå får du varene torsdag 12. april mellom 16:00 -
                22:00
              </Text>
            </View>

            <View style={globalStyles.container}>
              {cart.line_items.map((ele, i) => (
                <ProductCard
                  key={i}
                  cart
                  counter
                  imageSource={ele.variant.images[0]?.styles[3].url}
                  // imageSource={handleVarientImage}
                  onIncrementQuantity={() =>
                    handleIncrementQuantity(ele.id, ele.quantity)
                  }
                  onDecrementQuantity={() =>
                    handleDecrementQuantity(ele.id, ele.quantity)
                  }
                  onRemoveLineItem={() => handleRemoveLineItem(ele.id)}
                  {...ele}
                />
              ))}
            </View>
            <View
              style={[
                globalStyles.containerFluid,
                globalStyles.bgWhite,
                globalStyles.mt16,
              ]}
            >
              <View style={[globalStyles.container, globalStyles.mt8]}>
                <Text style={[globalStyles.latoBold14, globalStyles.mb8]}>
                  Promo Code
                </Text>
                <TextField
                  placeholder=" Enter Promo Code"
                  containerStyle={checkoutStyles.inputWrapperStyle}
                  rightElement={
                    <Text style={checkoutStyles.inputRightText}>Apply</Text>
                  }
                  onChangeText={setPromoCode}
                  value={promoCode}
                />
              </View>
            </View>

            <CheckoutDetailsCard
              title="Price Details"
              display_total={cart && cart.display_total}
            />

            <View style={styles.footer}>
              <Text style={[globalStyles.textPrimary, globalStyles.latoBold16]}>
                Continue Shopping
              </Text>
            </View>
          </ScrollView>

          <ActionButtonFooter
            title="Proceed to Checkout"
            onPress={handleToCheckout}
          />
        </View>
        <Snackbar visible={snackbarVisible} onDismiss={onDismiss}>
          SetQuantity Success !
        </Snackbar>
      </>
    );
};

const mapStateToProps = (state) => ({
  saving: state.checkout.saving,
  cart: state.checkout.cart,
});

export default connect(mapStateToProps)(BagScreen);
