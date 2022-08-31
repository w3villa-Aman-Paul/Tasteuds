import {
  FlatList,
  Image,
  ImageBackground,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useRef, useState, useEffect } from "react";
import { globalStyles } from "../../../../styles/global";
import { styles } from "../../ShopitStack/HomeScreen/styles";
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
  removeLineItem,
  setQuantity,
} from "../../../../redux";
import { connect, useSelector } from "react-redux";
import { HOST } from "../../../../res/env";
import { colors } from "../../../../res/palette";
import { Icon } from "react-native-elements";
import { storeData } from "../../../../redux/rootReducer";
import ActivityIndicatorCard from "../../../../library/components/ActivityIndicatorCard";

const MostBoughtProducts = ({
  dispatch,
  navigation,
  route,
  productsList,
  cart,
  saving,
}) => {
  const vendorList = useSelector((state) => state.taxons.vendors);
  const { mostBoughtGoods } = useSelector((state) => state.taxons);

  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [showItemCard, setShowItemCard] = useState(false);
  const [enableQty, setEnableQty] = useState(null);
  const [mostBought, setMostBought] = useState([]);
  const [inc, setInc] = useState("false");
  const [itemQuantity, setItemQuantity] = useState(1);
  const [inCart, setInCart] = useState(false);

  const timeoutIdRef = useRef();

  useEffect(() => {
    const timeOutId = timeoutIdRef.current;
    setMostBought([]);
    if (productsList.length === 0) {
      handleProductsLoad();
    }
    dispatch(getMostBoughtGoods());

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
    let load = false;

    if (!load) {
      loadMostBoughtGoods();
    }
    return () => {
      load = true;
    };
  }, [mostBought, mostBoughtGoods]);

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

  const handleItemIncrement = () => {
    setInc(true);
    setItemQuantity(itemQuantity + 1);
  };

  const handleSetTimeoutInc = (tempId, qty) => {
    const id = setTimeout(() => {
      if (!inCart) {
        dispatch(
          addItem(cart?.token, {
            variant_id: handleCart(),
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

  const handleItemDecrement = (lineItemQuantity) => {
    if (3 - itemQuantity > lineItemQuantity) {
      setShowItemCard(false);
    } else {
      setInc(false);
      setItemQuantity(itemQuantity - 1);
    }
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
      <TouchableOpacity onPress={onPress} style={{ ...itemContainerStyle }}>
        <View>
          <Image
            source={{
              uri: item.images
                ? `${HOST}/${item?.images[0]?.styles[3].url}`
                : null,
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
                  handleSetTimeoutInc(tempArr[0]?.id, tempArr[0]?.quantity);
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
                findCartProduct(item?.id);
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
            <TouchableOpacity style={styles.addLogo}>
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
                  handleSetTimeoutDefault(item?.id);
                }}
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

  const handleProductLoad = (id, item) => {
    dispatch(getProduct(id));
    dispatch(getTaxon(item.taxons[0].id));
    navigation.navigate("ProductDetail");
  };

  const newJustInRenderItem = ({ item, index }) => {
    return (
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
    );
  };

  const productsUnique = [
    ...new Map(mostBought.map((item) => [item["id"], item])).values(),
  ];

  if (saving) {
    return <ActivityIndicatorCard />;
  } else {
    return (
      <View style={{ ...globalStyles.containerFluid, ...styles.bg_white }}>
        <FlatList
          data={productsUnique}
          keyExtractor={(item, index) => index.toString()}
          renderItem={newJustInRenderItem}
          numColumns={2}
          style={{
            ...globalStyles.container,
            ...styles.bg_white,
          }}
          showsVerticalScrollIndicator={false}
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
  }
};

const mapStateToProps = (state) => ({
  productsList: state.products.productsList,
  pageIndex: state.products.pageIndex,
  meta: state.products.meta,
  cart: state.checkout.cart,
  saving: state.taxons.saving,
});

export default connect(mapStateToProps)(MostBoughtProducts);
