import * as React from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { globalStyles } from "../../../../styles/global";
import { colors } from "../../../../res/palette";
import { styles } from "./styles";
import { connect } from "react-redux";
import { BottomSheet, ListItem } from "react-native-elements";
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
} from "../../../../redux";
import { HOST } from "../../../../res/env";
import { useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";

const FlatListImageItem = ({
  item,
  onPress,
  imageStyle,
  itemContainerStyle,
}) => {
  const vendorList = useSelector((state) => state.taxons.vendors);

  const resultVendor = (id) => {
    const vendor = vendorList?.filter((vendor) => {
      if (vendor?.id == id) return vendor;
    });

    let vendorName = vendor[0]?.name;
    // console.log(">>>vendor", vendorName);
    return vendorName;
  };

  return (
    <TouchableOpacity onPress={onPress} style={{ ...itemContainerStyle }}>
      <Image
        source={{
          uri: `${HOST}/${item.images[0]?.styles[3].url}`,
        }}
        style={{
          width: imageStyle.width,
          height: imageStyle.height,
          resizeMode: "cover",
        }}
      />
      <View style={styles.detailsContainer}>
        <Text numberOfLines={1} style={styles.title}>
          {item.name}
        </Text>
        <Text numberOfLines={1} style={styles.description}>
          {`${resultVendor(item?.vendor?.id)}`}
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
  const [isSortOverlayVisible, setIsSortOverlayVisible] = React.useState(false);
  const [filterSheet, setFilterSheet] = React.useState(false);

  const [all, setAll] = React.useState(true);
  const [subLink, setSubLink] = React.useState("");

  const taxons = useSelector((state) => state.taxons);
  const cate = useSelector((state) => state.taxons.categories);
  const menus = useSelector((state) => state.taxons.menus);
  const submenus = useSelector((state) => state.taxons.submenus);

  React.useEffect(() => {
    dispatch(getMenus());
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

  const filterList = [
    {
      title: "MATVARER",
      onPress: null,
    },
    {
      title: "PRODUSENTER",
      onPress: null,
    },
    {
      title: "Cancel",
      containerStyle: { backgroundColor: colors.error },
      titleStyle: { color: "white" },
      onPress: () => setFilterSheet(false),
    },
  ];

  // const handleEndReached = () => {
  //   const response = dispatch(setPageIndex(pageIndex + 1));
  //   handleProductsLoad(response.payload);
  // };

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
    dispatch(getProduct(id));
    dispatch(getTaxon(item.taxons[0].id));
    navigation.navigate("ProductDetail");
  };

  let data = taxons?.subMenuProducts?.products?.map((el) => {
    let arr = productsList.filter((ele) => ele.id == el.id);
    return arr[0];
  });

  const newJustInRenderItem = ({ item, index }) => {
    return (
      <FlatListImageItem
        key={index.toString()}
        item={item}
        onPress={() => handleProductLoad(item?.id, item)}
        imageStyle={styles.newJustInImage}
        itemContainerStyle={styles.newJustInItemContainer}
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
              }}
            >
              <Text
                style={{
                  padding: 8,
                  fontSize: 20,
                  fontWeight: "700",
                  color: colors.primary,
                  ...styles.active,
                }}
              >
                Alle
              </Text>
            </TouchableOpacity>
            {menus?.menu_items
              ?.filter(
                (menu) =>
                  menu.name !== "PRODUSENTER" &&
                  menu.name !== "Categories" &&
                  menu.name !== "Kategorier" &&
                  menu.name !== "Lokalprodukter"
              )
              // ?.sort((a, b) => a.name.localeCompare(b.name))
              ?.map((menu, index) => (
                <TouchableOpacity
                  key={index.toString()}
                  onPress={() => {
                    dispatch(getSubMenu(menu.link.slice(2).toLowerCase()));
                    setAll(false);
                    setSubLink(menu.link.slice(2).toLowerCase());
                    dispatch(getSubMenuProducts(subLink));
                  }}
                >
                  <Text
                    style={{
                      padding: 8,
                      fontSize: 20,
                      fontWeight: "700",
                      color: colors.primary,
                    }}
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
                  // console.log(">>>>", submenu?.name.toLowerCase());
                }}
              >
                {/* <Text
                  style={{
                    paddingTop: 2,
                    paddingBottom: 2,
                    paddingRight: 6,
                    paddingLeft: 6,
                    fontSize: 15,
                    fontWeight: "700",
                    color: colors.white,
                    borderWidth: 1,
                    borderRadius: 10,
                    backgroundColor: colors.primary,
                    marginRight: 10,
                  }}
                >
                  Alle
                </Text> */}
              </TouchableOpacity>
              {submenus.children
                // ?.sort((a, b) => a.name.localeCompare(b.name))
                ?.map((submenu, index) => (
                  <TouchableOpacity
                    key={index.toString()}
                    onPress={() => {
                      dispatch(
                        getSubMenuProducts(submenu.permalink.toLowerCase())
                      );
                      // console.log(">>>>", submenu?.name.toLowerCase());
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

  const flatListLowerElement = () => {
    return (
      <>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 25,
          }}
        >
          <Text style={{ textAlign: "center" }}>Ingen flere produkter</Text>

          <TouchableOpacity
            style={{
              width: 120,
              marginTop: 30,
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
              onPress={() => setFilterSheet(true)}
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
        <BottomSheet isVisible={isSortOverlayVisible}>
          {productsSortList.map((l, i) => (
            <ListItem
              key={i}
              containerStyle={l.containerStyle}
              onPress={l.onPress}
            >
              <ListItem.Content>
                <ListItem.Title style={l.titleStyle}>{l.title}</ListItem.Title>
              </ListItem.Content>
            </ListItem>
          ))}
        </BottomSheet>

        <BottomSheet isVisible={filterSheet}>
          {filterList.map((l, i) => (
            <ListItem
              key={i}
              containerStyle={l.containerStyle}
              onPress={l.onPress}
            >
              <ListItem.Content>
                <ListItem.Title style={l.titleStyle}>{l.title}</ListItem.Title>
              </ListItem.Content>
            </ListItem>
          ))}
        </BottomSheet>
      </>
    );
  };

  if (saving) {
    return <ActivityIndicatorCard />;
  } else
    return (
      <SafeAreaView
        style={{
          ...globalStyles.containerFluid,
          ...styles.bgwhite,
          width: "100%",
          flex: 1,
        }}
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
            ListFooterComponent={flatListLowerElement}
            ref={scrollRef}
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
});

export default connect(mapStateToProps)(ProductListScreen);
