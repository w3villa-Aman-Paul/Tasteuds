import {
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  Platform,
  Pressable,
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
  getSelectedVendor,
  getTaxon,
  removeLineItem,
  resetError,
  setQuantity,
} from "../../../redux";
import { globalStyles } from "../../../styles/global";
import ActivityIndicatorCard from "../../../library/components/ActivityIndicatorCard";
import { storeData } from "../../../redux/rootReducer";
import Toast from 'react-native-toast-message';
import { toastConfig } from '../../components/CustomToast/CustomToast'
import BottomBarCart from "../../components/bottomBarCart";

const ProducerDetailScreen = ({ dispatch, navigation, route }) => {
  const selectedVendor = useSelector((state) => state?.taxons?.selectedVendor);
  const cart = useSelector((state) => state.checkout.cart);
  const { error } = useSelector((state) => state.checkout);
  const { productsList } = useSelector((state) => state.products);
  const vendorList = useSelector((state) => state.taxons.vendors);
  const { saving } = useSelector((state) => state.taxons);

  const [showItemCard, setShowItemCard] = useState(false);
  const [enableQty, setEnableQty] = useState({});
  const [cartTempQty, setCartTempQty] = useState(1);
  const [inc, setInc] = useState("false");

  const { bio, cover_image_url, logo_image_url, vendorSlug } = route.params;

  const timeoutIdRef = useRef();

  useEffect(() => {
    if (error !== null) {
      const showToast = () => {
        Toast.show({
          type: 'error',
          text1: "Error",
          text2: error,
        });
      }
      showToast()
    }
    dispatch(resetError())
  }, [error])

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
    const newItem = productsList.find((ele) => ele.id === itemID);
    setEnableQty(newItem);
  };

  const clearTimeoutHandler = () => {
    clearTimeout(timeoutIdRef.current);
  };


  const qtyHandler = async (type, itemID) => {
    let existedItem = await checkItemInCart(itemID);
    if (type === "inc") {
      setCartTempQty((prev) => prev + 1)
    }
    else {
      if (3 - cartTempQty > existedItem?.quantity) {
        setShowItemCard(false);
        dispatch(removeLineItem(existedItem?.id, {}, cart?.token));
      }
      else {
        setCartTempQty((prev) => prev - 1)
      }
    }
  }

  const checkItemInCart = (itemID) => {
    let item = cart?.line_items?.find((ele) => ele?.variant?.product?.id === itemID);
    if (item) {
      console.log("INCART")
      return item
    }
    else {
      console.log("NOTINCART")
      return null;
    }
  }


  console.log("cartTempQty", cartTempQty);


  const addItemInCart = async (type, itemID, vID) => {
    let existedItem = await checkItemInCart(itemID);
    console.log("EXISTED", existedItem)
    if (type === "single") {
      const id = setTimeout(async () => {
        await dispatch(
          addItem(cart?.token, {
            variant_id: vID,
            quantity: 1,
          })
        );
        setShowItemCard(false);
      }, 2000)
      timeoutIdRef.current = id;
    }
    else if (type === "inc") {
      if (existedItem !== null) {
        setInc(true)
        const id = setTimeout(() => {
          dispatch(
            setQuantity(
              {
                line_item_id: existedItem?.id,
                quantity: existedItem?.quantity + cartTempQty,
              },
              cart?.token
            )
          );
          setShowItemCard(false);
        }, 2000)
        timeoutIdRef.current = id;
      }
      else {
        const id = setTimeout(() => {
          dispatch(
            addItem(cart?.token, {
              variant_id: vID,
              quantity: cartTempQty + 1,
            })
          );
          setShowItemCard(false);
        }, 2000)
        timeoutIdRef.current = id;
      }
    }
    else if (type === "dec") {
      if (existedItem !== null) {
        setInc(false)
        const id = setTimeout(() => {
          if (3 - cartTempQty > existedItem?.quantity) {
            null
          }
          else {
            dispatch(
              setQuantity(
                {
                  line_item_id: existedItem?.id,
                  quantity: existedItem?.quantity + (cartTempQty - 2),
                },
                cart?.token
              )
            );
          }
          setShowItemCard(false);
        }, 2000)
        timeoutIdRef.current = id;
      }
      else {
        const id = setTimeout(() => {
          dispatch(
            addItem(cart?.token, {
              variant_id: vID,
              quantity: cartTempQty - 1,
            })
          );
          setShowItemCard(false);
        }, 2000)
        timeoutIdRef.current = id;
      }
    }
    else {
      if (existedItem != null) {
        const id = setTimeout(() => {
          setShowItemCard(false);
        }, 2000)
        timeoutIdRef.current = id;
      }
    }
  }

  // END OF CART FUNCTION




  const newJustInRenderItem = ({ item, index }) => {
    const tempData = cart?.line_items?.find(
      (ele) => item.id == ele?.variant?.product?.id
    );

    return (
      <TouchableOpacity onPress={() => {
        storeData("selectedVendor",
          resultVendor(item?.vendor?.id)[1]);
        handleProductLoad(item?.id, item);
      }}
        style={{ ...styles.newJustInItemContainer }}>
        <View style={{ position: "relative" }}>
          <Image
            source={{
              uri: item?.images
                ? `${HOST}/${item?.images[0]?.styles[3].url}`
                : null,
            }}
            style={{
              width: styles.newJustInImage?.width,
              height: styles.newJustInImage?.height,
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
                  clearTimeoutHandler();
                  qtyHandler("dec", item?.id)
                  addItemInCart("dec", item?.id, item?.default_variant?.id)
                }}
                style={{ height: "100%", width: 30 }}
              >
                <Icon
                  type="ant-design"
                  name="minus"
                  size={24}
                  color={colors.btnLink}
                />
              </TouchableOpacity>

              <Text style={styles.dynamicText}>
                {tempData ? inc ? tempData?.quantity + (cartTempQty - 1) : tempData?.quantity + (cartTempQty - 1) : cartTempQty}
              </Text>

              <TouchableOpacity
                onPress={() => {
                  clearTimeoutHandler();
                  qtyHandler("inc", item?.id)
                  addItemInCart("inc", item?.id, item?.default_variant?.id)
                }}
                style={{ height: "100%", width: 30 }}
              >
                <Icon
                  type="ant-design"
                  name="plus"
                  size={24}
                  color={colors.btnLink}
                />
              </TouchableOpacity>
            </View>
          ) :
            tempData ? (
              <Pressable
                style={styles.addLogo}
                onPress={() => {
                  setShowItemCard(true);
                  findCartProduct(item?.id);
                  setCartTempQty(1);
                  addItemInCart("", item?.id, item?.default_variant?.id)
                }}
              >
                {
                  <View style={styles.afterText}>
                    <Text style={{ color: colors.white, fontSize: 25 }}>
                      {tempData?.quantity}
                    </Text>
                  </View>
                }
              </Pressable>
            ) : (
              <TouchableOpacity
                style={styles.addLogo}
                onPress={() => {
                  setShowItemCard(true);
                  findCartProduct(item?.id);
                  setCartTempQty(1);
                  addItemInCart("single", item?.id, item?.default_variant?.id)
                }}
              >
                <Icon
                  name="plus"
                  type="ant-design"
                  size={25}
                  borderRadius={10}
                  color={colors.btnLink}
                  backgroundColor={colors.white}
                />
              </TouchableOpacity>
            )}
        </View>
        <View style={styles.detailsContainer}>
          <Text numberOfLines={1} style={styles.title}>
            {item.name}
          </Text>
          <View style={styles.pricingContainer}>
            <Text style={[styles.prices, { color: colors.black }]}>
              {item.display_price} |
            </Text>
            <Text style={{ ...styles.prices, color: "#808080" }}>
              {item?.default_variant?.options_text
                ? item?.default_variant?.options_text.split(" ")[3] ||
                item?.default_variant?.options_text.split(" ")[1]
                : null}
            </Text>
          </View>
          <Text numberOfLines={1} style={styles.description}>
            {`${resultVendor(item?.vendor?.id)[0]}`}
          </Text>
        </View>
      </TouchableOpacity>
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
              alignItems: "center",
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
              uri: `${HOST}/${selectedVendor?.image?.styles[6].url}` ? `${HOST}/${selectedVendor?.image?.styles[6].url}`
                : "https://cdn-icons-png.flaticon.com/512/79/79976.png"
            }}
            style={{ flex: 0.3, height: "100%" }}
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
              uri: cover_image_url//`${item?.cover_image_url}` ? `${item?.cover_image_url}` : "https://cdn-icons-png.flaticon.com/512/79/79976.png"
            }}
            style={{ flex: 1, width: "100%" }}
            resizeMode={"contain"}
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
              html: `<p style='text-align: justify;margin: 0; padding: 0;'>${selectedVendor?.about_us}</p>`,
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

  if (saving) {
    return <ActivityIndicatorCard />;
  } else {
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
              data={selectedVendor?.products
                ?.filter((item) => item.available)
                .slice(0, 4)}
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

        <Toast
          config={toastConfig}
          position='bottom'
          bottomOffset={40}
        />

        <BottomBarCart />

      </SafeAreaView>
    );
  }
};

export default connect()(ProducerDetailScreen);
