import * as React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { globalStyles } from "../../../styles/global";
import { connect, useSelector } from "react-redux";
import { Button } from "react-native-elements";
import { styles } from "./styles";

const CartFooter = ({ title, onPress, cart, navigation }) => {
  return (
    <TouchableOpacity style={styles.cart_total_price} onPress={onPress}>
      <View style={styles.cart_footer_body}>
        <Text style={styles.total_text}>TOTALSUM</Text>
        <Text style={styles.total_price}>{cart.display_total}</Text>
      </View>
      <Button
        title={title}
        type="solid"
        buttonStyle={styles.footerAction}
        titleStyle={globalStyles.latoBold16}
        onPress={onPress}
      />
    </TouchableOpacity>
  );
};

const mapStateToProps = (state) => ({
  cart: state.checkout.cart,
});

export default connect(mapStateToProps)(CartFooter);
