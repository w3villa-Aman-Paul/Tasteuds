import * as React from "react";
import { View, StyleSheet,Text } from "react-native";
import { globalStyles } from "../../../styles/global";
import { connect } from "react-redux";
import { Button } from "react-native-elements";
import { styles } from "./styles";

const CartFooter = ({ title, onPress, cart }) => {
  return (
    <View style={styles.cart_total_price}>
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
    </View>
  );
};

const mapStateToProps = (state) => ({
  cart: state.checkout.cart,
});

export default connect(mapStateToProps)(CartFooter);
