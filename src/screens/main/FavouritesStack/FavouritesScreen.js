import * as React from "react";
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
import { HOST } from "../../../res/env/";
import { deleteFavourite } from "../../../redux";
import { NavigationContainer } from "@react-navigation/native";

const FavouritesScreen = ({ favorites, vendors, dispatch, navigation }) => {
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
          onPress: () => dispatch(deleteFavourite(id)),
          style: "destructive",
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        {favorites.map((fav) => {
          let result = producer(fav.vendor.id);

          return (
            <View key={fav.id} style={styles.contentContainer}>
              <View style={styles.first_content}>
                <Image
                  source={{ uri: `${HOST}/${fav.images[0].styles[3].url}` }}
                  style={styles.fav_image}
                />
                <View style={styles.first_body}>
                  <Text style={{ color: colors.black, fontSize: 14 }}>
                    {fav.name}
                  </Text>
                  <Text style={{ color: colors.btnLink, fontSize: 14 }}>
                    {result.name}
                  </Text>
                </View>
                <Icon
                  type="ant-design"
                  name="delete"
                  size={25}
                  color={colors.btnLink}
                  onPress={() => deleteFav(fav.id)}
                />
              </View>
              <View style={styles.second_content}>
                <TouchableOpacity style={styles.first_btn}>
                  <Text style={{ color: colors.white, fontSize: 14 }}>
                    LEGG TIL I HANDLEKURV
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.sec_btn}
                  onPress={() => navigation.goBack()}
                >
                  <Text>LES MER</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
      </View>
    </ScrollView>
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
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.btnLink,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
});

const mapStateToProps = (state) => ({
  favorites: state.products.favorites,
  vendors: state.taxons.vendors,
});

export default connect(mapStateToProps)(FavouritesScreen);
