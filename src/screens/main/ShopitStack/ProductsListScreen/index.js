import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  LogBox,
  Pressable,
} from "react-native";
import { globalStyles } from "../../../../styles/global";
import { colors } from "../../../../res/palette";
import { styles } from "./styles";
import { connect } from "react-redux";
import { Icon } from "react-native-elements";
import ActivityIndicatorCard from "../../../../library/components/ActivityIndicatorCard";
import {
  savingTaxon,
  getProductsList,
  getProduct,
  setPageIndex,
  getMenus,
  getSubMenu,
  getSubMenuProducts,
  addItem,
  getCart,
  getSearchProduct,
  removeLineItem,
  setQuantity,
  sortByMostBought,
  sortByNewlyAdd,
  sortByPrice,
} from "../../../../redux";
import FilterFooter from "../../../../library/components/ActionButtonFooter/FilterFooter";
import { HOST } from "../../../../res/env";
import { useSelector } from "react-redux";
import { Snackbar } from "react-native-paper";
import { getData, removeData, storeData } from "../../../../redux/rootReducer";
import BottomBarCart from "../../../components/bottomBarCart";
import UpperNotification from "../../../components/DelieveryNotifyComponent/UpperNotification";
import { SafeAreaView } from "react-native-safe-area-context";

const ProductListScreen = ({
  navigation,
  route,
  dispatch,
  productsList,
  saving,
  pageIndex,
  meta,
}) => {
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [all, setAll] = useState(true);
  const [isSubAll, setIsSubAll] = useState(true);
  const [subLink, setSubLink] = useState("");
  const [isSubLink, setIsSubLink] = useState(false);
  const [activeMenus, setActiveMenus] = useState([]);
  const [activeSubMenu, setActiveSubMenu] = useState([]);
  const [isAll, setIsAll] = useState(true);
  const [sort, setSort] = useState(false);
  const [menuCords, setMenuCords] = useState([]);
  const [offsetMenu, setoffsetMenu] = useState({ x: 0, y: 0 });
  const [subMenuCords, setSubMenuCords] = useState([]);
  const [offsetSubMenu, setoffsetSubMenu] = useState({ x: 0, y: 0 });
  const [show, setShow] = useState(false);
  const [showItemCard, setShowItemCard] = useState(false);
  const [enableQty, setEnableQty] = useState(null);
  const [itemQuantity, setItemQuantity] = useState(1);
  const [inCartItem, setInCartItem] = useState([]);
  const [inc, setInc] = useState("false");
  const [isModelVisible, setModelVisible] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const [showTaxonProducts, setShowTaxonProducts] = useState(false);

  const [mostBought, setMostBought] = useState([]);
  const [newlyAdded, setNewlyAdded] = useState([]);

  const checkout = useSelector((state) => state.checkout);
  const errMessage = useSelector((state) => state.checkout.error);
  const cart = useSelector((state) => state.checkout.cart);
  const vendorList = useSelector((state) => state.taxons.vendors);
  const taxons = useSelector((state) => state.taxons);
  const menus = useSelector((state) => state.taxons.menus);
  const submenus = useSelector((state) => state.taxons.submenus);
  const { products } = useSelector((state) => state);
  const { mostBoughtGoods } = useSelector((state) => state.taxons);
  const { newAddedProducts } = useSelector((state) => state.taxons);
  const { selectedTaxonProducts } = useSelector((state) => state.products);
  const params = route?.params;

  const timeoutIdRef = useRef();

  useEffect(() => {
    loadMostBoughtGoods();
  }, [mostBought, mostBoughtGoods]);

  useEffect(() => {
    loadNewlyAddedGoods();
  }, [newlyAdded, newAddedProducts]);

  useEffect(() => {
    const timeOutId = timeoutIdRef.current;
    {
      products.sortedProductsList || dispatch(sortByMostBought(mostBought));
    }

    // dispatch(createCart());

    return () => {
      clearTimeout(timeOutId);
    };
  }, []);


  useEffect(() => {
    handleActiveMenu();
  }, [menus, params]);

  useEffect(() => {
    handleActiveSubMenu();
  }, [menus, submenus, params]);

  useEffect(() => {
    if (params) {
      handleAfterMenuSelect(params);
      setShowTaxonProducts(true);
    }
  }, [params, route]);

  useEffect(() => {
    {
      cart?.token || dispatch(getCart(cart.token));
    }
    {
      menus?.menu_items || dispatch(getMenus());
    }
    removeData("food");
    removeData("vendors");

    handleCartItemsQuantity();
  }, [cart.line_items]);

  const handleCartItemsQuantity = () => {
    let uniqueNew = [];

    if (cart?.line_items?.length > 0) {
      cart.line_items.map((ele) => {
        uniqueNew.push({
          id: ele.id,
          quantity: ele.quantity,
          productId: ele?.variant?.product?.id,
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

  useEffect(() => {
    {
      productsList.length === 0 && handleProductsLoad();
    }
  }, [route.params]);

  LogBox.ignoreLogs([
    "Non-serializable values were found in the navigation state",
  ]);

  const paramsDispatchHandler = async (params) => {
    await handleActiveMenuClick(params.menu);
    setAll(true);
    setIsAll(false);
    setIsSubLink(true);
    setIsSubAll(true);
    showTaxonProducts(true);
    await dispatch(
      getSubMenu(
        params?.menu?.permalink
          ? params?.menu?.permalink?.split("/").slice(0, -1).join("/")
          : params.menu.link.slice(2).toLowerCase()
      )
    );
    setSubLink(
      params?.menu?.permalink
        ? params?.menu?.permalink?.split("/").slice(0, -1).join("/")
        : params.menu.link.slice(2).toLowerCase()
    );
    handleClick(handleUncheckAllMenus(activeMenus), params?.menu);
    await dispatch(getSubMenuProducts(subLink));
  };

  const handleAfterMenuSelect = (params) => {
    if (params.route === "ProductDetail") {
      switch (params.type) {
        case 2:
          paramsDispatchHandler(params);
          break;
        case 3:
          handleActiveMenu();
          handleActiveSubMenu();
          paramsDispatchHandler(params);
          dispatch(getSubMenuProducts(params.menu.permalink.toLowerCase()));
          setIsSubAll(false);
          setAll(false);
          setIsAll(false);
          handleSubClick(handleUncheckAllMenus(activeSubMenu), params.menu);

          break;
        default:
          break;
      }
    }

    if (params.route === "Categories") {
      paramsDispatchHandler(params);
      handleActiveMenu();
      handleActiveSubMenu();
    }
  };

  const resultVendor = (id) => {
    const vendor = vendorList?.filter((vendor) => vendor?.id == id);
    let vendorName = vendor ? vendor[0]?.name : "";
    return [vendorName, vendor];
  };

  const dismissSnackbar = () => setSnackbarVisible(false);

  const handleActiveMenu = () => {
    const unactive = menus?.menu_items
      ?.filter(
        (menu) =>
          menu.name !== "PRODUSENTER" &&
          menu.name !== "Categories" &&
          menu.name !== "Kategorier" &&
          menu.name !== "Lokalprodukter"
      )
      // ?.sort((a, b) => a.name.localeCompare(b.name))
      ?.map((item) => {
        return { ...item, isActive: false };
      });

    setActiveMenus(unactive);
  };

  const handleActiveSubMenu = () => {
    const unactive = submenus?.children?.map((item) => {
      return { ...item, isActive: false };
    });

    setActiveSubMenu(unactive);
  };

  const handleClick = (activeMenus, menu) => {
    const newArr = [...activeMenus];

    const index = newArr.findIndex((item) => {
      if (menu.permalink) {
        return item.linked_resource.id === menu.parent.id;
      } else {
        return item.id === menu.id;
      }
    });
    newArr[index].isActive = true;
    setActiveMenus(newArr);
  };

  const handleSubClick = (activeMenus, menu) => {
    const newArr = [...activeMenus];
    const index = newArr.findIndex((item) => {
      return item.id === menu.id;
    });

    {
      newArr[index]
        ? (newArr[index].isActive = true)
        : console.log("subMenuSelect", index, newArr, newArr[index]);
    }

    setActiveSubMenu(newArr);
  };

  const handleAllClick = (array) => {
    setShowTaxonProducts(false);
    setActiveMenus(handleUncheckAllMenus(array));
    setIsAll(true);
  };

  const handleUncheckAllMenus = (arr) => {
    const newArray = arr.map((item) => {
      return { ...item, isActive: false };
    });

    return newArray;
  };

  const handleSubAllClick = (array) => {
    setActiveSubMenu(handleUncheckAllMenus(array));
    setIsSubAll(true);
  };

  const width = Dimensions.get("window").width - 10;

  const sheetRef = React.useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const snapPoints = useMemo(() => ["50%"], []);

  const handleFilter = () => {
    setShow(false);
    setIsOpen(true);
  };

  const handleSort = () => {
    setSort(true);
  };

  const findCartProduct = (itemID) => {
    const newItem = productsList.find((ele) => ele.id == itemID);
    setEnableQty(newItem);
  };

  const handleCart = () => {
    let item = productsList.find((x) => x.id === enableQty?.id);

    return item?.default_variant?.id;
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

  const handleSetTimeoutDefault = (ID, item) => {
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

    timeoutIdRef.current = id;
  };

  const findItemInCart = (id) => {
    let cartItem = cart.line_items.filter((ele) => id == ele.id);

    return cartItem;
  };

  const findItemTempCartVariable = (item) => {
    let element = inCartItem?.find((ele) => ele.productId == item?.id);

    return element;
  };

  const handleSetTimeoutInc = (tempId, qty) => {
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
  };

  const handleSetTimeoutDec = (tempId, qty, item) => {
    let itemInCart = inCartItem.find((ele) => ele.productId == item?.id);
    if (3 - itemQuantity > qty) {
      dispatch(removeLineItem(tempId, {}, cart?.token));

      if (item?.id && itemInCart) {
        setUniqueItemInCartVariable([
          ...inCartItem.filter((pro) => item?.id !== pro.productId),
        ]);
      }

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
  };

  const closeIncBar = () => {
    const id = setTimeout(() => setShowItemCard(false), 2000);
    timeoutIdRef.current = id;
  };

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
  ``;

  const loadNewlyAddedGoods = () => {
    if (newAddedProducts?.length !== 0) {
      newAddedProducts?.forEach((item) => {
        const product = productsList.find((ele) => ele.id == item.id);

        if (!newlyAdded.includes(product)) {
          if (product && newlyAdded.length === 0) {
            newlyAdded.push({ ...product, qty: 1 });
          } else if (product && newlyAdded.length === newAddedProducts.length) {
            setNewlyAdded(newlyAdded);
          } else if (product && newlyAdded.length < newAddedProducts.length) {
            let temp = newlyAdded;
            temp.push({ ...product, qty: 1 });
            setNewlyAdded(temp);
          }
        }
      });
    }
  };

  const handleProductLoad = async (id, item) => {
    try {
      dispatch(getProduct(id)).then(() =>
        navigation.navigate("ProductDetail", { taxonId: item.taxons[0].id })
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleNewJustRenderItemClick = (item) => {
    storeData(
      "selectedVendor",
      resultVendor(
        item?.vendor?.data ? item.vendor?.data?.id : item?.vendor?.id
      )[1]
    );

    handleProductLoad(item?.id, item);
  };


  const setProductListHighToLow = () => {
    productsList.sort((a, b) => (Number(a.price) > Number(b.price) ? 1 : -1));
    setSort(false);
  };

  const setProductListLowToHigh = () => {
    productsList.sort((a, b) => (Number(a.price) < Number(b.price) ? 1 : -1));
    setSort(false);
  };

  const productsSortList = [
    {
      title: " Pris lav til høyh",
      onPress: () => {
        setIsAll(true);
        dispatch(sortByPrice(1, null, {})).then(() =>
          setProductListLowToHigh()
        );
      },
    },
    {
      title: "Pris høy til lav",
      onPress: () => {
        dispatch(sortByPrice(-1, null, {})).then(() =>
          setProductListHighToLow()
        );
      },
    },

    {
      title: " Mest populære",
      onPress: () => {
        dispatch(sortByMostBought(mostBought));
        setSort(false);
      },
    },
    {
      title: " Nylig lagt til",
      onPress: () => {
        dispatch(sortByNewlyAdd(newlyAdded));
        setSort(false);
      },
    },
  ];

  const handleEndReached = () => {
    if (Math.round(productsList.length / 20) >= pageIndex) {
      const response = dispatch(
        setPageIndex(Math.round(productsList.length / 20) + 1)
      );
      handleProductsLoad(response.payload);
    }
  };

  const handleAll = () => {
    const response = dispatch(setPageIndex(1));
    handleProductsLoad(response.payload);
  };

  const handleProductsLoad = (pageIndexAfterDispatch = null) => {
    dispatch(
      getProductsList(null, {
        pageIndex: pageIndexAfterDispatch || pageIndex,
        filter: {},
      })
    );
  };

  const scrollRef = React.useRef();
  const onScroll = () => {
    scrollRef.current
      ? scrollRef.current.scrollToOffset({
        offset: 0,
        animated: true,
      })
      : setTimeout(onPress, 50);
  };

  let data = taxons?.subMenuProducts?.products?.map((el) => el);

  function newJustInRenderItem({ item, index }) {
    const tempArr = cart.line_items.filter(
      (ele) => item?.id == ele?.variant?.product?.id
    );
    return (
      <TouchableOpacity
        onPress={() => {
          handleNewJustRenderItemClick(item);
          setSelectedId(item.id);
        }}
        style={{ ...styles.newJustInItemContainer, width: width / 2 - 5 }}
      >
        <View style={{ position: "relative" }}>
          <Image
            source={{
              uri: item.images
                ? `${HOST}/${item?.images[0]?.styles[3].url}`
                : null,
            }}
            style={{
              width: styles.newJustInImage.width,
              height: styles.newJustInImage.height,
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
              }}
            >
              {findItemTempCartVariable(item) && (
                <View style={styles.afterText}>
                  <Text style={{ color: colors.white, fontSize: 25 }}>
                    {findItemTempCartVariable(item)?.quantity}
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
                  handleSetTimeoutDefault(item?.id, item);
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
            {`${item?.vendor?.id ? resultVendor(item?.vendor?.id)[0] : ""}`}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  const handleActiveMenuClick = async (categories) => {
    let activeTaxons = Number(
      categories?.linked_resource
        ? categories.linked_resource.id
        : categories.id
    );

    dispatch(getSearchProduct(null, activeTaxons, []));
  };

  const scrollMenuRef = React.useRef();
  const scrollSubMenuRef = React.useRef();

  const flatListUpperElement = ()  => {
    return (
      <View
        style={{
          marginHorizontal: 15,
          marginTop: 10,
        }}
      >
        <UpperNotification />
        <View
          style={{
            ...globalStyles.mt16,
            ...styles.bgwhite,
            flexDirection: "row",
          }}
        >
          <TouchableOpacity
            key={"alle"}
            onPress={() => {
              setAll(true);
              handleAllClick(activeMenus);
              setIsSubLink(false);
              handleAll();
              setoffsetMenu({ x: 0, y: 0 });
            }}
            style={[isAll ? styles.active : {}]}
          >
            <Text
              style={[
                {
                  padding: 8,
                  fontSize: 20,
                  fontWeight: "700",
                  color: colors.primary,
                },
              ]}
            >
              Alle
            </Text>
          </TouchableOpacity>

          <ScrollView
            horizontal={true}
            ref={scrollMenuRef}
            contentOffset={offsetMenu}
            style={{ flexDirection: "row" }}
            showsHorizontalScrollIndicator={false}
          >
            {activeMenus
              ?.sort((a, b) => a.lft - b.lft)
              ?.map((menu, index, arr) => (
                <TouchableOpacity
                  keyExtractor={(menu, index) => menu?.id.toString()}
                  onLayout={(event) => {
                    const layout = event.nativeEvent.layout;
                    menuCords[index] = layout.x;
                    setMenuCords(menuCords);
                  }}
                  onPress={async () => {
                    await handleActiveMenuClick(menu);
                    setAll(true);
                    setIsAll(false);
                    setSubLink(menu.link.slice(2).toLowerCase());
                    setShowTaxonProducts(true);
                    handleClick(handleUncheckAllMenus(arr), menu);
                    await dispatch(
                      getSubMenu(menu.link.slice(2).toLowerCase())
                    );
                    await dispatch(getSubMenuProducts(subLink));
                    setIsSubLink(true);

                    setoffsetMenu({ x: menuCords[index], y: 0 });
                  }}
                  style={[menu.isActive ? styles.active : styles.unactive]}
                >
                  <Text
                    style={[
                      {
                        padding: 8,
                        fontSize: 20,
                        fontWeight: "700",
                        color: colors.primary,
                      },
                    ]}
                  >
                    {menu.name}
                  </Text>
                </TouchableOpacity>
              ))}
          </ScrollView>
        </View>
        {isSubLink === false ? (
          <></>
        ) : (
          <View
            style={{
              ...globalStyles.mt16,
              marginBottom: 10,
              flexDirection: "row",
            }}
          >
            <TouchableOpacity
              key={"alle"}
              onPress={() => {
                setIsSubAll(true);
                setAll(true);
                handleSubAllClick(activeSubMenu);
                setoffsetMenu({ x: 0, y: 0 });
              }}
            >
              <Text style={isSubAll ? styles.subActive : styles.subUnactive}>
                Alle
              </Text>
            </TouchableOpacity>

            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              ref={scrollSubMenuRef}
              contentOffset={offsetSubMenu}
            >
              {activeSubMenu
                // ?.sort((a, b) => a.name.localeCompare(b.name))
                ?.map((submenu, index, arr) => (
                  <TouchableOpacity
                    keyExtractor={(submenu) => submenu?.id.toString()}
                    onLayout={(event) => {
                      const layout = event.nativeEvent.layout;
                      subMenuCords[index] = layout.x;
                      setSubMenuCords(subMenuCords);
                    }}
                    onPress={() => {
                      setIsSubAll(false);
                      setIsAll(false);
                      setAll(false);
                      setoffsetSubMenu({ x: subMenuCords[index], y: 0 });
                      dispatch(
                        getSubMenuProducts(submenu.permalink.toLowerCase())
                      );
                      handleSubClick(handleUncheckAllMenus(arr), submenu);
                    }}
                  >
                    <Text
                      style={
                        submenu.isActive ? styles.subActive : styles.subUnactive
                      }
                    >
                      {submenu?.name}
                    </Text>
                  </TouchableOpacity>
                ))}
            </ScrollView>
          </View>
        )}
      </View>
    );
  }

  // flatListLowerElement
  const flatListLowerElement = () => {
    return (
      <>
        {/* //*Bottom Buttons */}

        {saving && <ActivityIndicatorCard />}

        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 40,
          }}
        >
          <Text style={{ textAlign: "center" }}>Ingen flere produkter</Text>

          <TouchableOpacity
            style={{
              width: 120,
              marginTop: 20,
              marginBottom: 10,
              borderWidth: 1,
              borderRadius: 10,
              backgroundColor: "transparent",
              paddingVertical: 3,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={onScroll}
          >
            <Text>TIL TOPPEN</Text>
          </TouchableOpacity>
        </View>
      </>
    );
  };

  const stikyOptions = () => {
    return (
      <View
        style={{
          width: "100%",
          position: "absolute",
          bottom: 30,
          alignSelf: "center",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "transparent",
          marginBottom: 6,
        }}
      >
        <View style={{ flexDirection: "row", marginBottom: 10 }}>
          <TouchableOpacity
            style={[styles.stickyBottomBtn, globalStyles.iosShadow]}
            onPress={() => {
              setModelVisible(true);
              handleFilter();
            }}
          >
            <Image
              source={require("../../../../../assets/images/icons/slider.png")}
              style={{
                flex: 0.4,
                width: "100%",
                height: "100%",
                resizeMode: "contain",
              }}
            />
            <Text style={styles.buttonText}>FILTER</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.stickyBottomBtn, globalStyles.iosShadow]}
            onPress={() => {
              setModelVisible(true);
              handleSort();
            }}
          >
            <Image
              source={require("../../../../../assets/images/icons/up-down-arrow.png")}
              style={{
                flex: 0.4,
                width: "100%",
                height: "100%",
                resizeMode: "contain",
              }}
            />
            <Text style={styles.buttonText}>SORTER</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const sortContent = () => {
    return (
      <View
        style={{
          backgroundColor: "#232332",
          flex: 1,
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: colors.white,
            alignSelf: "center",
            fontSize: 20,
            marginTop: 5,
            marginBottom: 5,
          }}
        >
          Sorter
        </Text>
        <View style={{ flex: 1, justifyContent: "space-around" }}>
          {productsSortList.map((item, id) => {
            return (
              <View
                key={id}
                style={{
                  paddingVertical: 10,
                  paddingHorizontal: 10,
                  borderRadius: 10,
                  borderWidth: 1,
                  backgroundColor: colors.btnLink,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <TouchableOpacity onPress={item.onPress}>
                  <Text style={{ color: colors.white, fontSize: 18 }}>
                    {item.title}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </View>
    );
  };

  const filterList = [
    {
      title: "MATVARER",
      name: "food",
    },
    {
      title: "PRODUSENTER",
      name: "producers",
    },
  ];

  const bottomSheetContent = ({ navigation }) => {
    const [selectedCategory, setSelectedCategory] = useState([]);
    const [selectedVendors, setSelectedvendors] = useState([]);

    useEffect(() => {
      let isMounted = true;
      selectedFood().then((data) => {
        if (isMounted) setSelectedCategory(data);
      });

      return () => {
        isMounted = false;
      };
    }, [selectedCategory]);

    useEffect(() => {
      let isMounted = true;
      selectedVendor().then((data) => {
        if (isMounted) setSelectedvendors(data);
      });

      return () => {
        isMounted = false;
      };
    }, [selectedVendors]);

    const selectedFood = async () => {
      let data = await getData("food");

      return data;
    };

    const selectedVendor = async () => {
      let vendor = await getData("vendors");

      return vendor;
    };

    const handleDeselectFood = async (item) => {
      let data = [...selectedCategory];
      let index = data.indexOf(item);

      if (index > -1) {
        data[index].isChecked = false;
      }

      setSelectedCategory(data);
      storeData("food", data);
    };

    const handleDeselectVendor = async (item) => {
      let data = [...selectedVendors];
      let index = data.indexOf(item);

      if (index > -1) {
        data[index].isChecked = false;
      }

      setSelectedvendors(data);
      storeData("vendors", data);
    };

    let selectedFilterTaxon = selectedCategory?.filter(
      (ele) => ele?.isChecked === true
    );

    let selectedFilterVendor = selectedVendors?.filter(
      (ele) => ele?.isChecked === true
    );

    return (
      <View
        style={{
          backgroundColor: "#232332",
          flex: 1,
          justifyContent: "space-between",
        }}
      >
        <View>
          <Text
            style={{
              color: "#fff",
              textAlign: "center",
              fontSize: 20,
              fontFamily: "lato-medium",
              paddingTop: 20,
            }}
          >
            FILTRER SØKET
          </Text>

          <View style={{ marginTop: 20 }}>
            <View>
              {filterList.map((ele, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    style={{
                      padding: 5,
                      paddingVertical: 10,
                      flexDirection: "row",
                      borderBottomColor: "#3A3A59",
                      borderBottomWidth: 1,
                      alignItems: "center",
                    }}
                    onPress={() => {
                      setShow(true);
                      navigation.navigate(ele.name);
                    }}
                  >
                    <View
                      style={{
                        flex: 1,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{
                          flex: 0.4,
                          color: colors.white,
                          fontFamily: "lato-medium",
                          fontSize: 18,
                        }}
                      >
                        {ele.title}
                      </Text>

                      <View
                        style={{
                          flex: 0.5,
                          flexDirection: "row",
                          justifyContent: "flex-end",
                        }}
                      >
                        {ele.name === "food" &&
                          selectedCategory !== [] &&
                          selectedFilterTaxon?.length <= 1
                          ? selectedFilterTaxon?.map((item, index) => (
                            <View
                              key={index}
                              flexDirection={"row"}
                              style={styles.selectedFilter}
                            >
                              <Text style={styles.selectedFilterText}>
                                {item.name.length > 11
                                  ? `${item.name.slice(0, 11)}...`
                                  : item.name}
                              </Text>

                              <TouchableOpacity
                                onPress={() => handleDeselectFood(item)}
                              >
                                <Icon
                                  name="close"
                                  type="material-icons"
                                  size={18}
                                  color={colors.white}
                                />
                              </TouchableOpacity>
                            </View>
                          ))
                          : selectedFilterTaxon &&
                          ele.name === "food" && (
                            <View
                              style={[
                                styles.selectedFilter,
                                { alignItems: "flex-end" },
                              ]}
                            >
                              <Text
                                style={styles.selectedFilterText}
                              >{`${selectedFilterTaxon?.length} valgt`}</Text>
                            </View>
                          )}

                        {/* // *producers */}
                        {ele.name === "producers" &&
                          selectedVendors !== [] &&
                          selectedFilterVendor?.length <= 1
                          ? selectedFilterVendor?.map((item, index) => (
                            <View
                              key={index}
                              flexDirection={"row"}
                              style={styles.selectedFilter}
                            >
                              <Text style={styles.selectedFilterText}>
                                {item.name.length > 11
                                  ? `${item.name.slice(0, 11)}...`
                                  : item.name}
                              </Text>

                              <TouchableOpacity
                                onPress={() => handleDeselectVendor(item)}
                              >
                                <Icon
                                  name="close"
                                  type="material-icons"
                                  size={18}
                                  color={colors.white}
                                />
                              </TouchableOpacity>
                            </View>
                          ))
                          : selectedFilterVendor &&
                          ele.name === "producers" && (
                            <View
                              style={[
                                styles.selectedFilter,
                                { alignItems: "flex-end" },
                              ]}
                            >
                              <Text
                                style={styles.selectedFilterText}
                              >{`${selectedFilterVendor?.length} valgt`}</Text>
                            </View>
                          )}
                      </View>

                      <View style={{ flex: 0.05 }}>
                        <Icon
                          name="navigate-next"
                          type="material-icons"
                          size={28}
                          color="#fff"
                        />
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </View>

        <View
          style={{
            marginTop: 30,
            width: "100%",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: colors.btnLink,
              width: "90%",
              height: 35,
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => {
              // handleFilterSearch(selectedCategory, selectedVendors);
              setIsOpen(false);
            }}
          >
            <Text
              style={{
                color: colors.white,
                fontSize: 14,
                fontFamily: "lato-medium",
              }}
            >
              {`VIS ${show ? productsList.length : ""} VARER`}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  if (products.saving || savingTaxon) {
    return <ActivityIndicatorCard />;
  } else
    return (
      <>
        <SafeAreaView
          style={[globalStyles.containerFluid, styles.bgwhite, { flex: 1 }]}
          >
          {/* {flatListUpperElement()} */}
          <FlatList
            keyExtractor={(item) => item.id.toString()}
            data={
              isAll || all
                ? (showTaxonProducts &&
                  selectedTaxonProducts.filter((item) => item?.available)) ||
                productsList.filter((item) => item?.available)
                : data
            }
            renderItem={newJustInRenderItem}
            numColumns={2}
            ListHeaderComponent={flatListUpperElement}
            ListFooterComponent={flatListLowerElement}
            onEndReachedThreshold={0}
            onEndReached={handleEndReached}
            columnWrapperStyle={{
              width: "100%",
              justifyContent: "space-evenly",
            }}
          />
        </SafeAreaView>
        {stikyOptions()}
        {checkout.error !== null && saving === false ? (
          <Snackbar visible={snackbarVisible} onDismiss={dismissSnackbar}>
            {errMessage}
          </Snackbar>
        ) : (
          <></>
        )}
        {isOpen && (
          <FilterFooter
            value={sheetRef}
            snapPoints={snapPoints}
            onClose={() => setIsOpen(false)}
            bottomSheetContent={bottomSheetContent}
            isModelVisible={isModelVisible}
            setModelVisible={setModelVisible}
            setIsOpen={setIsOpen}
          />
        )}
        {sort && (
          <FilterFooter
            value={sheetRef}
            snapPoints={snapPoints}
            onClose={() => setSort(false)}
            bottomSheetContent={sortContent}
            isModelVisible={isModelVisible}
            setModelVisible={setModelVisible}
            setIsOpen={setSort}
          />
        )}
        <BottomBarCart />
      </>
    );
};

const mapStateToProps = (state) => ({
  saving: state.products.saving,
  savingTaxon: state.taxons.saving,
  productsList: state.products.productsList,
  minimumPriceRange: state.products.params.priceRange.minimum,
  maximumPriceRange: state.products.params.priceRange.maximum,
  pageIndex: state.products.pageIndex,
  meta: state.products.meta,
});

export default connect(mapStateToProps)(ProductListScreen);
