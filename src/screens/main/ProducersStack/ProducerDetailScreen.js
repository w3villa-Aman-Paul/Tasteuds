import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Platform,
} from "react-native";
import HTML from "react-native-render-html";
import React, { useEffect, useState } from "react";
import { styles } from "./style";
import { connect, useSelector } from "react-redux";
import { HOST } from "../../../res/env";
import { Icon } from "react-native-elements";
import { colors } from "../../../res/palette";
import { getProduct, getTaxon } from "../../../redux";
import { globalStyles } from "../../../styles/global";

const ProducerDetailScreen = ({ dispatch, navigation }) => {
  const selectedVendor = useSelector((state) => state?.taxons?.selectedVendor);
  const width = Dimensions.get("window").width - 20;
  const vendorList = useSelector((state) => state.taxons.vendors);
  const [vendorCover, setVendorCover] = useState({});

  useEffect(() => {
    setVendorCover(findVendorCoverImage(selectedVendor.id));
  }, [selectedVendor]);

  const findVendorCoverImage = (vendorId) => {
    const { cover_image_url, logo_image_url } = vendorList.find(
      (ele) => Number(ele.id) === Number(vendorId)
    );

    return { cover: cover_image_url, logo: logo_image_url };
  };

  const resultVendor = (id) => {
    const vendor = vendorList?.filter((vendor) => {
      if (vendor?.id == id) return vendor;
    });

    let vendorName = vendor[0]?.name;

    return [vendorName, vendor];
  };

  const handleProductLoad = async (id, item) => {
    await dispatch(getProduct(id));
    await dispatch(getTaxon(item.taxons[0].id));
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
          style={[
            {
              height: 96,
              flexDirection: "row",
              justifyContent: "space-between",
              backgroundColor: "white",
              padding: 10,
              marginVertical: 20,
              borderRadius: 20,
              elevation: 5,
            },
            globalStyles.iosShadow,
          ]}
        >
          <Image
            source={{ uri: `${vendorCover.logo}` }}
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
            overflow: "hidden",
            marginVertical: 10,
          }}
        >
          <Image
            source={{ uri: `${vendorCover.cover}` }}
            style={{ flex: 1, width: "100%" }}
            resizeMode={"cover"}
          />
        </View>

        {/* // *Description */}
        <View
          style={[
            {
              marginVertical: 10,
              marginHorizontal: 2,
              padding: 10,
              borderRadius: 10,
              backgroundColor: "white",
              border: 1,
              borderColor: "transparent",
              elevation: 5,
            },
            globalStyles.iosShadow,
          ]}
        >
          <Text style={styles.descriptionTitle}>Om oss</Text>
          <HTML
            source={{ html: selectedVendor?.about_us }}
            style={styles.buttonText}
          />
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
      style={{
        flex: 1,
        alignItems: "center",
        backgroundColor: "#fff",
      }}
    >
      {/*//* Header */}

      <View
        style={[
          styles.detailHeader,
          Platform.OS === "android" ? { marginTop: 30 } : { marginTop: 0 },
        ]}
      >
        <TouchableOpacity
          style={[styles.detailHeaderContainer, globalStyles.iosShadow]}
          onPress={() => navigation.goBack()}
        >
          <Icon
            name="cross"
            type="entypo"
            size={24}
            style={{ color: colors.black }}
          />
        </TouchableOpacity>

        <Text style={styles.detailHeaderText} numberOfLines={1}>
          {selectedVendor.name}
        </Text>
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
