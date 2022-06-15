import * as React from "react";
import { ScrollView, View, Text, Image, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import { getMenus, getTaxonsList } from "../../../redux";
import { connect, useSelector } from "react-redux";
import ActivityIndicatorCard from "../../../library/components/ActivityIndicatorCard";

const CategoriesScreen = ({ navigation, dispatch, taxonomy, saving }) => {
  const menus = useSelector((state) => state.taxons.menus);

  const handleDisplayTaxon = ({ title, id }) => {
    navigation.navigate("ProductsList", { title: title, id: id });
  };

  React.useEffect(() => {
    dispatch(getMenus());
  }, []);

  if (saving) {
    return <ActivityIndicatorCard />;
  } else
    return (
      <ScrollView style={[styles.bgWhite, styles.containerFluid]}>
        {/* //TODO: upper Options */}
        <View style={[styles.container, styles.section]}>
          <TouchableOpacity style={styles.upperOptions}>
            <Image
              source={require("../../../../assets/images/category-images/food.png")}
              style={styles.icon}
            />
            <Text style={styles.optionText}>Dine mest kjøpte varer</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.upperOptions}>
            <Image
              source={require("../../../../assets/images/category-images/alert.png")}
              style={styles.icon}
            />
            <Text style={styles.optionText}>Nyheter</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.upperOptions}>
            <Image
              source={require("../../../../assets/images/category-images/producers.png")}
              style={styles.icon}
            />
            <Text style={styles.optionText}>Dine mest kjøpte varer</Text>
          </TouchableOpacity>
        </View>

        {/* // Todo: category render */}
        <View style={styles.containerFluid}>
          <Text style={{ ...styles.categoryHeader, ...styles.container }}>
            KATEGORIER
          </Text>

          <View style={styles.section}>
            {menus?.menu_items
              ?.filter(
                (menu) =>
                  menu.name !== "PRODUSENTER" &&
                  menu.name !== "Categories" &&
                  menu.name !== "Kategorier" &&
                  menu.name !== "Lokalprodukter"
              )
              // ?.sort((a, b) => a.name.localeCompare(b.name))
              ?.map((item, index, array) => {
                return (
                  <TouchableOpacity
                    style={[
                      styles.lowerOptions,
                      index === array.length - 1
                        ? { borderBottomColor: "transparent" }
                        : {},
                    ]}
                    key={item.id}
                    onPress={() =>
                      navigation.navigate("ProductsList", { menu: item })
                    }
                  >
                    <View
                      style={[
                        styles.container,
                        {
                          flex: 1,
                          flexDirection: "row",
                          paddingHorizontal: 5,
                          alignItems: "center",
                        },
                      ]}
                    >
                      <Image
                        source={require("../../../../assets/images/category-images/food.png")}
                        style={styles.icon}
                      />
                      <Text style={styles.optionText}>{item.name}</Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
          </View>
        </View>
      </ScrollView>
    );
};

const mapStateToProps = (state) => ({
  taxonomy: state.taxons.taxonsList,
  saving: state.taxons.saving,
});

export default connect(mapStateToProps)(CategoriesScreen);
