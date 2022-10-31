import {
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { styles } from "./styles";
import React from "react";
import { colors } from "../../../../res/palette";
import ActivityIndicatorCard from "../../../../library/components/ActivityIndicatorCard";
import { useSelector } from "react-redux";
import { globalStyles } from "../../../../styles/global";
import { storeData } from "../../../../redux/rootReducer";
import { getProduct } from "../../../../redux";
import { connect } from "react-redux";

const MostBoughtProducts = ({ navigation, dispatch }) => {
  const { meta, pageIndex, saving, searchedProducts } = useSelector(
    (state) => state.products
  );
  const vendorList = useSelector((state) => state.taxons.vendors);
  const { newAddedProducts } = useSelector((state) => state.taxons);

  const resultVendor = (id) => {
    const vendor = vendorList?.filter((vendor) => {
      if (vendor?.id == id) return vendor;
    });

    let vendorName = vendor[0]?.name;

    return [vendorName, vendor];
  };

  const handleProductLoad = async (id, item) => {
    await dispatch(getProduct(id));
    navigation.navigate("ProductDetail");
  };

  const newJustInRenderItem = ({ item, index }) => {
    return (
      <TouchableOpacity onPress={() => {
        storeData("selectedVendor", resultVendor(item?.vendor_id)[1]);
        handleProductLoad(item?.id, item);
      }}
       style={{ ...styles.newJustInItemContainer }}>
        <View style={{ position: "relative" }}>
          <Image
            source={{
              uri: `${item.image_attachment}`,
            }}
            style={{
              width: styles.newJustInImage?.width,
              height: styles.newJustInImage?.height,
              resizeMode: "contain",
            }}
          />
        </View>
        <View style={styles.detailsContainer}>
          <Text numberOfLines={1} style={styles.title}>
            {item.name}
          </Text>
          <Text numberOfLines={1} style={styles.description}>
            {`${resultVendor(item?.vendor_id)[0]}`}
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
    // return (
    //   <TouchableOpacity>
    //     <FlatListImageItem
    //       key={index.toString()}
    //       item={item}
    //       onPress={() => {
    //         storeData("selectedVendor", resultVendor(item?.vendor_id)[1]);
    //         handleProductLoad(item?.id, item);
    //       }}
    //       imageStyle={styles.newJustInImage}
    //       itemContainerStyle={styles.newJustInItemContainer}
    //     />
    //   </TouchableOpacity>
    // );
  };

  // const FlatListImageItem = ({
  //   item,
  //   onPress,
  //   imageStyle,
  //   itemContainerStyle,
  // }) => {
  //   return (
  //     <TouchableOpacity onPress={() => {
  //       storeData("selectedVendor", resultVendor(item?.vendor_id)[1]);
  //       handleProductLoad(item?.id, item);
  //     }}
  //      style={{ ...styles.newJustInItemContainer }}>
  //       <View style={{ position: "relative" }}>
  //         <Image
  //           source={{
  //             uri: `${item.image_attachment}`,
  //           }}
  //           style={{
  //             width: styles.newJustInImage?.width,
  //             height: styles.newJustInImage?.height,
  //             resizeMode: "contain",
  //           }}
  //         />
  //       </View>
  //       <View style={styles.detailsContainer}>
  //         <Text numberOfLines={1} style={styles.title}>
  //           {item.name}
  //         </Text>
  //         <Text numberOfLines={1} style={styles.description}>
  //           {`${resultVendor(item?.vendor_id)[0]}`}
  //         </Text>
  //         <View style={styles.pricingContainer}>
  //           <Text style={[styles.prices, { color: colors.black }]}>
  //             {" "}
  //             {item.display_price}
  //           </Text>
  //         </View>
  //       </View>
  //     </TouchableOpacity>
  //   );
  // };

  return (
    <SafeAreaView
      style={{ ...styles.containerFluid, ...styles.bg_white, flex: 1 }}
    >
      {newAddedProducts.length !== 0 ? (
        saving ? (
          <ActivityIndicatorCard />
        ) : (
          <FlatList
            data={newAddedProducts?.products}
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
        )
      ) : (
        <View style={[styles.notFound, globalStyles.container]}>
          <Text style={styles.notFoundText}>
            No newly Added products Found!!
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default connect()(MostBoughtProducts);
