import { View, Dimensions, ScrollView, SafeAreaView } from "react-native";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { globalStyles } from "../../../styles/global";
import { styles } from "./styles";
import TextField from "../../../library/components/TextField";
import { createAddress, getCountry, retrieveAddress } from "../../../redux";
import { Picker } from "@react-native-community/picker";
import { checkoutStyles } from "../ShopitStack/CheckoutScreens/styles";
import ActionButtonFooter from "../../../library/components/ActionButtonFooter";
import { NavigationContainer } from "@react-navigation/native";
const AddAddress = ({ navigation, dispatch, country, countriesList, cart }) => {
  useEffect(() => {
    setCountryPickerSelectedValue(country.iso);
  }, []);

  // const [statePickerSelectedValue, setStatePickerSelectedValue] = useState(
  //   country.states[0]
  // );
  const [countryPickerSelectedValue, setCountryPickerSelectedValue] = useState(
    country.iso
  );
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [state, setState] = useState("");
  const [windowWidth] = useState(Dimensions.get("window").width);

  const createAddressHandler = async () => {
    await dispatch(
      createAddress({
        address: {
          firstname: name,
          lastname: name,
          address1: address,
          city: city,
          phone: phone,
          zipcode: pinCode,
          state_name: state,
          country_iso: countryPickerSelectedValue,
        },
      })
    );
    navigation.navigate("SavedAddress");
  };

  return (
    <ScrollView>
      <SafeAreaView style={globalStyles.containerFluid}>
        <View
          style={{ ...globalStyles.container, marginTop: 15, marginBottom: 15 }}
        >
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
          <View
            style={[
              checkoutStyles.rowContainer,
              checkoutStyles.inlineContainer,
            ]}
          >
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
            <TextField
              placeholder="State"
              keyboardType="default"
              inputStyle={styles.inputStyle}
              inputContainerStyle={styles.inputContainerStyle}
              value={state}
              onChangeText={(state) => setState(state)}
              containerStyle={[
                styles.containerStyle,
                {
                  paddingTop: 5,
                  width: windowWidth / 2.3,
                },
              ]}
            />
            {/* <Picker
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
                <Picker.Item key={state.id} label={state.name} value={state} />
              ))}
            </Picker> */}
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
        </View>

        <ActionButtonFooter title="Create" onPress={createAddressHandler} />
      </SafeAreaView>
    </ScrollView>
  );
};

const mapStateToProps = (state) => ({
  country: state.checkout.country,
  countriesList: state.checkout.countriesList,
  cart: state.checkout.cart,
});

export default connect(mapStateToProps)(AddAddress);
