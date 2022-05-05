import React, { useState } from "react";
import { View, ScrollView, Text, Image, TouchableOpacity } from "react-native";
import { globalStyles } from "../../../../styles/global";
import { colors } from "../../../../res/palette";
import { Avatar, Button, Divider, Icon } from "react-native-elements";
import { Snackbar } from "react-native-paper";
import ActivityIndicatorCard from "../../../../library/components/ActivityIndicatorCard";
import {
  addItem,
  createCartToken,
  getCart,
  setProductFavourite,
} from "../../../../redux";
import { connect } from "react-redux";
import { styles } from "./styles";
import { capitalizeFirstLetter } from "../../../../res/helperFunctions";
import { HOST } from "../../../../res/env";
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProductDetailScreen = ({ navigation, dispatch, product, auth, cart }) => {
  const [selectedVariant, setSelectedVariant] = useState({});
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [favsnackbar, setFavSnackbar] = useState(false);
  const [cartLocal, setCartLocal] = useState([]);
  const taxon = useSelector((state) => state.taxons.taxon);
  let { saving } = useSelector((state) => state.products && state.taxons);

  const checkout = useSelector((state) => state.checkout);
  const errMessage = useSelector((state) => state.checkout.error);

  React.useEffect(() => {
    dispatch(getCart());
  }, []);

  const dismissSnackbar = () => setSnackbarVisible(false);
  const dismissFavSnackbar = () => setFavSnackbar(false);

  const storeData = async (cartItem) => {
    const circularReplacer = () => {
      const seen = new WeakSet();

      return (key, value) => {
        if (typeof value === "object" && value !== null) {
          if (seen.has(value)) {
            return;
          }
          seen.add(value);
        }
        return value;
      };
    };

    try {
      // const jsonValue = JSON.stringify(cartItem, circularReplacer());
      const jsonValue = JSON.stringify(cartItem, circularReplacer());

      const value = `[${[...cartLocal, jsonValue]}]`;

      await AsyncStorage.setItem("Cart", value);
    } catch (e) {
      console.log(e);
    }
  };

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("Cart");
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.log(e);
    }
  };

  const handleAddToBag = async () => {
    let vari = product.variants[0].product;
    // dispatch(
    //   addItem(cart.token, {
    //     variant_id: vari.toString(),
    //     quantity: 1,
    //   })
    // );

    await storeData(vari);
    console.log(...cartLocal, vari);

    console.log("ddaattaa", await getData());
    return setSnackbarVisible(true);
  };

  const handleFav = () => {
    let variant = product.variants[0].product;
    dispatch(setProductFavourite(variant));

    setTimeout(() => {
      navigation.navigate("Favorites");
    }, 1000);
    return setFavSnackbar(true);
  };

  if (saving) {
    return <ActivityIndicatorCard />;
  } else
    return (
      <>
        <ScrollView
          style={{ ...globalStyles.containerFluid, ...styles.bgWhite }}
        >
          <Text
            style={{
              ...styles.title,
              ...globalStyles.container,
              color: colors.primary,
            }}
          >{`${taxon?.permalink
            ?.toUpperCase()
            .slice(11)
            .split("/")
            .join("  >  ")}`}</Text>
          {/* <MyCarousel key={imageURI} imageURI={imageURI} /> */}
          <Image
            source={{
              uri: `${HOST}/${product?.images[0]?.styles[6].url}`,
            }}
            style={{
              width: "100%",
              height: 350,
              resizeMode: "cover",
            }}
          />

          <View style={styles.containerFluid}>
            <View style={[globalStyles.container, globalStyles.pb16]}>
              <Text style={styles.productName}>{product.name}</Text>
              <Text
                style={styles.price}
              >{`${product.price} ${product.currency}`}</Text>
            </View>
          </View>
          <View style={[styles.containerFluid, globalStyles.mt8]}>
            <View style={[globalStyles.container, globalStyles.pv8]}>
              <View
                style={{
                  ...styles.rowContainer,
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Button
                  title="LEGG TIL I HANDLEKURV"
                  type="solid"
                  // disabled={isVariantSelected}
                  // disabledStyle={{ backgroundColor: colors.gray }}
                  // disabledTitleStyle={{ color: colors.white }}
                  containerStyle={{ flex: 1 }}
                  titleStyle={{ ...styles.titleStyle, fontSize: 18 }}
                  buttonStyle={{
                    ...globalStyles.btn,
                    width: "85%",
                    height: 60,
                  }}
                  onPress={() => {
                    setSelectedVariant(product);
                    handleAddToBag();
                  }}
                />
                <View
                  style={{
                    height: 60,
                    width: 60,
                    borderWidth: 2,
                    borderColor: colors.btnLink,
                    borderRadius: 10,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Icon
                    name="hearto"
                    type="ant-design"
                    size={35}
                    color={colors.btnLink}
                    onPress={handleFav}
                  />
                </View>
              </View>

              {/* ......Vendor..... */}
              <View
                style={{
                  flexDirection: "row",
                  flex: 1,
                  height: 80,
                  justifyContent: "flex-start",
                  alignItems: "center",
                  borderWidth: 1,
                  borderColor: colors.primary,
                  borderRadius: 10,
                  marginTop: 40,
                }}
              >
                <View
                  style={{
                    width: "35%",
                    height: "100%",
                    borderWidth: 1,
                    borderRightColor: "grey",
                    borderBottomColor: "transparent",
                    borderLeftColor: "transparent",
                    borderTopColor: "transparent",
                    overflow: "hidden",
                  }}
                >
                  <Image
                    source={require("../../../../../assets/images/vendor.png")}
                    style={{
                      width: "100%",
                      height: "100%",
                      overflow: "hidden",
                    }}
                  />
                </View>

                <View
                  style={{
                    width: "65%",
                    height: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "700",
                    }}
                  >
                    BLI KJENT MED PRODUSENTEN
                  </Text>
                </View>
              </View>

              <View style={styles.description}>
                <Text style={styles.desc__title}>BESKRIVELSE</Text>
                <Text style={styles.desc__content}>{product.description}</Text>
              </View>

              <View
                style={{
                  ...styles.description,
                  width: 300,
                  padding: 10,
                  borderWidth: 1,
                  borderRadius: 10,
                  borderColor: "transparent",
                  shadowColor: "grey",
                  shadowRadius: 10,
                  shadowOffset: {
                    width: 0,
                    height: 4,
                  },
                  shadowOpacity: 0.8,
                  elevation: 1,
                  backgroundColor: "white",
                }}
              >
                <Text style={styles.desc__title}>DETALJER</Text>
                <View>
                  {product.product_properties.map((item) => (
                    <View
                      key={item.id}
                      style={{
                        flexDirection: "row",
                        marginTop: 10,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 16,
                          flex: 1,
                          flexWrap: "wrap",
                        }}
                      >
                        <Text style={{ fontWeight: "700", fontSize: 16 }}>
                          {capitalizeFirstLetter(item.name) + ": "}
                        </Text>
                        {item.value}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>

            <View
              style={{
                ...globalStyles.container,
                marginTop: 40,
                marginBottom: 40,
              }}
            >
              <Button
                title="TILLBAKE"
                type="solid"
                containerStyle={{ flex: 1 }}
                titleStyle={{ ...styles.titleStyle, fontSize: 24 }}
                buttonStyle={{
                  ...globalStyles.btn,
                  // ...globalStyles.container,
                  flex: 1,
                  width: 150,
                  height: 60,
                }}
                onPress={() => navigation.goBack()}
              />
            </View>
          </View>
        </ScrollView>

        {checkout.error !== null && saving === false ? (
          <Snackbar visible={snackbarVisible} onDismiss={dismissSnackbar}>
            {errMessage}
          </Snackbar>
        ) : (
          <></>
        )}

        <Snackbar visible={favsnackbar} onDismiss={dismissFavSnackbar}>
          Added to Favorites !
        </Snackbar>
      </>
    );
};

const mapStateToProps = (state) => ({
  product: state.products.product,
  auth: state.auth,
  saving: state.products.saving,
  cart: state.checkout.cart,
});

export default connect(mapStateToProps)(ProductDetailScreen);
