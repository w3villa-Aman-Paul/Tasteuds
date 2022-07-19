import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Icon, CheckBox } from "react-native-elements";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { colors } from "../../../res/palette";
import { getData, storeData } from "../../../redux/rootReducer";
import { connect } from "react-redux";
import { getSearchProduct } from "../../../redux";

const ProducersFooter = ({ navigation, dispatch }) => {
  const vendors = useSelector((state) => state.taxons.vendors);
  const [food, setFood] = useState([]);

  const [checked, setChecked] = useState([]);

  const selectedFood = async () => {
    let data = await getData("food");

    return data;
  };

  useEffect(() => {
    setChecked(
      vendors
        // ?.sort((a, b) => a.name.localeCompare(b.name))
        .map((ele) => {
          return { name: ele.name, id: ele.id };
        })
    );
  }, []);

  useEffect(() => {
    const getVendors = async () => {
      let data = await getData("vendors");
      {
        data !== null ? setChecked(data) : <></>;
      }
    };

    getVendors();
  }, []);

  const handleSetFood = (data) => {
    setFood(data);
  };

  const handleChange = (name) => {
    let tempMenu = checked.map((vendor) => {
      if (
        vendor.name === name &&
        Object.values(vendor).includes(true) === false
      ) {
        return { ...vendor, isChecked: true };
      } else if (
        vendor.name === name &&
        Object.values(vendor).includes(true) === true
      ) {
        return { ...vendor, isChecked: false };
      } else {
        return vendor;
      }
    });

    setChecked(tempMenu);
  };

  return (
    <>
      <View style={{ backgroundColor: "#232332", flex: 1, paddingTop: 10 }}>
        {/* // *HEADER-PRODUSENTER */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            position: "relative",
            marginBottom: 10,
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ position: "absolute", top: 0, left: 0, zIndex: 99 }}
          >
            <Icon
              name="chevron-left"
              type="material-icons"
              color="#fff"
              size={34}
            />
          </TouchableOpacity>
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text
              style={{
                color: "#fff",
                fontSize: 20,
                fontFamily: "lato-medium",
              }}
            >
              PRODUSENTER
            </Text>
          </View>
        </View>

        {/* // *RENDER VENDORS LIST */}
        <BottomSheetScrollView containerStyle={{ width: "90%", flex: 1 }}>
          {vendors
            // ?.sort((a, b) => a.name.localeCompare(b.name))
            ?.map((vendor, index) => {
              return (
                <View
                  key={vendor.id}
                  style={{
                    justifyContent: "center",
                    alignItems: "flex-start",
                    borderWidth: 1,
                    borderColor: "transparent",
                    borderBottomColor: "rgba(58, 58, 89, 1)",
                  }}
                >
                  <CheckBox
                    title={vendor.name}
                    checked={checked[index]?.isChecked || false}
                    onPress={() => handleChange(vendor.name)}
                    size={28}
                    iconType="material"
                    checkedIcon="check-box"
                    uncheckedIcon="check-box-outline-blank"
                    checkedColor={colors.btnLink}
                    containerStyle={{
                      backgroundColor: "#232332",
                      borderColor: "transparent",
                      padding: 5,
                    }}
                    // checkedColor={colors.btnLink}
                    textStyle={{
                      color: "#fff",
                      fontFamily: "lato-medium",
                      fontSize: 16,
                    }}
                  />
                </View>
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
            onPress={async () => {
              storeData("vendors", checked);
              const filterVendor = checked
                ?.filter((item) => item?.isChecked)
                ?.map((item) => parseInt(item?.id));

              let food = await selectedFood();
              const filterFood = food
                ?.filter((item) => item?.isChecked)
                ?.map((item) => parseInt(item?.id));

              dispatch(getSearchProduct(null, filterFood, filterVendor));
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

export default connect()(ProducersFooter);

const styles = StyleSheet.create({});
