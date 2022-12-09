import {
  FlatList,
  Image,
  ImageBackground,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useRef, useState, useEffect } from "react";
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
  resetError,
  setQuantity,
} from "../../../../redux";
import { connect, useSelector } from "react-redux";
import { HOST } from "../../../../res/env";
import { colors } from "../../../../res/palette";
import { Icon } from "react-native-elements";
import { storeData } from "../../../../redux/rootReducer";
import ActivityIndicatorCard from "../../../../library/components/ActivityIndicatorCard";
import BottomBarCart from "../../../components/bottomBarCart";

import Toast from 'react-native-toast-message';
import { toastConfig } from '../../../components/CustomToast/CustomToast'

const MostBoughtProducts = ({
  dispatch,
  navigation,
  productsList,
  cart,
  saving,
}) => {
  const vendorList = useSelector((state) => state.taxons.vendors);
  const { error } = useSelector((state) => state.checkout);
  const { mostBoughtGoods } = useSelector((state) => state.taxons);
  const [mostBought, setMostBought] = useState([]);

  const [showItemCard, setShowItemCard] = useState(false);
  const [enableQty, setEnableQty] = useState({});
  const [cartTempQty, setCartTempQty] = useState(1);
  const [inc, setInc] = useState("false");


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

  useEffect(() => {
    const timeOutId = timeoutIdRef.current;
    setMostBought([]);
    if (productsList.length === 0) {
      handleProductsLoad();
    }
    dispatch(getMostBoughtGoods());

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


  //console.log("cartTempQty", cartTempQty);


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
    const tempData = cart.line_items.find(
      (ele) => item.id == ele?.variant?.product?.id
    );

    return (
      <TouchableOpacity onPress={() => {
        storeData("selectedVendor", 
        resultVendor(item?.vendor?.id)[1]);
        handleProductLoad(item?.id, item);
      }}
        style={{ ...styles.newJustInItemContainer }}>
        <View>
          <Image
            source={{
              uri: item.images
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

        <Toast
          config={toastConfig}
          position='bottom'
          bottomOffset={40}
        />
        <BottomBarCart />
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
