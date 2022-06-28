import {
  FlatList,
  Image,
  ImageBackground,
  SafeAreaView,
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
  createCart,
  getProduct,
  getProductsList,
  getTaxon,
  getVendorsList,
} from "../../../../redux";
import { connect, useSelector } from "react-redux";
import { HOST } from "../../../../res/env";
import { colors } from "../../../../res/palette";
import { Icon } from "react-native-elements";
import ActivityIndicatorCard from "../../../../library/components/ActivityIndicatorCard";
import { getData, storeData } from "../../../../redux/rootReducer";

const HomeComponent = ({ dispatch, navigation, route, productsList, cart }) => {
  const { isAuth } = useSelector((state) => state.auth);
  const { saving } = useSelector((state) => state.products);
  const vendorList = useSelector((state) => state.taxons.vendors);
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  React.useEffect(() => {
    const getValue = async () => {
      let cartData = await getData("cartItems");
      console.log("cartItems", cartData);
    };
    getValue();
  }, []);

  React.useEffect(() => {
    const getFavValue = async () => {
      let favData = await getData("favItems");
      console.log("favItems", favData);
    };
    getFavValue();
  }, []);

  React.useEffect(() => {
    dispatch(getVendorsList());
  }, []);

  React.useEffect(() => {
    handleProductsLoad();
  }, [isAuth, route.params]);

  React.useEffect(() => {
    dispatch(createCart());
  }, []);

  const dismissSnackbar = () => setSnackbarVisible(false);

  const resultVendor = (id) => {
    const vendor = vendorList?.filter((vendor) => {
      if (vendor?.id == id) return vendor;
    });

    let vendorName = vendor[0]?.name;

    return [vendorName, vendor];
  };

  const cartHandler = (itemId) => {
    let item = productsList.find((x) => x.id === itemId);
    dispatch(
      addItem(cart.token, {
        variant_id: item.default_variant?.id,
        quantity: 1,
      })
    );
    return setSnackbarVisible(true);
  };

  const FlatListImageItem = ({
    item,
    onPress,
    imageStyle,
    itemContainerStyle,
  }) => {
    return (
      <TouchableOpacity onPress={onPress} style={{ ...itemContainerStyle }}>
        <View style={{ position: "relative" }}>
          <Image
            source={{
              uri: `${HOST}/${item.images[0].styles[3].url}`,
            }}
            style={{
              width: imageStyle.width,
              height: imageStyle.height,
              resizeMode: "contain",
            }}
          />
          <TouchableOpacity
            style={{ position: "absolute", bottom: 0, right: 0 }}
          >
            <Icon
              name="pluscircleo"
              type="ant-design"
              size={34}
              color={colors.btnLink}
              borderRadius={34}
              backgroundColor={colors.white}
              onPress={() => cartHandler(item?.id)}
            />
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
              {" "}
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

  const handleProductLoad = async (id, item) => {
    dispatch(getProduct(id));
    dispatch(getTaxon(item.taxons[0].id));
    navigation.navigate("ProductDetail");
  };

  const newJustInRenderItem = ({ item, index }) => {
    return (
      <TouchableOpacity>
        <FlatListImageItem
          key={index.toString()}
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
          <View style={styles.first}>
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
                BAKEHUSET PÅ ASK
              </Text>
            </ImageBackground>
          </View>
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
    <SafeAreaView
      style={{ ...styles.containerFluid, ...styles.bg_white, flex: 1 }}
    >
      {saving ? (
        <ActivityIndicatorCard />
      ) : (
        <FlatList
          data={productsList.slice(0, 10)}
          keyExtractor={(item, index) => index.toString()}
          renderItem={newJustInRenderItem}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          style={{
            ...globalStyles.container,
            ...globalStyles.mt8,
            ...styles.bg_white,
          }}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={flatListHeaderComponent}
          ListFooterComponent={flatListlowerComponent}
        />
      )}

      <Snackbar visible={snackbarVisible} onDismiss={dismissSnackbar}>
        Added to Cart !
      </Snackbar>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => ({
  productsList: state.products.productsList,
  pageIndex: state.products.pageIndex,
  meta: state.products.meta,
  cart: state.checkout.cart,
});

export default connect(mapStateToProps)(HomeComponent);
