import {
  FlatList,
  Image,
  ImageBackground,
  Pressable,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
  ScrollView,
  SafeAreaView,
} from "react-native";
import React, { useCallback, useRef, useState, useEffect } from "react";
import { globalStyles } from "../../../../styles/global";
import { styles } from "./styles";
import { Snackbar } from "react-native-paper";
import {
  addItem,
  createCart,
  getInitialProductList,
  getMostBoughtGoods,
  getProduct,
  getProductsList,
  getSelectedVendor,
  getTaxon,
  getWeeklyProducer,
  removeLineItem,
  setQuantity,
} from "../../../../redux";
import { connect, useSelector } from "react-redux";
import { HOST } from "../../../../res/env";
import { colors } from "../../../../res/palette";
import { Icon } from "react-native-elements";
import { storeData } from "../../../../redux/rootReducer";
import BottomBarCart from "../../../components/bottomBarCart";
import HomePageUpperComponent from "./HomePageUpperComponent";

const HomeComponent = ({ dispatch, navigation, route, productsList, cart }) => {
  const vendorList = useSelector((state) => state.taxons.vendors);
  const { mostBoughtGoods } = useSelector((state) => state.taxons);

  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [showItemCard, setShowItemCard] = useState(false);
  const [enableQty, setEnableQty] = useState(null);
  const [mostBought, setMostBought] = useState([]);
  const [inc, setInc] = useState("false");
  const [itemQuantity, setItemQuantity] = useState(1);
  const [inCart, setInCart] = useState(false);
  const [productsUnique, setProductsUnique] = useState([]);
  const [cartItemQuantity, setCartItemQuantity] = useState(null);
  const [inCartItem, setInCartItem] = useState([]);

  const timeoutIdRef = useRef();

  useEffect(() => {
    const timeOutId = timeoutIdRef.current;
    if (productsList.length === 0) {
      handleProductsLoad();
    }

    // dispatch(createCart());

    return () => {
      clearTimeout(timeOutId);
    };
  }, []);

  useEffect(() => {
    let load = false;

    if (!load) {
      {
        productsList.length <= 10 &&
          dispatch(getInitialProductList(1, { pageIndex: 1, filter: null }));
      }
    }
    return () => {
      load = true;
    };
  }, [productsList]);

  useEffect(() => {
    loadMostBoughtGoods();
    setTimeout(() => {
      setProductsUnique([
        ...new Map(mostBought.map((item) => [item["id"], item])).values(),
      ]);
    }, 1000);
  }, [mostBoughtGoods]);

  useEffect(() => {
    handleCartItemsQuantity();
  }, [cart.line_items]);

  const handleCartItemsQuantity = () => {
    let uniqueNew = [];

    if (cart?.line_items?.length > 0) {
      cart.line_items.map((ele) => {
        uniqueNew.push({
          id: ele.id,
          quantity: ele.quantity,
          productId: ele?.variant?.product.id,
        });
      });
    }

    setUniqueItemInCartVariable(uniqueNew);
  };

  const setUniqueItemInCartVariable = (itemArray) => {
    setInCartItem([
      ...new Map(itemArray.map((item) => [item["productId"], item])).values(),
    ]);
  };

  console.log("cartItems", inCartItem);

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

  const resultVendor = (id) => {
    const vendor = vendorList?.filter((vendor) => {
      if (vendor?.id == id) return vendor;
    });

    let vendorName = vendor ? vendor[0]?.name : "";

    return [vendorName, vendor];
  };

  const findCartProduct = (itemID) => {
    const newItem = productsList.find((ele) => ele.id == itemID);
    setEnableQty(newItem);
  };

  const handleCart = () => {
    let item = productsList.find((x) => x.id === enableQty?.id);

    return item?.default_variant?.id;
  };

  const handleChangeQuantityClick = () => {
    clearTimeout(timeoutIdRef.current);
  };

  const handleItemIncrement = (item = null) => {
    setInc(true);
    setItemQuantity(itemQuantity + 1);

    let itemInCart = inCartItem.find((ele) => ele.productId == item?.id);

    if (item?.id && itemInCart) {
      setUniqueItemInCartVariable([
        ...inCartItem,
        { ...itemInCart, quantity: itemInCart.quantity + 1 },
      ]);
    } else if (item?.id) {
      setUniqueItemInCartVariable([
        ...inCartItem,
        { quantity: itemQuantity + 1, productId: item.id },
      ]);
    }
  };

  function handleSetTimeoutInc(tempId, qty) {
    let itemInCart = findItemInCart(tempId);

    const id = setTimeout(() => {
      if (!itemInCart[0]) {
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
  }

  function handleItemDecrement(lineItemQuantity) {
    if (3 - itemQuantity > lineItemQuantity) {
      setShowItemCard(false);
    } else {
      setInc(false);
      setItemQuantity(itemQuantity - 1);
    }
  }

  function handleSetTimeoutDec(tempId, qty, item) {
    let itemInCart = inCartItem.find((ele) => ele.productId == item?.id);

    if (3 - itemQuantity > qty) {
      dispatch(removeLineItem(tempId, {}, cart?.token));

      if (item?.id && itemInCart) {
        setUniqueItemInCartVariable([
          ...inCartItem.filter((pro) => item?.id !== pro.productId),
        ]);
      }

      console.log("deleteItem", itemInCart);
      setShowItemCard(false);
    } else {
      if (item?.id && itemInCart) {
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

        setUniqueItemInCartVariable([
          ...inCartItem,
          { ...itemInCart, quantity: itemInCart.quantity - 1 },
        ]);
        timeoutIdRef.current = id;
      }
    }
  }

  function handleSetTimeoutDefault(ID, item) {
    handleChangeQuantityClick();
    let firstItem = productsList.find((x) => x.id == ID);
    const id = setTimeout(() => {
      dispatch(
        addItem(cart?.token, {
          variant_id: firstItem?.default_variant?.id,
          quantity: 1,
        })
      );
      setUniqueItemInCartVariable([
        ...inCartItem,
        { quantity: 1, productId: item.id },
      ]);

      setShowItemCard(false);
    }, 2000);

    setUniqueItemInCartVariable([
      ...inCartItem,
      { quantity: 1, productId: item.id },
    ]);

    timeoutIdRef.current = id;
  }

  const findItemInCart = (id) => {
    let cartItem = cart.line_items.filter((ele) => id == ele.id);

    return cartItem;
  };

  const findItemTempCartVariable = (item) => {
    let element = inCartItem?.find((ele) => ele.productId == item?.id);

    return element;
  };

  const closeIncBar = () => {
    const id = setTimeout(() => setShowItemCard(false), 2000);
    timeoutIdRef.current = id;
  };

  const handleProductLoad = (id, item) => {
    try {
      dispatch(getProduct(id)).then(() =>
        navigation.navigate("ProductDetail", { taxonId: item.taxons[0].id })
      );
    } catch (e) {
      console.log(e);
    }
  };

  const handleNewJustRenderItemClick = (item) => {
    storeData("selectedVendor", resultVendor(item?.vendor?.id)[1]);
    handleProductLoad(item?.id, item);
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
      <TouchableOpacity onPress={onPress} style={{ ...itemContainerStyle }}>
        <View>
          <Image
            source={{
              uri: item.images
                ? `${HOST}/${item?.images[0]?.styles[3].url}`
                : item.image_attachement,
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
                  handleSetTimeoutDec(
                    tempArr[0]?.id,
                    tempArr[0]?.quantity,
                    item
                  );
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
                {tempArr.length !== 0
                  ? inc
                    ? tempArr[0].quantity + (itemQuantity - 1)
                    : tempArr[0].quantity + (itemQuantity - 1)
                  : itemQuantity}
              </Text>

              <TouchableOpacity
                onPress={() => {
                  handleChangeQuantityClick();
                  handleItemIncrement(item);
                  handleSetTimeoutInc(tempArr[0]?.id, tempArr[0]?.quantity);
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
          ) : findItemTempCartVariable(item) ? (
            <Pressable
              style={styles.addLogo}
              onPress={() => {
                closeIncBar();
                setItemQuantity(1);
                setShowItemCard(true);
                findCartProduct(item?.id);
                setCartItemQuantity(1);
              }}
            >
              {findItemTempCartVariable(item) && (
                <View style={styles.afterText}>
                  <Text style={{ color: colors.white, fontSize: 25 }}>
                    {/* {tempArr.length !== 0 ? tempArr[0].quantity : 1} */}
                    {findItemTempCartVariable(item)?.quantity}
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
                handleSetTimeoutDefault(item?.id, item);
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

  const handleProductsLoad = (pageIndexAfterDispatch = null) => {
    dispatch(
      getProductsList(null, {
        pageIndex: null,
        filter: {},
      })
    );
  };

  const newJustInRenderItem = ({ item, index }) => {
    return (
      <FlatListImageItem
        keyExtractor={(item, index) => index.toString()}
        item={item}
        onPress={() => handleNewJustRenderItemClick(item)}
        imageStyle={styles.newJustInImage}
        itemContainerStyle={styles.newJustInItemContainer}
      />
    );
  };

  // FlatListlowerComponent

  function flatListlowerComponent() {
    return (
      <>
        <TouchableOpacity
          style={styles.home_btn}
          onPress={() => navigation.navigate("ProductsList")}
        >
          <Text style={[styles.btn_text, { textAlign: "center" }]}>
            SE HELE UTVALGET
          </Text>
        </TouchableOpacity>
      </>
    );
  }

  return (
    <>
      <ScrollView
        style={{ ...globalStyles.containerFluid, ...styles.bg_white }}
      >
        <HomePageUpperComponent />
        <FlatList
          data={productsUnique}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) =>
            newJustInRenderItem((item = { item }), (index = { index }))
          }
          ListFooterComponent={flatListlowerComponent}
          numColumns={2}
          style={{
            ...globalStyles.container,
            ...styles.bg_white,
            width: "95%",
          }}
          showsVerticalScrollIndicator={false}
        />
        <Snackbar visible={snackbarVisible} onDismiss={dismissSnackbar}>
          Added to Cart !
        </Snackbar>
      </ScrollView>
      <BottomBarCart />
    </>
  );
};

const mapStateToProps = (state) => ({
  productsList: state.products.productsList,
  pageIndex: state.products.pageIndex,
  meta: state.products.meta,
  cart: state.checkout.cart,
});

export default connect(mapStateToProps)(HomeComponent);
