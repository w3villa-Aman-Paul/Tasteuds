import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Icon, CheckBox } from "react-native-elements";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { colors } from "../../../res/palette";
import { getData, storeData } from "../../../redux/rootReducer";

const FoodFooter = ({ navigation }) => {
  const menus = useSelector((state) => state.taxons.menus);

  const [checked, setChecked] = useState([]);

  useEffect(() => {
    setChecked(
      menus?.menu_items
        ?.filter(
          (menu) =>
            menu.name !== "PRODUSENTER" &&
            menu.name !== "Categories" &&
            menu.name !== "Kategorier" &&
            menu.name !== "Lokalprodukter"
        )
        .map((ele) => {
          return { id: ele.id, name: ele.name };
        })
    );
  }, []);

  console.log("checked2", checked);

  useEffect(() => {
    const getFood = async () => {
      let data = await getData("food");
      console.log("data", data);
      {
        data !== null && data !== [] ? setChecked(data) : <></>;
      }
    };

    getFood();
  }, []);

  const handleChange = (name) => {
    let tempMenu = checked.map((menu) => {
      if (menu.name === name && Object.values(menu).includes(true) === false) {
        return { ...menu, isChecked: true };
      } else if (
        menu.name === name &&
        Object.values(menu).includes(true) === true
      ) {
        return { ...menu, isChecked: false };
      } else {
        return menu;
      }
    });

    setChecked(tempMenu);
  };

  return (
    <>
      <View style={{ backgroundColor: "#232332", flex: 1, paddingTop: 10 }}>
        {/* // *HEADER-MATVARER */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            position: "relative",
          }}
        >
          <TouchableOpacity
            style={{
              position: "absolute",
              zIndex: 99,
              top: 0,
              left: 10,
            }}
            onPress={() => navigation.goBack()}
          >
            <Icon
              name="chevron-left"
              type="material-icons"
              color="#fff"
              size={30}
            />
          </TouchableOpacity>
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text
              style={{
                color: "#fff",
                // textAlign: "center",
                fontSize: 20,
                fontFamily: "lato-medium",
              }}
            >
              MATVARER
            </Text>
          </View>
        </View>

        {/* // *RENDER CATEGORIES LIST */}
        <BottomSheetScrollView containerStyle={{ width: "90%", flex: 1 }}>
          {menus?.menu_items
            ?.filter(
              (menu) =>
                menu.name !== "PRODUSENTER" &&
                menu.name !== "Categories" &&
                menu.name !== "Kategorier" &&
                menu.name !== "Lokalprodukter"
            )
            // ?.sort((a, b) => a.name.localeCompare(b.name))
            ?.map((menu, index) => {
              return (
                <CheckBox
                  key={menu.id}
                  title={menu.name}
                  checked={checked[index]?.isChecked || false}
                  onPress={() => handleChange(menu.name)}
                  size={24}
                  iconType="material"
                  checkedIcon="check-box"
                  uncheckedIcon="check-box-outline-blank"
                  checkedColor={colors.btnLink}
                  containerStyle={{
                    backgroundColor: "#232332",
                    borderColor: "transparent",
                    borderBottomColor: "rgba(58, 58, 89, 1)",
                    padding: 5,
                    justifyContent: "center",
                  }}
                  textStyle={{
                    flex: 1,
                    color: "#fff",
                    fontFamily: "lato-medium",
                    fontSize: 14,
                  }}
                />
              );
            })}
        </BottomSheetScrollView>

        <View
          style={{
            flex: 0.4,
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={{
              height: 30,
              width: "90%",
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: colors.btnLink,
            }}
            onPress={() => {
              storeData("food", checked);
              navigation.goBack();
            }}
          >
            <Text
              style={{
                color: colors.white,
                fontFamily: "lato-medium",
                fontSize: 14,
              }}
            >
              BRUK
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default FoodFooter;

const styles = StyleSheet.create({});
