import {
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { globalStyles } from "../../../../styles/global";
import { styles } from "./styles";
import Footer from "../../../components/footer";
import {
  accountRetrieve,
  getProduct,
  getProductsList,
  getTaxon,
  resetProductsList,
} from "../../../../redux";
import { connect, useSelector } from "react-redux";
import { HOST } from "../../../../res/env";
import { colors } from "../../../../res/palette";
import { Icon } from "react-native-elements";
import ActivityIndicatorCard from "../../../../library/components/ActivityIndicatorCard";

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
          uri: `${HOST}/${item.images[0].styles[3].url}`,
        }}
        style={{
          width: imageStyle.width,
          height: imageStyle.height,
          resizeMode: "contain",
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
        </View>
      </View>
    </TouchableOpacity>
  );
};

const HomeComponent = ({dispatch,navigation,route,pageIndex,productsList}) => {
  const { isAuth } = useSelector((state) => state.auth);
  const { saving } = useSelector((state) => state.products);

  const handleProductsLoad = (pageIndexAfterDispatch = null) => {
    dispatch(
      getProductsList(null, {
        pageIndex: null,
        filter: {},
      })
    );
  };


  const handleProductLoad = async (id, item) => {
    dispatch(getProduct(id));
    dispatch(getTaxon(item.taxons[0].id));
    navigation.navigate("ProductDetail");
  };

  const newJustInRenderItem = ({ item, index }) => {
    return (
      <TouchableOpacity>
        <FlatListImageItem
          key={index.toString()}
          item={item}
          onPress={() => handleProductLoad(item?.id, item)}
          imageStyle={styles.newJustInImage}
          itemContainerStyle={styles.newJustInItemContainer}
        />
      </TouchableOpacity>
    );
  };

  React.useEffect(() => {
    handleProductsLoad();
    dispatch(accountRetrieve(null, {}));
  }, [isAuth, route.params]);

  return (
    <ScrollView style={{ ...styles.bg_white }}>
      <View style={{ ...styles.container }}>
        <TouchableOpacity onPress={() => navigation.navigate("ProductsList")}>
          <Image
            source={require("../../../../../assets/images/Header-Icon/home_item.png")}
            style={styles.bannerFirst}
          />
          <Text style={styles.banner}>SE UTVALG</Text>
        </TouchableOpacity>

        <View style={styles.body_second}>
          <View style={styles.first}>
            <ImageBackground
              source={require("../../../../../assets/images/Header-Icon/home_second.png")}
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={styles.text1}>UKAS PRODUSENT </Text>
              <Text style={{ ...styles.text_second, fontWeight: "700" }}>
                BAKEHUSET PÅ ASK
              </Text>
            </ImageBackground>
          </View>
          <View style={styles.second}>
            <ImageBackground
              source={require("../../../../../assets/images/Header-Icon/home_second_2.png")}
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  width: "80%",
                  textAlign: "center",
                  color: "#FFF",
                  fontWeight: "700",
                }}
              >
                SE ALLE PRODUSENTER
              </Text>
            </ImageBackground>
          </View>
        </View>

        <View style={styles.third}>
          <Text
            style={{
              textAlign: "center",
              marginTop: 10,
              marginBottom: 10,
              color: "#EB1741",
              fontSize: 25,
            }}
          >
            HVORDAN FUNKER DET?
          </Text>
          <View style={styles.body_third}>
            <View
              style={{
                flex: 0.8,
              }}
            >
              <ImageBackground
                source={require("../../../../../assets/images/Header-Icon/red_circle.png")}
                resizeMode={"contain"}
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  source={require("../../../../../assets/images/Header-Icon/inside_circle.png")}
                  style={styles.center}
                />
              </ImageBackground>
              <Text style={styles.bottom_text}>Legg inn bestilling</Text>
            </View>
            <Icon
              name="arrowright"
              type="ant-design"
              size={40}
              color={"#ed3c61"}
              style={{
                flex: 0.8,
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            />
            <View
              style={{
                // ...styles.body_image,
                flex: 0.8,
                width: 10,
              }}
            >
              <ImageBackground
                source={require("../../../../../assets/images/Header-Icon/red_circle.png")}
                resizeMode={"contain"}
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  source={require("../../../../../assets/images/Header-Icon/second_circle.png")}
                  style={styles.center}
                />
              </ImageBackground>
              <Text style={{ ...styles.bottom_text }}>
                Vi henter varene rett fra bonden
              </Text>
            </View>
            <Icon
              name="arrowright"
              type="ant-design"
              size={40}
              color={"#ed3c61"}
              style={{
                flex: 0.8,
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            />
            <View
              style={{
                // ...styles.body_image,
                flex: 0.8,
              }}
            >
              <ImageBackground
                source={require("../../../../../assets/images/Header-Icon/red_circle.png")}
                resizeMode={"contain"}
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  source={require("../../../../../assets/images/Header-Icon/third_circle.png")}
                  style={styles.center}
                />
              </ImageBackground>

              <Text style={styles.bottom_text}>
                Vi leverer varene hjem til deg
              </Text>
            </View>
          </View>
        </View>

        <Text style={styles.content_text}>MEST KJØPTE</Text>
          <View style={{
            ...globalStyles.containerFluid,
            ...globalStyles.mt8,
            ...styles.bg_white,
            alignItems: 'center',
          }}
        >
          {saving ? (
            <ActivityIndicatorCard />
          ) : (
            <FlatList
              data={productsList.slice(0, 10)}
              keyExtractor={(item, index) => index.toString()}
              renderItem={newJustInRenderItem}
              numColumns={2}
            />
          )}
        </View>
      </View>

      <TouchableOpacity style={styles.home_btn} onPress={() => navigation.navigate('ProductsList')}>
        <Text style={styles.btn_text}>SE HELE UTVALGET</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const mapStateToProps = (state) => ({
  productsList: state.products.productsList,
  pageIndex: state.products.pageIndex,
  meta: state.products.meta,
});

export default connect(mapStateToProps)(HomeComponent);
