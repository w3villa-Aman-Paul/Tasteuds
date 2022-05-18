import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import { globalStyles } from "../../../../../styles/global";
import { colors } from "../../../../../res/palette";
import { CheckR, CheckO } from "../../../../../library/icons";
import TextField from "../../../../../library/components/TextField";
import { Picker } from "@react-native-community/picker";
import {
  getCountry,
  updateCheckout,
  checkoutNext,
  createAddress,
  getPaymentMethods,
  getOrderToken,
} from "../../../../../redux/actions/checkoutActions";
import { connect, useSelector } from "react-redux";
import { retrieveAddress } from "../../../../../redux/actions/checkoutActions";
import { styles } from "./styles";
import { checkoutStyles } from "../styles";
import CartFooter from "../../../../../library/components/ActionButtonFooter/cartFooter";
import ActivityIndicatorCard from "../../../../../library/components/ActivityIndicatorCard";

const ShippingAddressScreen = ({
  navigation,
  dispatch,
  saving,
  cart,
  Address,
  route,
}) => {
  let newAddress = Address.filter((x) => x.id === route.params?.Id);

  const handleUpdateCheckout = async () => {
    await dispatch(
      updateCheckout(cart.token, {
        order: {
          email: email,
          special_instructions: "Please leave at door",
          bill_address_attributes: {
            firstname: name,
            lastname: name,
            address1: address,
            city: city,
            phone: phone,
            zipcode: pinCode,
            state_name: statePickerSelectedValue.abbr,
            country_iso: countryPickerSelectedValue,
          },
          ship_address_attributes: {
            firstname: name,
            lastname: name,
            address1: address,
            city: city,
            phone: phone,
            zipcode: pinCode,
            state_name: statePickerSelectedValue.abbr,
            country_iso: countryPickerSelectedValue,
          },
        },
      })
    );
    // await dispatch(getPaymentMethods());
    // await dispatch(checkoutNext(cart.token));
    // navigation.navigate("CheckoutPayment");
  };

  useEffect(() => {
    dispatch(retrieveAddress());
  }, []);

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
                +{newAddress[0] ? newAddress[0]?.phone : Address[0]?.phone}
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

        <CartFooter title="FULLFØR BETALING" onPress={handleUpdateCheckout} />
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
