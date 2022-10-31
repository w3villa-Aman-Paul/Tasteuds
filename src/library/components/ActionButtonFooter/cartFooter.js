import React, {useState} from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { Button } from "react-native-elements";
import { styles } from "./styles";
import { ActivityIndicator } from "react-native";
import { colors } from "../../../res/palette";

const CartFooter = (props) => {
  const { title, onPress, cart, disabled, setDisabled } = props;
  return (
    <TouchableOpacity style={styles.cart_total_price}>
      <View style={styles.cart_footer_body}>
        <Text style={styles.total_text}>TOTALSUM</Text>
        <Text style={styles.total_price}>{cart.display_total}</Text>
      </View>
        <TouchableOpacity
          style={styles.footerAction}
          onPress={onPress}
        >
          <Text style={styles.btnText}>{disabled ? <ActivityIndicator size="large" color={colors.black} /> : title} </Text>
        </TouchableOpacity>


      {/* ) : (
        <TouchableOpacity style={styles.footerAction}>
          <Payments payment_btn={{ height: "100%" }} />
        </TouchableOpacity>
      )} */}
    </TouchableOpacity>
  );
};

const mapStateToProps = (state) => ({
  cart: state.checkout.cart,
});

export default connect(mapStateToProps)(CartFooter);
