import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { styles } from "./styles";
import { ChevronRight } from "../../icons";
import { Icon } from "react-native-elements";

const FilterFooter = ({ onPress }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.filter_text}>FILTRER SØKET</Text>
      <View style={styles.item_body}>
        <Text style={styles.item_text}>MATVARER</Text>
        <ChevronRight style={styles.filter_chevron} size={22} />
      </View>
      <View style={styles.item_body}>
        <Text style={styles.item_text}>PRODUSENTER</Text>
        <ChevronRight style={styles.filter_chevron} size={22} />
      </View>

      <View style={styles.cancel}>
        <TouchableOpacity style={styles.filter_btn}>
          <Text style={styles.item_text}>VIS 89 VARER</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cancel}>
        <Icon
          name="cross"
          type="entypo"
          color={"#fff"}
          size={30}
          onPress={onPress}
        />
      </View>
    </View>
  );
};

export default FilterFooter;
