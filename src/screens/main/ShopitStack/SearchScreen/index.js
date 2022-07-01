import {
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { styles } from "./styles";
import React, { useState } from "react";
import { Icon } from "react-native-elements";
import { colors } from "../../../../res/palette";
import ActivityIndicatorCard from "../../../../library/components/ActivityIndicatorCard";
import { Snackbar } from "react-native-paper";
import { useSelector } from "react-redux";
import { globalStyles } from "../../../../styles/global";
import { HOST } from "../../../../res/env";
import { storeData } from "../../../../redux/rootReducer";
import {
  getProduct,
  getProductsList,
  getSearchByProductName,
  getTaxon,
  setPageIndex,
} from "../../../../redux";
import { connect } from "react-redux";

const SearchScreen = ({ navigation, dispatch }) => {
  const [text, setText] = React.useState("");
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const { meta, pageIndex, saving, searchedProducts } = useSelector(
    (state) => state.products
  );
  const { isAuth } = useSelector((state) => state.auth);
  const vendorList = useSelector((state) => state.taxons.vendors);

  const dismissSnackbar = () => setSnackbarVisible(false);

  const resultVendor = (id) => {
    const vendor = vendorList?.filter((vendor) => {
      if (vendor?.id == id) return vendor;
    });

    let vendorName = vendor[0]?.name;

    return [vendorName, vendor];
  };

  const cartHandler = (itemId) => {
    let item = searchedProducts.find((x) => x.id === itemId);
    dispatch(
      addItem(cart.token, {
        variant_id: item.default_variant?.id,
        quantity: 1,
      })
    );
    return setSnackbarVisible(true);
  };

  const handleProductLoad = async (id, item) => {
    dispatch(getProduct(id));
    dispatch(getTaxon(item.taxons[0].id));
    navigation.navigate("ProductDetail");
  };

  const handleEndReached = () => {
    const response = dispatch(setPageIndex(pageIndex + 1));
    handleProductsLoad(response.payload);
  };

  const handleProductsLoad = (pageIndexAfterDispatch = null) => {
    dispatch(
      getProductsList(null, {
        pageIndex: pageIndexAfterDispatch || pageIndex,
      })
    );
  };

  const handleSearchPress = () => {
    dispatch(getSearchByProductName(null, text));
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
              uri: `${HOST}/${item.images[0].styles[3].url}`,
            }}
            style={{
              width: imageStyle?.width,
              height: imageStyle?.height,
              resizeMode: "contain",
            }}
          />
          <TouchableOpacity style={styles.addBtn}>
            <Icon
              name="pluscircleo"
              type="ant-design"
              size={34}
              color={colors.btnLink}
              borderRadius={34}
              onPress={() => cartHandler(item?.id)}
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
              {" "}
              {item.display_price}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          onChangeText={setText}
          value={text}
          editable
          maxLength={20}
          placeholder={"Search"}
          onSubmitEditing={handleSearchPress}
        />
        <TouchableOpacity style={styles.searchBtn} onPress={handleSearchPress}>
          <Icon
            name="search"
            type="font-awesome"
            size={25}
            color={colors.white}
            style={styles.btnIcon}
          />
        </TouchableOpacity>
      </View>

      <SafeAreaView
        style={{ ...styles.containerFluid, ...styles.bg_white, flex: 1 }}
      >
        {saving ? (
          <ActivityIndicatorCard />
        ) : (
          <FlatList
            data={searchedProducts}
            keyExtractor={(item, index) => index.toString()}
            renderItem={newJustInRenderItem}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: "space-between" }}
            style={{
              ...globalStyles.container,
              ...globalStyles.mt8,
              ...styles.bg_white,
            }}
            onEndReachedThreshold={0.3}
            onEndReached={() => {
              meta.total_count !== searchedProducts.length &&
                handleEndReached();
            }}
            showsVerticalScrollIndicator={false}
          />
        )}

        <Snackbar visible={snackbarVisible} onDismiss={dismissSnackbar}>
          Added to Cart !
        </Snackbar>
      </SafeAreaView>
    </SafeAreaView>
  );
};

export default connect()(SearchScreen);
