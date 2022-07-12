import React, { useState, useRef, useEffect } from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { connect, useSelector } from "react-redux";
import { Icon } from "react-native-elements";
import { colors } from "../../../res/palette";
import { Snackbar } from "react-native-paper";
import {
  addItem,
  deleteFavourite,
  setFavQuantityDec,
  setFavQuantityInc,
} from "../../../redux";
import FilterFooter from "../../../library/components/ActionButtonFooter/FilterFooter";
import { HOST } from "../../../res/env";

const FavouritesScreen = ({
  vendors,
  dispatch,
  navigation,
  favorites,
  cart,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [nextOpen, setNextOpen] = useState(false);
  const [itemId, setItemId] = useState(null);
  const [temp, setTemp] = useState(null);
  const [tempVar, setTempVar] = useState(null);
  const [qtyBtn, setQtyBtn] = useState(false);
  const [color, setColor] = useState(0);
  const [particularFav, setParticularFav] = useState(null);
  const sheetRef = useRef(null);
  const snapPoints = ["35%"];

  useEffect(() => {
    if (favorites?.length === 0) {
      setQtyBtn(false);
    }

    let tempFav = favorites.find((x) => x.id === particularFav?.id);
    setTemp(tempFav);
    setTempVar(tempFav?.variants[color]?.id);
  }, [favorites, temp, particularFav]);

  const producer = (Id) => {
    const res = vendors.find((ven) => ven.id === Id);
    return res;
  };

  const deleteFav = (id) => {
    Alert.alert(
      "Warning",
      "Are you sure you want to delete ?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          onPress: () => {
            dispatch(deleteFavourite(id));
            setIsOpen(false);
          },
          style: "destructive",
        },
      ],
      { cancelable: true }
    );
  };

  const bottomSheetContent = (Id) => {
    let fav_res = favorites?.find((x) => x.id === Id);

    return nextOpen ? (
      <View style={styles.fav_contain}>
        <View style={styles.fav_first}>
          {fav_res?.variants.map((q, i) => {
            return (
              <TouchableOpacity
                style={color === i ? styles.active : styles.fav_qty}
                key={i}
                onPress={() => {
                  setColor(i);
                  setIsOpen(false);
                  setNextOpen(false);
                }}
              >
                <Text
                  style={color === i ? styles.active_var : styles.unactive_var}
                >
                  {q.options_text
                    ? q.options_text.split(" ")[3] ||
                      q.options_text.split(" ")[1]
                    : "No available Quantity"}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <View style={styles.back_btn}>
          <TouchableOpacity
            style={styles.fav_Back_btn}
            onPress={() => setNextOpen(false)}
          >
            <Text style={{ color: colors.white }}>TILBAKE</Text>
          </TouchableOpacity>
        </View>
      </View>
    ) : (
      <View style={styles.fav_contain}>
        <TouchableOpacity
          style={styles.fav_close_container}
          onPress={() => setIsOpen(false)}
        >
          <Icon type="entypo" name="cross" size={28} style={styles.fav_close} />
        </TouchableOpacity>
        <View style={styles.fav_first}>
          <TouchableOpacity
            style={styles.fav_btn}
            onPress={() => {
              setNextOpen(true);
              navigation.replace("Fav Quantity");
            }}
          >
            <Text>ENDRE STØRRELSE</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.fav_second}>
          <TouchableOpacity
            style={styles.fav_btn}
            onPress={() => deleteFav(Id)}
          >
            <Text>FJERN FRA FAVORITTER</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const handleIncrementQuantity = (fav_id, fav_quantity) => {
    dispatch(
      setFavQuantityInc({
        fav_item_id: fav_id,
        quantity: fav_quantity + 1,
      })
    );
  };

  const handleDecrementQuantity = (fav_id, fav_quantity) => {
    if (fav_quantity === 1) {
      setQtyBtn(false);
    } else {
      dispatch(
        setFavQuantityDec({
          fav_item_id: fav_id,
          quantity: fav_quantity - 1,
        })
      );
    }
  };

  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          {favorites?.map((favourite) => {
            let result = producer(favourite?.vendor?.id);

            return (
              <TouchableOpacity
                key={favourite?.id}
                style={styles.contentContainer}
              >
                <View style={styles.first_content}>
                  <Image
                    source={{
                      uri: `${HOST}/${favourite?.images[0].styles[3].url}`,
                    }}
                    style={styles.fav_image}
                  />
                  <View style={styles.first_body}>
                    <Text style={{ color: colors.black, fontSize: 14 }}>
                      {favourite?.name}
                    </Text>
                    <Text style={{ color: colors.btnLink, fontSize: 14 }}>
                      {result?.name}
                    </Text>
                    <Text style={{ color: colors.black, fontSize: 14 }}>
                      {itemId?.id === favourite?.id
                        ? itemId?.variants[color]?.display_price
                        : favourite?.variants[0]?.display_price}
                      |{" "}
                      {itemId?.id === favourite?.id
                        ? itemId?.variants[color].options_text.split(" ")[3] ||
                          itemId?.variants[color].options_text.split(" ")[1]
                        : favourite?.variants[0].options_text.split(" ")[3] ||
                          favourite?.variants[0].options_text.split(" ")[1]}
                    </Text>
                  </View>
                  <Icon
                    type="entypo"
                    name="dots-three-horizontal"
                    size={25}
                    color={colors.black}
                    onPress={() => {
                      setIsOpen(true);
                      setItemId(favourite);
                    }}
                  />
                </View>
                <View style={styles.second_content}>
                  {qtyBtn && particularFav?.id === favourite?.id ? (
                    <View style={styles.fav_qty_style}>
                      <TouchableOpacity
                        style={styles.qty_icon_first}
                        onPress={() =>
                          handleDecrementQuantity(
                            favourite?.id,
                            favourite?.fav_qty
                          )
                        }
                      >
                        <Icon
                          type="ant-design"
                          name="minus"
                          size={22}
                          color={colors.white}
                        />
                      </TouchableOpacity>
                      <Text style={{ fontWeight: "bold" }}>
                        {favourite?.fav_qty ? favourite?.fav_qty : 1}
                      </Text>
                      <TouchableOpacity
                        style={styles.qty_icon_second}
                        onPress={() =>
                          handleIncrementQuantity(
                            favourite?.id,
                            favourite?.fav_qty
                          )
                        }
                      >
                        <Icon
                          type="ant-design"
                          name="plus"
                          size={22}
                          color={colors.white}
                        />
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <>
                      <TouchableOpacity
                        style={styles.sec_btn}
                        onPress={() => {
                          setParticularFav(favourite);
                          setQtyBtn(true);
                        }}
                      >
                        <Icon
                          type="ant-design"
                          name="shoppingcart"
                          size={18}
                          color={colors.white}
                          style={{ marginRight: 6 }}
                        />
                        <Text style={{ color: colors.white }}>KJØP</Text>
                      </TouchableOpacity>
                    </>
                  )}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
      {qtyBtn && particularFav?.id ? (
        <View style={styles.qty_footer}>
          <Text
            style={{ color: colors.white, fontSize: 15, fontWeight: "bold" }}
          >
            {temp?.fav_qty} VARE
          </Text>
          <TouchableOpacity
            onPress={() => {
              dispatch(
                addItem(cart?.token, {
                  variant_id: tempVar,
                  quantity: temp?.fav_qty,
                })
              );
              navigation.navigate("Bag");
            }}
          >
            <Text
              style={{ color: colors.white, fontSize: 15, fontWeight: "bold" }}
            >
              SE HANDLEVOGN
            </Text>
          </TouchableOpacity>
        </View>
      ) : null}
      {isOpen && (
        <FilterFooter
          value={sheetRef}
          snapPoints={snapPoints}
          onClose={() => setIsOpen(false)}
          bottomSheetContent={() => bottomSheetContent(itemId?.id)}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignSelf: "center",
    width: "90%",
    marginTop: 20,
    marginBottom: 20,
  },

  contentContainer: {
    borderRadius: 10,
    elevation: 10,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "transparent",
    marginBottom: 10,
  },
  first_content: {
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  fav_image: {
    height: 70,
    width: 50,
    resizeMode: "contain",
    marginRight: 10,
  },
  first_body: {
    flex: 1,
    justifyContent: "center",
  },
  second_content: {
    flexDirection: "row",
    alignSelf: "flex-end",
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  first_btn: {
    flex: 0.7,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.btnLink,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginRight: 10,
  },
  sec_btn: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "transparent",
    backgroundColor: colors.btnLink,
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRadius: 5,
  },
  fav_contain: {
    flex: 1,
    backgroundColor: "#232332",
    justifyContent: "center",
    alignItems: "center",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  fav_first: {
    width: "90%",
    marginBottom: 10,
  },
  fav_second: {
    width: "90%",
    marginTop: 10,
  },
  fav_btn: {
    backgroundColor: colors.white,
    borderRadius: 8,
    paddingVertical: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  fav_close_container: {
    flexDirection: "row",
    alignSelf: "flex-end",
    position: "absolute",
    right: 12,
    top: 10,
  },
  fav_close: {
    borderRadius: 30,
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
  },
  fav_qty: {
    backgroundColor: colors.white,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "flex-start",
    marginBottom: 5,
  },
  back_btn: {
    alignSelf: "center",
    justifyContent: "center",
  },
  fav_Back_btn: {
    marginTop: 5,
    fontSize: 20,
    color: colors.white,
  },
  fav_qty_style: {
    flexDirection: "row",
    alignItems: "center",
  },
  qty_icon_first: {
    backgroundColor: colors.btnLink,
    borderRadius: 20,
    marginRight: 10,
    padding: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  qty_icon_second: {
    backgroundColor: colors.btnLink,
    borderRadius: 20,
    padding: 4,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  qty_footer: {
    backgroundColor: colors.btnLink,
    width: "100%",
    maxHeight: 50,
    borderWidth: 1,
    borderColor: "transparent",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 8,
    alignItems: "center",
  },
  active: {
    backgroundColor: colors.btnLink,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "flex-start",
    marginBottom: 5,
  },
  active_var: {
    color: colors.white,
    fontSize: 14,
    fontWeight: "bold",
  },
  unactive_var: {
    color: colors.black,
  },
});

const mapStateToProps = (state) => ({
  favorites: state.products.favorites,
  vendors: state.taxons.vendors,
  cart: state.checkout.cart,
});

export default connect(mapStateToProps)(FavouritesScreen);
