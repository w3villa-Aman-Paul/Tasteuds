import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { styles } from "./styles";
import { colors } from "../../../../res/palette";
import ActivityIndicatorCard from "../../../../library/components/ActivityIndicatorCard";
import { useSelector } from "react-redux";
import { globalStyles } from "../../../../styles/global";
import { HOST } from "../../../../res/env";
import { storeData } from "../../../../redux/rootReducer";
import { getProduct, getVendorsList, getWeeklyProducer } from "../../../../redux";
import { connect } from "react-redux";

const MostBoughtProducts = ({ navigation, dispatch }) => {
  const { saving, productsList} = useSelector((state) => state.products);
  const vendorList = useSelector((state) => state.taxons.vendors);
  const { mostBoughtGoods } = useSelector((state) => state.taxons);
  
  const [mostBought, setMostBought] = useState([]);

  useEffect(() => {
    dispatch(getVendorsList());
    dispatch(getWeeklyProducer());

    if (productsList.length === 0) {
      handleProductsLoad();
    }
    setMostBought([]);
  }, []);

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

  useEffect(() => {
    loadMostBoughtGoods();
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

  

  const newJustInRenderItem = ({ item, index }) => {
    return (
      <TouchableOpacity>
        <FlatListImageItem
          key={index.toString()}
          item={item}
          onPress={() => {
            storeData("selectedVendor", resultVendor(item?.vendor?.id)[1]);
            handleProductLoad(item?.id, item);
          }}
          imageStyle={styles.newJustInImage}
          itemContainerStyle={styles.newJustInItemContainer}
        />
      </TouchableOpacity>
    );
  };

  const FlatListImageItem = ({
    item,
    onPress,
    imageStyle,
    itemContainerStyle,
  }) => {
    return (
      <TouchableOpacity onPress={onPress} style={{ ...itemContainerStyle }}>
        <View style={{ position: "relative" }}>
          <Image
               source={{
                uri: item.images
                  ? `${HOST}/${item?.images[0]?.styles[3].url}`
                  : null,
              }}
            style={{
              width: imageStyle?.width,
              height: imageStyle?.height,
              resizeMode: "contain",
            }}
          />
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
              {" "}
              {item.display_price}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const productsUnique = [
    ...new Map(mostBought.map((item) => [item["id"], item])).values(),
  ];

  return (
    <SafeAreaView
      style={{ ...styles.containerFluid, ...styles.bg_white, flex: 1 }}
    >
      {saving ? (
        <ActivityIndicatorCard />
      ) : (
        <FlatList
          data={productsUnique}
          keyExtractor={(item, index) => index.toString()}
          renderItem={newJustInRenderItem}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          style={{
            ...globalStyles.container,
            ...globalStyles.mt8,
            ...styles.bg_white,
          }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};

export default connect()(MostBoughtProducts);
