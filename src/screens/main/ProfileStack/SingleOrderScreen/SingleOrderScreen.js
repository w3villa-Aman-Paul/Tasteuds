import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import { useSelector } from "react-redux";
import { connect } from "react-redux";
import { HOST } from "../../../../res/env";
import { styles } from "../../ShopitStack/CheckoutScreens/OrderCompleteScreen/styles";

const SingleOrderScreen = ({ navigation, route }) => {
  const { productsList } = useSelector((state) => state.products);
  const orders = useSelector((state) => state.checkout.orders);
  const [today, setToday] = useState(null);
  const [delieveryDate, setDelieveryDate] = useState(null);
  const [currentOrder, setCurrentOrder] = useState({});

  useEffect(() => {
    handleDelieveryDate();
  }, []);

  useEffect(() => {
      const currentOrder = orders.find((order) => order.number === route.params?.orderNumber)
      setCurrentOrder(currentOrder)
      console.log('CURRENTORDER',currentOrder)
      route.params?.set();
  }, [currentOrder])

  // console.log("ROUTENUMBER", route.params?.orderNumber)

  const handleDelieveryDate = () => {
    let todayDate = new Date();
    let tempDelieveryDate = new Date(todayDate);

    if (today?.getDay() === 2) {
      setToday(todayDate);
      tempDelieveryDate?.setDate(
        tempDelieveryDate?.getDate() +
          ((4 + 7 - tempDelieveryDate?.getDay()) % 7 || 7)
      );
      setDelieveryDate(tempDelieveryDate);
    } else {
      todayDate?.setDate(
        todayDate?.getDate() + ((2 + 7 - todayDate?.getDay()) % 7 || 7)
      );
      tempDelieveryDate?.setDate(
        tempDelieveryDate?.getDate() +
          ((4 + 7 - tempDelieveryDate?.getDay()) % 7 || 7)
      );
      setDelieveryDate(tempDelieveryDate);
    }

    setToday(todayDate);
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity
        style={styles.crossButton}
        onPress={() => navigation.navigate("Account")}
      >
        <Icon type="entypo" name="cross" size={28} style={styles.fav_close} />
      </TouchableOpacity>
      <View>
        <Text style={styles.completeText}>DITT BESTL!</Text>
      </View>

      <View style={styles.details}>
        <View style={styles.container_box}>
          <Text style={styles.products}>PRODUKTER</Text>

          {currentOrder?.line_items?.map((item, index) => {
              const product = productsList.find(
                (ele) => ele.id == item?.variant?.product.id
              );

              return (
                <View key={index} style={styles.itemContainer}>
                  <View style={styles.productItem}>
                    <View style={styles.imgContainer}>
                      <Image
                        style={styles.productImg}
                        source={{
                          uri: `${HOST}/${product?.images[0]?.styles[0]?.url}`,
                        }}
                      />
                      <Text style={styles.productText}>{item?.name}</Text>
                    </View>

                    <View style={styles.productDes}>
                      <Text
                        style={{
                          alignSelf: "center",
                          fontSize: 13,
                          fontFamily: "lato-medium",
                        }}
                      >
                        {item?.quantity} STK
                      </Text>
                    </View>

                    <View style={styles.productPrice}>
                      <Text
                        style={{
                          alignSelf: "flex-end",
                          fontSize: 13,
                          fontFamily: "lato-medium",
                        }}
                        numberOfLines={1}
                      >
                        {item?.display_total}
                      </Text>
                    </View>
                  </View>
                </View>
              );
            })}

          <View style={styles.totalData}>
            <View style={styles.totalDesc}>
              <Text style={styles.primaryText}>TOTALSUM</Text>
              <Text style={styles.secondaryText}>INKLUDERT FRAKT</Text>
            </View>

            <View>
              <Text>{currentOrder?.display_total}</Text>
            </View>
          </View>
        </View>

        <View style={[styles.container_box, { padding: 10 }]}>
          <Text style={styles.primaryText}>LIVERINGSDATO</Text>

          <View style={styles.delivery}>
            <Text style={styles.deliveryText}>{`Torsdag ${String(
              delieveryDate?.getDate()
            ).padStart(2, "0")}.${String(
              delieveryDate?.getMonth() + 1
            ).padStart(2, "0")}`}</Text>

            {/* <Text style={styles.deliveryText}>{delieveryDate?.range}</Text> */}
          </View>
        </View>

        <View style={[styles.container_box, { padding: 10 }]}>
          <Text style={styles.primaryText}>LEVERINGSADRESSE</Text>

          <Text style={[styles.deliveryText, { paddingVertical: 10 }]}>
            {currentOrder?.billing_address?.firstname}
          </Text>

          <View style={styles.delivery}>
            <Text style={styles.deliveryText}>
              {currentOrder?.billing_address?.address1}
            </Text>

            <Text style={styles.deliveryText}>
              {`${currentOrder?.billing_address?.zipcode} ${currentOrder?.billing_address?.state_name}`}
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default connect()(SingleOrderScreen);
