import { StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { styles } from "../../main/ShopitStack/ProductsListScreen/styles";
import { globalStyles } from "../../../styles/global";
import { colors } from "../../../res/palette";

const UpperNotification = () => {
  const [today, setToday] = useState(null);
  const [delieveryDate, setDelieveryDate] = useState(null);
  useEffect(() => {
    handleDelieveryDate();
  }, []);

  const handleDelieveryDate = () => {
    let todayDate = new Date();
    let delieveryDate = new Date(todayDate);

    if (today?.getDay() === 2) {
      setToday(todayDate);
      delieveryDate?.setDate(
        delieveryDate?.getDate() + ((4 + 7 - delieveryDate?.getDay()) % 7 || 7)
      );
      setDelieveryDate(delieveryDate);
    } else {
      todayDate?.setDate(
        todayDate?.getDate() + ((2 + 7 - todayDate?.getDay()) % 7 || 7)
      );
      delieveryDate?.setDate(
        delieveryDate?.getDate() + ((4 + 7 - delieveryDate?.getDay()) % 7 || 7)
      );
      setDelieveryDate(delieveryDate);
    }

    setToday(todayDate);
  };
  return (
    <View
      style={[
        styles.topBanner,
        globalStyles.iosShadow,
        Platform.OS === "android" ? { marginTop: 10 } : { marginTop: 0 },
      ]}
    >
      <Image
        source={require("../../../../assets/images/components/delivery-truck.png")}
        resizeMode={"contain"}
        style={{ flex: 0.2, marginRight: 10, height: "100%" }}
      />

      <View style={{ flex: 0.9, justifyContent: "center" }}>
        <Text
          style={{
            fontSize: 16,
            lineHeight: 18.75,
            fontWeight: "bold",
          }}
        >
          Bestill innen{" "}
          <Text style={{ color: colors.btnLink }}>{`Tirsdag ${String(
            today?.getDate()
          ).padStart(2, "0")}.${String(today?.getMonth() + 1).padStart(
            2,
            "0"
          )}`}</Text>{" "}
          og få varene levert hjem{" "}
          <Text style={{ color: colors.btnLink }}>{`Torsdag ${String(
            delieveryDate?.getDate()
          ).padStart(2, "0")}.${String(delieveryDate?.getMonth() + 1).padStart(
            2,
            "0"
          )}`}</Text>
        </Text>
      </View>
    </View>
  );
};

export default UpperNotification;
