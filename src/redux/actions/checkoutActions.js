import {
  handleAPI,
  API_VERSION_STOREFRONT,
  handleAddCartItem,
  handleAPIWithoutToken,
} from "../../library/utils/apiUtils";
import { removeData, storeData } from "../rootReducer";

export function getDefaultCountry(data, params = null) {
  const url = `${API_VERSION_STOREFRONT}/countries/default`;
  const method = "GET";
  params = {
    include: "states",
  };
  return {
    type: "GET_DEFAULT_COUNTRY",
    payload: handleAPI(url, params, method, data),
  };
}

export function getCountriesList(data, filters = null) {
  const url = `${API_VERSION_STOREFRONT}/countries`;
  const method = "GET";
  return {
    type: "GET_COUNTRIES_LIST",
    payload: handleAPI(url, filters, method, data),
  };
}

export function getCountry(id, params = null) {
  const url = `${API_VERSION_STOREFRONT}/countries/${id}`;
  const method = "GET";
  params = {
    include: "states",
  };
  return {
    type: "GET_COUNTRY",
    payload: handleAPI(url, params, method),
  };
}

export function getPaymentMethods(auth_token) {
  const url = `${API_VERSION_STOREFRONT}/checkout/payment_methods`;
  const method = "GET";
  return {
    type: "GET_PAYMENT_METHODS",
    payload: handleAddCartItem(url, null, method, null, auth_token),
  };
}

export function checkoutNext(auth_token, data = null) {
  const url = `${API_VERSION_STOREFRONT}/checkout/next`;
  const method = "PATCH";
  const params = {
    include:
      "line_items,variants,variants.images,billing_address,shipping_address,user,payments,shipments,promotions",
  };
  return {
    type: "CHECKOUT_NEXT",
    payload: handleAddCartItem(url, params, method, data, auth_token),
  };
}

export function advanceCheckout(auth_token, data = null) {
  const url = `${API_VERSION_STOREFRONT}/checkout/advance`;
  const method = "PATCH";
  const params = {
    include: "line_items.variant.option_values,line_items.variant.images",
  };
  return {
    type: "ADVANCE_NEXT",
    payload: handleAddCartItem(url, params, method, data, auth_token),
  };
}

export function updateCheckout(auth_token, data) {
  const url = `${API_VERSION_STOREFRONT}/checkout`;
  const method = "PATCH";
  const params = {
    include:
      "line_items,variants,variants.images,billing_address,shipping_address,user,payments,shipments,promotions",
  };
  return {
    type: "UPDATE_CHECKOUT",
    payload: handleAddCartItem(url, params, method, data, auth_token),
  };
}

export function createAddress(data, filters = null) {
  const url = `${API_VERSION_STOREFRONT}/account/addresses`;
  const method = "POST";
  return {
    type: "CREATE_ADDRESS",
    payload: handleAPI(url, filters, method, data),
  };
}

export function retrieveAddress(data = null, filters = null) {
  const url = `${API_VERSION_STOREFRONT}/account/addresses`;
  const method = "GET";
  return {
    type: "RETRIEVE_ADDRESS",
    payload: handleAPI(url, filters, method, data),
  };
}

export function updateAddressFunc(data, filters = null, id) {
  const url = `${API_VERSION_STOREFRONT}/account/addresses/${id}`;
  const method = "PATCH";
  return {
    type: "UPDATE_ADDRESS",
    payload: handleAPI(url, filters, method, data),
  };
}

export function deleteAdd(data = null, id, filters = null) {
  const url = `${API_VERSION_STOREFRONT}/account/addresses/${id}`;
  const method = "DELETE";
  return {
    type: "DELETE_ADDRESS",
    payload: handleAPI(url, filters, method, data),
  };
}

export const completeCheckout = (auth_token) => {
  const url = `${API_VERSION_STOREFRONT}/checkout/complete`;
  const method = "PATCH";
  const params = {
    include:
      "line_items,variants,variants.images,billing_address,shipping_address,user,payments,shipments,promotions",
  };
  return {
    type: "COMPLETE_CHECKOUT",
    payload: handleAddCartItem(url, params, method, null, auth_token),
  };
};

/**
 * Bag Screen Actions
 */
export const addItem = (auth_token, data) => async (dispatch) => {
  const url = `${API_VERSION_STOREFRONT}/cart/add_item`;
  const method = "POST";
  const params = {
    include:
      "line_items,variants,variants.images,billing_address,shipping_address,user,payments,shipments,promotions",
  };

  dispatch({
    type: "ADD_ITEM",
    payload: handleAddCartItem(url, params, method, data, auth_token),
  });
};

export function getCart(cartToken) {
  const url = `${API_VERSION_STOREFRONT}/cart`;
  const params = {
    include: "line_items.variant.option_values,line_items.variant.images",
  };
  const method = "GET";
  return {
    type: "GET_CART",
    payload: handleAddCartItem(url, params, method, null, cartToken),
  };
}

export function createCart(isAuth = false) {
  const url = `${API_VERSION_STOREFRONT}/cart`;
  const method = "POST";
  const params = {
    include: "line_items.variant.option_values,line_items.variant.images",
  };
  return {
    type: "CREATE_CART",
    payload: isAuth
      ? handleAPI(url, params, method)
      : handleAPIWithoutToken(url, params, method),
  };
}

export function removeLineItem(lineItemId, filters = null, auth_token) {
  const url = `${API_VERSION_STOREFRONT}/cart/remove_line_item/${lineItemId}`;
  const params = {
    include: "line_items.variant.option_values,line_items.variant.images",
  };
  const method = "DELETE";
  return {
    type: "REMOVE_LINE_ITEM",
    payload: handleAddCartItem(url, params, method, null, auth_token),
  };
}

export const setQuantity = (data, auth_token) => {
  const url = `${API_VERSION_STOREFRONT}/cart/set_quantity`;
  const params = {
    include: "line_items.variant.option_values,line_items.variant.images",
  };
  const method = "PATCH";
  return {
    type: "SET_QUANTITY",
    payload: handleAddCartItem(url, params, method, data, auth_token),
  };
};
