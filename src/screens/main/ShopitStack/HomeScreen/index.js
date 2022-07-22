import {
  FlatList,
  Image,
  ImageBackground,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { globalStyles } from "../../../../styles/global";
import { styles } from "./styles";
import { Snackbar } from "react-native-paper";
import {
  addItem,
  getProduct,
  getProductsList,
  getSelectedVendor,
  getTaxon,
  getVendorsList,
  getWeeklyProducer,
  setFavQuantityDec,
  setMostQuantity,
} from "../../../../redux";
import { connect, useSelector } from "react-redux";
import { HOST } from "../../../../res/env";
import { colors } from "../../../../res/palette";
import { Icon } from "react-native-elements";
import { storeData } from "../../../../redux/rootReducer";

const HomeComponent = ({ dispatch, navigation, route, productsList, cart }) => {
  const { isAuth } = useSelector((state) => state.auth);
  const { saving } = useSelector((state) => state.products);
  const vendorList = useSelector((state) => state.taxons.vendors);
  const weeklyProducer = useSelector((state) => state.taxons.weeklyProducer);
  const { mostBoughtGoods } = useSelector((state) => state.taxons);

  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [showItemCard, setShowItemCard] = useState(false);
  const [enableQty, setEnableQty] = useState(null);
  const [afterAdd, setAfterAdd] = useState(false);
  const [mostBought, setMostBought] = useState([]);
  const [itemQuantity, setItemQuantity] = useState(0);
  const [mostQty, setMostQty] = useState(false);

  // React.useEffect(() => {
  //   setTimeout(() => {
  //     setItemCard(false);
  //   }, 5000);
  //   setAfterAdd(true);
  // }, [enableQty, itemQuantity]);

  React.useEffect(() => {
    if (showItemCard === true) {
      setTimeout(() => {
        setShowItemCard(false);
      }, 5000);
    }
  }, [showItemCard]);

  React.useEffect(() => {
    dispatch(getVendorsList());
    dispatch(getWeeklyProducer());

    if (productsList.length === 0) {
      handleProductsLoad();
    }
    setMostBought([]);
  }, []);

  React.useEffect(() => {
    loadMostBoughtGoods();
  }, [mostBought, mostBoughtGoods]);

  // React.useEffect(() => {
  //   handleProductsLoad();
  // }, [isAuth, route.params]);

  // const incrementQuantity = (id) => {
  //   let exist = mostBought.find((x) => x.id == id);
  //   mostBought.map((x) =>
  //     x.id == exist.id ? { ...exist, qty: exist.qty + 1 } : x
  //   );

  //   console.log("MOSTBought", mostBought);
  // };

  // const decrementQuantity = (id, quantity) => {
  //   if (quantity === 1) {
  //     setItemCard(false);
  //   } else {
  //     dispatch(
  //       setMostQuantity({
  //         _id: id,
  //         quantity: quantity - 1,
  //       })
  //     );
  //   }
  // };

  const decQuantity = () => {
    if (itemQuantity === 1) {
      setItemCard(false);
    } else {
      setItemQuantity(itemQuantity - 1);
    }
  };

  const dismissSnackbar = () => setSnackbarVisible(false);

  const loadMostBoughtGoods = () => {
    if (mostBoughtGoods?.length !== 0) {
      mostBoughtGoods?.forEach((item) => {
        const product = productsList.find((ele) => ele.id == item.id);

        if (!mostBought.includes(product)) {
          if (product && mostBought.length === 0) {
            mostBought.push({ ...product, qty: 1 });
          } else if (product && mostBought.length === mostBoughtGoods.length) {
            setMostBought(mostBought);
          } else if (product && mostBought.length < mostBoughtGoods.length) {
            let temp = mostBought;
            temp.push({ ...product, qty: 1 });
            setMostBought(temp);
          }
        }
      });
    }
  };

  // console.log("mostBought", mostBought);
  const resultVendor = (id) => {
    const vendor = vendorList?.filter((vendor) => {
      if (vendor?.id == id) return vendor;
    });

    let vendorName = vendor ? vendor[0]?.name : "";

    return [vendorName, vendor];
  };

  const findCartProduct = (itemID) => {
    const newItem = productsList.find((ele) => ele.id == itemID);
    console.log("NEW", newItem);
    setEnableQty(newItem);
  };

  const cartHandler = (enableQty) => {
    let item = productsList.find((x) => x.id === enableQty?.id);

    setTimeout(async () => {
      await dispatch(
        addItem(cart?.token, {
          variant_id: item.default_variant?.id,
          quantity: itemQuantity >= 0 && itemQuantity <= 1 ? 1 : itemQuantity,
        })
      );
      setItemQuantity(0);
      return setSnackbarVisible(true);
    }, 5000);
  };

  const handleWeeklyProducerClick = async (vendor) => {
    await dispatch(getSelectedVendor(vendor.slug));
    navigation.navigate("ProducersDetailScreen");
  };

  const FlatListImageItem = ({
    item,
    onPress,
    imageStyle,
    itemContainerStyle,
  }) => {
    const tempArr = cart.line_items.filter(
      (ele) => item.id == ele?.variant?.product?.id
    );

    console.log("tempArr", tempArr);
    console.log("itemQty", itemQuantity);

    return (
      <TouchableOpacity onPress={onPress} style={{ ...itemContainerStyle }}>
        <View>
          <Image
            source={{
              uri: `${HOST}/${item?.images[0]?.styles[3]?.url}`,
            }}
            style={{
              width: imageStyle.width,
              height: imageStyle.height,
              resizeMode: "contain",
            }}
          />
          {/* <TouchableOpacity
            style={styles.addLogo}
            onPress={() => {
              setItemCard(true);
              setItemQuantity(0);
              findCartProduct(item?.id);
            }}
          >
            {itemCard && item?.id === enableQty?.id ? (
              <>
                <View style={styles.dynamicAddItem}>
                  <TouchableOpacity
                    onPress={() => {
                      setItemQuantity(itemQuantity - 1);
                      findCartProduct(item?.id);
                    }}
                  >
                    <Text style={styles.dynamicText}>--</Text>
                  </TouchableOpacity>

                  <Text style={styles.dynamicText}>
                    {tempArr.length !== 0
                      ? tempArr[0].quantity + itemQuantity <= 1
                        ? 1
                        : itemQuantity
                      : itemQuantity + 1}
                  </Text>

                  <TouchableOpacity
                    onPress={() => {
                      setItemQuantity(itemQuantity + 1);
                      findCartProduct(item?.id);
                    }}
                  >
                    <Text style={styles.dynamicText}>+</Text>
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              <>
                {afterAdd &&
                tempArr.length !== 0 &&
                item.id == tempArr[0]?.variant.product?.id ? (
                  <TouchableOpacity
                    style={styles.afterText}
                    onPress={() => {
                      setItemCard(true);
                    }}
                  >
                    <Text style={{ color: colors.white, fontSize: 25 }}>
                      {tempArr.length !== 0 ? tempArr[0].quantity : 1}
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <Icon
                    name="plus"
                    type="ant-design"
                    size={25}
                    borderRadius={10}
                    color={colors.btnLink}
                    backgroundColor={colors.white}
                  />
                )}
              </>
            )}
          </TouchableOpacity> */}

          <TouchableOpacity
            style={styles.addLogo}
            onPress={() => setShowItemCard(true)}
          >
            {showItemCard ? (
              <>
                <View style={styles.dynamicAddItem}>
                  <TouchableOpacity
                    onPress={() => {
                      setItemQuantity(itemQuantity - 1);
                      findCartProduct(item?.id);
                    }}
                  >
                    <Text style={styles.dynamicText}>--</Text>
                  </TouchableOpacity>

                  <Text style={styles.dynamicText}>
                    {tempArr.length !== 0
                      ? tempArr[0].quantity + itemQuantity <= 1
                        ? 1
                        : itemQuantity
                      : itemQuantity + 1}
                  </Text>

                  <TouchableOpacity
                    onPress={() => {
                      setItemQuantity(itemQuantity + 1);
                      findCartProduct(item?.id);
                    }}
                  >
                    <Text style={styles.dynamicText}>+</Text>
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              <View>
                <Icon
                  name="plus"
                  type="ant-design"
                  size={25}
                  borderRadius={10}
                  color={colors.btnLink}
                  backgroundColor={colors.white}
                />
              </View>
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.detailsContainer}>
          <Text numberOfLines={1} style={styles.title}>
            {item.name}
          </Text>
          <Text numberOfLines={1} style={styles.description}>
            {`${resultVendor(item?.vendor?.id)[0]}`}
          </Text>
          <View style={styles.pricingContainer}>
            <Text style={[styles.prices, { color: colors.black }]}>
              {item.display_price} ||{" "}
              {item?.default_variant?.options_text
                ? item?.default_variant?.options_text.split(" ")[3] ||
                  item?.default_variant?.options_text.split(" ")[1]
                : null}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const handleProductsLoad = (pageIndexAfterDispatch = null) => {
    dispatch(
      getProductsList(null, {
        pageIndex: null,
        filter: {},
      })
    );
  };

  const handleProductLoad = (id, item) => {
    dispatch(getProduct(id));
    dispatch(getTaxon(item.taxons[0].id));
    navigation.navigate("ProductDetail");
  };

  const newJustInRenderItem = ({ item, index }) => {
    return (
      <TouchableOpacity>
        <FlatListImageItem
          keyExtractor={(item, index) => index.toString()}
          item={item}
          onPress={() => {
            storeData("selectedVendor", resultVendor(item?.vendor?.id)[1]);
            handleProductLoad(item?.id, item);
          }}
          imageStyle={styles.newJustInImage}
          itemContainerStyle={styles.newJustInItemContainer}
        />
      </TouchableOpacity>
    );
  };

  const flatListHeaderComponent = () => {
    return (
      <>
        <TouchableOpacity onPress={() => navigation.navigate("ProductsList")}>
          <Image
            source={require("../../../../../assets/images/Header-Icon/home_item.png")}
            style={styles.bannerFirst}
          />
          <Text style={styles.banner}>SE UTVALG</Text>
        </TouchableOpacity>

        <View style={styles.body_second}>
          <TouchableOpacity
            style={styles.first}
            onPress={() => handleWeeklyProducerClick(weeklyProducer.vendor)}
          >
            <ImageBackground
              source={require("../../../../../assets/images/Header-Icon/home_second.png")}
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={styles.text1}>UKAS PRODUSENT </Text>
              <Text style={{ ...styles.text_second, fontWeight: "700" }}>
                {weeklyProducer?.vendor ? weeklyProducer.vendor.name : ""}
              </Text>
            </ImageBackground>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.second}
            onPress={() => navigation.navigate("ProducersListScreen")}
          >
            <ImageBackground
              source={require("../../../../../assets/images/Header-Icon/home_second_2.png")}
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  width: "80%",
                  textAlign: "center",
                  color: "#FFF",
                  fontWeight: "700",
                }}
              >
                SE ALLE PRODUSENTER
              </Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>

        <View style={styles.third}>
          <Text
            style={{
              textAlign: "center",
              marginTop: 10,
              marginBottom: 10,
              color: "#EB1741",
              fontSize: 25,
            }}
          >
            HVORDAN FUNKER DET?
          </Text>
          <View style={styles.body_third}>
            <View
              style={{
                flex: 0.8,
              }}
            >
              <ImageBackground
                source={require("../../../../../assets/images/Header-Icon/red_circle.png")}
                resizeMode={"contain"}
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  source={require("../../../../../assets/images/Header-Icon/inside_circle.png")}
                  style={styles.center}
                />
              </ImageBackground>
              <Text style={styles.bottom_text}>Legg inn bestilling</Text>
            </View>
            <Icon
              name="arrowright"
              type="ant-design"
              size={40}
              color={"#ed3c61"}
              style={{
                flex: 0.8,
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            />
            <View
              style={{
                // ...styles.body_image,
                flex: 0.8,
                width: 10,
              }}
            >
              <ImageBackground
                source={require("../../../../../assets/images/Header-Icon/red_circle.png")}
                resizeMode={"contain"}
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  source={require("../../../../../assets/images/Header-Icon/second_circle.png")}
                  style={styles.center}
                />
              </ImageBackground>
              <Text style={{ ...styles.bottom_text }}>
                Vi henter varene rett fra bonden
              </Text>
            </View>
            <Icon
              name="arrowright"
              type="ant-design"
              size={40}
              color={"#ed3c61"}
              style={{
                flex: 0.8,
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            />
            <View
              style={{
                // ...styles.body_image,
                flex: 0.8,
              }}
            >
              <ImageBackground
                source={require("../../../../../assets/images/Header-Icon/red_circle.png")}
                resizeMode={"contain"}
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  source={require("../../../../../assets/images/Header-Icon/third_circle.png")}
                  style={styles.center}
                />
              </ImageBackground>

              <Text style={styles.bottom_text}>
                Vi leverer varene hjem til deg
              </Text>
            </View>
          </View>
        </View>

        <Text style={{ ...styles.content_text, ...globalStyles.container }}>
          MEST KJØPTE
        </Text>
      </>
    );
  };

  // FlatListlowerComponent

  const flatListlowerComponent = () => {
    return (
      <>
        <TouchableOpacity
          style={styles.home_btn}
          onPress={() => navigation.navigate("ProductsList")}
        >
          <Text style={styles.btn_text}>SE HELE UTVALGET</Text>
        </TouchableOpacity>
      </>
    );
  };

  return (
    <View style={{ ...globalStyles.containerFluid, ...styles.bg_white }}>
      <FlatList
        data={mostBought}
        keyExtractor={(item, index) => index.toString()}
        renderItem={newJustInRenderItem}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        style={{
          ...globalStyles.container,
          ...styles.bg_white,
        }}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={flatListHeaderComponent}
        ListFooterComponent={flatListlowerComponent}
      />

      <Snackbar visible={snackbarVisible} onDismiss={dismissSnackbar}>
        Added to Cart !
      </Snackbar>
      {cart?.item_count > 0 ? (
        <View style={styles.qty_footer}>
          <Text
            style={{ color: colors.white, fontSize: 15, fontWeight: "bold" }}
          >
            {cart?.item_count} VARER
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Bag")}>
            <Text
              style={{
                color: colors.white,
                fontSize: 15,
                fontWeight: "bold",
              }}
            >
              SE HANDLEVOGN
            </Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
};

const mapStateToProps = (state) => ({
  productsList: state.products.productsList,
  pageIndex: state.products.pageIndex,
  meta: state.products.meta,
  cart: state.checkout.cart,
});

export default connect(mapStateToProps)(HomeComponent);
