import * as React from "react"
import { createStackNavigator } from '@react-navigation/stack'
import CategoriesScreen from '../screens/main/CategoriesStack/CategoriesScreen'
import { Menu, ShoppingBag, Search, User, ShoppingCart } from '../library/icons'
import { colors } from '../res/palette'
import { globalStyles } from '../styles/global'
import { Image, StyleSheet } from "react-native"
import { useSelector } from "react-redux"

const CategoriesStack = createStackNavigator()

function CategoriesStackNavigator ({ navigation }) {

  const authState = useSelector((state) => state.auth);

  return (
    <CategoriesStack.Navigator
      screenOptions={{

        headerRight: () => (
          <>
            {authState?.access_token ? (
              <>
                <User
                  size={25}
                  style={{ color: colors.black, marginRight: 14 }}
                  onPress={() => navigation.navigate('Profile')}
                />
                <ShoppingCart
                  size={24}
                  style={{ color: colors.black }}
                  onPress={() => navigation.navigate("Bag")}
                />
              </>
            ) : (
              <>
              </>
            )}
          </>
        ),

        headerLeft: () => (
          <Image
          source={require('../../assets/images/Header-Icon/header_logo.png')}
          style={styles.header}
          />
        ),
        title: '',
        headerLeftContainerStyle: {
          paddingHorizontal: 18,
        },
        // headerLeft: () => <Menu size={24} style={{color: colors.black}}
        //   onPress={() => navigation.openDrawer()}
        // />,
        // headerRight: () => <>
        //   <Search size={24} style={{color: colors.black, marginRight: 14}} />
        //   <ShoppingBag size={24} style={{color: colors.black}} onPress={() => navigation.navigate('Bag')} />
        // </>,
        headerRightContainerStyle: {
          paddingHorizontal: 18,
          flexDirection: 'row',
          alignItems: 'center',
        }
      }}
    >
      <CategoriesStack.Screen name="Categories" component={CategoriesScreen} />
    </CategoriesStack.Navigator>
  )
}

const styles = StyleSheet.create({
  header: {
    width: 150,
    height: 30,
    resizeMode: 'contain'
  },
})

export default CategoriesStackNavigator