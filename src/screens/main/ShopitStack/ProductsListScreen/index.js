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

  React.useEffect(() => {
    //Reset products filter only upon component unmount
    return () => {
      dispatch(resetProductsFilter());
    };
  }, []);

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
          <Text
            style={{
              ...styles.title,
              fontSize: 24,
            }}
          >
            PRODUKTER
          </Text>
          <Text
            style={{
              fontSize: 16,
              padding: 10,
              marginTop: 10,
              borderWidth: 1,
              borderRadius: 10,
              lineHeight: 18.75,
              fontWeight: "bold",
              ...styles.borderPrimary,
            }}
          >
            Bestill innen tirsdag (23:59) for å få varene torsdag ettermiddag.
            Vi utvider utvalget av produsenter og produkter fortløpende!
          </Text>

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
              data={productsList}
              keyExtractor={(item, index) => index.toString()}
              renderItem={newJustInRenderItem}
              numColumns={2}
              onEndReachedThreshold={0.3}
              onEndReached={() => {
                meta.total_count !== productsList.length && handleEndReached();
              }}
            />
          )}
        </View>
        <BottomSheet isVisible={isSortOverlayVisible}>
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
        </BottomSheet>
        <Footer />
      </ScrollView>
    );
};

const mapStateToProps = (state) => ({
  meta: state.products.meta,
  saving: state.products.saving,
  productsList: state.products.productsList,
  minimumPriceRange: state.products.params.priceRange.minimum,
  maximumPriceRange: state.products.params.priceRange.maximum,
  pageIndex: state.products.pageIndex,
});

export default connect(mapStateToProps)(ProductListScreen);
