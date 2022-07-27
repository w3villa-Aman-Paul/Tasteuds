import * as React from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  Pressable,
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
} from "../../../../../redux";

import { TouchableOpacity } from "react-native-gesture-handler";
import CartFooter from "../../../../../library/components/ActionButtonFooter/cartFooter";
import { useSelector } from "react-redux";
import { HOST } from "../../../../../res/env";
import FilterFooter from "../../../../../library/components/ActionButtonFooter/FilterFooter";
import { colors } from "../../../../../res/palette";

const BagScreen = ({ navigation, dispatch, saving, cart }) => {
  const productsList = useSelector((state) => state.products.productsList);
  const { isAuth } = useSelector((state) => state.auth);
  const [snackbarVisible, setSnackbarVisible] = React.useState(false);
  const sheetRef = React.useRef(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const [showItemCard, setShowItemCard] = React.useState(false);
  const [enableQty, setEnableQty] = React.useState(null);
  const [itemQuantity, setItemQuantity] = React.useState(0);
  const snapPoints = ["50%"];
  const timeoutIdRef = React.useRef();

  React.useEffect(() => {
    dispatch(getCart(cart?.token));
  }, []);

  React.useEffect(() => {
    const timeOutId = timeoutIdRef.current;

    return () => {
      clearTimeout(timeOutId);
    };
  }, []);

  const onDismiss = () => setSnackbarVisible(false);

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
    // if(cart.state === "cart") {
    //   await dispatch(getDefaultCountry())
    //   await dispatch(getCountriesList())
    //   navigation.navigate('ShippingAddress')
    // } else  {
    //   navigation.navigate('CheckoutPayment')
    // }
  };

  const bottomSheetContent = () => {
    return (
      <View style={styles.login_container}>
        <Text style={styles.main_text}>LOGG INN ELLER REGISTRER DEG</Text>
        <View style={styles.login_body}>
          <View style={styles.login_content}>
            <TouchableOpacity style={styles.login_btn}>
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

          <View style={styles.login_content}>
            <TouchableOpacity style={styles.login_btn}>
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

          <View style={styles.login_content}>
            <TouchableOpacity
              style={styles.login_btn}
              onPress={() => navigation.navigate("SignIn")}
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
    setItemQuantity(itemQuantity + 1);
  };
  const handleItemDecrement = () => {
    setItemQuantity(itemQuantity - 1);
  };

  const handleIncrementQuantity = (lineItemId, lineItemQuantity) => {
    const id = setTimeout(() => {
      dispatch(
        setQuantity(
          {
            line_item_id: lineItemId,
            quantity: lineItemQuantity + itemQuantity + 1,
          },
          cart?.token
        )
      );
      setItemQuantity(0);
      setShowItemCard(false);
    }, 2000);
    timeoutIdRef.current = id;
  };

  const handleDecrementQuantity = (lineItemId, lineItemQuantity) => {
    if (lineItemQuantity === 1) {
      handleRemoveLineItem(lineItemId);
    } else {
      const id = setTimeout(() => {
        dispatch(
          setQuantity(
            {
              line_item_id: lineItemId,
              quantity: lineItemQuantity + (itemQuantity - 1),
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
              ...globalStyles.iosShadow,
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
          <View style={globalStyles.containerFluid}>
            {cart?.line_items?.map((ele) => {
              let cartProductImage = handleCartProductImage(ele);
              let cartItemId = ele?.variant?.product?.id;

              return (
                <View key={ele?.variant?.id.toString()}>
                  <View style={styles.body}>
                    <Pressable
                      style={styles.cart_btn}
                      onPress={() => {
                        setShowItemCard(true);
                        findCartProduct(cartItemId);
                        // setItemQuantity(1);
                      }}
                    >
                      {showItemCard && cartItemId === enableQty?.id ? (
                        <>
                          <View style={styles.inc_btn}>
                            <View style={styles.after_Press}>
                              <TouchableOpacity
                                onPress={() => {
                                  handleItemDecrement();
                                  handleChangeQuantityClick();
                                  handleDecrementQuantity(ele.id, ele.quantity);
                                }}
                              >
                                <Text
                                  style={{
                                    fontSize: 20,
                                    color: "#EB1741",
                                    fontWeight: "bold",
                                  }}
                                >
                                  --
                                </Text>
                              </TouchableOpacity>

                              <Text style={{ fontSize: 25 }}>
                                {ele.quantity}
                              </Text>
                              <TouchableOpacity
                                onPress={() => {
                                  handleItemIncrement();
                                  handleChangeQuantityClick();
                                  handleIncrementQuantity(ele.id, ele.quantity);
                                }}
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
                            </View>
                            <View style={styles.after_img}>
                              <Image
                                source={{
                                  uri: `${HOST}/${cartProductImage?.url}`,
                                }}
                                style={styles.image}
                              />
                            </View>
                          </View>
                        </>
                      ) : (
                        <>
                          <View style={styles.inc_btn}>
                            <View style={styles.before_Press}>
                              <Text style={{ fontSize: 25 }}>
                                {ele.quantity}
                              </Text>
                              <View>
                                <View>
                                  <Text
                                    style={{
                                      fontSize: 20,
                                      color: "#EB1741",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    +
                                  </Text>
                                </View>

                                <View>
                                  <Text
                                    style={{
                                      fontSize: 20,
                                      color: "#EB1741",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    --
                                  </Text>
                                </View>
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
                          </View>
                        </>
                      )}
                    </Pressable>

                    <View style={styles.body_second}>
                      <Text style={styles.name}>{ele.name}</Text>
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

        {isOpen ? (
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
