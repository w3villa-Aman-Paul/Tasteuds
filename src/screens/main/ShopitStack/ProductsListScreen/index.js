import * as React from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Dimensions,
} from "react-native";

import { globalStyles } from "../../../../styles/global";
import { colors } from "../../../../res/palette";
import { styles } from "./styles";
import { connect } from "react-redux";
import { Icon } from "react-native-elements";
import ActivityIndicatorCard from "../../../../library/components/ActivityIndicatorCard";
import {
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
  const [isSortOverlayVisible, setIsSortOverlayVisible] = React.useState(false);
  const [all, setAll] = React.useState(true);
  const [subLink, setSubLink] = React.useState("");
  const [activeMenus, setActiveMenus] = React.useState([]);
  const [isAll, setIsAll] = React.useState(true);

  const checkout = useSelector((state) => state.checkout);
  const errMessage = useSelector((state) => state.checkout.error);
  const cart = useSelector((state) => state.checkout.cart);
  const vendorList = useSelector((state) => state.taxons.vendors);
  const taxons = useSelector((state) => state.taxons);
  const cate = useSelector((state) => state.taxons.categories);
  const menus = useSelector((state) => state.taxons.menus);
  const submenus = useSelector((state) => state.taxons.submenus);

  const resultVendor = (id) => {
    const vendor = vendorList?.filter((vendor) => {
      if (vendor?.id == id) return vendor;
    });

    let vendorName = vendor[0]?.name;

    return [vendorName, vendor];
  };

  React.useEffect(() => {
    handleActiveMenu();
  }, [menus]);

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

  const handleClick = (activeMenus, menu) => {
    const newArr = [...activeMenus];
    const index = newArr.findIndex((item) => item.id === menu.id);
    newArr[index].isActive = true;

    setActiveMenus(newArr);
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

  const width = Dimensions.get("window").width - 10;

  const sheetRef = React.useRef(null);
  const [isOpen, setIsOpen] = React.useState(false);

  const snapPoints = ["40%"];

  const handleSnapPress = React.useCallback((index) => {
    sheetRef.current?.snapToIndex(index);
    setIsOpen(true);
  }, []);

  React.useEffect(() => {
    dispatch(getCart(cart.token));
  }, []);

  const dismissSnackbar = () => setSnackbarVisible(false);

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

  // Item Rendering..............................................................
  const FlatListImageItem = ({
    item,
    onPress,
    imageStyle,
    itemContainerStyle,
  }) => {
    return (
      <TouchableOpacity
        // vendor={resultVendor(item?.vendor?.id)[1]}
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
            {/* <Text style={[styles.prices, styles.price]}>${item.price}</Text> */}
            {/* <Text style={[styles.prices, styles.discountPercent]}>(30% OFF)</Text> */}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  //..........................................................................................

  // const toggleFilter = () => {
  //   setFilterSheet(!filterSheet)
  // }

  React.useEffect(() => {
    dispatch(getMenus());
    removeData("food");
    removeData("vendors");
  }, []);

  const productsSortList = [
    {
      title: "Price: lowest to high",
      onPress: () => setProductListLowToHigh(),
    },
    {
      title: "Price: highest to low",
      onPress: () => setProductListHighToLow(),
    },
    {
      title: "Cancel",
      containerStyle: { backgroundColor: colors.error },
      titleStyle: { color: "white" },
      onPress: () => setIsSortOverlayVisible(false),
    },
  ];

  const setProductListHighToLow = () => {
    productsList.sort((a, b) => (a.price < b.price ? 1 : -1));
    setIsSortOverlayVisible(false);
  };

  const setProductListLowToHigh = () => {
    productsList.sort((a, b) => (a.price > b.price ? 1 : -1));
    setIsSortOverlayVisible(false);
  };

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
          console.log("");

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
            style={{
              padding: 10,
              marginTop: 10,
              borderWidth: 1,
              borderRadius: 10,
              flex: 1,
              flexDirection: "row",
              elevation: 3,
              backgroundColor: "#fff",
              borderColor: "transparent",
            }}
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
            style={{ ...globalStyles.mt24, ...styles.bgwhite }}
            showsHorizontalScrollIndicator={false}
          >
            <TouchableOpacity
              key={"alle"}
              onPress={() => {
                setAll(true);
                handleAllClick(activeMenus);
              }}
            >
              <Text
                style={[
                  isAll ? styles.active : {},
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
                  dispatch(getSubMenuProducts(subLink));
                }}
              >
                <Text
                  style={[
                    menu.isActive ? styles.active : styles.unactive,
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

          {all ? (
            <></>
          ) : (
            <ScrollView
              horizontal={true}
              style={{ ...globalStyles.mt24 }}
              showsHorizontalScrollIndicator={false}
            >
              <TouchableOpacity
                onPress={() => {
                  dispatch(getSubMenuProducts(subLink));
                }}
              ></TouchableOpacity>
              {submenus.children
                // ?.sort((a, b) => a.name.localeCompare(b.name))
                ?.map((submenu, index) => (
                  <TouchableOpacity
                    key={index.toString()}
                    onPress={() => {
                      dispatch(
                        getSubMenuProducts(submenu.permalink.toLowerCase())
                      );
                    }}
                  >
                    <Text
                      style={{
                        marginRight: 10,
                        paddingTop: 2,
                        paddingBottom: 2,
                        paddingRight: 4,
                        paddingLeft: 4,
                        fontSize: 15,
                        fontWeight: "700",
                        color: colors.white,
                        borderWidth: 1,
                        borderRadius: 10,
                        backgroundColor: colors.primary,
                      }}
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
              fontSize: 14,
              fontFamily: "lato-medium",
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
                          fontSize: 14,
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
            alignSelf: "center",
            flex: 1,
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: colors.btnLink,
              width: 180,
              height: 26,
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: colors.white,
                fontSize: 14,
                fontFamily: "lato-medium",
              }}
            >
              VIS 89 VARER
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  if (saving) {
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
            data={all ? productsList : data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={newJustInRenderItem}
            numColumns={2}
            ListHeaderComponent={flatListUpperElement}
            ListFooterComponent={() =>
              meta.total_count !== productsList.length && (
                <ActivityIndicator size="large" />
              )
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
        {checkout.error !== null && saving === false ? (
          <Snackbar visible={snackbarVisible} onDismiss={dismissSnackbar}>
            {errMessage}
          </Snackbar>
        ) : (
          <></>
        )}

        {/* //*Bottom Buttons */}
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 15,
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
              paddingHorizontal: 10,
              paddingVertical: 3,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={onScroll}
          >
            <Text>TIL TOPPEN</Text>
          </TouchableOpacity>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              style={{
                width: 100,
                marginRight: 30,
                paddingHorizontal: 20,
                paddingVertical: 3,
                borderWidth: 1,
                borderRadius: 10,
                alignItems: "center",
              }}
              onPress={() => handleSnapPress(0)}
            >
              <Text>FILTER</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 100,
                marginLeft: 30,
                paddingHorizontal: 20,
                paddingVertical: 3,
                borderWidth: 1,
                borderRadius: 10,
                alignItems: "center",
              }}
              onPress={() => setIsSortOverlayVisible(true)}
            >
              <Text>SORTER</Text>
            </TouchableOpacity>
          </View>
        </View>

        {isOpen && (
          <FilterFooter
            value={sheetRef}
            snapPoints={snapPoints}
            onClose={() => setIsOpen(false)}
            bottomSheetContent={bottomSheetContent}
          />
        )}
      </SafeAreaView>
    );
};

const mapStateToProps = (state) => ({
  saving: state.products.saving,
  productsList: state.products.productsList,
  minimumPriceRange: state.products.params.priceRange.minimum,
  maximumPriceRange: state.products.params.priceRange.maximum,
  pageIndex: state.products.pageIndex,
  meta: state.products.meta,
});

export default connect(mapStateToProps)(ProductListScreen);
