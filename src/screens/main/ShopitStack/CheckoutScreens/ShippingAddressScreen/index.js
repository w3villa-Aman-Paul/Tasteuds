import React, { useState, useEffect } from 'react'
import { ScrollView, View, Text, Dimensions, TouchableOpacity } from 'react-native'
import { globalStyles } from '../../../../../styles/global'
import { colors } from '../../../../../res/palette'
import { CheckR, CheckO } from '../../../../../library/icons'
import TextField from '../../../../../library/components/TextField'
import { Picker } from '@react-native-community/picker'
import { getCountry, updateCheckout, checkoutNext, createAddress, getPaymentMethods, getOrderToken } from '../../../../../redux/actions/checkoutActions'
import { connect } from 'react-redux'
import { styles } from './styles'
import { checkoutStyles } from '../styles'
import CheckoutDetailsCard from '../../../../../library/components/CheckoutDetailsCard'
import ActionButtonFooter from '../../../../../library/components/ActionButtonFooter'
import ActivityIndicatorCard from '../../../../../library/components/ActivityIndicatorCard'

const ShippingAddressScreen = ({ navigation, dispatch, country, countriesList, saving, cart, auth }) => {
  console.log('OrderToken', cart.token)
  const [statePickerSelectedValue, setStatePickerSelectedValue] = useState(country.states[0])
  const [countryPickerSelectedValue, setCountryPickerSelectedValue] = useState(country.iso)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [address, setAddress] = useState("")
  const [pinCode, setPinCode] = useState("")
  const [city, setCity] = useState("")
  const [phone, setPhone] = useState("")

  const [windowWidth] = useState(Dimensions.get('window').width)

  const handleUpdateCheckout = async () => {
    await dispatch(createAddress({
      address: {
        firstname: name,
        lastname: name,
        address1: address,
        city: city,
        phone: phone,
        zipcode: pinCode,
        state_name: statePickerSelectedValue.abbr,
        country_iso: countryPickerSelectedValue
      }
    }))
    await dispatch(
      updateCheckout(cart.token,
        {
          order: {
            email: email,
            special_instructions: 'Please leave at door',
            bill_address_attributes: {
              firstname: name,
              lastname: name,
              address1: address,
              city: city,
              phone: phone,
              zipcode: pinCode,
              state_name: statePickerSelectedValue.abbr,
              country_iso: countryPickerSelectedValue
            },
            ship_address_attributes: {
              firstname: name,
              lastname: name,
              address1: address,
              city: city,
              phone: phone,
              zipcode: pinCode,
              state_name: statePickerSelectedValue.abbr,
              country_iso: countryPickerSelectedValue
            }
          }
        }
      )
    )
    await dispatch(getPaymentMethods())
    await dispatch(checkoutNext(cart.token))
    navigation.navigate('CheckoutPayment')
  }


  useEffect(() => {
    setCountryPickerSelectedValue(country.iso)
  }, [])

  if (saving) {
    return (
      <ActivityIndicatorCard />
    )
  } else {
    return (
      <View style={globalStyles.containerFluid}>
        <ScrollView>
          {/* Status Bar Starts */}
          <View style={checkoutStyles.statusBarWrapper}>
            <View style={checkoutStyles.statusBarContainer}>
              <View style={[checkoutStyles.rowContainer, { alignItems: 'center' }]}>
                <CheckO size={16} stylcountryPickerSelectedValuee={[checkoutStyles.iconStyle, { color: colors.success }]} />
                <TouchableOpacity onPress={() => navigation.navigate('Bag')}>
                  <Text style={globalStyles.latoRegular}>Bag</Text>
                </TouchableOpacity>
              </View>
              <View
                style={[checkoutStyles.shippingIndicatorLine, {
                  borderBottomColor: colors.success,
                }]}
              />
              <View style={[checkoutStyles.rowContainer, { alignItems: 'center' }]}>
                <CheckO size={16} style={[checkoutStyles.iconStyle, { color: colors.black }]} />
                <TouchableOpacity onPress={() => navigation.navigate('ShippingAddress')}>
                  <Text style={globalStyles.latoRegular}>Address</Text>
                </TouchableOpacity>
              </View>
              <View
                style={[checkoutStyles.shippingIndicatorLine, {
                  borderBottomColor: colors.black,
                }]}
              />
              <View style={[checkoutStyles.rowContainer, { alignItems: 'center' }]}>
                <CheckO size={16} style={[checkoutStyles.iconStyle, { color: colors.black }]} />
                <TouchableOpacity onPress={() => navigation.navigate('CheckoutPayment')}>
                  <Text style={globalStyles.latoRegular}>Payment</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          {/* Status Bar Ends */}

          <View style={globalStyles.container}>
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
                containerStyle={[styles.containerStyle, {
                  paddingTop: 5,
                  width: windowWidth / 2.3
                }]}
              />
              <Picker
                mode="dialog"
                selectedValue={statePickerSelectedValue}
                style={[styles.containerStyle, styles.inputStyle, {
                  paddingTop: 5,
                  width: windowWidth / 2.3
                }]}
                itemStyle={styles.inputStyle}
                onValueChange={(itemValue, itemIndex) =>
                  setStatePickerSelectedValue(itemValue)
                }
              >
                {
                  country.states.map(state =>
                    <Picker.Item key={state.id} label={state.name} value={state} />
                  )
                }
              </Picker>
            </View>
            <Picker
              mode="dialog"
              selectedValue={countryPickerSelectedValue}
              style={styles.containerStyle}
              itemStyle={styles.inputStyle}
              onValueChange={(itemValue, itemIndex) => {
                setCountryPickerSelectedValue(itemValue)
                dispatch(getCountry(itemValue))
              }}
            >
              {
                countriesList.map(country =>
                  <Picker.Item key={country.id} label={country.name} value={country.iso} />
                )
              }
            </Picker>
            <View style={[checkoutStyles.rowContainer, globalStyles.mt24]}>
              <CheckR size={16} style={styles.iconStyle} />
              <Text style={globalStyles.latoRegular14}>Default Address</Text>
            </View>
          </View>

          <CheckoutDetailsCard title="Order Total" display_total={cart.display_item_total} />
        </ScrollView>

        <ActionButtonFooter
          title="Save Address & Continue"
          onPress={handleUpdateCheckout}
        />
      </View>
    )
  }
}

const mapStateToProps = state => ({
  country: state.checkout.country,
  countriesList: state.checkout.countriesList,
  saving: state.checkout.saving,
  cart: state.checkout.cart,
  auth: state.auth,
})

export default connect(mapStateToProps)(ShippingAddressScreen)