import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { globalStyles } from "../../../../styles/global";
import { styles } from "./styles";
import Footer from "../../../components/footer";
import { accountRetrieve } from "../../../../redux";
import { connect, useSelector } from "react-redux";

const HomeComponent = ({ dispatch, navigation }) => {
  const { isAuth } = useSelector((state) => state.auth);

  React.useEffect(() => {
    dispatch(accountRetrieve(null, {}));
  }, [isAuth]);

  return (
    <ScrollView>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate("ProductsList")}>
          <Image
            source={require("../../../../../assets/images/Header-Icon/home_item.png")}
            style={styles.bannerFirst}
          />
          <Text style={styles.banner}>SE UTVALG</Text>
        </TouchableOpacity>

        <View style={styles.body_second}>
          <View style={styles.first}>
            <Image
              source={require("../../../../../assets/images/Header-Icon/home_second.png")}
              style={styles.body_second_image}
            />
            <Text style={styles.text1}>UKAS PRODUSENT </Text>
            <Text style={styles.text_second}>BAKEHUSET PÅ ASK</Text>
          </View>
          <View style={styles.second}>
            <Image
              source={require("../../../../../assets/images/Header-Icon/home_second_2.png")}
              style={styles.body_second_image}
            />
            <Text style={styles.text1}>SE ALLE PRODUSENTER</Text>
          </View>
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
            <View style={styles.body_image}>
              <Image
                source={require("../../../../../assets/images/Header-Icon/red_circle.png")}
                style={styles.image_center}
              />
              <Image
                source={require("../../../../../assets/images/Header-Icon/inside_circle.png")}
                style={styles.center}
              />
              <Text style={styles.bottom_text}>Legg inn bestilling</Text>
            </View>
            <View style={styles.body_image}>
              <Image
                source={require("../../../../../assets/images/Header-Icon/red_circle.png")}
                style={styles.image_center}
              />
              <Image
                source={require("../../../../../assets/images/Header-Icon/second_circle.png")}
                style={styles.center}
              />
              <Text style={styles.bottom_text}>
                Vi henter varene rett fra bonden
              </Text>
            </View>
            <View style={styles.body_image}>
              <Image
                source={require("../../../../../assets/images/Header-Icon/red_circle.png")}
                style={styles.image_center}
              />
              <Image
                source={require("../../../../../assets/images/Header-Icon/third_circle.png")}
                style={styles.center}
              />
              <Text style={styles.bottom_text}>
                Vi leverer varene hjem til deg
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.fourth}>
          <Text style={styles.content_text}>MEST KJØPTE</Text>
        </View>
      </View>

      <Footer />
    </ScrollView>
  );
};

export default connect()(HomeComponent);
