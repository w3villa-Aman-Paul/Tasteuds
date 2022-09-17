import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { globalStyles } from "../../../../../styles/global";
import { colors } from "../../../../../res/palette";
import { CheckO } from "../../../../../library/icons";
import { Icon } from "react-native-elements";
import { initStripe, useStripe } from "@stripe/stripe-react-native";

import {
  createCart,
  updateCheckout,
  checkoutNext,
  getPaymentMethods,
  completeCheckout,
  getDefaultCountry,
  getCountriesList,
} from "../../../../../redux/actions/checkoutActions";
import { connect, useDispatch, useSelector } from "react-redux";
import { retrieveAddress } from "../../../../../redux/actions/checkoutActions";
import { styles } from "./styles";
import { checkoutStyles } from "../styles";
import CartFooter from "../../../../../library/components/ActionButtonFooter/cartFooter";
import ActivityIndicatorCard from "../../../../../library/components/ActivityIndicatorCard";
import FilterFooter from "../../../../../library/components/ActionButtonFooter/FilterFooter";
import { accountRetrieve } from "../../../../../redux";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/native";
import { MethodSelector } from "./MethodSelector";
import ApplePay from "../../../../components/ApplePay/ApplePay";
import BottomModal from "../../../../components/BottomModal/BottomModal";
import Payments from "../../../../../library/components/Payments/Payments";
import GooglePay from "../../../../components/GooglePay/GooglePay";

const FormInput = ({ placeholder, ...rest }) => {
  return (
    <BottomSheetTextInput
      {...rest}
      placeholder={placeholder ? placeholder : ""}
    />
  );
};

const ShippingAddressScreen = ({ saving, route }) => {
  let newAddress = Address?.filter((x) => x.id === route.params?.Id);
  const [paymentMethod, setPaymentMethod] = useState();
  const [paymentVisible, setPaymentVisible] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
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
  const { initPaymentSheet, presentPaymentSheet, confirmPaymentSheetPayment } =
    useStripe();

  const Account = useSelector((state) => state.account.account);
  const Address = useSelector((state) => state.checkout.address);

  useEffect(() => {
    // dispatch(getDefaultCountry());
    // dispatch(getCountriesList());
    dispatch(accountRetrieve());
    dispatch(retrieveAddress());
    dispatch(getPaymentMethods(cart?.token));
  }, []);

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

  const sheetRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const snapPoints = useMemo(() => ["50%", "75%"], []);

  const hideAddressModal = () => {
    setModalVisible(false);
  };

  const paymentHandler = () => {
    setIsOpen(true);
  };

  const { cart } = useSelector((state) => state.checkout);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handlePaymentConfirmation = async ({
    cardName,
    profileId,
    month,
    year,
    last4,
    brand,
  }) => {
    try {
      try {
        dispatch(
          updateCheckout(cart?.token, {
            order: {
              email: Account?.email,
              special_instructions: "Please leave at door",
              bill_address_attributes: {
                firstname: updateAddress.firstname,
                lastname: updateAddress.lastname,
                address1: updateAddress.address1,
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
              payments_attributes: [
                {
                  payment_method_id: 3,
                  source_attributes: {
                    gateway_payment_profile_id: profileId,
                    month: month,
                    year: year,
                    name: cardName,
                    cc_type: brand,
                    last_digits: last4,
                  },
                },
              ],
            },
          })
        ).then(() => {
          dispatch(completeCheckout(cart?.token)).then(() => {
            setIsOpen(false);
            dispatch(createCart());
            navigation.navigate("OrderComplete");
          });
        });
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // *Bottom Sheet content ================================================================= */
  // const bottomSheetContent = () => {

  //   return (
  //     <KeyboardAvoidingView
  //       behavior={Platform.OS === "ios" ? "padding" : "height"}
  //       style={styles.login_container}
  //     >
  //       <View style={{ height: 50 }}>
  //         <TouchableOpacity
  //           style={styles.fav_close_container}
  //           onPress={() => setIsOpen()}
  //         >
  //           <Icon
  //             type="entypo"
  //             name="cross"
  //             size={28}
  //             style={styles.fav_close}
  //           />
  //         </TouchableOpacity>

  //         <View style={styles.headerTextContainer}>
  //           <Text style={styles.headerTitle}>REGISTRER KORT</Text>
  //         </View>
  //       </View>

  //       <View style={{ ...styles.cardContainer, flex: 1 }}>
  //         <View style={styles.cardContent}>
  //           <Text style={styles.cardText}>KORTHOLDERS NAVN</Text>
  //           <FormInput
  //             style={styles.cardInput}
  //             placeholder="Name"
  //             value={cardName}
  //             onChangeText={(val) => setCardName(val)}
  //           />
  //         </View>
  //         <View style={styles.cardContent}>
  //           <Text style={styles.cardText}>KORTNUMMER</Text>
  //           <FormInput
  //             style={styles.cardInput}
  //             value={profileId}
  //             onChangeText={(val) => setProfileId(val)}
  //           />
  //         </View>
  //         <View style={styles.lastInputs}>
  //           <View style={styles.cardContent}>
  //             <Text style={styles.cardText}>UTLØPSDATO</Text>
  //             <View style={{ flexDirection: "row" }}>
  //               <FormInput
  //                 style={styles.cardInputDate}
  //                 value={month}
  //                 onChangeText={(value) => setMonth(value)}
  //                 maxLength={2}
  //                 keyboardType="number"
  //               />
  //               <FormInput
  //                 style={styles.cardInputDate}
  //                 value={year}
  //                 onChangeText={(value) => setYear(value)}
  //                 maxLength={4}
  //                 keyboardType="number"
  //               />
  //             </View>
  //           </View>
  //           <View style={styles.cardContent}>
  //             <Text style={styles.cardText}>CVC</Text>
  //             <FormInput
  //               style={{ ...styles.cardInputDate }}
  //               value={cvv}
  //               maxLength={3}
  //               keyboardType="number"
  //               onChangeText={(value) => setCvv(value)}
  //             />
  //           </View>
  //         </View>

  //         <View style={{ ...styles.cardContent, marginTop: 20 }}>
  //           <TouchableOpacity
  //             style={styles.cardBtn}
  //             // onPress={handlePaymentConfirmation}
  //             onPress={() => navigation.navigate("Payments")}
  //           >
  //             <Text style={{ ...styles.cardText, fontFamily: "lato-bold" }}>
  //               LEGG TIL
  //             </Text>
  //           </TouchableOpacity>
  //         </View>
  //       </View>
  //     </KeyboardAvoidingView>
  //   );
  // };
  //* ===========================================================*/

  const handleUpdateCheckout = () => {
    dispatch(
      updateCheckout(cart?.token, {
        order: {
          email: email,
          special_instructions: "Please leave at door",
          bill_address_attributes: {
            firstname: updateAddress.firstname,
            lastname: updateAddress.lastname,
            address1: updateAddress.address1,
            city: updateAddress.city,
            phone: updateAddress.phone,
            zipcode: updateAddress.pin,
            // state_name:
            //   newAddress.length > 0
            //     ? newAddress[0].state_name
            //     : Address[0].state_name,
            country_iso: updateAddress.country_iso,
          },
          ship_address_attributes: {
            firstname: updateAddress.firstname,
            lastname: updateAddress.lastname,
            address1: updateAddress.address1,
            city: updateAddress.city,
            phone: updateAddress.phone,
            zipcode: updateAddress.pin,
            // state_name:
            //   newAddress.length > 0
            //     ? newAddress[0].state_name
            //     : Address[0].state_name,
            country_iso: updateAddress.country_iso,
          },
        },
      })
    );
    // dispatch(getPaymentMethods(cart?.token));
    dispatch(checkoutNext(cart.token));
    paymentHandler();
  };

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
                  {/* <ApplePay
                    styles={styles.payment_btn}
                    address={updateAddress}
                  /> */}

                  {Platform.OS === "android" ? (
                    <GooglePay
                      styles={styles.payment_btn}
                      address={updateAddress}
                    />
                  ) : (
                    <ApplePay
                      styles={styles.payment_btn}
                      address={updateAddress}
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
                  />
                </View>
              </View>
            </View>
          </View>

          <Text></Text>
        </ScrollView>

        {isOpen ? (
          <></>
        ) : (
          <CartFooter
            title="FULLFØR BETALING"
            onPress={() => {
              Address.length == 0 ? (
                <Text>"Please fill Address"</Text>
              ) : (
                handleUpdateCheckout()
              );
            }}
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

        {paymentVisible && (
          <FilterFooter
            snapPoints={snapPoints}
            onClose={() => setIsOpen(false)}
            bottomSheetContent={Payments}
          />
        )}

        {isModalVisible && (
          <BottomModal
            isModalVisible={isModalVisible}
            setModalVisible={hideAddressModal}
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
