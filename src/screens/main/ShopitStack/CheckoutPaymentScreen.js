import * as React from 'react'
import { ScrollView, View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native'
import { Divider, Input, Button, Overlay } from 'react-native-elements'
import { globalStyles } from '../../../styles/global'
import { List } from 'react-native-paper'
import { colors } from '../../../res/palette'
import Collapsible from 'react-native-collapsible'
import { CheckR, Close, Dollar, CreditCard, ChevronDown, ChevronUp } from '../../../library/icons'

const CheckoutPaymentScreen = ({ navigation }) => {
  
  const [expanded, setExpanded] = React.useState(false);
  const toggleExpanded = () => setExpanded(!expanded);

  const [accordionExpanded2, setAccordionExpanded2] = React.useState(false);
  const toggleAccordionExpanded2 = () => setAccordionExpanded2(!accordionExpanded2);

  const [cardNumberInputBorder, setCardNumberInputBorder] = React.useState(false)
  const [cardNameInputBorder, setCardNameInputBorder] = React.useState(false)

  const [overlayVisible, setOverlayVisible] = React.useState(false);

  const toggleOverlay = () => {
    setOverlayVisible(!overlayVisible);
  };

  return (
    <View style={ globalStyles.containerFluid }>
      <ScrollView>
        <View style={[globalStyles.containerFluid, globalStyles.bgWhite, globalStyles.mt16]}>
          <View style={[ globalStyles.container, globalStyles.mt8 ]}>
            <Text style={globalStyles.subhead}>Payment Type</Text>
          </View>
          <Divider style={styles.dividerStyle} />

          {/*Code for Single Collapsible Start*/}
          <TouchableOpacity style={globalStyles.container} onPress={toggleExpanded}>
            <View style={styles.accordionSelectorContainer} onPress={toggleExpanded}>
              <Dollar size={16} style={{color: colors.black}} />
              <Text style={styles.accordionSelectorTitle}>Pay on Delivery</Text>
              {
                expanded
                ? <ChevronDown size={16} style={{color: colors.black}} />
                : <ChevronUp size={16} style={{color: colors.black}} />
              }
            </View>
          </TouchableOpacity>
          {/*Content of Single Collapsible*/}
          <Collapsible collapsed={expanded} align="center">
            <View style={styles.content}>
              <Text style={{ textAlign: 'center' }}>
                This is a dummy text of Single Collapsible View
              </Text>
            </View>
          </Collapsible>
          {/*Code for Single Collapsible Ends*/}

          {/*Code for Single Collapsible Start*/}
          <TouchableOpacity style={globalStyles.container} onPress={toggleAccordionExpanded2}>
            <View style={styles.accordionSelectorContainer}>
              <Dollar size={16} style={{color: colors.black}} />
              <Text style={styles.accordionSelectorTitle}>Credit/Debit Card</Text>
              {
                accordionExpanded2
                ? <ChevronDown size={16} style={{color: colors.black}} />
                : <ChevronUp size={16} style={{color: colors.black}} />
              }
            </View>
          </TouchableOpacity>
          {/*Content of Single Collapsible*/}
          <Collapsible collapsed={accordionExpanded2} align="center" style={globalStyles.container}>
            <Input
              placeholder="Card Number" 
              keyboardType="default"
              onFocus={() => setCardNumberInputBorder(true)}
              onBlur={() => setCardNumberInputBorder(false)}
              containerStyle={[ styles.containerStyle, {
                borderColor: cardNumberInputBorder ? colors.primary : '#ccc',
                borderWidth: 1
              }]}
              inputStyle={globalStyles.latoRegular}
              inputContainerStyle={{ borderBottomColor: '#fff'}}
              rightIcon={() => <CreditCard size={18} style={{color: colors.black}} />}
            />
            <Input
              placeholder="Name on Card" 
              keyboardType="default"
              onFocus={() => setCardNameInputBorder(true)}
              onBlur={() => setCardNameInputBorder(false)}
              containerStyle={[styles.containerStyle, {
                borderColor: cardNameInputBorder ? colors.primary : '#ccc',
                borderWidth: 1
              }]}
              inputStyle={[globalStyles.latoRegular, { marginTop: 5 }]}
              inputContainerStyle={{ borderBottomColor: '#fff'}}
            />
            <View style={[styles.rowContainer, styles.inlineContainer]}> 
              <Input
                placeholder="Valid Thru (MM/YY)" 
                keyboardType="default"
                containerStyle={[styles.containerStyle, styles.w48]}
                inputStyle={styles.inputStyle}
                inputContainerStyle={styles.inputContainerStyle}
              />
              <Input
                placeholder="Valid Thru (MM/YY)" 
                keyboardType="default"
                containerStyle={[styles.containerStyle, styles.w48]}
                inputStyle={styles.inputStyle}
                inputContainerStyle={styles.inputContainerStyle}
              />
            </View>
          </Collapsible>
          {/*Code for Single Collapsible Ends*/}

          {/* <View style={globalStyles.container}>
            <List.AccordionGroup>
              <List.Accordion title="Pay on Delivery" id="1"
                titleStyle={globalStyles.latoRegular}
                left={props => <Dollar size={16} style={{color: colors.black}} />}
              >
                <List.Item title="Item 1" />
              </List.Accordion>
                <List.Accordion title="Credit/Debit Card" id="2"
                  titleStyle={globalStyles.latoRegular}
                  left={() => <View><CreditCard size={16} style={{color: colors.black}} /></View>}
                >
                  <List.Item title="Item 2" />
                  <View>
                    <Text>Text</Text>
                  </View>
                </List.Accordion>
            </List.AccordionGroup>
          </View> */}
        </View>

        <View style={styles.orderTotalContainer}>
          <View style={[ globalStyles.container, globalStyles.mt8 ]}>
            <Text style={[ styles.titleMedium]}>Order Total</Text>
          </View>
          <Divider style={styles.dividerStyle} />
          <View style={[ globalStyles.container, globalStyles.mt8 ]}>
            <View style={[ styles.orderDetailsRow, globalStyles.mt8 ]}>
              <Text style={[ globalStyles.label, styles.productDetailsText]}>Subtotal</Text>
              <Text style={[ globalStyles.label, styles.productDetailsText]}>$50.00</Text>
            </View>
            <View style={[ styles.orderDetailsRow, globalStyles.mt8 ]}>
              <Text style={[ globalStyles.label, styles.productDetailsText]}>Promo Discount</Text>
              <Text style={[ globalStyles.label, styles.productDetailsText]}>-$3.40</Text>
            </View>
            <View style={[ styles.orderDetailsRow, globalStyles.mt8 ]}>
              <Text style={[ globalStyles.label, styles.productDetailsText]}>Estimated Tax</Text>
              <Text style={[ globalStyles.label, styles.productDetailsText]}>$2.40</Text>
            </View>
            <View style={[ styles.orderDetailsRow, globalStyles.mt8 ]}>
              <Text style={[ globalStyles.label, styles.productDetailsText]}>Shipping Fee</Text>
              <Text style={[ globalStyles.label, styles.productDetailsText]}>$0.00</Text>
            </View>
          </View>
        </View>

      </ScrollView>
      <View style={styles.footer}>
        <Button
          title="Payment & Confirm"
          type="solid"
          titleStyle={globalStyles.latoRegular, globalStyles.display3}
          // containerStyle={{flex: 1}}
          buttonStyle={[ globalStyles.btn, globalStyles.primary, styles.btnFixed ]}
          onPress={toggleOverlay}
        />
        <Overlay isVisible={overlayVisible} onBackdropPress={toggleOverlay} fullScreen={true}>
          <View style={[globalStyles.container, styles.modalContainer]}>
            <View style={styles.modalCloseIcon}>
              <Close size={24}  style={{color: colors.black}} onPress={toggleOverlay} />
            </View>
            <View style={{ alignItems: 'center' }}>
              <Image source={require('../../../../assets/images/order-icon-confirm/order-icon-confirm.png')} />
              <Text style={globalStyles.title}>Order Success!</Text>
              <Text style={[globalStyles.label, { fontSize: 15, textAlign: 'center'}]}>Your order has been placed successfully! for more details check your account. </Text>
            </View>
            <View>
              <Button
                title="Continue Shopping"
                type="outline"
                buttonStyle={[ globalStyles.btn, styles.btnOutlined]}
                titleStyle={styles.titleStyle}
                onPress={() => navigation.navigate('Shopit')}
              />
            </View>
          </View>
        </Overlay>
      </View>
    </View>
  )
}

export default CheckoutPaymentScreen

const styles = StyleSheet.create({
  inputStyle: { 
    ...globalStyles.latoRegular,
    fontSize: 14, color: colors.gray
  },
  inputContainerStyle: {
    paddingTop: 5,
    paddingLeft: 5,
    borderBottomColor: '#fff'
  },
  containerStyle: {
    ...globalStyles.mt16,
    backgroundColor: '#fff', 
    height: 52, 
    borderRadius: 4,
  },
  rowContainer: {
    flexDirection: 'row',
  },
  w48: {
    width: '48%',
  },
  inlineContainer: {
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    width: '100%',
    // borderWidth: 2
  },
  iconStyle: {
    color: colors.primary,
  },
  label: {
    ...globalStyles.descriptionText,
    color: colors.black
  },
  btnFixed: {
    margin: '2%',
    height: 48,
  },
  footer: {
    backgroundColor: colors.white,
    // borderWidth: 1
  },
  dividerStyle: {
    ...globalStyles.mt8,
    backgroundColor: '#f5f5f5'
  },
  orderTotalContainer: {
    ...globalStyles.containerFluid,
    ...globalStyles.bgWhite,
    ...globalStyles.mt16,
    paddingBottom: 32
  },
  orderDetailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // borderWidth: 1
  },
  titleMedium: {
    ...globalStyles.descriptiveItem,
    ...globalStyles.textDark,
  },
  modalCloseIcon: {
    alignSelf: 'flex-end'
  },
  btnOutlined: {
    backgroundColor: colors.white,
    borderWidth: 1,
    height: 48
  },
  titleStyle: {
    fontFamily: 'lato-bold',
    color: colors.primary,
    fontSize: 18,
  },
  modalContainer: {
    justifyContent: 'space-between',
    paddingVertical: '4%'
  },
  accordionSelectorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16
  },
  accordionSelectorTitle: {
    // borderWidth: 1,
    ...globalStyles.latoRegular,
    flex: 1,
    marginLeft: 8 
  },
  outlinedInputContainer: {
    borderWidth: 1,
  },
})