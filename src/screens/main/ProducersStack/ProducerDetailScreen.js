import {
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Platform,
} from "react-native";
import HTML from "react-native-render-html";
import React, { useEffect, useState, useRef } from "react";
import { styles } from "./style";
import { connect, useSelector } from "react-redux";
import { HOST } from "../../../res/env";
import { Icon } from "react-native-elements";
import { colors } from "../../../res/palette";
import {
  addItem,
  getProduct,
  getTaxon,
  removeLineItem,
  setQuantity,
} from "../../../redux";
import { globalStyles } from "../../../styles/global";

const ProducerDetailScreen = ({ dispatch, navigation, route }) => {
  const selectedVendor = useSelector((state) => state?.taxons?.selectedVendor);
  const cart = useSelector((state) => state.checkout.cart);
  const productsList = useSelector((state) => state.products.productsList);
  const width = Dimensions.get("window").width - 20;
  const vendorList = useSelector((state) => state.taxons.vendors);
  const [vendorCover, setVendorCover] = useState({});

  const [showItemCard, setShowItemCard] = useState(false);
  const [enableQty, setEnableQty] = useState(null);
  const [inc, setInc] = useState("false");
  const [itemQuantity, setItemQuantity] = useState(1);
  const [inCart, setInCart] = useState(false);
  const { bio, cover_image_url, logo_image_url } = route.params;

  const timeoutIdRef = useRef();

  React.useEffect(() => {
    const timeOutId = timeoutIdRef.current;

    return () => {
      clearTimeout(timeOutId);
    };
  }, []);

  useEffect(() => {
    setVendorCover(findVendorCoverImage(selectedVendor.id));
  }, [selectedVendor]);

  const findVendorCoverImage = (vendorId) => {
    const { cover_image_url, logo_image_url } = vendorList.find(
      (ele) => Number(ele.id) === Number(vendorId)
    );

    return { cover: cover_image_url, logo: logo_image_url };
  };

  const resultVendor = (id) => {
    const vendor = vendorList?.filter((vendor) => {
      if (vendor?.id == id) return vendor;
    });

    let vendorName = vendor[0]?.name;

    return [vendorName, vendor];
  };

  const handleProductLoad = async (id, item) => {
    await dispatch(getProduct(id));
    await dispatch(getTaxon(item.taxons[0].id));
    navigation.navigate("ProductDetail");
  };

  // cart functions

  const findCartProduct = (itemID) => {
    const newItem = productsList.find((ele) => ele.id == itemID);
    setEnableQty(newItem);
  };

  const handleCart = () => {
    let item = productsList.find((x) => x.id === enableQty?.id);

    return item?.default_variant?.id;
  };

  const handleItemIncrement = () => {
    setInc(true);
    setItemQuantity(itemQuantity + 1);
  };

  const handleChangeQuantityClick = () => {
    clearTimeout(timeoutIdRef.current);
  };

  const handleItemDecrement = (lineItemQuantity) => {
    if (1 - itemQuantity == lineItemQuantity) {
      setShowItemCard(false);
    } else {
      setInc(false);
      setItemQuantity(itemQuantity - 1);
    }
  };

  const handleSetTimeoutDefault = (ID) => {
    let firstItem = productsList.find((x) => x.id == ID);
    console.log("first", firstItem);
    setTimeout(() => {
      dispatch(
        addItem(cart?.token, {
          variant_id: firstItem?.default_variant?.id,
          quantity: 1,
        })
      );
      setShowItemCard(false);
    }, 2000);
  };

  const handleSetTimeoutInc = (tempId, qty) => {
    const id = setTimeout(() => {
      if (!inCart) {
        dispatch(
          addItem(cart?.token, {
            variant_id: handleCart(),
            quantity: itemQuantity + 1,
          })
        );
        setShowItemCard(false);
      } else {
        dispatch(
          setQuantity(
            {
              line_item_id: tempId,
              quantity: qty + itemQuantity,
            },
            cart?.token
          )
        );
        setShowItemCard(false);
        setItemQuantity(1);
      }
    }, 2000);

    timeoutIdRef.current = id;
  };

  const handleSetTimeoutDec = (tempId, qty) => {
    console.log("ORIGINAL", qty);
    if (1 - itemQuantity == qty) {
      dispatch(removeLineItem(tempId, {}, cart?.token));
      setShowItemCard(false);
    } else {
      const id = setTimeout(() => {
        dispatch(
          setQuantity(
            {
              line_item_id: tempId,
              quantity: qty + (itemQuantity - 2),
            },
            cart?.token
          )
        );
        setShowItemCard(false);
        setItemQuantity(0);
      }, 2000);
      timeoutIdRef.current = id;
    }
  };

  const closeIncBar = () => {
    const id = setTimeout(() => setShowItemCard(false), 2000);
    timeoutIdRef.current = id;
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
    return (
      <TouchableOpacity
        onPress={onPress}
        style={{ ...itemContainerStyle, width: width / 2 - 10 }}
      >
        <View style={{ position: "relative" }}>
          <Image
            source={{
              uri: `${HOST}/${item?.images[0]?.styles[3].url}`
                ? `${HOST}/${item?.images[0]?.styles[3].url}`
                : "",
            }}
            style={{
              width: imageStyle.width,
              height: imageStyle.height,
              resizeMode: "contain",
            }}
          />
          {showItemCard && item?.id === enableQty?.id ? (
            <View
              style={[
                styles.addLogo,
                { width: "95%", justifyContent: "space-between" },
              ]}
            >
              <TouchableOpacity
                onPress={() => {
                  handleChangeQuantityClick();
                  handleItemDecrement(tempArr[0]?.quantity);
                  handleSetTimeoutDec(tempArr[0]?.id, tempArr[0]?.quantity);
                }}
              >
                <Text style={styles.dynamicText}>--</Text>
              </TouchableOpacity>

              <Text style={styles.dynamicText}>
                {tempArr.length !== 0
                  ? inc
                    ? tempArr[0].quantity + (itemQuantity - 1)
                    : tempArr[0].quantity + (itemQuantity - 1)
                  : itemQuantity}
              </Text>

              <TouchableOpacity
                onPress={() => {
                  handleChangeQuantityClick();
                  handleItemIncrement();
                  handleSetTimeoutInc(tempArr[0]?.id, tempArr[0]?.quantity);
                }}
              >
                <Text style={styles.dynamicText}>+</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.addLogo}
              onPress={() => {
                closeIncBar();
                setItemQuantity(1);
                setShowItemCard(true);
                findCartProduct(item?.id);
                {
                  tempArr[0] ? setInCart(true) : setInCart(false);
                }
              }}
            >
              {item?.id == tempArr[0]?.variant?.product?.id ? (
                <View style={styles.afterText}>
                  <Text style={{ color: colors.white, fontSize: 25 }}>
                    {tempArr.length !== 0 ? tempArr[0].quantity : 1}
                  </Text>
                </View>
              ) : (
                <Icon
                  name="plus"
                  type="ant-design"
                  size={25}
                  borderRadius={10}
                  color={colors.btnLink}
                  backgroundColor={colors.white}
                  onPress={() => {
                    setItemQuantity(1);
                    setShowItemCard(true);
                    findCartProduct(item?.id);
                    {
                      tempArr[0]
                        ? setInCart(true)
                        : (setInCart(false), handleSetTimeoutDefault(item?.id));
                    }
                  }}
                />
              )}
            </TouchableOpacity>
          )}
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

  const newJustInRenderItem = ({ item, index }) => {
    return (
      <FlatListImageItem
        key={index.toString()}
        item={item}
        onPress={() => {
          handleProductLoad(item?.id, item);
        }}
        imageStyle={styles.newJustInImage}
        itemContainerStyle={styles.newJustInItemContainer}
      />
    );
  };

  const flatListUpperComponent = () => {
    return (
      <>
        <View
          style={[
            {
              height: 96,
              flexDirection: "row",
              justifyContent: "space-between",
              backgroundColor: "white",
              padding: 10,
              marginVertical: 20,
              borderRadius: 20,
              elevation: 5,
            },
            globalStyles.iosShadow,
          ]}
        >
          <Image
            source={{
              uri: logo_image_url
                ? logo_image_url
                : "https://cdn.pixabay.com/photo/2018/06/29/08/15/doodle-3505459_960_720.png",
            }}
            style={{ flex: 0.3 }}
            resizeMode={"contain"}
          />
          <Text
            style={{
              flex: 0.6,
              textAlignVertical: "center",
              textAlign: "left",
            }}
          >
            {bio ? `${bio}` : ""}
          </Text>
        </View>

        {/* // *Cover Image*/}
        <View
          style={{
            height: 219,
            borderRadius: 10,
            overflow: "hidden",
            marginVertical: 10,
          }}
        >
          <Image
            source={{
              uri: cover_image_url
                ? cover_image_url
                : "https://cdn.pixabay.com/photo/2018/06/29/08/15/doodle-3505459_960_720.png",
            }}
            style={{ flex: 1, width: "100%" }}
            resizeMode={"cover"}
          />
        </View>

        {/* // *Description */}
        <View
          style={[
            {
              marginVertical: 10,
              marginHorizontal: 2,
              padding: 10,
              borderRadius: 10,
              backgroundColor: "white",
              border: 1,
              borderColor: "transparent",
              elevation: 5,
            },
            globalStyles.iosShadow,
          ]}
        >
          <Text style={styles.descriptionTitle}>Om oss</Text>
          <HTML
            source={{
              html: `<p style='text-align: justify;'>${selectedVendor?.about_us}</p>`,
            }}
            style={styles.buttonText}
          />
        </View>

        <Text style={styles.descriptionTitle}>Populære varer</Text>
      </>
    );
  };

  const listFooterComponent = () => {
    return (
      <>
        {/** // TODO: see the entire section (BUTTON) */}

        <TouchableOpacity
          style={styles.seeMoreButton}
          onPress={() => navigation.navigate("ProductsList")}
        >
          <Text style={styles.seeMoreButtonText}>SE HELE UTVALGET</Text>
        </TouchableOpacity>
      </>
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: "center",
        backgroundColor: "#fff",
      }}
    >
      {/*//* Header */}

      <View
        style={[
          styles.detailHeader,
          Platform.OS === "android" ? { marginTop: 30 } : { marginTop: 0 },
        ]}
      >
        <TouchableOpacity
          style={[styles.detailHeaderContainer, globalStyles.iosShadow]}
          onPress={() => navigation.goBack()}
        >
          <Icon
            name="cross"
            type="entypo"
            size={24}
            style={{ color: colors.black }}
          />
        </TouchableOpacity>

        <Text style={styles.detailHeaderText} numberOfLines={1}>
          {selectedVendor.name}
        </Text>
      </View>

      <SafeAreaView
        style={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* // TODO: Popular Items */}
        <View style={{ marginVertical: 10 }}>
          <FlatList
            data={selectedVendor.products.slice(0, 4)}
            keyExtractor={(item, index) => index.toString()}
            renderItem={newJustInRenderItem}
            numColumns={2}
            ListHeaderComponent={flatListUpperComponent}
            ListFooterComponent={listFooterComponent}
            showsVerticalScrollIndicator={false}
            columnWrapperStyle={{
              justifyContent: "space-between",
            }}
          />
        </View>
      </SafeAreaView>
    </SafeAreaView>
  );
};

export default connect()(ProducerDetailScreen);
