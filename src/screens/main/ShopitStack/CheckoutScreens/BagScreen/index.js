import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { globalStyles } from "../../../../../styles/global";
import { styles } from "./styles";
import { connect } from "react-redux";
import { Divider } from "react-native-elements";
import { Snackbar } from "react-native-paper";
import {
  getCart,
  removeLineItem,
  setQuantity,
  getDefaultCountry,
  getCountriesList,
  googleLogin,
  facebookLogin,
} from "../../../../../redux";

import { TouchableOpacity } from "react-native-gesture-handler";
import CartFooter from "../../../../../library/components/ActionButtonFooter/cartFooter";
import { useSelector } from "react-redux";
import {
  FACEBOOK_APP_ID,
  GOOGLE_ANDROID_CLIENT_ID,
  GOOGLE_EXPO_ID,
  GOOGLE_IOS_CLIENT_ID,
  HOST,
} from "../../../../../res/env";
import FilterFooter from "../../../../../library/components/ActionButtonFooter/FilterFooter";
import { colors } from "../../../../../res/palette";
import jwt_decode from "jwt-decode";

import * as Google from "expo-auth-session/providers/google";
import * as Facebook from "expo-facebook";
import * as AppleAuthentication from "expo-apple-authentication";
import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();

const BagScreen = ({ navigation, dispatch, cart }) => {
  const productsList = useSelector((state) => state.products.productsList);
  const { isAuth } = useSelector((state) => state.auth);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const sheetRef = React.useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const [accessToken, setAccessToken] = useState(null);
  const [googleSubmitting, setGoogleSubmitting] = useState(false);

  const onDismiss = () => setSnackbarVisible(false);
  const [showItemCard, setShowItemCard] = useState(false);
  const [enableQty, setEnableQty] = useState(null);
  const [itemQuantity, setItemQuantity] = useState(0);

  const [inc, setInc] = useState("false");
  const [isLoggedin, setIsLoggedin] = useState(false);

  const snapPoints = ["50%"];
  const timeoutIdRef = React.useRef();

  useEffect(() => {
    const timeOutId = timeoutIdRef.current;

    return () => {
      clearTimeout(timeOutId);
    };
  }, []);

  useEffect(() => {
    dispatch(getCart(cart?.token));
    setIsLoggedin(false);
  }, []);

  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId: GOOGLE_IOS_CLIENT_ID,
    androidClientId: GOOGLE_ANDROID_CLIENT_ID,
    expoClientId: GOOGLE_EXPO_ID,
  });

  useEffect(() => {
    if (response?.type === "success") {
      setGoogleSubmitting(true);
      setAccessToken(response.authentication.accessToken);
      dispatch(googleLogin(response.authentication.accessToken));
      console.log("acc", response.authentication.accessToken);
      setTimeout(() => {
        setIsOpen(false);
        setIsOpen(false);
      }, 1000);
    }
  }, [response]);

  const handleCartProductImage = (cartPro) => {
    const product = productsList?.find(
      (element) => cartPro?.variant?.product.id === element.id
    );
    return product?.images[0].styles[1];
  };

  const handleToCheckout = async () => {
    await dispatch(getDefaultCountry());
    await dispatch(getCountriesList());
    navigation.navigate("ShippingAddress");
  };

  const facebookLogIn = async () => {
    try {
      if (!isLoggedin) {
        await Facebook.initializeAsync({
          appId: FACEBOOK_APP_ID,
          appName: "Tastebuds",
        });

        const { type, token } = await Facebook.logInWithReadPermissionsAsync({
          permissions: ["email"],
        });

        if (type === "success") {
          setAccessToken(token);
          setIsLoggedin(true);
          console.log("facebookToken", token);
          console.log("accessToken", accessToken);
          dispatch(facebookLogin(token));
          setTimeout(() => {
            setIsOpen(false);
            setIsOpen(false);
          }, 1000);
        }
      } else {
        console.log("Access token", accessToken);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const appleLogin = async () => {
    try {
      const { identityToken } = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
        ],
      });

      {
        identityToken &&
          console.log(
            "identityToken",
            jwt_decode(identityToken, { header: true }),
            jwt_decode(identityToken)
          );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const bottomSheetContent = () => {
    return (
      <View style={styles.login_container}>
        <Text style={styles.main_text}>LOGG INN ELLER REGISTRER DEG</Text>
        <View style={styles.login_body}>
          <View style={styles.login_content}>
            <TouchableOpacity style={styles.login_btn} onPress={appleLogin}>
              <Image
                style={styles.login_image}
                source={require("../../../../../../assets/images/Header-Icon/apple.png")}
              />

              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={styles.link_text}>LOGG INN MED APPLE</Text>
              </View>
            </TouchableOpacity>
          </View>

          {!googleSubmitting ? (
            <View style={styles.login_content}>
              <TouchableOpacity
                style={styles.login_btn}
                onPress={
                  accessToken ? (
                    <></>
                  ) : (
                    () => {
                      setGoogleSubmitting(true);
                      promptAsync({ showInRecents: true });
                    }
                  )
                }
              >
                <Image
                  style={styles.login_image}
                  source={require("../../../../../../assets/images/Header-Icon/google.png")}
                />
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={styles.link_text}>LOGG INN MED GOOGLE</Text>
                </View>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.login_content}>
              <ActivityIndicator />
            </View>
          )}

          <View style={styles.login_content}>
            <TouchableOpacity
              style={styles.login_btn}
              onPress={() => facebookLogIn()}
            >
              <Image
                style={styles.login_image}
                source={require("../../../../../../assets/images/Header-Icon/fb.png")}
              />
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={styles.link_text}>LOGG INN MED FACEBOOK</Text>
              </View>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.login_content}
            onPress={() => navigation.navigate("SignIn")}
          >
            <Text style={styles.bottom_text}>FORTSETT MED E-POST</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const loginFooterCheckout = () => {
    setIsOpen(true);
  };

  const closeIncBar = () => {
    const id = setTimeout(() => setShowItemCard(false), 2000);
    timeoutIdRef.current = id;
  };

  const handleRemoveLineItem = (lineItemId) => {
    dispatch(removeLineItem(lineItemId, {}, cart?.token));
  };

  const findCartProduct = (itemID) => {
    const newItem = productsList.find((ele) => ele.id == itemID);
    setEnableQty(newItem);
  };

  const handleChangeQuantityClick = () => {
    clearTimeout(timeoutIdRef.current);
  };

  const handleItemIncrement = () => {
    setInc(true);
    setItemQuantity(itemQuantity + 1);
  };
  const handleItemDecrement = (lineItemQuantity) => {
    console.log("ORIGINAL", lineItemQuantity);
    if (2 + itemQuantity > lineItemQuantity) {
      setShowItemCard(false);
    } else {
      setInc(false);
      setItemQuantity(itemQuantity + 1);
    }
  };

  console.log("ITEMQTY", itemQuantity);
  console.log("INC", inc);

  const handleIncrementQuantity = (lineItemId, lineItemQuantity) => {
    const id = setTimeout(() => {
      dispatch(
        setQuantity(
          {
            line_item_id: lineItemId,
            quantity: lineItemQuantity + (itemQuantity + 1),
          },
          cart?.token
        )
      );
      setShowItemCard(false);
      setItemQuantity(0);
    }, 2000);
    timeoutIdRef.current = id;
  };

  const handleDecrementQuantity = (lineItemId, lineItemQuantity) => {
    if (2 + itemQuantity > lineItemQuantity) {
      handleRemoveLineItem(lineItemId);
      setItemQuantity(0);
    } else {
      const id = setTimeout(() => {
        dispatch(
          setQuantity(
            {
              line_item_id: lineItemId,
              quantity: lineItemQuantity - (itemQuantity + 1),
            },
            cart?.token
          )
        );
        setShowItemCard(false);
        setItemQuantity(0);
      }, 2000);
      timeoutIdRef.current = id;
    }
  };

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
              padding: 10,
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
              ...globalStyles.iosShadow,
            }}
          >
            <Image
              source={require("../../../../../../assets/images/components/delivery-truck.png")}
              resizeMode={"contain"}
              style={{ flex: 0.2, marginRight: 10, height: "100%" }}
            />

            <View style={{ flex: 0.9, justifyContent: "center" }}>
              <Text
                style={{
                  fontSize: 16,
                  lineHeight: 18.75,
                  fontWeight: "bold",
                }}
              >
                Bestill nå og få varene levert hjem{" "}
                <Text style={{ color: colors.btnLink }}>tirdag 04.08</Text>{" "}
                mellom 16.00-21.00.
              </Text>
            </View>
          </View>
          <View style={globalStyles.containerFluid}>
            {cart?.line_items?.map((ele) => {
              let cartProductImage = handleCartProductImage(ele);
              let cartItemId = ele?.variant?.product?.id;

              let getProduct = cart?.line_items?.find(
                (ele) => ele?.variant?.product?.id == enableQty?.id
              );

              return (
                <View key={ele?.variant?.id.toString()}>
                  <View style={styles.body}>
                    <Pressable
                      style={styles.cart_btn}
                      onPress={() => {
                        setShowItemCard(true);
                        findCartProduct(cartItemId);
                        // {
                        //   !itemQuantity ? closeIncBar() : null;
                        // }
                      }}
                    >
                      {showItemCard && cartItemId === enableQty?.id ? (
                        <>
                          <View style={styles.after_Press}>
                            <TouchableOpacity
                              onPress={() => {
                                handleChangeQuantityClick();
                                handleItemDecrement(getProduct?.quantity);
                                handleDecrementQuantity(
                                  getProduct?.id,
                                  getProduct.quantity
                                );
                              }}
                            >
                              <Text
                                style={{
                                  fontSize: 25,
                                  color: "#EB1741",
                                  fontWeight: "bold",
                                }}
                              >
                                --
                              </Text>
                            </TouchableOpacity>

                            <Text style={{ fontSize: 25 }}>
                              {inc
                                ? getProduct?.quantity + itemQuantity
                                : getProduct?.quantity - itemQuantity}
                            </Text>
                            <TouchableOpacity
                              onPress={() => {
                                handleChangeQuantityClick();
                                handleItemIncrement();
                                handleIncrementQuantity(
                                  getProduct.id,
                                  getProduct.quantity
                                );
                              }}
                            >
                              <Text
                                style={{
                                  fontSize: 25,
                                  color: "#EB1741",
                                  fontWeight: "bold",
                                }}
                              >
                                +
                              </Text>
                            </TouchableOpacity>
                          </View>
                          <View style={styles.after_img}>
                            <Image
                              source={{
                                uri: `${HOST}/${cartProductImage?.url}`,
                              }}
                              style={styles.image}
                            />
                          </View>
                        </>
                      ) : (
                        <>
                          <View style={styles.inc_btn}>
                            <Text style={{ fontSize: 25 }}>{ele.quantity}</Text>

                            <View style={styles.before_btn}>
                              <Text
                                style={{
                                  fontSize: 15,
                                  color: "#EB1741",
                                  fontWeight: "bold",
                                }}
                              >
                                +
                              </Text>
                              <Text
                                style={{
                                  fontSize: 15,
                                  color: "#EB1741",
                                  fontWeight: "bold",
                                }}
                              >
                                -
                              </Text>
                            </View>
                          </View>
                          <View style={styles.body_first}>
                            <Image
                              source={{
                                uri: `${HOST}/${cartProductImage?.url}`,
                              }}
                              style={styles.image}
                            />
                          </View>
                        </>
                      )}
                    </Pressable>

                    <View style={styles.body_second}>
                      <Text style={styles.name} numberOfLines={1}>
                        {ele.name}
                      </Text>
                      <Text>
                        {ele.variant.options_text
                          ? ele.variant.options_text.split(" ")[3] ||
                            ele.variant.options_text.split(" ")[1]
                          : ""}
                      </Text>
                    </View>
                    <View style={styles.body_third}>
                      <Text style={styles.price}>{ele.display_total}</Text>
                    </View>
                    <Text onPress={() => handleRemoveLineItem(ele?.id)}>
                      XX
                    </Text>
                  </View>
                  <Divider orientation="horizontal" />
                </View>
              );
            })}
            <View style={styles.continue}>
              <Text
                style={{ ...styles.continue_shop, ...globalStyles.container }}
                onPress={() => navigation.navigate("ProductsList")}
              >
                FORTSETT Å HANDLE
              </Text>
            </View>
          </View>

          <Divider
            orientation="horizontal"
            height={11}
            width={"100%"}
            color="#E5E5E5"
          />
          <View style={styles.promo}>
            <TouchableOpacity style={styles.promo_btn}>
              <TextInput placeholder="LEGG TIL PROMOKODE"></TextInput>
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
            <Text
              style={[
                styles.continue_shop,
                parseInt(cart.total) < 750
                  ? { color: colors.btnLink }
                  : { color: "green" },
              ]}
            >
              {parseInt(cart.total) < 750
                ? `Du er ${750 - parseInt(cart.total)} kr unna gratis frakt`
                : `Du har gratis frakt 🎉`}
            </Text>
          </View>

          <View></View>
        </ScrollView>

        {cart?.line_items.length === 0 ? (
          <></>
        ) : isOpen ? (
          <></>
        ) : (
          <CartFooter
            title={"TIL BETALING"}
            onPress={isAuth ? handleToCheckout : loginFooterCheckout}
          />
        )}

        {isOpen && (
          <FilterFooter
            value={sheetRef}
            snapPoints={snapPoints}
            onClose={() => setIsOpen(false)}
            bottomSheetContent={bottomSheetContent}
          />
        )}
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
