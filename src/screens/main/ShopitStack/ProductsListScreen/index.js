import * as React from "react";
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
  resetProductsList,
  resetProductsFilter,
  setPageIndex,
  getTaxonsList,
  getTaxon,
  getCategories,
  getMenus,
  getSubMenu,
  getSubMenuProducts,
  addItem,
  getCart,
  activeFunction,
  getSearchProduct,
} from "../../../../redux";
import FilterFooter from "../../../../library/components/ActionButtonFooter/FilterFooter";
import { HOST } from "../../../../res/env";
import { useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import { Snackbar } from "react-native-paper";
import { getData, removeData, storeData } from "../../../../redux/rootReducer";

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
  const [snackbarVisible, setSnackbarVisible] = React.useState(false);
  const [all, setAll] = React.useState(true);
  const [isSubAll, setIsSubAll] = React.useState(true);
  const [subLink, setSubLink] = React.useState("");
  const [isSubLink, setIsSubLink] = React.useState(false);
  const [activeMenus, setActiveMenus] = React.useState([]);
  const [activeSubMenu, setActiveSubMenu] = React.useState(false);
  const [isAll, setIsAll] = React.useState(true);
  const [sort, setSort] = React.useState(false);

  const checkout = useSelector((state) => state.checkout);
  const errMessage = useSelector((state) => state.checkout.error);
  const cart = useSelector((state) => state.checkout.cart);
  const vendorList = useSelector((state) => state.taxons.vendors);

  const taxons = useSelector((state) => state.taxons);
  const cate = useSelector((state) => state.taxons.categories);
  const menus = useSelector((state) => state.taxons.menus);
  const submenus = useSelector((state) => state.taxons.submenus);

  React.useEffect(() => {
    handleActiveMenu();
  }, [menus]);

  React.useEffect(() => {
    handleActiveSubMenu();
  }, [submenus, menus]);

  React.useEffect(() => {
    if (params) handleAfterMenuSelect(params);
  }, [menus, params, route]);

  LogBox.ignoreLogs([
    "Non-serializable values were found in the navigation state",
  ]);

  const params = route?.params;

  const handleAfterMenuSelect = async (params) => {
    console.log("Active>>", activeMenus);
    await dispatch(getSubMenu(params.menu.link.slice(2).toLowerCase()));
    setAll(false);
    setIsAll(true);
    setSubLink(params.menu.link.slice(2).toLowerCase());

    console.log("SubLink", subLink);
    handleClick(handleUncheckAllMenus(activeMenus), params.menu);
    await dispatch(getSubMenuProducts(subLink));
    setIsSubLink(true);
    setIsSubAll(true);
  };

  const resultVendor = (id) => {
    const vendor = vendorList?.filter((vendor) => {
      if (vendor?.id == id) return vendor;
    });

    let vendorName = vendor[0]?.name;

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

  const handleMenuClick = async (categories, vendors) => {
    let filterData = categories
      .filter((item) => item.isActive)
      .map((item) => Number(item.id));

    dispatch(getSearchProduct(null, filterData));
  };

  const handleClick = (activeMenus, menu) => {
    const newArr = [...activeMenus];
    const index = newArr.findIndex((item) => item.id === menu.id);
    newArr[index].isActive = true;
    setActiveMenus(newArr);
    dispatch(getSearchProduct(null, handleMenuClick(activeMenus)));
  };

  const handleSubClick = (activeMenus, menu) => {
    const newArr = [...activeMenus];
    const index = newArr.findIndex((item) => item.id === menu.id);
    newArr[index].isActive = true;

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
  const [isOpen, setIsOpen] = React.useState(false);

  const snapPoints = ["50%"];

  const handleFilter = () => {
    setIsOpen(true);
  };

  const handleSort = () => {
    setSort(true);
  };

  const handleSnapPress = React.useCallback((index) => {
    sheetRef.current?.snapToIndex(index);
    setIsOpen(true);
  }, []);

  React.useEffect(() => {
    dispatch(getCart(cart.token));
  }, []);

  const handleAddToBag = async (item) => {
    let vari = item.variants[0].id;
    dispatch(
      addItem(cart.token, {
        variant_id: vari.toString(),
        quantity: 1,
      })
    );
    return setSnackbarVisible(true);
  };

  console.log("products>>", productsList.length);

  // Item Rendering..............................................................
  const FlatListImageItem = ({
    item,
    onPress,
    imageStyle,
    itemContainerStyle,
  }) => {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={{ ...itemContainerStyle, width: width / 2 - 5 }}
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
              resizeMode: "cover",
            }}
          />
          <TouchableOpacity
            style={{ position: "absolute", bottom: 0, right: 10 }}
            onPress={() => handleAddToBag(item)}
          >
            <Icon
              name="pluscircleo"
              type="ant-design"
              size={34}
              borderRadius={34}
              color={colors.btnLink}
              backgroundColor={colors.white}
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
              {item.display_price}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  //..........................................................................................

  React.useEffect(() => {
    dispatch(getMenus());
    removeData("food");
    removeData("vendors");
  }, []);

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

  const handleProductsLoad = (pageIndexAfterDispatch = null) => {
    dispatch(
      getProductsList(null, {
        pageIndex: pageIndexAfterDispatch || pageIndex,
        filter: {
          name: route.params?.searchQuery || "",
          price: `${minimumPriceRange},${maximumPriceRange}`,
          taxons: route?.params?.id,
        },
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

  React.useEffect(() => {
    handleProductsLoad();
    return () => {
      // dispatch(resetProductsList());
      dispatch(setPageIndex(1));
    };
  }, [route.params]);

  React.useEffect(() => {
    dispatch(getTaxonsList());
    dispatch(getCategories());
  }, []);

  const handleProductLoad = async (id, item) => {
    // dispatch(setSelectedVendor(vendor));
    dispatch(getProduct(id));
    dispatch(getTaxon(item.taxons[0].id));

    navigation.navigate("ProductDetail");
  };

  let data = taxons?.subMenuProducts?.products?.map((el) => el);

  const newJustInRenderItem = ({ item, index }) => {
    return (
      <FlatListImageItem
        key={index.toString()}
        item={item}
        onPress={() => {
          storeData("selectedVendor", resultVendor(item?.vendor?.id)[1]);

          handleProductLoad(item?.id, item);
        }}
        imageStyle={styles.newJustInImage}
        itemContainerStyle={[styles.newJustInItemContainer]}
      />
    );
  };

  const flatListUpperElement = () => {
    return (
      <>
        <View
          style={{
            marginLeft: 15,
            marginRight: 15,
            marginTop: 10,
          }}
        >
          <View
            style={[
              {
                padding: 10,
                borderWidth: 1,
                borderRadius: 10,
                flex: 1,
                flexDirection: "row",
                elevation: 3,
                backgroundColor: "#fff",
                borderColor: "transparent",
              },
              globalStyles.iosShadow,
              Platform.OS === "android" ? { marginTop: 10 } : { marginTop: 0 },
            ]}
          >
            <Image
              source={require("../../../../../assets/images/components/truck.png")}
              resizeMode={"contain"}
              style={{ flex: 0.15, marginRight: 15 }}
            />
            <Text
              style={{
                flex: 0.8,
                fontSize: 16,
                lineHeight: 18.75,
                fontWeight: "bold",
              }}
            >
              {cate?.description}
            </Text>
          </View>

          <ScrollView
            horizontal={true}
            style={{ ...globalStyles.mt16, ...styles.bgwhite }}
            showsHorizontalScrollIndicator={false}
          >
            <TouchableOpacity
              key={"alle"}
              onPress={() => {
                setAll(true);
                handleAllClick(activeMenus);
                setIsSubLink(false);
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

            {activeMenus?.map((menu, index, arr) => (
              <TouchableOpacity
                key={index.toString()}
                onPress={async () => {
                  await dispatch(getSubMenu(menu.link.slice(2).toLowerCase()));
                  setAll(false);
                  setIsAll(false);
                  setSubLink(menu.link.slice(2).toLowerCase());
                  handleClick(handleUncheckAllMenus(arr), menu);
                  await dispatch(getSubMenuProducts(subLink));
                  setIsSubLink(true);
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
          {isSubLink === false ? (
            <></>
          ) : (
            <ScrollView
              horizontal={true}
              style={{ ...globalStyles.mt16, marginBottom: 10 }}
              showsHorizontalScrollIndicator={false}
            >
              <TouchableOpacity
                key={"alle"}
                onPress={() => {
                  setIsSubAll(true);
                  handleSubAllClick(activeSubMenu);
                }}
              >
                <Text style={isSubAll ? styles.subActive : styles.subUnactive}>
                  Alle
                </Text>
              </TouchableOpacity>
              {activeSubMenu
                // ?.sort((a, b) => a.name.localeCompare(b.name))
                ?.map((submenu, index, arr) => (
                  <TouchableOpacity
                    key={index.toString()}
                    onPress={() => {
                      setIsSubAll(false);

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
          )}
        </View>
      </>
    );
  };

  // flatListLowerElement
  const flatListLowerElement = () => {
    return (
      <>
        {/* //*Bottom Buttons */}
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
          position: "absolute",
          bottom: 0,
          alignSelf: "center",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "transparent",
          paddingVertical: 10,
        }}
      >
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
          {productsSortList.map((x, id) => {
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
                <TouchableOpacity onPress={x.onPress}>
                  <Text style={{ color: colors.white, fontSize: 18 }}>
                    {x.title}
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
    const [selectedCategory, setSelectedCategory] = React.useState([]);
    const [selectedVendors, setSelectedvendors] = React.useState([]);

    React.useEffect(() => {
      selectedFood();
    }, [selectedCategory]);

    React.useEffect(() => {
      selectedVendor();
    }, [selectedVendors]);

    const selectedFood = async () => {
      setSelectedCategory(await getData("food"));
    };

    const selectedVendor = async () => {
      setSelectedvendors(await getData("vendors"));
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

    const handleFilterSearch = async (categories, vendors) => {
      let filterData = categories
        .filter((item) => item.isChecked)
        .map((item) => Number(item.id));

      dispatch(getSearchProduct(null, filterData));
    };

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
                      flexDirection: "row",
                      borderBottomColor: "#3A3A59",
                      borderBottomWidth: 1,
                      alignItems: "center",
                    }}
                    onPress={() => navigation.navigate(ele.name)}
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
                          color: colors.white,
                          fontFamily: "lato-medium",
                          fontSize: 16,
                        }}
                      >
                        {ele.title}
                      </Text>

                      <View style={{ flexDirection: "row" }}>
                        {ele.name === "food" &&
                          selectedCategory !== [] &&
                          selectedCategory
                            ?.filter((ele) => ele?.isChecked === true)
                            ?.map((item, index) => (
                              <View
                                key={index}
                                flexDirection={"row"}
                                style={{
                                  backgroundColor: colors.btnLink,
                                  marginRight: 8,
                                  borderRadius: 3,
                                }}
                              >
                                <Text
                                  style={{
                                    color: colors.white,
                                  }}
                                >
                                  {item.name}
                                </Text>

                                <TouchableOpacity
                                  onPress={() => handleDeselectFood(item)}
                                >
                                  <Icon
                                    name="close"
                                    type="material-icons"
                                    size={20}
                                    color={colors.white}
                                  />
                                </TouchableOpacity>
                              </View>
                            ))}

                        {/* // *producers */}
                        {ele.name === "producers" &&
                          selectedVendors !== [] &&
                          selectedVendors
                            ?.filter((ele) => ele?.isChecked === true)
                            ?.map((item, index) => (
                              <View
                                key={index}
                                flexDirection={"row"}
                                style={{
                                  backgroundColor: colors.btnLink,
                                  marginRight: 8,
                                  borderRadius: 3,
                                }}
                              >
                                <Text
                                  style={{
                                    color: colors.white,
                                  }}
                                >
                                  {item.name}
                                </Text>

                                <TouchableOpacity
                                  onPress={() => handleDeselectVendor(item)}
                                >
                                  <Icon
                                    name="close"
                                    type="material-icons"
                                    size={20}
                                    color={colors.white}
                                  />
                                </TouchableOpacity>
                              </View>
                            ))}
                        <Icon
                          name="navigate-next"
                          type="material-icons"
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
            onPress={() => handleFilterSearch(selectedCategory, selectedVendor)}
          >
            <Text
              style={{
                color: colors.white,
                fontSize: 14,
                fontFamily: "lato-medium",
              }}
            >
              {`VIS ${productsList.length} VARER`}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  if (saving || savingTaxon) {
    return <ActivityIndicatorCard />;
  } else
    return (
      <SafeAreaView
        style={[
          globalStyles.containerFluid,
          styles.bgwhite,
          // { width: "100%" },
          { flex: 1 },
        ]}
      >
        {saving ? (
          <ActivityIndicatorCard />
        ) : (
          <FlatList
            data={isAll ? productsList : data}
            keyExtractor={(item, index) => index.toString()}
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
              meta.total_count !== productsList.length && handleEndReached();
            }}
            columnWrapperStyle={{
              // flex: 0.8,
              width: "100%",
              justifyContent: "space-evenly",
            }}
          />
        )}
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
          />
        )}

        {sort && (
          <FilterFooter
            value={sheetRef}
            snapPoints={snapPoints}
            onClose={() => setSort(false)}
            bottomSheetContent={sortContent}
          />
        )}
      </SafeAreaView>
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
