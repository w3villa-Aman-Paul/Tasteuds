import {
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
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
  setQuantity,
} from "../../../redux";
import { globalStyles } from "../../../styles/global";
import ActivityIndicatorCard from "../../../library/components/ActivityIndicatorCard";
import { storeData } from "../../../redux/rootReducer";

const ProducerDetailScreen = ({ dispatch, navigation, route }) => {
  const selectedVendor = useSelector((state) => state?.taxons?.selectedVendor);
  const cart = useSelector((state) => state.checkout.cart);
  const { productsList } = useSelector((state) => state.products);
  const vendorList = useSelector((state) => state.taxons.vendors);
  const { saving } = useSelector((state) => state.taxons);

  const [showItemCard, setShowItemCard] = useState(false);
  const [enableQty, setEnableQty] = useState(null);
  const [inc, setInc] = useState("false");
  const [itemQuantity, setItemQuantity] = useState(1);
  const [inCart, setInCart] = useState(false);
  const { bio, cover_image_url, logo_image_url, vendorSlug } = route.params;

  const timeoutIdRef = useRef();

  // useEffect(() => {
  //   const timeOutId = timeoutIdRef.current;
  //   let load = false;

  //   if (!load) {
  //     if (vendorSlug) {
  //       dispatch(getSelectedVendor(vendorSlug));
  //     }
  //   }

  //   return () => {
  //     clearTimeout(timeOutId);
  //     load = true;
  //   };
  // }, []);

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

  const findCartProduct = (item) => {
    // const newItem = productsList.find((ele) => ele.id == itemID);
    setEnableQty(item);
  };

  const handleCart = (item) => {
    // let item = productsList.find((x) => x.id === enableQty?.id);

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
    if (3 - itemQuantity > lineItemQuantity) {
      setShowItemCard(false);
    } else {
      setInc(false);
      setItemQuantity(itemQuantity - 1);
    }
  };

  const handleSetTimeoutDefault = (ID) => {
    handleChangeQuantityClick();
    let firstItem = productsList.find((x) => x.id == ID);
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

  const handleSetTimeoutInc = (item, tempId, qty) => {
    const id = setTimeout(() => {
      if (!inCart) {
        dispatch(
          addItem(cart?.token, {
            variant_id: handleCart(item),
            quantity: itemQuantity,
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
    if (3 - itemQuantity > qty) {
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

  // const FlatListImageItem = ({
  //   item,
  //   onPress,
  //   imageStyle,
  //   itemContainerStyle,
  // }) => {
  //   const tempArr = cart?.line_items?.filter(
  //     (ele) => item.id == ele?.variant?.product?.id
  //   );

  //   return (
  //     <TouchableOpacity onPress={() => {
  //       storeData("selectedVendor", resultVendor(item?.vendor?.id)[1]);
  //       handleProductLoad(item?.id, item);
  //     }}
  //      style={{ ...styles.newJustInItemContainer }}>
  //       <View style={{ position: "relative" }}>
  //         <Image
  //           source={{
  //             uri: item.images
  //               ? `${HOST}/${item?.images[0]?.styles[3].url}`
  //               : null,
  //           }}
  //           style={{
  //             width: styles.newJustInImage?.width,
  //             height: styles.newJustInImage?.height,
  //             resizeMode: "contain",
  //           }}
  //         />

  //         {showItemCard && item?.id === enableQty ? (
  //           <View
  //             style={[
  //               styles.addLogo,
  //               { width: "100%", justifyContent: "space-between" },
  //             ]}
  //           >
  //             <TouchableOpacity
  //               onPress={() => {
  //                 handleChangeQuantityClick();
  //                 handleItemDecrement(tempArr[0]?.quantity);
  //                 handleSetTimeoutDec(tempArr[0]?.id, tempArr[0]?.quantity);
  //               }}
  //             >
  //               <Icon
  //                 type="ant-design"
  //                 name="minus"
  //                 size={24}
  //                 color={colors.btnLink}
  //               />
  //             </TouchableOpacity>

  //             <Text style={styles.dynamicText}>
  //               {tempArr.length !== 0
  //                 ? inc
  //                   ? tempArr[0].quantity + (itemQuantity - 1)
  //                   : tempArr[0].quantity + (itemQuantity - 1)
  //                 : itemQuantity}
  //             </Text>

  //             <TouchableOpacity
  //               onPress={() => {
  //                 handleChangeQuantityClick();
  //                 handleItemIncrement();
  //                 handleSetTimeoutInc(item, item?.id, tempArr[0]?.quantity);
  //               }}
  //             >
  //               <Icon
  //                 type="ant-design"
  //                 name="plus"
  //                 size={24}
  //                 color={colors.btnLink}
  //               />
  //             </TouchableOpacity>
  //           </View>
  //         ) : tempArr[0] ? (
  //           <Pressable
  //             style={styles.addLogo}
  //             onPress={() => {
  //               closeIncBar();
  //               setItemQuantity(1);
  //               setShowItemCard(true);
  //               findCartProduct(item);
  //             }}
  //           >
  //             {item?.id == tempArr[0]?.variant?.product?.id && (
  //               <View style={styles.afterText}>
  //                 <Text style={{ color: colors.white, fontSize: 25 }}>
  //                   {tempArr.length !== 0 ? tempArr[0].quantity : 1}
  //                 </Text>
  //               </View>
  //             )}
  //           </Pressable>
  //         ) : (
  //           <TouchableOpacity
  //             style={styles.addLogo}
  //             onPress={() => {
  //               setItemQuantity(1);
  //               setShowItemCard(true);
  //               findCartProduct(item?.id);
  //               handleSetTimeoutDefault(item?.id);
  //             }}
  //           >
  //             <Icon
  //               name="plus"
  //               type="ant-design"
  //               size={25}
  //               borderRadius={10}
  //               color={colors.btnLink}
  //               backgroundColor={colors.white}
  //             />
  //           </TouchableOpacity>
  //         )}
  //       </View>
  //       <View style={styles.detailsContainer}>
  //         <Text numberOfLines={1} style={styles.title}>
  //           {item.name}
  //         </Text>
  //         <View style={styles.pricingContainer}>
  //           <Text style={[styles.prices, { color: colors.black }]}>
  //             {item.display_price} |
  //           </Text>
  //           <Text style={{ ...styles.prices, color: "#808080" }}>
  //             {item?.default_variant?.options_text
  //               ? item?.default_variant?.options_text.split(" ")[3] ||
  //                 item?.default_variant?.options_text.split(" ")[1]
  //               : null}
  //           </Text>
  //         </View>
  //         <Text numberOfLines={1} style={styles.description}>
  //           {`${resultVendor(item?.vendor?.id)[0]}`}
  //         </Text>
  //       </View>
  //     </TouchableOpacity>
  //   );
  // };

  const newJustInRenderItem = ({ item, index }) => {
    const tempArr = cart?.line_items?.filter(
      (ele) => item.id == ele?.variant?.product?.id
    );

    return (
      <TouchableOpacity onPress={() => {
        storeData("selectedVendor", resultVendor(item?.vendor?.id)[1]);
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

          {showItemCard && item?.id === enableQty ? (
            <View
              style={[
                styles.addLogo,
                { width: "100%", justifyContent: "space-between" },
              ]}
            >
              <TouchableOpacity
                onPress={() => {
                  handleChangeQuantityClick();
                  handleItemDecrement(tempArr[0]?.quantity);
                  handleSetTimeoutDec(tempArr[0]?.id, tempArr[0]?.quantity);
                }}
              >
                <Icon
                  type="ant-design"
                  name="minus"
                  size={24}
                  color={colors.btnLink}
                />
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
                  handleSetTimeoutInc(item, item?.id, tempArr[0]?.quantity);
                }}
              >
                <Icon
                  type="ant-design"
                  name="plus"
                  size={24}
                  color={colors.btnLink}
                />
              </TouchableOpacity>
            </View>
          ) : tempArr[0] ? (
            <Pressable
              style={styles.addLogo}
              onPress={() => {
                closeIncBar();
                setItemQuantity(1);
                setShowItemCard(true);
                findCartProduct(item);
              }}
            >
              {item?.id == tempArr[0]?.variant?.product?.id && (
                <View style={styles.afterText}>
                  <Text style={{ color: colors.white, fontSize: 25 }}>
                    {tempArr.length !== 0 ? tempArr[0].quantity : 1}
                  </Text>
                </View>
              )}
            </Pressable>
          ) : (
            <TouchableOpacity
              style={styles.addLogo}
              onPress={() => {
                setItemQuantity(1);
                setShowItemCard(true);
                findCartProduct(item?.id);
                handleSetTimeoutDefault(item?.id);
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
    // return (
    //   <FlatListImageItem
    //     key={index.toString()}
    //     item={item}
    //     onPress={() => {
    //       storeData("selectedVendor", resultVendor(item?.vendor?.id)[1]);
    //       handleProductLoad(item?.id, item);
    //     }}
    //     imageStyle={styles.newJustInImage}
    //     itemContainerStyle={styles.newJustInItemContainer}
    //   />
    // );
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
              uri: cover_image_url
                ? cover_image_url
                : "https://cdn-icons-png.flaticon.com/512/79/79976.pn"
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
      </SafeAreaView>
    );
  }
};

export default connect()(ProducerDetailScreen);
