import { StyleSheet } from 'react-native'
import { globalStyles } from '../../../styles/global'
import { colors } from '../../../res/palette'

const styles = StyleSheet.create({
  productCardWrapper: {
    marginTop: 16
  },
  productCardContainer: {
    flexDirection: 'row'
  },
  inactiveCard: {
    opacity: 0.5
  },
  productCardImage: {
    width: 100,
    height: 112
  },
  favouriteProductDetailsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '3%',
    backgroundColor: '#fff',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    height: 112,
    // borderWidth: 1
  },
  title: {
    ...globalStyles.latoBold14,
  },
  description: {
    fontFamily: 'lato-regular',
    fontSize: 11,
    marginTop: 4,
    color: colors.gray
  },
  attributeContainer: {
    flexDirection: 'row',
    marginTop: 6,
    // borderWidth: 2
  },
  colorBadge: {
    width: 24,
    height: 24,
    borderRadius: 24,
    marginRight: 15
  },
  productSizeStyle: {
    minWidth: 24,
    height: 24,
    borderRadius: 24,
    borderWidth: 0.5,
    borderColor: "#222222",
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 24,
  },
  counterContainer: {
    width: 62,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#ee316819",
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  pricingContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    width: 180,
    // borderWidth: 2
  },
  prices: {
    fontFamily: 'lato-bold',
  },
  discountedPrice: {
    color: colors.black
  },
  price: {
    color: colors.gray,
    textDecorationLine: 'line-through'
  },
  discountPercent: {
    color: colors.error
  },
  actionsContainer: {
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  },
  activeShoppingBag: {
    width: 38,
    height: 38,
    borderRadius: 24,
    backgroundColor: "#ee3168",
    justifyContent: 'center',
    alignItems: 'center'
  },
  paletteBlack: {
    color: colors.black
  },
})

export default styles