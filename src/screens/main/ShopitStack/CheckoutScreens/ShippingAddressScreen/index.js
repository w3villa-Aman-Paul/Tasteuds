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

import {
  createCart,
  updateCheckout,
  checkoutNext,
  getPaymentMethods,
  completeCheckout,
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

  const { email } = useSelector((state) => state.account.account);

  useEffect(() => {
    dispatch(accountRetrieve());
    dispatch(retrieveAddress());
  }, []);

  const sheetRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const snapPoints = useMemo(() => ["65%", "75%"], []);

  const paymentHandler = () => {
    setIsOpen(true);
  };

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
        enabled
        style={styles.login_container}
      >
        <View>
          <TouchableOpacity
            style={styles.fav_close_container}
            onPress={() => setIsOpen(!isOpen)}
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
  console.log("Address", Address);

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
