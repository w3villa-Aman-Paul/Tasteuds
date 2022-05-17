import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Icon, CheckBox } from "react-native-elements";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { colors } from "../../../res/palette";
import { getData, storeData } from "../../../redux/rootReducer";

const ProducersFooter = ({ navigation }) => {
  const vendors = useSelector((state) => state.taxons.vendors);

  const [checked, setChecked] = useState([]);
  useEffect(() => {
    setChecked(
      vendors
        // ?.sort((a, b) => a.name.localeCompare(b.name))
        .map((ele) => {
          return { name: ele.name };
        })
    );
  }, []);

  console.log("checked", checked);

  useEffect(() => {
    const getVendors = async () => {
      let data = await getData("vendors");
      {
        data !== null ? setChecked(data) : <></>;
      }
    };

    getVendors();
  }, []);

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
      <View style={{ backgroundColor: "#232332", flex: 1 }}>
        {/* // *HEADER-PRODUSENTER */}
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
                <CheckBox
                  key={vendor.id}
                  title={vendor.name}
                  checked={checked[index]?.isChecked || false}
                  onPress={() => handleChange(vendor.name)}
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
                  }}
                  // checkedColor={colors.btnLink}
                  textStyle={{
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
              storeData("vendors", checked);
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

export default ProducersFooter;

const styles = StyleSheet.create({});
