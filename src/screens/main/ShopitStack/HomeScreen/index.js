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
} from "../../../../redux";
import { connect, useSelector } from "react-redux";
import { HOST } from "../../../../res/env";
import { colors } from "../../../../res/palette";
import { Icon } from "react-native-elements";
import ActivityIndicatorCard from "../../../../library/components/ActivityIndicatorCard";
import { storeData } from "../../../../redux/rootReducer";

const HomeComponent = ({ dispatch, navigation, route, productsList, cart }) => {
  const { isAuth } = useSelector((state) => state.auth);
  const { saving } = useSelector((state) => state.products);
  const vendorList = useSelector((state) => state.taxons.vendors);
  const weeklyProducer = useSelector((state) => state.taxons.weeklyProducer);
  const { mostBoughtGoods } = useSelector((state) => state.taxons);

  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [itemCard, setItemCard] = useState(false);
  const [enableQty, setEnableQty] = useState(null);
  const [afterAdd, setAfterAdd] = useState(false);
  const [mostBought, setMostBought] = useState([]);
  const [findPrice, setFindPrice] = useState("");

  React.useEffect(() => {
    itemCard ? cartHandler(enableQty) : null;
    setTimeout(() => {
      setItemCard(false);
    }, 5000);
    setAfterAdd(true);
  }, [enableQty]);

  React.useEffect(() => {
    dispatch(getVendorsList());
    dispatch(getWeeklyProducer());
    setMostBought([]);
  }, []);

  React.useEffect(() => {
    loadMostBoughtGoods();
  }, [mostBought, mostBoughtGoods]);

  // React.useEffect(() => {
  //   handleProductsLoad();
  // }, [isAuth, route.params]);

  const dismissSnackbar = () => setSnackbarVisible(false);

  const loadMostBoughtGoods = () => {
    if (mostBoughtGoods?.products?.length !== 0) {
      mostBoughtGoods?.products?.forEach((item) => {
        const product = productsList.find((ele) => ele.id == item.id);

        if (!mostBought.includes(product)) {
          if (product && mostBought.length === 0) {
            mostBought.push(product);
          } else if (
            product &&
            mostBought.length === mostBoughtGoods.products.length
          ) {
            setMostBought(mostBought);
          } else if (
            product &&
            mostBought.length < mostBoughtGoods.products.length
          ) {
            let temp = mostBought;
            temp.push(product);
            setMostBought(temp);
          }
        }
      });
    }
  };

  const resultVendor = (id) => {
    const vendor = vendorList?.filter((vendor) => {
      if (vendor?.id == id) return vendor;
    });

    let vendorName = vendor ? vendor[0]?.name : "";

    return [vendorName, vendor];
  };

  const findCartProduct = (y) => {
    let findItem = productsList.find((x) => x.id === y);
    setEnableQty(findItem);
  };

  // console.log(">>>>>", enableQty);

  const cartHandler = (enableQty) => {
    let item = productsList.find((x) => x.id === enableQty?.id);
    let newItem = productsList[61].included.filter((x) => x.type === "variant");
    console.log("NEWITEM", newItem);
    setTimeout(() => {
      dispatch(
        addItem(cart?.token, {
          variant_id: item.default_variant?.id,
          quantity: 1,
        })
      );
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
          <TouchableOpacity
            style={styles.addLogo}
            onPress={() => {
              setItemCard(true);
              findCartProduct(item?.id);
            }}
          >
            {itemCard && item?.id === enableQty?.id ? (
              <>
                <View style={styles.dynamicAddItem}>
                  <TouchableOpacity>
                    <Text style={styles.dynamicText}>--</Text>
                  </TouchableOpacity>
                  <Text style={styles.dynamicText}>1</Text>
                  <TouchableOpacity>
                    <Text style={styles.dynamicText}>+</Text>
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              <>
                {afterAdd && item?.id === enableQty?.id ? (
                  <Pressable
                    style={styles.afterText}
                    onPress={() => setItemCard(true)}
                  >
                    <Text style={{ color: colors.white, fontSize: 25 }}>1</Text>
                  </Pressable>
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
              {item.display_price}
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
