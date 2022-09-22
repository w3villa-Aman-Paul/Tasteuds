import * as React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { globalStyles } from "../../../styles/global";
import { connect, useSelector } from "react-redux";
import { Button } from "react-native-elements";
import { styles } from "./styles";
import { useRoute } from "@react-navigation/native";
import Payments from "../Payments/Payments";

const CartFooter = ({ title, onPress, cart, navigation, payment_btn }) => {
  const route = useRoute();
  console.log(route.name);
  return (
    <TouchableOpacity style={styles.cart_total_price}>
      <View style={styles.cart_footer_body}>
        <Text style={styles.total_text}>TOTALSUM</Text>
        <Text style={styles.total_price}>{cart.display_total}</Text>
      </View>

      {route.name === "Bag" ? (
        <Button
          title={title}
          type="solid"
          buttonStyle={styles.footerAction}
          titleStyle={globalStyles.latoBold16}
          onPress={onPress}
        />
      ) : (
        <TouchableOpacity style={styles.footerAction}>
          <Payments payment_btn={{ height: "100%" }} />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

const mapStateToProps = (state) => ({
  cart: state.checkout.cart,
});

export default connect(mapStateToProps)(CartFooter);
