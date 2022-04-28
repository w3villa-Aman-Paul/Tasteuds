import * as React from "react";
import { View, Text, ScrollView, Image } from "react-native";
import { globalStyles } from "../../../../../styles/global";
import ProductCard from "../../../../../library/components/ProductCard";
import TextField from "../../../../../library/components/TextField";
import { styles } from "./styles";
import { checkoutStyles } from "../styles";
import { connect } from "react-redux";
import { Divider } from "react-native-elements";
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

import { TouchableOpacity } from "react-native-gesture-handler";
import CartFooter from "../../../../../library/components/ActionButtonFooter/cartFooter";
import { useSelector } from "react-redux";
import { colors } from "react-native-elements";

const BagScreen = ({ navigation, dispatch, saving, cart }) => {
  const [promoCode, setPromoCode] = React.useState("");
  const [snackbarVisible, setSnackbarVisible] = React.useState(false);

  // const cart = useSelector((state) => state.checkout);

  const productList = useSelector((state) => state.products.productList);

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
              {cart.line_items.map((ele, index) => (
                <>
                  <View key={index.toString()} style={styles.body}>
                    <View style={styles.cart_btn}>
                      <Text style={{ fontSize: 25 }}>{ele.quantity}</Text>
                      <View style={styles.inc_btn}>
                        <TouchableOpacity
                          onPress={() =>
                            handleIncrementQuantity(ele.id, ele.quantity)
                          }
                        >
                          <Text
                            style={{
                              fontSize: 20,
                              color: "#EB1741",
                              fontWeight: "bold",
                            }}
                          >
                            +
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() =>
                            handleDecrementQuantity(ele.id, ele.quantity)
                          }
                        >
                          <Text
                            style={{
                              fontSize: 20,
                              color: "#EB1741",
                              fontWeight: "bold",
                            }}
                          >
                            -
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                    <View style={styles.body_first}>
                      <Image
                        source={require("../../../../../../assets/images/Header-Icon/cart_item.png")}
                        style={styles.image}
                      />
                    </View>

                    <View style={styles.body_second}>
                      <Text style={styles.name}>{ele.name}</Text>
                    </View>
                    <View style={styles.body_third}>
                      <Text style={styles.price}>{ele.display_total}</Text>
                    </View>
                  </View>
                  <Divider orientation="horizontal" />
                </>
              ))}

              <View style={styles.continue}>
                <Text
                  style={styles.continue_shop}
                  onPress={() => navigation.navigate("ProductsList")}
                >
                  FORTSETT Å HANDLE
                </Text>
              </View>
              {/* <ProductCard
                    key={i}
                    // imageSource={itemImage}
                    onIncrementQuantity={() =>
                      handleIncrementQuantity(ele.id, ele.quantity)
                    }
                    onDecrementQuantity={() =>
                      handleDecrementQuantity(ele.id, ele.quantity)
                    }
                    onRemoveLineItem={() => handleRemoveLineItem(ele.id)}
                    {...ele}
                  /> */}
            </View>

            <Divider
              orientation="horizontal"
              height={11}
              width={"100%"}
              color={"rgba(196, 196, 196, 0.2)"}
            />
            <View style={styles.promo}>
              <TouchableOpacity style={styles.promo_btn}>
                <Text>LEGG TIL PROMOKODE</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.promo}>
              <View style={styles.price}>
                <Text style={styles.total_text}>DELSUM</Text>
                <Text style={styles.total_price}>{cart.display_total}</Text>
              </View>
              <View style={styles.price}>
                <Text style={styles.total_text}>FRAKT</Text>
                <Text style={styles.total_price}>{cart.ship_total}</Text>
              </View>
            </View>

            <View style={styles.offer}>
              <Text style={styles.continue_shop}>
                BESTILL FOR 150,00 KR TIL OG FÅ GRATIS FRAKT
              </Text>
            </View>

            <View></View>
            {/* 
            <CheckoutDetailsCard
              title="Price Details"
              display_total={cart && cart.display_total}
            /> */}
          </ScrollView>

          <CartFooter title="TIL BETALING" onPress={handleToCheckout} />
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
