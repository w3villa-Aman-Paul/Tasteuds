import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Icon, CheckBox } from "react-native-elements";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
const FoodFooter = ({ navigation }) => {
  const menus = useSelector((state) => state.taxons.menus);

  const [checked, setChecked] = useState([]);

  // const handleChecked = (id, newValue) => {
  //   const index = menus.menu_items.findIndex((item) => item.id === id);

  //   if (index > -1) {
  //     let newArray = [];
  //     newArray[index].checked = newValue;
  //   }
  // };

  return (
    <>
      <View style={{ backgroundColor: "#232332", flex: 1 }}>
        {/* // *HEADER-MATVARER */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            position: "relative",
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ position: "absolute", top: 0, left: 0 }}
          >
            <Icon
              name="chevron-left"
              type="material-icons"
              color="#fff"
              size={24}
            />
          </TouchableOpacity>
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text
              style={{
                color: "#fff",
                // textAlign: "center",
                fontSize: 14,
                fontFamily: "lato-medium",
              }}
            >
              MATVARER
            </Text>
          </View>
        </View>

        {/* // *RENDER CATEGORIES LIST */}
        <BottomSheetScrollView>
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
              // setChecked((oldArray) => [...oldArray, false]);

              console.log(checked);
              return (
                <CheckBox
                  key={menu.id}
                  title={menu.name}
                  checked={checked}
                  // onValueChange={(newValue) => handleChecked(newValue, menu.id)}
                  onPress={() => {
                    let data = checked;
                    data[index] = !data[index];

                    setChecked(data);
                    console.log(checked);
                  }}
                />
              );
            })}
        </BottomSheetScrollView>
      </View>
    </>
  );
};

export default FoodFooter;

const styles = StyleSheet.create({});
