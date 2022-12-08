import {
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  Button,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { styles } from "./style";
import { connect, useSelector } from "react-redux";
import Modal from "react-native-modal";

import { HOST } from "../../../res/env";
import {
  getSelectedVendor,
  getVendorsList,
} from "../../../redux/actions/taxonsActions";
import { globalStyles } from "../../../styles/global";

const ProducersListScreen = ({ dispatch, navigation }) => {
  const vendors = useSelector((state) => state.taxons.vendors);

  const [vendorsList, setVendorsList] = useState([vendors]);

  const [isModalVisible, setModalVisible] = useState(false);



  // useEffect(() => {
  //   dispatch(getVendorsList());
  // }, []);


  useEffect(() => {
    let load = false;
    if (!load) {
      setVendorsList(vendors?.sort((a, b) => a.name.localeCompare(b.name)));
    }
    return () => {
      load = true;
    };
  }, []);


  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleProducerClick = async (vendor) => {
    await dispatch(getSelectedVendor(vendor.slug));
    navigation.navigate("ProducersDetailScreen", {
      bio: vendor.bio,
      cover_image_url: vendor.cover_image_url,
      logo_image_url: vendor.logo_image_url,
      vendorSlug: vendor.slug,
    });
  };

  const renderFlatListItem = ({ item}) => {
    return (
      <TouchableOpacity
        style={[styles.container, styles.producer]}
        onPress={() => handleProducerClick(item)}
      >
        <ImageBackground
          source={{
            uri: `${item?.cover_image_url}` ? `${item?.cover_image_url}` : "https://cdn-icons-png.flaticon.com/512/79/79976.png"
          }}
          style={styles.producerCoverImage}
          imageStyle={{ borderRadius: 10 }}
        >
          <View style={[styles.nameContainer]}>
            <Text style={[styles.producerName]}>{item.name}</Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  const sortTypes = [
    {
      id: 1,
      name: "A-Å",
      function: () => handleNameWiseSort(),
    },
    {
      id: 2,
      name: "Nylig lagt til",
      function: () => handlDateWiseSort(),
    },
  ];

  const handleNameWiseSort = () => {
    let vendors = vendorsList?.sort((a, b) => a.name.localeCompare(b.name));

    setVendorsList(vendors);
  };

  const handlDateWiseSort = () => {
    let vendors = vendorsList?.sort((a, b) => {
      if (b.created_at?.substring(0, 10) > a.created_at?.substring(0, 10)) {
        return 1;
      } else if (
        b.created_at?.substring(0, 10) < a.created_at?.substring(0, 10)
      ) {
        return -1;
      } else {
        return 0;
      }
    });
    setVendorsList(vendors);
  };

  const producerListUpperComponent = () => {
    return (
      <View style={[styles.container, globalStyles.iosShadow]}>
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
            style={[styles.filterSortBtn, globalStyles.iosShadow]}
          >
            <Image
              source={require("./../../../../assets/images/icons/slider.png")}
              style={{
                flex: 0.4,
                width: "100%",
                height: "100%",
                resizeMode: "contain",
              }}
            />
            <Text style={styles.buttonText}>FILTER</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterSortBtn, globalStyles.iosShadow]}
            onPress={toggleModal}
          >
            <Image
              source={require("./../../../../assets/images/icons/up-down-arrow.png")}
              style={{
                flex: 0.4,
                width: "100%",
                height: "100%",
                resizeMode: "contain",
              }}
            />
            <Text style={styles.buttonText}>SORTER</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ ...styles.containerFluid, ...styles.bgWhite }}>
      <FlatList
        data={
          vendorsList
            ? vendorsList?.filter((item) => item.state === "active")
            : []
        }
        keyExtractor={item => item.id.toString()}
        renderItem={vendorsList ? renderFlatListItem : <ActivityIndicator />}
        ListHeaderComponent={producerListUpperComponent}
      />

      <Modal
        isVisible={isModalVisible}
        style={styles.modal}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        backdropColor="transparent"
        onSwipeComplete={() => setModalVisible(false)}
        swipeDirection="down"
        coverScreen={false}
        onBackdropPress={() => setModalVisible(false)}
      >
        <View style={styles.sorterBtnContainer}>
          <Text style={styles.sorterHeaderText}>SORTER</Text>

          <View>
            {sortTypes.map((item) => (
              <TouchableOpacity
                style={styles.sorterButton}
                key={item.id}
                onPress={() => {
                  item.function();
                  setModalVisible(false);
                }}
              >
                <Text style={styles.sorterButtonText}>{item.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity style={styles.hideButton} onPress={toggleModal}>
            <Text style={styles.hideButtonText}> Cancle </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default connect()(ProducersListScreen);
