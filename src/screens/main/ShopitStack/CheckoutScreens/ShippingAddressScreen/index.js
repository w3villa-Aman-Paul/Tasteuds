import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Platform,
  Alert,
} from "react-native";
import { globalStyles } from "../../../../../styles/global";
import { colors } from "../../../../../res/palette";
import {
  initPaymentSheet,
  presentPaymentSheet,
  confirmPaymentSheetPayment,
} from "@stripe/stripe-react-native";

import {
  createCart,
  updateCheckout,
  getPaymentMethods,
  completeCheckout,
  getOrders,
} from "../../../../../redux/actions/checkoutActions";
import { connect, useDispatch, useSelector } from "react-redux";
import { retrieveAddress } from "../../../../../redux/actions/checkoutActions";
import { styles } from "./styles";
import CartFooter from "../../../../../library/components/ActionButtonFooter/cartFooter";
import ActivityIndicatorCard from "../../../../../library/components/ActivityIndicatorCard";
import { accountRetrieve } from "../../../../../redux";
import { useNavigation } from "@react-navigation/native";
import ApplePay from "../../../../components/ApplePay/ApplePay";
import BottomModal from "../../../../components/BottomModal/BottomModal";
import Payments from "../../../../../library/components/Payments/Payments";
import { HOST } from "../../../../../res/env";
import GooglePay from "../../../../components/GooglePay/GooglePay";


const ShippingAddressScreen = ({ saving, route }) => {
  route.params.setDisabled();
  const [isModalVisible, setModalVisible] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [updateAddress, setUpdateAddress] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    address: "",
    pin: "",
    city: "",
    state_name: "Bergen",
    country_iso: "NO",
  });

  const Account = useSelector((state) => state.account.account);
  const Address = useSelector((state) => state.checkout.address);
  const { token } = useSelector((state) => state.checkout.cart);
  const { isAuth } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(createCart());
    dispatch(accountRetrieve());
    dispatch(retrieveAddress());
    dispatch(getPaymentMethods(cart?.token));
  }, []);

  useEffect(() => {
    if (Address.length > 0) {
      dispatch(
        updateCheckout(cart?.token, {
          order: {
            email: Account?.email,
            special_instructions: "Please leave at door",
            bill_address_attributes: {
              firstname: updateAddress.firstname,
              lastname: updateAddress.lastname,
              address1: updateAddress.address,
              city: updateAddress.city,
              phone: updateAddress.phone,
              zipcode: updateAddress.pin,
              country_iso: updateAddress.country_iso,
            },
            ship_address_attributes: {
              firstname: updateAddress.firstname,
              lastname: updateAddress.lastname,
              address1: updateAddress.address1,
              city: updateAddress.city,
              phone: updateAddress.phone,
              zipcode: updateAddress.pin,
              country_iso: updateAddress.country_iso,
            },
          },
        })
      );
    }
  }, [Address]);

  useEffect(() => {
    if (Address.length > 0) {
      setUpdateAddress({
        firstname: Address[0]?.firstname,
        lastname: Address[0]?.lastname,
        phone: Address[0]?.phone,
        address: Address[0]?.address1,
        pin: Address[0]?.zipcode,
        email: Account?.email,
        city: Address[0]?.city,
        state_name: Address[0]?.state_name,
      });
    }
  }, [Address, Account]);

  const [isOpen, setIsOpen] = useState(false);
  const snapPoints = useMemo(() => ["50%", "75%"], []);

  const { cart } = useSelector((state) => state.checkout);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handlePaymentConfirmation = async () => {
    try {
      try {
        dispatch(completeCheckout(cart?.token)).then(() => {
          setIsOpen(false);
          dispatch(createCart());
          dispatch(getOrders())
          navigation.navigate("OrderComplete");
        });
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const handleUpdateCheckout = () => {
  //   dispatch(
  //     updateCheckout(cart?.token, {
  //       order: {
  //         email: email,
  //         special_instructions: "Please leave at door",
  //         bill_address_attributes: {
  //           firstname: updateAddress.firstname,
  //           lastname: updateAddress.lastname,
  //           address1: updateAddress.address1,
  //           city: updateAddress.city,
  //           phone: updateAddress.phone,
  //           zipcode: updateAddress.pin,
  //           // state_name:
  //           //   newAddress.length > 0
  //           //     ? newAddress[0].state_name
  //           //     : Address[0].state_name,
  //           country_iso: updateAddress.country_iso,
  //         },
  //         ship_address_attributes: {
  //           firstname: updateAddress.firstname,
  //           lastname: updateAddress.lastname,
  //           address1: updateAddress.address1,
  //           city: updateAddress.city,
  //           phone: updateAddress.phone,
  //           zipcode: updateAddress.pin,
  //           // state_name:
  //           //   newAddress.length > 0
  //           //     ? newAddress[0].state_name
  //           //     : Address[0].state_name,
  //           country_iso: updateAddress.country_iso,
  //         },
  //       },
  //     })
  //   );
  //   // dispatch(getPaymentMethods(cart?.token));
  //   dispatch(checkoutNext(cart.token));
  //   paymentHandler();
  // };


  const subscribe = async () => {
    try {
      if (Address.length === 0) {
        return Alert.alert("Please enter the address first.");
      }
      const response = await fetch(
        `${HOST}/api/v2/storefront/checkout/payment_intent`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Spree-Order-Token": `${token}`,
          },
        }
      );

      const data = await response.json();

      if(data.message === 'Success'){
        setDisabled(false);
      }
      console.log("data", data);

      if (!response.ok) return Alert.alert(data.message);

      const { paymentIntent, ephemeralKey, customer, cartToken, intentId } =
        data.data;

      const initsheet = await initPaymentSheet({
        customerId: "cus_MT6T8EFMbytt7Q",
        // customerEphemeralKeySecret: ephemeralKey,
        paymentIntentClientSecret: paymentIntent,
        customFlow: true,
        merchantDisplayName: "Aman Paul",
        allowsDelayedPaymentMethods: true,
        style: "alwaysDark",
        googlePay: {
          merchantCountryCode: "IN",
          testEnv: true, // use test environment
        },
      });

      console.log("init",initsheet);

      if (initsheet.error) {
        console.log(initsheet.error.message);
        return Alert.alert(initsheet.error.message);
      }
      const presentSheet = await presentPaymentSheet({
        clientSecret: paymentIntent,
      });

      if (presentSheet.error) {
        console.log("presentSheet", presentSheet.error.message);
        return Alert.alert(presentSheet.error.message);
      }

      const confirmSheet = await confirmPaymentSheetPayment();

      if (confirmSheet.error) {
        console.log("confirmSheet", confirmSheet.error.message);
        // return Alert.alert(confirmSheet.error.message);
      }

      const paymentStatus = await fetch(
        `${HOST}/api/v2/storefront/checkout/stripe_payment_status`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Spree-Order-Token": `${token}`,
          },
          body: JSON.stringify({
            payment_intent_id: intentId,
            payment_method_id: 3,
          }),
        }
      );

      const res = await paymentStatus.json();

      if (res.message === "Success") {
        Alert.alert("Your payment is sucessfull !, Thank you");
        handlePaymentConfirmation();
      } else {
        console.log("An error occurred. Please try again.");
      }
    } catch (error) {
      Alert.alert("Something went wrong");
    }
  };

  const checkDisablity = () => {
    if(isAuth){
      subscribe();
      setDisabled(true);
    }
  }


  if (saving) {
    return <ActivityIndicatorCard />;
  } else {
    return (
      <View
        style={[
          globalStyles.containerFluid,
          { backgroundColor: colors.white, flex: 1 },
        ]}
      >
        <ScrollView>
          {/* Status Bar Starts */}
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
              <Text style={{ ...styles.fontProgress }}>Handlekurv</Text>
              <Text
                style={{ ...styles.fontProgress, ...styles.fontProgressBold }}
              >
                Betaling
              </Text>
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
          {/* Status Bar Ends */}

          <View style={styles.address_container}>
            <View style={styles.address_body}>
              <View style={styles.address_title}>
                <Text style={styles.address_text}>LEVERINGS INFORMASJON</Text>
                <TouchableOpacity
                  style={styles.address_btn}
                  onPress={() => setModalVisible(true)}
                >
                  <Text style={styles.address_btn_text}>ENDRE</Text>
                </TouchableOpacity>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  flex: 1,
                  justifyContent: "flex-start",
                }}
              >
                <Text style={[styles.title, { marginRight: 5 }]}>
                  {updateAddress.firstname}
                </Text>
                <Text style={styles.title}>{updateAddress.lastname}</Text>
              </View>
              <View style={styles.sub_body}>
                <Text style={styles.subtitle}>{updateAddress.address}</Text>
                <Text style={styles.subtitle}>
                  {updateAddress.pin} {updateAddress.city}
                </Text>
              </View>
              <Text style={styles.profileContact}>{updateAddress.phone}</Text>
            </View>
          </View>

          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <View style={styles.payment_container}>
              <Text style={styles.payment_title}>BETALINGSMÅTE</Text>
              <View style={styles.payment_body}>
                <View style={styles.payment_btn_body}>
                  {Platform.OS === "android" ? (
                    // <GooglePay
                    //   styles={styles.payment_btn}
                    //   address={updateAddress}
                    // />
                    <></>
                  ) : (
                    <ApplePay
                      styles={styles.payment_btn}
                      address={updateAddress}
                      handlePaymentConfirmation={handlePaymentConfirmation}
                    />
                  )}
                </View>

                {/* <View style={styles.payment_btn_body}>
                  <TouchableOpacity style={styles.payment_btn}>
                    <Image
                      source={require("../../../../../../assets/images/Header-Icon/vpay.png")}
                      style={styles.payment_img}
                    />
                  </TouchableOpacity>
                </View> */}

                <View style={styles.payment_btn_body}>
                  <Payments
                    payment_btn={styles.payment_btn}
                    img_style={styles.payment_img}
                    handlePaymentConfirmation={handlePaymentConfirmation}
                    type={"card"}
                  />
                </View>
              </View>
            </View>
          </View>
        </ScrollView>

        {<CartFooter title={"FULLFØR BETALING"} disabled={disabled}  onPress={checkDisablity} />}


        {isModalVisible && (
          <BottomModal
            isModalVisible={isModalVisible}
            setModalVisible={() =>  setModalVisible(false)}
          />
        )}
      </View>
    );
  }
};

const mapStateToProps = (state) => ({
  country: state.checkout.country,
  countriesList: state.checkout.countriesList,
  saving: state.checkout.saving,
  cart: state.checkout.cart,
  auth: state.auth,
});

export default connect(mapStateToProps)(ShippingAddressScreen);
