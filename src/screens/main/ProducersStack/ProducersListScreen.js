import {
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  ImageBackground,
} from "react-native";
import React from "react";
import { styles } from "./style";
import { Icon } from "react-native-elements";
import { connect, useSelector } from "react-redux";
import { HOST } from "../../../res/env";
import { getSelectedVendor } from "../../../redux/actions/taxonsActions";

const ProducersListScreen = ({ dispatch, navigation }) => {
  const vendors = useSelector((state) => state.taxons.vendors);

  const handleProducerClick = async (vendor) => {
    await dispatch(getSelectedVendor(vendor.slug));
    navigation.navigate("ProducersDetailScreen");
  };

  const renderFlatListItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={[styles.container, styles.producer]}
        onPress={() => handleProducerClick(item)}
      >
        <ImageBackground
          source={{
            // uri: "https://tastebuds-aws.s3.eu-north-1.amazonaws.com/eozy6zww9hpbn0vp304dtsw73w7s?response-content-disposition=inline%3B%20filename%3D%2232690001_1665576066895645_5949294621455548416_n.jpg%22%3B%20filename%2A%3DUTF-8%27%2732690001_1665576066895645_5949294621455548416_n.jpg&response-content-type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAW5XFXMM6XIKDCN4K%2F20220517%2Feu-north-1%2Fs3%2Faws4_request&X-Amz-Date=20220517T100653Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=7bdacc3bacfd264f2b9713237b8f4e380a8e5ac5e1403888677427372d89b77f",
            uri: `${HOST}/${item?.image?.styles[5]?.url}`,
          }}
          style={styles.producerCoverImage}
          resizeMode={"contain"}
        >
          <Text style={[styles.producerName]}>{item.name}</Text>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  const producerListUpperComponent = () => {
    return (
      <View style={[styles.container]}>
        {/* // * notification */}

        <View style={[styles.notificationContainer]}>
          <Image
            source={require("../../../../assets/images/producersImage/producerNotification.png")}
            style={{ resizeMode: "contain", flex: 0.2 }}
          />
          <Text
            style={[styles.notificationText, { flex: 0.7, flexWrap: "wrap" }]}
          >
            Bli bedre kjent med våre 50 produsenter, og utforsk utvalget deres
          </Text>
        </View>

        {/* //* filter and sorter */}

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            marginTop: 30,
          }}
        >
          <TouchableOpacity
            style={{
              width: 100,
              borderWidth: 1,
              borderRadius: 10,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
            // onPress={() => handleSnapPress(0)}
          >
            <Icon name="filter-list" type="material-icons" />
            <Text style={styles.buttonText}>FILTER</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: 100,
              marginLeft: 10,
              borderWidth: 1,
              borderRadius: 10,
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "center",
            }}
            // onPress={() => setIsSortOverlayVisible(true)}
          >
            <Icon name="sort" type="material-icons" />
            <Text style={styles.buttonText}>SORTER</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ ...styles.containerFluid, ...styles.bgWhite }}>
      <FlatList
        data={vendors}
        keyExtractor={(item, index) => item.id}
        renderItem={renderFlatListItem}
        ListHeaderComponent={producerListUpperComponent}
      />
    </SafeAreaView>
  );
};

export default connect()(ProducersListScreen);
