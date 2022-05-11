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
import cartFooter from "../../../../../library/components/ActionButtonFooter/cartFooter";

const ShippingAddressScreen = ({
  navigation,
  dispatch,
  country,
  countriesList,
  saving,
  cart,
  Address,
}) => {
  const [statePickerSelectedValue, setStatePickerSelectedValue] = useState(
    country.states[0]
  );
  const [countryPickerSelectedValue, setCountryPickerSelectedValue] = useState(
    country.iso
  );
  const [name, setName] = useState("Aman Paul");
  const [email, setEmail] = useState("aman.paul@w3villa.com");
  const [address, setAddress] = useState("House no. 24, Blueberry Street");
  const [pinCode, setPinCode] = useState("29387");
  const [city, setCity] = useState("Bahamas");
  const [phone, setPhone] = useState("1234567654");
  const [windowWidth] = useState(Dimensions.get("window").width);

  const add = { ...Address };

  const handleUpdateCheckout = async () => {
    await dispatch(
      createAddress({
        address: {
          firstname: name,
          lastname: name,
          address1: address,
          city: city,
          phone: phone,
          zipcode: pinCode,
          state_name: statePickerSelectedValue.abbr,
          country_iso: countryPickerSelectedValue,
        },
      })
    );
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
    await dispatch(getPaymentMethods());
    await dispatch(checkoutNext(cart.token));
    navigation.navigate("CheckoutPayment");
  };

  useEffect(() => {
    setCountryPickerSelectedValue(country.iso);
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
            {Address ? (
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
                  {add[0].firstname} {add[0].lastname}
                </Text>
                <View style={styles.sub_body}>
                  <Text style={styles.subtitle}>{add[0].address1}</Text>
                  <Text style={styles.subtitle}>
                    {add[0].zipcode} {add[0].city}
                  </Text>
                </View>
                <Text style={styles.profileContact}>+{add[0].phone}</Text>
              </View>
            ) : (
              <TouchableOpacity>
                <Text>Add Address</Text>
              </TouchableOpacity>
            )}
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
          {/* <View style={globalStyles.container}>
            <TextField
              placeholder="Name"
              inputStyle={styles.inputStyle}
              containerStyle={styles.containerStyle}
              inputContainerStyle={styles.inputContainerStyle}
              value={name}
              onChangeText={(name) => setName(name)}
            />
            

            <TextField
              placeholder="Email"
              inputStyle={styles.inputStyle}
              containerStyle={styles.containerStyle}
              inputContainerStyle={styles.inputContainerStyle}
              value={email}
              onChangeText={(email) => setEmail(email)}
            />
            <TextField
              placeholder="Phone No."
              inputStyle={styles.inputStyle}
              containerStyle={styles.containerStyle}
              inputContainerStyle={styles.inputContainerStyle}
              value={phone}
              onChangeText={(phone) => setPhone(phone)}
            />
            <TextField
              placeholder="Pin Code"
              inputStyle={styles.inputStyle}
              containerStyle={styles.containerStyle}
              inputContainerStyle={styles.inputContainerStyle}
              value={pinCode}
              onChangeText={(pinCode) => setPinCode(pinCode)}
            />
            <TextField
              placeholder="Address ( House No, Street, Area )"
              inputStyle={styles.inputStyle}
              containerStyle={styles.containerStyle}
              inputContainerStyle={styles.inputContainerStyle}
              value={address}
              onChangeText={(address) => setAddress(address)}
            />
            <View style={[checkoutStyles.rowContainer, styles.inlineContainer]}>
              <TextField
                placeholder="City"
                keyboardType="default"
                inputStyle={styles.inputStyle}
                inputContainerStyle={styles.inputContainerStyle}
                value={city}
                onChangeText={(city) => setCity(city)}
                containerStyle={[
                  styles.containerStyle,
                  {
                    paddingTop: 5,
                    width: windowWidth / 2.3,
                  },
                ]}
              />
              <Picker
                mode="dialog"
                selectedValue={statePickerSelectedValue}
                style={[
                  styles.containerStyle,
                  styles.inputStyle,
                  {
                    paddingTop: 5,
                    width: windowWidth / 2.3,
                  },
                ]}
                itemStyle={styles.inputStyle}
                onValueChange={(itemValue, itemIndex) =>
                  setStatePickerSelectedValue(itemValue)
                }
              >
                {country.states.map((state) => (
                  <Picker.Item
                    key={state.id}
                    label={state.name}
                    value={state}
                  />
                ))}
              </Picker>
            </View>
            <Picker
              mode="dialog"
              selectedValue={countryPickerSelectedValue}
              style={styles.containerStyle}
              itemStyle={styles.inputStyle}
              onValueChange={(itemValue, itemIndex) => {
                setCountryPickerSelectedValue(itemValue);
                dispatch(getCountry(itemValue));
              }}
            >
              {countriesList.map((country) => (
                <Picker.Item
                  key={country.id}
                  label={country.name}
                  value={country.iso}
                />
              ))}
            </Picker>
            <View style={[checkoutStyles.rowContainer, globalStyles.mt24]}>
              <CheckR size={16} style={styles.iconStyle} />
              <Text style={globalStyles.latoRegular14}>Default Address</Text>
            </View>
          </View> */}

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
