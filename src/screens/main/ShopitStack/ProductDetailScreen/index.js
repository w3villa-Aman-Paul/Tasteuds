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
  setProductFavourite,
} from "../../../../redux";
import { connect } from "react-redux";
import { styles } from "./styles";
import { capitalizeFirstLetter } from "../../../../res/helperFunctions";
import { HOST } from "../../../../res/env";
import { useSelector } from "react-redux";
import Footer from "../../../components/footer";

const ProductDetailScreen = ({ navigation, dispatch, product, auth }) => {
  const [selectedVariant, setSelectedVariant] = useState({});
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [favsnackbar, setFavSnackbar] = useState(false);

  const taxon = useSelector((state) => state.taxons.taxon);
  let { saving } = useSelector((state) => state.products && state.taxons);

  const dismissSnackbar = () => setSnackbarVisible(false);
  const dismissFavSnackbar = () => setFavSnackbar(false);

  const getcartToken = async () => {
    const { data } = await createCartToken();
    return data.data.attributes.token;
  };

  const handleAddToBag = async () => {
    dispatch(
      addItem(await getcartToken(), {
        variant_id: selectedVariant.id,
        quantity: 1,
      })
    );
    setTimeout(() => {
      navigation.navigate("Bag");
    }, 1000);
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
          >{`${taxon.permalink}`}</Text>
          {/* <MyCarousel key={imageURI} imageURI={imageURI} /> */}
          <Image
            source={{
              uri: `${HOST}/${product?.images[0]?.styles[11].url}`,
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
                  titleStyle={{ ...styles.titleStyle, fontSize: 20 }}
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
                        width: "75%",
                        flexDirection: "row",
                        marginTop: 10,
                      }}
                    >
                      <Text style={{ fontWeight: "700", fontSize: 16 }}>
                        {capitalizeFirstLetter(item.name) + ": "}
                      </Text>
                      <Text
                        style={{
                          fontSize: 16,
                        }}
                      >
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

          {/* <View
            style={[styles.containerFluid, globalStyles.mt8, globalStyles.pv8]}
          >
            <View style={globalStyles.container}>
              <View>
                <Text style={globalStyles.latoBold14}>
                  Product Detail & Care
                </Text>
                <View style={[styles.unorderedListItem, globalStyles.mt8]}>
                  {product.product_properties.map((property) => (
                    <Text key={property.id} style={globalStyles.label}>
                      {"\u2022"} {capitalizeFirstLetter(property.name)}:{" "}
                      {property.value}
                    </Text>
                  ))}
                </View>
              </View>
              <View style={globalStyles.mt16}>
                <Text style={globalStyles.latoBold14}>Description</Text>
                <Text style={[globalStyles.label, globalStyles.mt8]}>
                  {product.description}
                </Text>
              </View>
              <View style={globalStyles.mt16}>
                <Text style={globalStyles.latoBold14}>Manufacturer</Text>
                <Text style={[globalStyles.label, globalStyles.mt8]}>
                  Freeway Clothing Co, 768/1, Vijaynagar, New Delhi 116708
                </Text>
              </View>
              <View style={globalStyles.mt16}>
                <Text style={globalStyles.latoBold14}>
                  Manufacturer Country
                </Text>
                <Text style={[globalStyles.label, globalStyles.mt8]}>
                  India
                </Text>
              </View>
            </View>
          </View> */}
          {/* <View
            style={[styles.containerFluid, globalStyles.mt8, globalStyles.pv8]}
          >
            <View style={globalStyles.container}>
              <Text style={globalStyles.latoBold14}>
                Customer Reviews (309)
              </Text>
              {[
                {
                  id: 0,
                  review:
                    "Purchasing the dress online was super easy and they were delivered quick. My partner absolutely loves his new dress! Perfect! All she had to do was swap them over with his old party dress.",
                  reviewer: "Devendar Rathore",
                  date: "Aug 19, 2020",
                  likes: 16,
                  dislikes: 7,
                },
                {
                  id: 1,
                  review:
                    "My old dress was become dull and stale. But this new dress is super amazing and fits nicely to me. Thanks for super quick delivery and good service.",
                  reviewer: "Devendar Rathore",
                  date: "Aug 19, 2020",
                  likes: 46,
                  dislikes: 6,
                },
              ].map((item, i, arr) => (
                <View key={item.id} style={globalStyles.pv8}>
                  <Text style={globalStyles.latoRegular}>{item.review}</Text>
                  <View style={styles.reviewFooter}>
                    <Text style={globalStyles.label}>
                      {item.reviewer} | {item.date}
                    </Text>
                    <View style={styles.likesDislikesContainer}>
                      <View style={styles.likesContainer}>
                        <Smile size={20} style={{ color: colors.gray }} />
                        <Text style={globalStyles.label}> {item.likes}</Text>
                      </View>
                      <View style={styles.likesContainer}>
                        <SmileSad size={20} style={{ color: colors.gray }} />
                        <Text style={globalStyles.label}> {item.dislikes}</Text>
                      </View>
                    </View>
                  </View>
                  {i !== arr.length - 1 && (
                    <Divider style={styles.reviewBorder} />
                  )}
                </View>
              ))}
              <TouchableOpacity>
                <Text style={styles.reviewFooterAction}>View All (309)</Text>
              </TouchableOpacity>
            </View>
          </View> */}
          {/* <View
            style={[styles.containerFluid, globalStyles.mt8, globalStyles.pv8]}
          >
            <View style={globalStyles.container}>
              <Text style={[globalStyles.latoBold14, globalStyles.mb8]}>
                Check Delivery
              </Text>
              <TextField
                placeholder=" Enter PIN Code"
                containerStyle={styles.inputWrapperStyle}
                rightElement={<Text style={styles.inputRight}>Check</Text>}
                onChangeText={setPincode}
                value={pincode}
              />
              <View style={styles.deliveryOffersContainer}>
                <ShoppingCart
                  size={18}
                  style={[
                    styles.deliveryOffersIcon,
                    { transform: [{ rotateY: "180deg" }] },
                  ]}
                />
                <Text style={globalStyles.latoBold14}>
                  Delivery by Thursday, Sep 05
                </Text>
              </View>
              <View style={styles.deliveryOffersContainer}>
                <Dollar size={18} style={styles.deliveryOffersIcon} />
                <Text style={globalStyles.latoBold14}>
                  Cash on delivery available
                </Text>
              </View>
              <View style={styles.deliveryOffersContainer}>
                <Repeat size={18} style={styles.deliveryOffersIcon} />
                <Text style={globalStyles.latoBold14}>
                  Return & exchange available within 10 days
                </Text>
              </View>
            </View>
          </View> */}
          {/* <View
            style={[styles.containerFluid, globalStyles.mt8, globalStyles.pv16]}
          >
            <View style={globalStyles.container}>
              <View style={styles.alikeProductsHeader}>
                <Text style={[globalStyles.latoBold14, globalStyles.mb16]}>
                  Your might also like
                </Text>
                <Text style={[globalStyles.label, globalStyles.latoBold14]}>
                  12 more
                </Text>
              </View>
            </View>
            <ScrollView
              horizontal={true}
              style={styles.carouselProductsContainer}
            >
              <CarouselProductCard imageURI={imageURI} />
              <CarouselProductCard imageURI={imageURI} />
              <CarouselProductCard imageURI={imageURI} />
            </ScrollView>
          </View> */}
          {/* <View style={styles.footerContainer}>
            <View style={styles.footerItemListContainer}>
              <View style={styles.footerItemContainer}>
                <CustomIconTruck size={32} style={styles.footerIcon} />
                <Text style={styles.footerText}>Fastest Delivery</Text>
              </View>
              <View style={styles.footerItemContainer}>
                <CustomIconOriginal size={32} style={styles.footerIcon} />
                <Text style={styles.footerText}>100% Original</Text>
              </View>
              <View style={styles.footerItemContainer}>
                <IcOutlineAssignmentReturn
                  size={32}
                  style={styles.footerIcon}
                />
                <Text style={styles.footerText}>Easy Returns</Text>
              </View>
              <View style={styles.footerItemContainer}>
                <RiSecurePaymentFill size={32} style={styles.footerIcon} />
                <Text style={styles.footerText}>Secure Payment</Text>
              </View>
            </View>
          </View> */}
          <Footer />
        </ScrollView>
        <Snackbar visible={snackbarVisible} onDismiss={dismissSnackbar}>
          Added to Bag !
        </Snackbar>
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
});

export default connect(mapStateToProps)(ProductDetailScreen);
