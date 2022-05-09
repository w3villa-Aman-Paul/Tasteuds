import * as React from "react";
import { View, StyleSheet, Text } from "react-native";
import { globalStyles } from "../../../styles/global";
import { connect, useSelector } from "react-redux";
import { Button } from "react-native-elements";
import { styles } from "./styles";
import { createStackNavigator } from "@react-navigation/stack";

const socialStack = createStackNavigator();

const CartFooter = ({ title, onPress, cart, navigation }) => {
  // const [login, setLogin] = React.useState(true);
  // const auth = useSelector((state) => state.auth.isAuth);

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
        // onPress={auth ? onPress : setLogin(false)}
      />
    </View>
  );
};

const mapStateToProps = (state) => ({
  cart: state.checkout.cart,
});

export default connect(mapStateToProps)(CartFooter);
