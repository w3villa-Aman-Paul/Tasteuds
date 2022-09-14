import React, { useState, useEffect } from "react";
import { useWindowDimensions } from "react-native";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Modal from "react-native-modal";
import { useSelector, useDispatch } from "react-redux";
import { updateAddressFunc } from "../../../redux";
import { colors } from "../../../res/palette";
import { globalStyles } from "../../../styles/global";

const BottomModal = ({ isModalVisible, setModalVisible, content = null }) => {
  const [updateProfile, setUpdateProfile] = useState({
    FORNAVN: "",
    ETTERNAVN: "",
    EPOST: "",
    TELEFONNUMMER: "",
    ADRESSE: "",
    PIN: "",
    CITY: "",
  });

  const Address = useSelector((state) => state.checkout.address);

  useEffect(() => {
    if (Address.length > 0) {
      setUpdateProfile({
        FORNAVN: Address[0]?.firstname,
        ETTERNAVN: Address[0]?.lastname,
        TELEFONNUMMER: Address[0]?.phone,
        ADRESSE: Address[0]?.address1,
        PIN: Address[0]?.zipcode,
        CITY: Address[0]?.city,
      });
    }
  }, [Address]);

  const dispatch = useDispatch();

  const { height, width } = useWindowDimensions();
  const rowWidth = width * 0.9;

  const handleUpdateAddress = () => {
    dispatch(updateAddressFunc(updateProfile, null, Address[0].id));
  };

  const updateAddressModalContent = () => {
    return (
      <View style={styles.sorterBtnContainer}>
        <Text style={styles.sorterHeaderText}>ENDRE KONTOINFORMASJON</Text>

        <View
          style={{
            flex: 1,
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <View
            style={[
              styles.formRow,
              {
                width: rowWidth,
                flexDirection: "row",
                justifyContent: "space-between",
              },
            ]}
          >
            <View style={{ flex: 0.45, height: 40 }}>
              <Text style={styles.formLabel}>FORNAVN</Text>
              <TextInput
                placeholder="FORNAVN"
                onChangeText={(text) =>
                  setUpdateProfile({ ...updateProfile, ...{ FORNAVN: text } })
                }
                value={updateProfile.FORNAVN}
                style={styles.formInput}
              />
            </View>
            <View style={{ flex: 0.45, height: 40 }}>
              <Text style={styles.formLabel}>ETTERNAVN</Text>
              <TextInput
                placeholder="ETTERNAVN"
                onChangeText={(text) =>
                  setUpdateProfile({ ...updateProfile, ...{ ETTERNAVN: text } })
                }
                value={updateProfile.ETTERNAVN}
                style={styles.formInput}
              />
            </View>
          </View>

          <View style={[styles.formRow, { width: rowWidth }]}>
            <Text style={[styles.formLabel, { alignSelf: "left" }]}>
              TELEFONNUMMER
            </Text>
            <TextInput
              placeholder="TELEFONNUMMER"
              onChangeText={(text) =>
                setUpdateProfile({
                  ...updateProfile,
                  ...{ TELEFONNUMMER: text },
                })
              }
              value={updateProfile.TELEFONNUMMER}
              style={styles.formInput}
            />
          </View>

          <View style={[styles.formRow, { width: rowWidth }]}>
            <Text style={[styles.formLabel, { alignSelf: "left" }]}>
              ADRESSE
            </Text>
            <TextInput
              placeholder="ADRESSE"
              onChangeText={(text) =>
                setUpdateProfile({
                  ...updateProfile,
                  ...{ ADRESSE: text },
                })
              }
              value={updateProfile.ADRESSE}
              style={styles.formInput}
            />
          </View>

          <View style={[styles.formRow, { width: rowWidth }]}>
            <Text style={[styles.formLabel, { alignSelf: "left" }]}>CITY</Text>
            <TextInput
              placeholder="CITY"
              onChangeText={(text) =>
                setUpdateProfile({
                  ...updateProfile,
                  ...{ CITY: text },
                })
              }
              value={updateProfile.CITY}
              style={styles.formInput}
            />
          </View>

          <View
            style={[
              styles.formRow,
              {
                flexDirection: "row",
                justifyContent: "flex-start",
                width: rowWidth,
              },
            ]}
          >
            <TextInput
              placeholder="PIN"
              style={[
                styles.formInput,
                { width: "20%", alignSelf: "center", marginRight: 10 },
              ]}
              onChangeText={(text) =>
                setUpdateProfile({
                  ...updateProfile,
                  ...{ PIN: text },
                })
              }
              value={updateProfile.PIN}
            />
            <Text style={styles.formLabel}>Bergen</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.hideButton}
          onPress={handleUpdateAddress}
        >
          <Text style={[styles.hideButtonText, styles.formLabel]}> LAGRE </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <Modal
      isVisible={isModalVisible}
      style={styles.modal}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      backdropColor="transparent"
      onSwipeComplete={setModalVisible}
      swipeDirection="down"
      coverScreen={false}
      onBackdropPress={setModalVisible}
    >
      {content ? () => <content /> : updateAddressModalContent()}
    </Modal>
  );
};

export default BottomModal;

const styles = StyleSheet.create({
  modal: {
    backgroundColor: "transparent",
    margin: 0,
    flex: 1,
    justifyContent: "flex-end",
  },

  sorterBtnContainer: {
    flex: 0.6,
    justifyContent: "space-between",
    alignItems: "center",
    padding: 0,
    paddingVertical: 20,
    backgroundColor: colors.primary,
  },

  sorterHeaderText: {
    color: "#fff",
    fontFamily: "lato-medium",
    fontSize: 20,
  },

  sorterButton: {
    width: 200,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.btnLink,
    margin: 10,
    // borderWidth: 1,
    borderRadius: 10,
    ...globalStyles.iosShadow,
  },

  sorterButtonText: {
    padding: 10,
    fontFamily: "lato-regular",
    fontSize: 18,
    color: "#fff",
  },
  hideButton: {
    width: 100,
    padding: 10,
    backgroundColor: colors.btnLink,
    borderRadius: 10,
    marginTop: 10,
  },
  hideButtonText: {
    color: colors.white,
    textAlign: "center",
  },
  cardContainer: {
    marginTop: 15,
    marginBottom: 15,
    marginLeft: 20,
    marginRight: 20,
  },
  cardContent: {
    marginBottom: 15,
  },
  cardText: {
    color: colors.white,
    marginBottom: 5,
    fontSize: 14,
  },
  cardInput: {
    borderColor: colors.white,
    backgroundColor: colors.white,
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  cardInputDate: {
    borderColor: colors.white,
    backgroundColor: colors.white,
    borderRadius: 10,
    width: "30%",
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginHorizontal: 2,
  },
  lastInputs: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardBtn: {
    paddingVertical: 7,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.btnLink,
    borderRadius: 10,
  },
  headerSection: {
    flexDirection: "row",
  },
  buyButton: {
    backgroundColor: "#007DFF",
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 8,
  },
  textButton: {
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 8,
    color: "#007DFF",
  },
  formRow: {
    flex: 0.2,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  formLabel: {
    color: "#fff",
    fontFamily: "lato-medium",
    fontSize: 16,
    marginBottom: 3,
  },
  formInput: {
    height: 40,
    width: "100%",
    padding: 5,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingLeft: 10,
  },
});
