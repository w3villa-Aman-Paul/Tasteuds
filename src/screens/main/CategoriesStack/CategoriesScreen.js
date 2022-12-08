import * as React from "react";
import { ScrollView, View, Text, Image, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import { getMenus, getNewlyAddProducts } from "../../../redux";
import { connect, useSelector } from "react-redux";
import ActivityIndicatorCard from "../../../library/components/ActivityIndicatorCard";
import { colors } from "../../../res/palette";
import { HOST } from "../../../res/env";

const CategoriesScreen = ({
  navigation,
  dispatch,
  saving,
  route,
}) => {
  const menus = useSelector((state) => state.taxons.menus);

  const [activeCategory, setActiveCategory] = React.useState({});

  // React.useEffect(() => {
  //   {
  //     {
  //       menus.menu_items === 0 && dispatch(getMenus());
  //     }
  //   }
  // }, []);

  if (saving) {
    return <ActivityIndicatorCard />;
  } else
    return (
      <ScrollView style={[styles.bgWhite, styles.containerFluid]}>
        {/* //TODO: upper Options */}
        <View style={[styles.container, styles.section]}>
          <TouchableOpacity
            style={styles.upperOptions}
            onPress={() => {
              navigation.navigate("MostBoughtProducts");
            }}
          >
            <Image
              source={require("../../../../assets/images/icons/medal.png")}
              style={styles.icon}
            />
            <Text style={styles.optionText}>Dine mest kjøpte varer</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.upperOptions}
            onPress={() => {
              dispatch(getNewlyAddProducts());
              navigation.navigate("NewProducts");
            }}
          >
            <Image
              source={require("../../../../assets/images/icons/new.png")}
              style={styles.icon}
            />
            <Text style={styles.optionText}>Nyheter</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.upperOptions}
            onPress={() => navigation.navigate("ProducersListScreen")}
          >
            <Image
              source={require("../../../../assets/images/icons/farmer.png")}
              style={styles.icon}
            />
            <Text style={styles.optionText}>Velg Produsent</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.upperOptions}
            onPress={() => navigation.navigate("ProductsList")}
          >
            <Image
              source={require("../../../../assets/images/icons/ingredients.png")}
              style={styles.icon}
            />
            <Text style={styles.optionText}>Se alle produkter</Text>
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
                    onPress={() => {
                      setActiveCategory({
                        name: item.name,
                        id: item.linked_resource.id,
                      });
                      navigation.navigate("ProductsList", {
                        menu: item,
                        id: item.linked_resource.id,
                        route: route.name,
                      });
                    }}
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
                        source={
                          item?.icon?.url
                            ? {
                                uri: `${HOST}${item.icon.url}`,
                              }
                            : require("../../../../assets/images/icons/Meieri.png")
                        }
                        style={styles.icon}
                      />
                      <Text
                        style={[
                          styles.optionText,
                          activeCategory?.name === item?.name
                            ? {
                                color: colors.btnLink,
                              }
                            : {},
                        ]}
                      >
                        {item.name}
                      </Text>
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
