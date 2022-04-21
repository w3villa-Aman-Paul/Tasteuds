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
} from "../../../../redux";
import { HOST } from "../../../../res/env";
import { useSelector } from "react-redux";
import Footer from "../../../components/footer";

const FlatListImageItem = ({
  item,
  onPress,
  imageStyle,
  itemContainerStyle,
}) => {
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
          {item.slug}
        </Text>
        <View style={styles.pricingContainer}>
          <Text style={[styles.prices, { color: colors.black }]}>
            {" "}
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
  const categoryList = useSelector((state) => state.taxons.taxonsList);

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

  React.useEffect(() => {
    handleProductsLoad();
    return () => {
      // dispatch(resetProductsList());
      dispatch(setPageIndex(1));
    };
  }, [route.params]);

  // React.useEffect(() => {
  //   //Reset products filter only upon component unmount
  //   return () => {
  //     dispatch(resetProductsFilter());
  //   };
  // }, []);

  React.useEffect(() => {
    dispatch(getTaxonsList());
  }, []);

  const handleProductLoad = async (id, item) => {
    dispatch(getProduct(id));
    dispatch(getTaxon(item.taxons[0].id));
    navigation.navigate("ProductDetail");
  };

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

  const handleCategoryPress = (id) => {
    // dispatch(getTaxon(id));
  };

  if (saving) {
    return <ActivityIndicatorCard />;
  } else
    return (
      <ScrollView style={{ ...styles.bgwhite }}>
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
              resizeMode={"cover"}
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
              Bestill innen tirsdag (23:59) for å få varene torsdag ettermiddag
            </Text>
          </View>

          <ScrollView horizontal={true} style={{ ...globalStyles.mt24 }}>
            {categoryList.map((cat, index) => (
              <TouchableOpacity
                key={index.toString()}
                onPress={() => {
                  handleCategoryPress(cat.id);
                }}
              >
                <Text style={{ padding: 5, fontSize: 16 }}>{cat.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View
          style={{
            ...globalStyles.containerFluid,
            ...globalStyles.mt24,
            ...styles.bgwhite,
            marginLeft: 15,
            marginRight: 15,
          }}
        >
          {saving ? (
            <ActivityIndicatorCard />
          ) : (
            <FlatList
              data={productsList.slice(0, 73)}
              keyExtractor={(item, index) => index.toString()}
              renderItem={newJustInRenderItem}
              numColumns={2}
            />
          )}
        </View>

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
            >
              <Text>SORTER</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* <BottomSheet isVisible={isSortOverlayVisible}>
          {productsList.map((l, i) => (
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
        </BottomSheet> */}
      </ScrollView>
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
