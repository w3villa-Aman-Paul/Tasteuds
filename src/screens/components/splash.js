import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import {
  getMenus,
  getVendorsList,
  getWeeklyProducer,
} from "../../redux";
import { connect } from "react-redux";
import { useSelector } from "react-redux";

const splash = ({ navigation, dispatch }) => {
  const vendorList = useSelector((state) => state.taxons.vendors);
  const { mostBoughtGoods, menus } = useSelector((state) => state.taxons);
  const weeklyProducer = useSelector((state) => state.taxons.weeklyProducer);

  useEffect(() => {
    let load = false;

    if (!load) {
      setTimeout(() => {
          navigation.replace("Shopit");
      }, 1000);
    }
    return () => {
      load = true;
    };
  }, []);


  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <Image
          style={styles.image}
          source={require("../../../assets/images/Header-Icon/banner-logo.png")}
        />
      </View>
    </View>
  );
};

export default connect()(splash);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  image: {
    height: 200,
    width: 180,
    resizeMode: "contain",
  },
});
