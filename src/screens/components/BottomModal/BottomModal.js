import React, { useState } from "react";
import { useWindowDimensions } from "react-native";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Modal from "react-native-modal";
import { colors } from "../../../res/palette";
import { globalStyles } from "../../../styles/global";

const FormInput = ({ placeholder, ...rest }) => {
  return <TextInput {...rest} placeholder={placeholder ? placeholder : ""} />;
};

const BottomModal = ({ isModalVisible, setModalVisible }) => {
  const [updateProfile, setUpdateProfile] = useState({
    FORNAVN: "",
    ETTERNAVN: "",
    EPOST: "",
    TELEFONNUMMER: "",
    ADRESSE: "",
    PIN: "",
  });

  const { height, width } = useWindowDimensions();
  const rowWidth = width * 0.9;

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
              <TextInput placeholder="FORNAVN" style={styles.formInput} />
            </View>
            <View style={{ flex: 0.45, height: 40 }}>
              <Text style={styles.formLabel}>ETTERNAVN</Text>
              <TextInput placeholder="ETTERNAVN" style={styles.formInput} />
            </View>
          </View>

          <View style={[styles.formRow, { width: rowWidth }]}>
            <Text style={[styles.formLabel, { alignSelf: "left" }]}>
              E-POST
            </Text>
            <TextInput placeholder="E-POST" style={styles.formInput} />
          </View>

          <View style={[styles.formRow, { width: rowWidth }]}>
            <Text style={[styles.formLabel, { alignSelf: "left" }]}>
              TELEFONNUMMER
            </Text>
            <TextInput placeholder="TELEFONNUMMER" style={styles.formInput} />
          </View>

          <View style={[styles.formRow, { width: rowWidth }]}>
            <Text style={[styles.formLabel, { alignSelf: "left" }]}>
              ADRESSE
            </Text>
            <TextInput placeholder="ADRESSE" style={styles.formInput} />
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
            />
            <Text style={styles.formLabel}>Bergen</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.hideButton}>
          <Text style={[styles.hideButtonText, styles.formLabel]}> LAGRE </Text>
        </TouchableOpacity>
      </View>
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
