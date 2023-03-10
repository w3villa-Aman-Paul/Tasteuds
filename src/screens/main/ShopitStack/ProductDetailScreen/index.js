import React, { useState, useEffect } from "react";
import { View, ScrollView, Text, Image, TouchableOpacity } from "react-native";
import { globalStyles } from "../../../../styles/global";
import { colors } from "../../../../res/palette";
import { Button, Icon } from "react-native-elements";
import { Snackbar } from "react-native-paper";
import ActivityIndicatorCard from "../../../../library/components/ActivityIndicatorCard";

import {
  addItem,
  getCart,
  getSelectedVendor,
  getTaxon,
  setProductFavourite,
} from "../../../../redux";
import { connect } from "react-redux";
import { styles } from "./styles";
import { capitalizeFirstLetter } from "../../../../res/helperFunctions";
import { HOST } from "../../../../res/env";
import { useSelector } from "react-redux";
import { getData } from "../../../../redux/rootReducer";
import BottomBarCart from "../../../components/bottomBarCart";

const ProductDetailScreen = ({ navigation, dispatch, cart, route }) => {
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [favsnackbar, setFavSnackbar] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState([]);

  const vendor = async () => {
    setSelectedVendor(await getData("selectedVendor"));

    console.log(selectedVendor);
  };

  const params = route.params;

  const [color, setColor] = useState(0);

  const taxon = useSelector((state) => state.taxons.taxon);
  let { saving } = useSelector((state) => state.products || state.taxons);
  const { product } = useSelector((state) => state.products);

  const checkout = useSelector((state) => state.checkout);
  const errMessage = useSelector((state) => state.checkout.error);

  useEffect(() => {
    dispatch(getCart(cart.token));
  }, []);

  useEffect(() => {
    vendor();
  }, [saving]);

  useEffect(() => {
    if (params?.taxonId) {
      dispatch(getTaxon(params.taxonId));
    }
  }, [params]);

  const dismissSnackbar = () => setSnackbarVisible(false);
  const dismissFavSnackbar = () => setFavSnackbar(false);

  const handleAddToBag = (color) => {
    let vari = product?.variants.find((item, index) => index === color);
    dispatch(
      addItem(cart?.token, {
        variant_id: vari.id,
        quantity: 1,
      })
    );

    return setSnackbarVisible(true);
  };

  const handleFav = () => {
    let variant = product;
    dispatch(setProductFavourite({ ...variant, fav_qty: 1 }));

    setTimeout(() => {
      navigation.navigate("Favorites");
    }, 1000);
    return setFavSnackbar(true);
  };

  const handleProducerClick = async (vendor) => {
    await dispatch(getSelectedVendor(vendor.slug));
    navigation.navigate("ProducersDetailScreen", {
      bio: vendor.bio,
      cover_image_url: vendor.cover_image_url,
      logo_image_url: vendor.logo_image_url,
      vendorSlug: vendor.slug,
    });
  };

  const breadCrumArray = taxon?.permalink?.toUpperCase().slice(11).split("/");

  const handleBreadcrumPress = (taxon, type) => {
    navigation.navigate("ProductsList", {
      id: taxon?.id,
      route: route.name,
      menu: taxon,
      type: type,
    });
  };

  if (saving) {
    return <ActivityIndicatorCard />;
  } else
    return (
      <>
        <ScrollView
          style={{ ...globalStyles.containerFluid, ...styles.bgWhite }}
        >
          {breadCrumArray?.length > 0 && (
            <View
              style={{
                ...globalStyles.container,
                flexDirection: "row",
                flexWrap: "wrap",
              }}
            >
              <TouchableOpacity onPress={() => handleBreadcrumPress(taxon, 1)}>
                <Text
                  style={{
                    ...styles.title,

                    color: colors.primary,
                  }}
                >
                  {`${breadCrumArray[0]}  ${breadCrumArray[1] ? "> " : ""}`}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => handleBreadcrumPress(taxon, 2)}>
                <Text
                  style={{
                    ...styles.title,

                    color: colors.primary,
                  }}
                >
                  {` ${breadCrumArray[1] ? breadCrumArray[1] : ""}  ${
                    breadCrumArray[2] ? ">" : ""
                  }`}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => handleBreadcrumPress(taxon, 3)}>
                <Text
                  style={{
                    ...styles.title,

                    color: colors.primary,
                  }}
                >
                  {breadCrumArray[2]}
                </Text>
              </TouchableOpacity>
            </View>
          )}

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
              <Text style={styles.productName}>{product?.name}</Text>
              <Text style={styles.price}>
                {color
                  ? product?.variants[color]?.display_price
                  : product?.variants[0]?.display_price}
              </Text>
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
                  containerStyle={{ flex: 1 }}
                  titleStyle={{ ...styles.titleStyle, fontSize: 18 }}
                  buttonStyle={{
                    ...globalStyles.btn,
                    height: 50,
                    flex: 0.8,
                  }}
                  onPress={() => handleAddToBag(color)}
                />
                <View
                  style={{
                    height: 50,
                    width: 60,
                    borderWidth: 2,
                    borderColor: colors.btnLink,
                    borderRadius: 10,
                    justifyContent: "center",
                    alignItems: "center",
                    flex: 0.2,
                    marginLeft: 10,
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

              {/*......Vekt(Size).....*/}
              <View style={styles.size}>
                {product?.variants.map((item, index) => (
                  <TouchableOpacity
                    style={color == index ? styles.active : styles.unactive}
                    key={index}
                    onPress={() => setColor(index)}
                  >
                    <Text
                      style={
                        color == index ? styles.size_text : styles.size_unactive
                      }
                    >
                      {item.options_text
                        ? item.options_text.split(":")[1]
                        : null}
                    </Text>
                  </TouchableOpacity>
                ))}
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
                    source={{
                      uri: `${selectedVendor[0]?.logo_image_url}`,
                    }}
                    style={{
                      width: "100%",
                      height: "100%",
                      overflow: "hidden",
                      resizeMode: "contain",
                    }}
                  />
                </View>

                <TouchableOpacity
                  style={{
                    width: "65%",
                    height: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onPress={() => {
                    handleProducerClick(selectedVendor[0]);
                  }}
                >
                  <Text
                    style={{
                      fontSize: 13,
                      fontFamily: "lato-bold",
                    }}
                  >
                    BLI KJENT MED PRODUSENTEN
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.description}>
                <Text style={styles.desc__title}>BESKRIVELSE</Text>
                <Text style={styles.desc__content}>{product?.description}</Text>
              </View>

              <View
                style={{
                  ...styles.description,
                  width: 300,
                  borderWidth: 1,
                  borderRadius: 10,
                  borderColor: "transparent",

                  backgroundColor: "white",
                }}
              >
                <Text style={styles.desc__title}>DETALJER</Text>
                <View>
                  {product?.product_properties.map((item) => (
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
                alignSelf: "center",
              }}
            >
              <Button
                title="TILBAKE"
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

        <BottomBarCart />

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
  // product: state.products.product,
  auth: state.auth,
  saving: state.products.saving,
  cart: state.checkout.cart,
});

export default connect(mapStateToProps)(ProductDetailScreen);
