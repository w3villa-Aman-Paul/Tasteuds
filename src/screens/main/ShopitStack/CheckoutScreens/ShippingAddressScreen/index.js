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
import ApplePayReactNative from "../../../../components/ApplePay/ApplePayReactNative";
import BottomModal from "../../../../components/BottomModal/BottomModal";

const FormInput = ({ placeholder, ...rest }) => {
  return (
    <BottomSheetTextInput
      {...rest}
      placeholder={placeholder ? placeholder : ""}
    />
  );
};

const ShippingAddressScreen = ({
  navigation,
  dispatch,
  saving,
  cart,
  Address,
  route,
}) => {
  let newAddress = Address.filter((x) => x.id === route.params?.Id);
  const [paymentMethod, setPaymentMethod] = useState();
  const [isModalVisible, setModalVisible] = useState(false);
  const { initPaymentSheet, presentPaymentSheet, confirmPaymentSheetPayment } =
    useStripe();

  const { email } = useSelector((state) => state.account.account);

  useEffect(() => {
    dispatch(getDefaultCountry());
    dispatch(getCountriesList());
    dispatch(accountRetrieve());
    dispatch(retrieveAddress());
  }, []);

  const sheetRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const snapPoints = useMemo(() => ["65%", "75%"], []);

  const hideAddressModal = () => {
    setModalVisible(false);
  };

  const paymentHandler = () => {
    setIsOpen(true);
  };
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

  // *Bottom Sheet content ================================================================= */
  const bottomSheetContent = () => {
    const [cardName, setCardName] = useState(null);
    const [profileId, setProfileId] = useState("tok_visa");
    const [cvv, setCvv] = useState(null);
    const [month, setMonth] = useState(null);
    const [year, setYear] = useState(null);

    const { cart } = useSelector((state) => state.checkout);
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const handlePaymentConfirmation = async () => {
      try {
        try {
          dispatch(
            updateCheckout(cart?.token, {
              order: {
                payments_attributes: [
                  {
                    payment_method_id: 3,
                    source_attributes: {
                      gateway_payment_profile_id: profileId,
                      month: month,
                      year: year,
                      verification_value: cvv,
                      name: cardName,
                    },
                  },
                ],
              },
            })
          );
          dispatch(completeCheckout(cart?.token)).then(() => {
            setIsOpen(false);
            dispatch(createCart());
            navigation.navigate("OrderComplete");
          });
        } catch (error) {
          console.log(error);
        }
      } catch (error) {
        console.log(error);
      }
    };

    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.login_container}
      >
        <View>
          <TouchableOpacity
            style={styles.fav_close_container}
            onPress={() => setIsOpen()}
          >
            <Icon
              type="entypo"
              name="cross"
              size={28}
              style={styles.fav_close}
            />
          </TouchableOpacity>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>REGISTRER KORT</Text>
          </View>
        </View>

        <View style={{ ...styles.cardContainer, flex: 1 }}>
          <View style={styles.cardContent}>
            <Text style={styles.cardText}>KORTHOLDERS NAVN</Text>
            <FormInput
              style={styles.cardInput}
              placeholder="Name"
              value={cardName}
              onChangeText={(val) => setCardName(val)}
            />
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.cardText}>KORTNUMMER</Text>
            <FormInput
              style={styles.cardInput}
              value={profileId}
              onChangeText={(val) => setProfileId(val)}
            />
          </View>
          <View style={styles.lastInputs}>
            <View style={styles.cardContent}>
              <Text style={styles.cardText}>UTLØPSDATO</Text>
              <View style={{ flexDirection: "row" }}>
                <FormInput
                  style={styles.cardInputDate}
                  value={month}
                  onChangeText={(value) => setMonth(value)}
                />
                <FormInput
                  style={styles.cardInputDate}
                  value={year}
                  onChangeText={(value) => setYear(value)}
                />
              </View>
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.cardText}>CVC</Text>
              <FormInput
                style={{ ...styles.cardInputDate, width: "100%" }}
                value={cvv}
                onChangeText={(value) => setCvv(value)}
              />
            </View>
          </View>

          <View style={{ ...styles.cardContent, marginTop: 20 }}>
            <TouchableOpacity
              style={styles.cardBtn}
              onPress={handlePaymentConfirmation}
            >
              <Text style={{ ...styles.cardText, fontFamily: "lato-bold" }}>
                LEGG TIL
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  };
  //* ===========================================================*/

  const handleUpdateCheckout = async () => {
    await dispatch(
      updateCheckout(cart?.token, {
        order: {
          email: email,
          special_instructions: "Please leave at door",
          bill_address_attributes: {
            firstname:
              newAddress.length > 0
                ? newAddress[0].firstname
                : Address[0].firstname,
            lastname:
              newAddress.length > 0
                ? newAddress[0].lastname
                : Address[0].lastname,
            address1:
              newAddress.length > 0
                ? newAddress[0].address1
                : Address[0].address1,
            city: newAddress.length > 0 ? newAddress[0].city : Address[0].city,
            phone:
              newAddress.length > 0 ? newAddress[0].phone : Address[0].phone,
            zipcode:
              newAddress.length > 0
                ? newAddress[0].zipcode
                : Address[0].zipcode,
            state_name:
              newAddress.length > 0
                ? newAddress[0].state_name
                : Address[0].state_name,
            country_iso:
              newAddress.length > 0
                ? newAddress[0].country_iso
                : Address[0].country_iso,
          },
          ship_address_attributes: {
            firstname:
              newAddress.length > 0
                ? newAddress[0].firstname
                : Address[0].firstname,
            lastname:
              newAddress.length > 0
                ? newAddress[0].lastname
                : Address[0].lastname,
            address1:
              newAddress.length > 0
                ? newAddress[0].address1
                : Address[0].address1,
            city: newAddress.length > 0 ? newAddress[0].city : Address[0].city,
            phone:
              newAddress.length > 0 ? newAddress[0].phone : Address[0].phone,
            zipcode:
              newAddress.length > 0
                ? newAddress[0].zipcode
                : Address[0].zipcode,
            state_name:
              newAddress.length > 0
                ? newAddress[0].state_name
                : Address[0].state_name,
            country_iso:
              newAddress.length > 0
                ? newAddress[0].country_iso
                : Address[0].country_iso,
          },
        },
      })
    );
    await dispatch(getPaymentMethods(cart?.token));
    await dispatch(checkoutNext(cart.token));
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
              <Text style={styles.title}>
                {newAddress[0]
                  ? newAddress[0]?.firstname
                  : Address[0]?.firstname}
              </Text>
              <View style={styles.sub_body}>
                <Text style={styles.subtitle}>
                  {newAddress[0]
                    ? newAddress[0]?.address1
                    : Address[0]?.address1}
                </Text>
                <Text style={styles.subtitle}>
                  {newAddress[0] ? newAddress[0]?.zipcode : Address[0]?.zipcode}{" "}
                  {newAddress[0] ? newAddress[0]?.city : Address[0]?.city}
                </Text>
              </View>
              <Text style={styles.profileContact}>
                {newAddress[0] ? newAddress[0]?.phone : Address[0]?.phone}
              </Text>
            </View>
          </View>

          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <View style={styles.payment_container}>
              <Text style={styles.payment_title}>BETALINGSMÅTE</Text>
              <View style={styles.payment_body}>
                <View style={styles.payment_btn_body}>
                  <ApplePay styles={styles.payment_btn} />
                  {/* <ApplePayReactNative /> */}
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
                  <TouchableOpacity
                    style={styles.payment_btn}
                    onPress={() => setIsOpen(true)}
                  >
                    <Image
                      source={require("../../../../../../assets/images/Header-Icon/cardpay.png")}
                      style={styles.payment_img}
                    />
                    <Text style={{ marginLeft: 10, fontSize: 14 }}>
                      KORTBETALING
                    </Text>
                  </TouchableOpacity>
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
  Address: state.checkout.address,
});

export default connect(mapStateToProps)(ShippingAddressScreen);
