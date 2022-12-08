import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  Pressable,
  Platform,
} from "react-native";
import { globalStyles } from "../../../../../styles/global";
import { styles } from "./styles";
import { connect } from "react-redux";
import { Divider, Icon } from "react-native-elements";
import { Snackbar } from "react-native-paper";
import {
  getCart,
  removeLineItem,
  setQuantity,
  getProduct,
} from "../../../../../redux";

import { TouchableOpacity } from "react-native-gesture-handler";
import CartFooter from "../../../../../library/components/ActionButtonFooter/cartFooter";
import { useSelector } from "react-redux";
import {
  HOST,
} from "../../../../../res/env";
import FilterFooter from "../../../../../library/components/ActionButtonFooter/FilterFooter";
import { colors } from "../../../../../res/palette";
import * as WebBrowser from "expo-web-browser";
import UpperNotification from "../../../../components/DelieveryNotifyComponent/UpperNotification";
import BottomLoginModal from "../../../../components/BottomModal/BottomLoginModal";

WebBrowser.maybeCompleteAuthSession();

const BagScreen = ({ navigation, dispatch, cart }) => {
  const productsList = useSelector((state) => state.products.productsList);
  const { isAuth } = useSelector((state) => state.auth);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const sheetRef = React.useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const onDismiss = () => setSnackbarVisible(false);
  const [showItemCard, setShowItemCard] = useState(false);
  const [enableQty, setEnableQty] = useState(null);
  const [itemQuantity, setItemQuantity] = useState(0);
  const [inc, setInc] = useState(false);


  const snapPoints = Platform.OS === "ios" ? ["40%"] : ["50%"];


  const timeoutIdRef = useRef();

  useEffect(() => {
    if (isAuth) {
      setIsOpen(false);
    }
  }, [isAuth]);

  useEffect(() => {
    const timeOutId = timeoutIdRef.current;

    return () => {
      clearTimeout(timeOutId);
    };
  }, []);

  useEffect(() => {
    dispatch(getCart(cart?.token));
  }, []);


  const handleCartProductImage = (cartPro) => {
    const product = productsList?.find(
      (element) => cartPro?.variant?.product?.id === element.id
    );
    return product?.images[0].styles[1];
  };


  const bottomSheetContent = () => {
    setDisabled(false);
    return <BottomLoginModal hideLoginModal={() => setIsOpen(false)} />;
  };


  const closeIncBar = () => {
    const id = setTimeout(() => setShowItemCard(false), 4000);
    timeoutIdRef.current = id;
  };

  const handleRemoveLineItem = (lineItemId) => {
    dispatch(removeLineItem(lineItemId, {}, cart?.token));
  };

  const findCartProduct = (itemID) => {
    const newItem = productsList.find((ele) => ele.id == itemID);
    setEnableQty(newItem?.id);
    //console.log(newItem);
  };

  const handleChangeQuantityClick = () => {
    clearTimeout(timeoutIdRef.current);
  };

  const handleItemIncrement = () => {
    setInc(true);
    setItemQuantity(itemQuantity + 1);
  };
  const handleItemDecrement = (lineItemQuantity) => {
    if (2 + itemQuantity > lineItemQuantity) {
      setShowItemCard(false);
    } else {
      setInc(false);
      setItemQuantity(itemQuantity + 1);
    }
  };

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
        setItemQuantity(0);
        setShowItemCard(false);
      }, 2000);
      timeoutIdRef.current = id;
    }
  };

  const checkDisablity = () => {
    if (isAuth) {
      navigation.navigate("ShippingAddress", { setDisabled: () => setDisabled(false) });
      setDisabled(true);
    }
    else {
      setIsOpen(true);
      setDisabled(true);
    }
  }

  return (
    <>
      <View style={globalStyles.containerFluid}>
        <View
          style={[
            styles.detailHeader,
            Platform.OS === "android" ? { marginTop: 30 } : { marginTop: 0 },
          ]}
        >
          <TouchableOpacity
            style={[styles.detailHeaderContainer, globalStyles.iosShadow]}
            onPress={() => navigation.navigate("Shop")}
          >
            <Icon
              name="cross"
              type="entypo"
              size={24}
              style={{ color: colors.black }}
            />
          </TouchableOpacity>

          <Text style={styles.detailHeaderText} numberOfLines={1}>
          HANDLEKURV
          </Text>
        </View>
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

          <View style={{ marginHorizontal: 10 }}>
            <UpperNotification />
          </View>

          <View style={globalStyles.containerFluid}>
            {cart?.line_items?.map((ele) => {
              let cartProductImage = handleCartProductImage(ele);
              let cartItemId = ele?.variant?.product?.id;
              //console.log(cartItemId);

              let cartProduct = cart?.line_items?.find(
                (ele) => ele?.variant?.product?.id == enableQty
              );

              return (
                <View key={cartItemId}>
                  <View style={styles.body}>
                    <View style={styles.body_second}>
                      <>
                        <TouchableOpacity
                          style={styles.body_first}
                          // onPress={() => {
                          //   dispatch(getProduct(enableQty?.id));
                          //   navigation.navigate("ProductDetail");
                          // }}
                        >
                          <Image
                            source={{
                              uri: `${HOST}/${cartProductImage?.url}`,
                            }}
                            style={styles.image}
                          />
                        </TouchableOpacity>
                        <View
                          style={{
                            display: "flex",
                            flex: 1,
                            marginLeft: 10,
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
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
                      </>
                    </View>
                    <View style={styles.body_third}>
                      <Text style={styles.price}>{ele.display_total}</Text>
                    </View>

                    <View style={styles.cart_btn}>
                      {showItemCard && cartItemId === enableQty ? (
                        <View style={styles.after_Press}>
                          <TouchableOpacity
                            onPress={() => {
                              handleChangeQuantityClick();
                              handleItemDecrement(cartProduct?.quantity);
                              handleDecrementQuantity(
                                cartProduct?.id,
                                cartProduct.quantity
                              );
                            }}
                          >
                            <Icon
                              type="ant-design"
                              name="minus"
                              size={22}
                              color={colors.btnLink}
                            />
                          </TouchableOpacity>

                          <Text style={{ fontSize: 25 }}>
                            {inc
                              ? cartProduct?.quantity + itemQuantity
                              : cartProduct?.quantity - itemQuantity}
                          </Text>
                          <TouchableOpacity
                            onPress={() => {
                              handleChangeQuantityClick();
                              handleItemIncrement();
                              handleIncrementQuantity(
                                cartProduct.id,
                                cartProduct.quantity
                              );
                            }}
                          >
                            <Icon
                              type="ant-design"
                              name="plus"
                              size={22}
                              color={colors.btnLink}
                            />
                          </TouchableOpacity>
                        </View>
                      ) : (
                        <Pressable
                          style={{
                            height: "100%",
                            width: "100%",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                          onPress={() => {
                            setShowItemCard((prev) => !prev);
                            findCartProduct(cartItemId);
                            closeIncBar();
                          }}
                        >
                          <View style={styles.inc_btn}>
                            <Text style={{ fontSize: 23 }}>{ele.quantity}</Text>

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
                                  fontSize: 18,
                                  color: "#EB1741",
                                  fontWeight: "bold",
                                }}
                              >
                                -
                              </Text>
                            </View>
                          </View>
                        </Pressable>
                      )}
                    </View>
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

        {isOpen ? (
          <></>
        ) : (
          <CartFooter
            title={"TIL BETALING"}
            onPress={checkDisablity}
            disabled={disabled}
            setDisabled={() => setDisabled(false)}
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
