import * as React from "react";
import { View, ScrollView, Text, StyleSheet } from "react-native";
import ProductCard from "../../../library/components/ProductCard";
import { globalStyles } from "../../../styles/global";
import { connect, useSelector } from "react-redux";

const FavouritesScreen = ({ navigation, favorites }) => {

  return (
    <ScrollView>
      <View style={globalStyles.container}>
        <Text style={styles.title}>Favourites {favorites.length}</Text>
        {favorites.map((ele) => (
          <ProductCard
            key={ele.id}
            imageSource={ele.images[0].styles[3].url}
            {...ele}
          />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    color: "#000000",
    fontSize: 25,
    fontWeight: 'bold',
  }
})

const mapStateToProps = (state) => ({
  favorites: state.products.favorites,
});

export default connect(mapStateToProps)(FavouritesScreen);
