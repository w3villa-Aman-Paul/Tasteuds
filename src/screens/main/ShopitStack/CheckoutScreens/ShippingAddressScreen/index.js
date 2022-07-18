import React, { useState, useEffect, useRef } from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import { globalStyles } from "../../../../../styles/global";
import { colors } from "../../../../../res/palette";
import { CheckO, Close } from "../../../../../library/icons";
import { Icon, Overlay } from "react-native-elements";
import { Picker } from "@react-native-community/picker";
import {
  createCart,
  updateCheckout,
  checkoutNext,
  getPaymentMethods,
  completeCheckout,
} from "../../../../../redux/actions/checkoutActions";
import { connect, useSelector } from "react-redux";
import { retrieveAddress } from "../../../../../redux/actions/checkoutActions";
import { styles } from "./styles";
import { checkoutStyles } from "../styles";
import CartFooter from "../../../../../library/components/ActionButtonFooter/cartFooter";
import ActivityIndicatorCard from "../../../../../library/components/ActivityIndicatorCard";
import FilterFooter from "../../../../../library/components/ActionButtonFooter/FilterFooter";
import { accountRetrieve } from "../../../../../redux";

const ShippingAddressScreen = ({
  navigation,
  dispatch,
  saving,
  cart,
  Address,
  route,
  auth,
}) => {
  let newAddress = Address.filter((x) => x.id === route.params?.Id);

  const { email } = useSelector((state) => state.account.account);

  useEffect(() => {
    dispatch(accountRetrieve());
    dispatch(retrieveAddress());
  }, []);

  const sheetRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [cardName, setCardName] = useState(null);
  const [profileId, setProfileId] = useState("tok_visa");
  const [cvv, setCvv] = useState(null);
  const [month, setMonth] = useState(null);
  const [year, setYear] = useState(null);
  const [cartToken, setCartToken] = useState(cart.token);
  const [overlayVisible, setOverlayVisible] = useState(false);

  const snapPoints = ["60%"];

  const paymentHandler = () => {
    setIsOpen(true);
  };

  const handleUpdateCheckout = async () => {
    await dispatch(
      updateCheckout(cart?.token, {
        order: {
          email: email,
          special_instructions: "Please leave at door",
          bill_address_attributes: {
            firstname: !newAddress[0].firstname
              ? Address[0].firstname
              : newAddress[0].firstname,
            lastname: !newAddress[0].lastname
              ? Address[0].lastname
              : newAddress[0].lastname,
            address1: !newAddress[0].address1
              ? Address[0].address1
              : newAddress[0].address1,
            city: !newAddress[0].city ? Address[0].city : newAddress[0].city,
            phone: !newAddress[0].phone
              ? Address[0].phone
              : newAddress[0].phone,
            zipcode: !newAddress[0].zipcode
              ? Address[0].zipcode
              : newAddress[0].zipcode,
            state_name: !newAddress[0].state_name
              ? Address[0].state_name
              : newAddress[0].state_name,
            country_iso: !newAddress[0].country_iso
              ? Address[0].country_iso
              : newAddress[0].country_iso,
          },
          ship_address_attributes: {
            firstname: !newAddress[0].firstname
              ? Address[0].firstname
              : newAddress[0].firstname,
            lastname: !newAddress[0].lastname
              ? Address[0].lastname
              : newAddress[0].lastname,
            address1: !newAddress[0].address1
              ? Address[0].address1
              : newAddress[0].address1,
            city: !newAddress[0].city ? Address[0].city : newAddress[0].city,
            phone: !newAddress[0].phone
              ? Address[0].phone
              : newAddress[0].phone,
            zipcode: !newAddress[0].zipcode
              ? Address[0].zipcode
              : newAddress[0].zipcode,
            state_name: !newAddress[0].state_name
              ? Address[0].state_name
              : newAddress[0].state_name,
            country_iso: !newAddress[0].country_iso
              ? Address[0].country_iso
              : newAddress[0].country_iso,
          },
        },
      })
    );
    // await dispatch(advanceCheckout(cart.token));
    await dispatch(getPaymentMethods(cart?.token));
    await dispatch(checkoutNext(cart.token));
    paymentHandler();
  };

  const toggleOverlay = () => {
    setOverlayVisible(!overlayVisible);
  };

  const handlePaymentConfirmation = async () => {
    await dispatch(
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
    await dispatch(completeCheckout(cart?.token));
    await dispatch(createCart());
    toggleOverlay();
  };

  const bottomSheetContent = () => {
    return (
      <View style={styles.login_container}>
        <View>
          <TouchableOpacity
            style={styles.fav_close_container}
            onPress={() => setIsOpen(false)}
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
        <KeyboardAvoidingView style={{ ...styles.cardContainer, flex: 1 }}>
          <View style={styles.cardContent}>
            <Text style={styles.cardText}>KORTHOLDERS NAVN</Text>
            <TextInput
              style={styles.cardInput}
              value={cardName}
              onChangeText={(val) => setCardName(val)}
            />
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.cardText}>KORTNUMMER</Text>
            <TextInput
              style={styles.cardInput}
              // keyboardType={null}
              value={profileId}
              onChangeText={setProfileId}
            />
          </View>
          <View style={styles.lastInputs}>
            <View style={styles.cardContent}>
              <Text style={styles.cardText}>UTLØPSDATO</Text>
              <View style={{ flexDirection: "row" }}>
                <TextInput
                  style={styles.cardInputDate}
                  // keyboardType={null}
                  value={month}
                  onChangeText={(value) => setMonth(value)}
                />
                <TextInput
                  style={styles.cardInputDate}
                  // keyboardType={null}
                  value={year}
                  onChangeText={(value) => setYear(value)}
                />
              </View>
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.cardText}>CVC</Text>
              <TextInput
                style={{ ...styles.cardInputDate, width: "100%" }}
                // keyboardType={null}
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
        </KeyboardAvoidingView>
      </View>
    );
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
        <Overlay
          isVisible={overlayVisible}
          onBackdropPress={toggleOverlay}
          fullScreen={true}
        >
          <View style={[globalStyles.container, styles.modalContainer]}>
            <View style={styles.modalCloseIcon}>
              <Close
                size={24}
                style={{ color: colors.black }}
                onPress={toggleOverlay}
              />
            </View>
            <View style={{ alignItems: "center" }}>
              <Image
                source={require("../../../../../../assets/images/order-icon-confirm/order-icon-confirm.png")}
              />
              <Text style={globalStyles.title}>Order Success!</Text>
              <Text
                style={[
                  globalStyles.label,
                  { fontSize: 15, textAlign: "center" },
                ]}
              >
                Your order has been placed successfully! for more details check
                your account.{" "}
              </Text>
            </View>
            <View>
              <TouchableOpacity onPress={() => navigation.navigate("Shop")}>
                <Text>Continue Shopping ....</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Overlay>
        <ScrollView>
          {/* Status Bar Starts */}
          <View style={checkoutStyles.statusBarWrapper}>
            <View style={checkoutStyles.statusBarContainer}>
              <View
                style={[checkoutStyles.rowContainer, { alignItems: "center" }]}
              >
                <CheckO
                  size={16}
                  stylcountryPickerSelectedValuee={[
                    checkoutStyles.iconStyle,
                    { color: colors.success },
                  ]}
                />
                <TouchableOpacity onPress={() => navigation.navigate("Bag")}>
                  <Text style={globalStyles.latoRegular}>Bag</Text>
                </TouchableOpacity>
              </View>
              <View
                style={[
                  checkoutStyles.shippingIndicatorLine,
                  {
                    borderBottomColor: colors.success,
                  },
                ]}
              />
              <View
                style={[checkoutStyles.rowContainer, { alignItems: "center" }]}
              >
                <CheckO
                  size={16}
                  style={[checkoutStyles.iconStyle, { color: colors.black }]}
                />
                <TouchableOpacity
                  onPress={() => navigation.navigate("ShippingAddress")}
                >
                  <Text style={globalStyles.latoRegular}>Address</Text>
                </TouchableOpacity>
              </View>
              <View
                style={[
                  checkoutStyles.shippingIndicatorLine,
                  {
                    borderBottomColor: colors.black,
                  },
                ]}
              />
              <View
                style={[checkoutStyles.rowContainer, { alignItems: "center" }]}
              >
                <CheckO
                  size={16}
                  style={[checkoutStyles.iconStyle, { color: colors.black }]}
                />
                <TouchableOpacity
                  onPress={() => navigation.navigate("CheckoutPayment")}
                >
                  <Text style={globalStyles.latoRegular}>Payment</Text>
                </TouchableOpacity>
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
                  onPress={() => navigation.navigate("SavedAddress")}
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
                  <TouchableOpacity style={styles.payment_btn}>
                    <Image
                      source={require("../../../../../../assets/images/Header-Icon/ipay.png")}
                      style={styles.payment_img}
                    />
                  </TouchableOpacity>
                </View>

                <View style={styles.payment_btn_body}>
                  <TouchableOpacity style={styles.payment_btn}>
                    <Image
                      source={require("../../../../../../assets/images/Header-Icon/vpay.png")}
                      style={styles.payment_img}
                    />
                  </TouchableOpacity>
                </View>

                <View style={styles.payment_btn_body}>
                  <TouchableOpacity style={styles.payment_btn}>
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
            onPress={
              Address.length === 0 ? (
                <Text>"Please fill Address"</Text>
              ) : (
                handleUpdateCheckout
              )
            }
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
