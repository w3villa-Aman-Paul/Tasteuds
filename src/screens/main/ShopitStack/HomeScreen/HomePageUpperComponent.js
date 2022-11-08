import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";
import React from "react";
import { styles } from "./styles";
import { useSelector } from "react-redux";
import { Icon } from "react-native-elements";
import { globalStyles } from "../../../../styles/global";
import { useNavigation } from "@react-navigation/native";

function HomePageUpperComponent() {
  const weeklyProducer = useSelector((state) => state.taxons.weeklyProducer);

  const navigation = useNavigation();

  const handleWeeklyProducerClick = async (vendor) => {
    navigation.navigate("ProducersDetailScreen", {
      bio: vendor.bio,
      cover_image_url: vendor.cover_image_url,
      logo_image_url: vendor.logo_image_url,
      vendorSlug: vendor.slug,
    });
  };

  return (
    <View style={{ paddingHorizontal: 10 }}>
      <View style={{ marginBottom: 5 }}>
        <TouchableOpacity
          style={[
            styles.bannerFirstDiv,
            {
              flex: 1,
              margin: 0,
              borderRadius: 10,
              overflow: "hidden",
            },
          ]}
          onPress={() => navigation.navigate("ProductsList")}
        >
          <ImageBackground
            source={require("../../../../../assets/images/Header-Icon/home_item.png")}
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              borderWidth: 1,
              borderColor: "transparent",
            }}
            imageStyle={{ borderRadius: 20 }}
            resizeMode={"cover"}
          >
            <Text style={styles.banner}>SE UTVALG</Text>
          </ImageBackground>
        </TouchableOpacity>
      </View>

      <View style={styles.body_second}>
        <TouchableOpacity
          // style={styles.first}
          onPress={() => handleWeeklyProducerClick(weeklyProducer[0].vendor)}
        >
          <ImageBackground
            source={require("../../../../../assets/images/Header-Icon/home_second.png")}
            style={{
              justifyContent: "center",
              alignItems: "center",
              height: 128, 
            }}
            imageStyle={{ borderRadius: 15 }}

          >
            <Text style={styles.text1}>UKENS PRODUSENT</Text>
            <Text style={{ ...styles.text_second, fontWeight: "700" }}>
              {weeklyProducer[0]?.vendor ? weeklyProducer[0].vendor.name : ""}
            </Text>
          </ImageBackground>
        </TouchableOpacity>

        <TouchableOpacity
          // style={styles.second}
          onPress={() => navigation.navigate("ProducersListScreen")}
        >
          <ImageBackground
            source={require("../../../../../assets/images/Header-Icon/home_second_2.png")}
            style={{
              justifyContent: "center",
              alignItems: "center",
              height: 120 
            }}
            imageStyle={{ borderRadius: 15 }}

          >
            <Text
              style={{
                width: "80%",
                textAlign: "center",
                color: "#FFF",
                fontWeight: "700",
              }}
            >
              SE ALLE PRODUSENTER
            </Text>
          </ImageBackground>
        </TouchableOpacity>
      </View>

      <View style={styles.third}>
        <Text
          style={{
            textAlign: "center",
            marginTop: 10,
            marginBottom: 10,
            color: "#EB1741",
            fontSize: 25,
          }}
        >
          HVORDAN FUNKER DET?
        </Text>
        <View style={styles.body_third}>
          <View
            style={{
              flex: 0.8,
            }}
          >
            <ImageBackground
              source={require("../../../../../assets/images/Header-Icon/red_circle.png")}
              resizeMode={"contain"}
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                source={require("../../../../../assets/images/Header-Icon/inside_circle.png")}
                style={styles.center}
              />
            </ImageBackground>
            <Text style={styles.bottom_text}>Legg inn bestilling</Text>
          </View>
          <Icon
            name="arrowright"
            type="ant-design"
            size={40}
            color={"#ed3c61"}
            style={{
              flex: 0.8,
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          />
          <View
            style={{
              // ...styles.body_image,
              flex: 0.8,
              width: 10,
            }}
          >
            <ImageBackground
              source={require("../../../../../assets/images/Header-Icon/red_circle.png")}
              resizeMode={"contain"}
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                source={require("../../../../../assets/images/Header-Icon/second_circle.png")}
                style={styles.center}
              />
            </ImageBackground>
            <Text style={{ ...styles.bottom_text }}>
              Vi henter varene rett fra bonden
            </Text>
          </View>
          <Icon
            name="arrowright"
            type="ant-design"
            size={40}
            color={"#ed3c61"}
            style={{
              flex: 0.8,
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          />
          <View
            style={{
              // ...styles.body_image,
              flex: 0.8,
            }}
          >
            <ImageBackground
              source={require("../../../../../assets/images/Header-Icon/red_circle.png")}
              resizeMode={"contain"}
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                source={require("../../../../../assets/images/Header-Icon/third_circle.png")}
                style={styles.center}
              />
            </ImageBackground>

            <Text style={styles.bottom_text}>
              Vi leverer varene hjem til deg
            </Text>
          </View>
        </View>
      </View>

      <Text style={{ ...styles.content_text, ...globalStyles.container }}>
        MEST KJØPTE
      </Text>
    </View>
  );
}

export default HomePageUpperComponent;
