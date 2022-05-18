import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import HTML from "react-native-render-html";
import React from "react";
import { styles } from "./style";
import { connect, useSelector } from "react-redux";
import { HOST } from "../../../res/env";
import { Icon } from "react-native-elements";
import { colors } from "../../../res/palette";
import { getProduct, getTaxon } from "../../../redux";

const ProducerDetailScreen = ({ dispatch, navigation }) => {
  const selectedVendor = useSelector((state) => state?.taxons?.selectedVendor);
  const width = Dimensions.get("window").width - 20;
  const vendorList = useSelector((state) => state.taxons.vendors);

  const resultVendor = (id) => {
    const vendor = vendorList?.filter((vendor) => {
      if (vendor?.id == id) return vendor;
    });

    let vendorName = vendor[0]?.name;

    return [vendorName, vendor];
  };

  const handleProductLoad = async (id, item) => {
    dispatch(getProduct(id));
    dispatch(getTaxon(item.taxons[0].id));
    navigation.navigate("ProductDetail");
  };

  const FlatListImageItem = ({
    item,
    onPress,
    imageStyle,
    itemContainerStyle,
  }) => {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={{ ...itemContainerStyle, width: width / 2 - 10 }}
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

  const newJustInRenderItem = ({ item, index }) => {
    return (
      <FlatListImageItem
        key={index.toString()}
        item={item}
        onPress={() => {
          handleProductLoad(item?.id, item);
        }}
        imageStyle={styles.newJustInImage}
        itemContainerStyle={styles.newJustInItemContainer}
      />
    );
  };

  const flatListUpperComponent = () => {
    return (
      <>
        <View
          style={{
            height: 96,
            flexDirection: "row",
            justifyContent: "space-between",
            backgroundColor: "white",
            padding: 10,
            marginVertical: 20,
            borderRadius: 20,
            elevation: 5,
          }}
        >
          <Image
            source={{ uri: `${HOST}/${selectedVendor?.image?.styles[2]?.url}` }}
            style={{ flex: 0.3 }}
            resizeMode={"contain"}
          />
          <Text style={{ flex: 0.6 }}>
            Sider frå Bleie Gard i Hardanger. Epla vert dyrka, plukka, pressa og
            tappa av Olav Bleie.
          </Text>
        </View>

        {/* // *Cover Image*/}
        <View
          style={{
            height: 219,
            borderRadius: 10,
            backgroundColor: "pink",
            overflow: "hidden",
            marginVertical: 10,
          }}
        >
          <Image
            source={
              require("../../../../assets/images/detailHero.png")
              // { uri: `${HOST}/${selectedVendor?.image?.styles[6]?.url}` }
            }
            style={{ flex: 1, width: "100%" }}
            resizeMode={"cover"}
          />
        </View>

        {/* // *Description */}
        <View style={{ marginVertical: 10 }}>
          <Text style={styles.descriptionTitle}>Om oss</Text>
          <HTML
            source={{ html: selectedVendor?.about_us }}
            style={styles.buttonText}
          />
        </View>

        {/* // TODO: Facts of manufacturer */}
        <View style={{ marginVertical: 10 }}>
          <Text style={styles.descriptionTitle}>Fakta on produsenten</Text>
          {/* <ScrollView horizontal={true}>
            <View>
              <Image />
            </View>
          </ScrollView> */}
        </View>

        <Text style={styles.descriptionTitle}>Populære varer</Text>
      </>
    );
  };

  const listFooterComponent = () => {
    return (
      <>
        {/** // TODO: see the entire section (BUTTON) */}

        <TouchableOpacity
          style={styles.seeMoreButton}
          onPress={() => navigation.navigate("ProductsList")}
        >
          <Text style={styles.seeMoreButtonText}>SE HELE UTVALGET</Text>
        </TouchableOpacity>
      </>
    );
  };

  return (
    <SafeAreaView
      style={{ flex: 1, alignItems: "center", backgroundColor: "#fff" }}
    >
      {/*//* Header */}

      <View style={styles.detailHeader}>
        <TouchableOpacity
          style={styles.detailHeaderContainer}
          onPress={() => navigation.goBack()}
        >
          <Icon
            name="cross"
            type="entypo"
            size={24}
            style={{ color: colors.black }}
          />
        </TouchableOpacity>

        <Text style={styles.detailHeaderText}>{selectedVendor.name}</Text>
      </View>

      <SafeAreaView
        style={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* // TODO: Popular Items */}
        <View style={{ marginVertical: 10 }}>
          <FlatList
            data={selectedVendor.products.slice(0, 4)}
            keyExtractor={(item, index) => index.toString()}
            renderItem={newJustInRenderItem}
            numColumns={2}
            ListHeaderComponent={flatListUpperComponent}
            ListFooterComponent={listFooterComponent}
            showsVerticalScrollIndicator={false}
            columnWrapperStyle={{
              justifyContent: "space-between",
            }}
          />
        </View>
      </SafeAreaView>
    </SafeAreaView>
  );
};

export default connect()(ProducerDetailScreen);