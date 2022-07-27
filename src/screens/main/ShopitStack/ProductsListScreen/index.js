import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  LogBox,
  Platform,
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
  getTaxonsList,
  getTaxon,
  getCategories,
  getMenus,
  getSubMenu,
  getSubMenuProducts,
  addItem,
  getCart,
  getSearchProduct,
  removeLineItem,
  setQuantity,
} from "../../../../redux";
import FilterFooter from "../../../../library/components/ActionButtonFooter/FilterFooter";
import { HOST } from "../../../../res/env";
import { useSelector } from "react-redux";
import { Snackbar } from "react-native-paper";
import { getData, removeData, storeData } from "../../../../redux/rootReducer";
import { BottomSheetBackdrop } from "@gorhom/bottom-sheet";

const ProductListScreen = ({
  navigation,
  route,
  dispatch,
  productsList,
  saving,
  minimumPriceRange,
  maximumPriceRange,
  meta,
  pageIndex,
}) => {
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [all, setAll] = useState(true);
  const [isSubAll, setIsSubAll] = useState(true);
  const [subLink, setSubLink] = useState("");
  const [isSubLink, setIsSubLink] = useState(false);
  const [activeMenus, setActiveMenus] = useState([]);
  const [activeSubMenu, setActiveSubMenu] = useState(false);
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
  const [inCart, setInCart] = useState(false);

  const checkout = useSelector((state) => state.checkout);
  const errMessage = useSelector((state) => state.checkout.error);
  const cart = useSelector((state) => state.checkout.cart);
  const vendorList = useSelector((state) => state.taxons.vendors);
  const { products } = useSelector((state) => state);
  const taxons = useSelector((state) => state.taxons);
  const menus = useSelector((state) => state.taxons.menus);
  const submenus = useSelector((state) => state.taxons.submenus);
  const params = route?.params;

  const timeoutIdRef = useRef();

  useEffect(() => {
    const timeOutId = timeoutIdRef.current;

    return () => {
      clearTimeout(timeOutId);
    };
  }, []);

  useEffect(() => {
    handleActiveMenu();
  }, [menus]);

  useEffect(() => {
    handleActiveSubMenu();
  }, [menus, submenus]);

  useEffect(() => {
    if (params) handleAfterMenuSelect(params);
  }, [params]);

  useEffect(() => {
    dispatch(getCart(cart.token));
    dispatch(getMenus());
    removeData("food");
    removeData("vendors");
    dispatch(getTaxonsList());
    dispatch(getCategories());
  }, []);

  useEffect(() => {
    handleProductsLoad();
    return () => {
      dispatch(setPageIndex(1));
    };
  }, [route.params]);

  LogBox.ignoreLogs([
    "Non-serializable values were found in the navigation state",
  ]);

  const paramsDispatchHandler = async (params) => {
    await handleActiveMenuClick(params.menu);
    setAll(true);
    setIsAll(false);
    await dispatch(
      getSubMenu(
        params.menu.permalink
          ? params?.menu?.permalink?.split("/").slice(0, -1).join("/")
          : params.menu.link.slice(2).toLowerCase()
      )
    );
    setSubLink(
      params.menu.permalink
        ? params?.menu?.permalink?.split("/").slice(0, -1).join("/")
        : params.menu.link.slice(2).toLowerCase()
    );
    handleClick(handleUncheckAllMenus(activeMenus), params.menu);
    await dispatch(getSubMenuProducts(subLink));
    setIsSubLink(true);
    setIsSubAll(true);
  };

  const handleAfterMenuSelect = (params) => {
    {
      params.route === "Categories" && paramsDispatchHandler();
    }

    if (params.route === "ProductDetail") {
      switch (params.type) {
        case 2:
          paramsDispatchHandler(params);
          break;
        case 3:
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

  const snapPoints = ["50%"];

  const handleFilter = () => {
    setShow(false);
    setIsOpen(true);
  };

  const handleSort = () => {
    setSort(true);
  };

  const renderBackdrop = React.useCallback(
    (props) => (
      <BottomSheetBackdrop {...props} close={() => sheetRef.current.close()} />
    ),
    []
  );

  useEffect(() => {
    dispatch(getCart(cart.token));
  }, []);

  // const handleAddToBag = async (item) => {
  //   let vari = item.variants[0].id;
  //   await dispatch(
  //     addItem(cart.token, {
  //       variant_id: vari.toString(),
  //       quantity: 1,
  //     })
  //   );
  //   return setSnackbarVisible(true);
  // };

  const findCartProduct = (itemID) => {
    const newItem = productsList.find((ele) => ele.id == itemID);
    setEnableQty(newItem);
  };

  const handleCart = () => {
    let item = productsList.find((x) => x.id === enableQty?.id);

    return item?.default_variant?.id;
  };

  const handleSetTimeoutDefault = (ID) => {
    let firstItem = productsList.find((x) => x.id === ID);
    // console.log("TTTTT", firstItem);
    setTimeout(() => {
      dispatch(
        addItem(cart?.token, {
          variant_id: firstItem?.default_variant?.id,
          quantity: 1,
        })
      );
      setShowItemCard(false);
      setItemQuantity(0);
    }, 3000);
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
      }
      setShowItemCard(false);
      setItemQuantity(1);
    }, 4000);

    timeoutIdRef.current = id;
  };

  // console.log("INCART", inCart);

  const handleSetTimeoutDec = (tempId, qty) => {
    if (qty === 1) {
      dispatch(removeLineItem(tempId, {}, cart?.token));
      // setTempItem(0);
      setShowItemCard(false);
      setInCart(false);
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
      }, 4000);
      timeoutIdRef.current = id;
    }
  };

  const handleItemIncrement = () => {
    setItemQuantity(itemQuantity + 1);
  };

  const handleChangeQuantityClick = () => {
    clearTimeout(timeoutIdRef.current);
  };

  const handleItemDecrement = () => {
    setItemQuantity(itemQuantity - 1);
  };

  // Item Rendering..............................................................
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
        style={{ ...itemContainerStyle, width: width / 2 - 5 }}
      >
        <View style={{ position: "relative" }}>
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
                  handleItemDecrement();
                  handleSetTimeoutDec(tempArr[0]?.id, tempArr[0]?.quantity);
                }}
              >
                <Text style={styles.dynamicText}>-</Text>
              </TouchableOpacity>

              <Text style={styles.dynamicText}>
                {tempArr.length !== 0
                  ? tempArr[0].quantity + (itemQuantity - 1)
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
                setItemQuantity(1);
                setShowItemCard(true);
                findCartProduct(item?.id);

                {
                  !inCart && itemQuantity == 1
                    ? handleSetTimeoutDefault(item?.id)
                    : null;
                }
                {
                  item?.id == tempArr[0]?.variant?.product?.id
                    ? setInCart(true)
                    : setInCart(false);
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
            {`${item?.vendor?.id ? resultVendor(item?.vendor?.id)[0] : ""}`}
          </Text>
          <View style={styles.pricingContainer}>
            <Text style={[styles.prices, { color: colors.black }]}>
              {item.display_price}||{" "}
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

  //..........................................................................................

  const setProductListHighToLow = () => {
    productsList.sort((a, b) => (a.price < b.price ? 1 : -1));
    setSort(false);
  };

  const setProductListLowToHigh = () => {
    productsList.sort((a, b) => (a.price > b.price ? 1 : -1));
    setSort(false);
  };

  const productsSortList = [
    {
      title: "Price: lowest to high",
      onPress: () => setProductListHighToLow(),
    },
    {
      title: "Price: highest to low",
      onPress: () => setProductListLowToHigh(),
    },
    {
      title: "Cancel",
      containerStyle: { backgroundColor: colors.error },
      titleStyle: { color: "white" },
      onPress: () => setSort(false),
    },
  ];

  const handleEndReached = () => {
    const response = dispatch(setPageIndex(pageIndex + 1));
    handleProductsLoad(response.payload);
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

  const handleProductLoad = async (id, item) => {
    dispatch(getProduct(id));
    dispatch(getTaxon(item.taxons[0].id));

    navigation.navigate("ProductDetail");
  };

  let data = taxons?.subMenuProducts?.products?.map((el) => el);

  const newJustInRenderItem = ({ item, index }) => {
    return (
      <FlatListImageItem
        item={item}
        keyExtractor={(index) => index.toString()}
        onPress={() => {
          storeData("selectedVendor", resultVendor(item?.vendor?.id)[1]);

          handleProductLoad(item?.id, item);
        }}
        imageStyle={styles.newJustInImage}
        itemContainerStyle={[styles.newJustInItemContainer]}
      />
    );
  };

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

  const flatListUpperElement = () => {
    return (
      <View
        style={{
          marginHorizontal: 15,
          marginTop: 10,
        }}
      >
        <View
          style={[
            styles.topBanner,
            globalStyles.iosShadow,
            Platform.OS === "android" ? { marginTop: 10 } : { marginTop: 0 },
          ]}
        >
          <Image
            source={require("../../../../../assets/images/components/delivery-truck.png")}
            resizeMode={"contain"}
            style={{ flex: 0.2, marginRight: 10, height: "100%" }}
          />

          <View style={{ flex: 0.9, justifyContent: "center" }}>
            <Text
              style={{
                fontSize: 16,
                lineHeight: 18.75,
                fontWeight: "bold",
              }}
            >
              Bestill innen{" "}
              <Text style={{ color: colors.btnLink }}>tirdag 19.07</Text> og få
              varene levert hjem{" "}
              <Text style={{ color: colors.btnLink }}>torsdag 21.07</Text>
            </Text>
          </View>
        </View>

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
            {activeMenus?.map((menu, index, arr) => (
              <TouchableOpacity
                keyExtractor={(menu, index) => index.toString()}
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
                  handleClick(handleUncheckAllMenus(arr), menu);
                  await dispatch(getSubMenu(menu.link.slice(2).toLowerCase()));
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
  };

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
          bottom: 0,
          alignSelf: "center",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "transparent",
          marginBottom: 6,
          // paddingVertical: 10,
        }}
      >
        <View style={{ flexDirection: "row", marginBottom: 10 }}>
          <TouchableOpacity
            style={[styles.stickyBottomBtn, globalStyles.iosShadow]}
            onPress={() => handleFilter()}
          >
            <Text>FILTER</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.stickyBottomBtn, globalStyles.iosShadow]}
            onPress={() => handleSort()}
          >
            <Text>SORTER</Text>
          </TouchableOpacity>
        </View>

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
          Sort
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
                  borderColor: colors.white,
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

    // const handleFilterSearch = async (categories, vendors) => {
    //   let filterTaxons = categories
    //     ?.filter((item) => item?.isChecked)
    //     ?.map((item) => item?.id);

    //   let filterVendor = vendors
    //     ?.filter((item) => item?.isChecked)
    //     .map((item) => item?.id);
    //   dispatch(getSearchProduct(null, filterTaxons, filterVendor));
    // };

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
      <View style={[globalStyles.containerFluid, styles.bgwhite, { flex: 1 }]}>
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={isAll || all ? productsList : data}
          renderItem={newJustInRenderItem}
          numColumns={2}
          ListHeaderComponent={flatListUpperElement}
          ListFooterComponent={
            flatListLowerElement
            // meta.total_count !== productsList.length && (
            //   <ActivityIndicator size="large" />
            // )
          }
          ref={scrollRef}
          onEndReachedThreshold={0.3}
          onEndReached={() => {
            handleEndReached();
          }}
          columnWrapperStyle={{
            width: "100%",
            justifyContent: "space-evenly",
          }}
        />

        {stikyOptions()}

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
          />
        )}

        {sort && (
          <FilterFooter
            value={sheetRef}
            snapPoints={snapPoints}
            onClose={() => setSort(false)}
            renderBackdrop={renderBackdrop}
            bottomSheetContent={sortContent}
          />
        )}
      </View>
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
