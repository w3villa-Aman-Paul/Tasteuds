import {
  handleAPI,
  API_VERSION_STOREFRONT,
  handleAddCartItem,
} from "../../library/utils/apiUtils";

export function getDefaultCountry(data, params = {}) {
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

export function getCountriesList(data, filters = {}) {
  const url = `${API_VERSION_STOREFRONT}/countries`;
  const method = "GET";
  return {
    type: "GET_COUNTRIES_LIST",
    payload: handleAPI(url, filters, method, data),
  };
}

export function getCountry(id, params = {}) {
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

export function getPaymentMethods(filters = {}) {
  const url = `${API_VERSION_STOREFRONT}/checkout/payment_methods`;
  const method = "GET";
  return {
    type: "GET_PAYMENT_METHODS",
    payload: handleAPI(url, filters, method),
  };
}

export function checkoutNext(auth_token, data = {}) {
  const url = `${API_VERSION_STOREFRONT}/checkout/next`;
  const method = "PATCH";
  const params = {
    include: "line_items.variant.option_values,line_items.variant.images",
  };
  return {
    type: "CHECKOUT_NEXT",
    payload: handleAddCartItem(url, params, method, data, auth_token),
  };
}

export function updateCheckout(auth_token, data) {
  const url = `${API_VERSION_STOREFRONT}/checkout`;
  const method = "PATCH";
  const params = {
    include: "line_items.variant.option_values,line_items.variant.images",
  };
  return {
    type: "UPDATE_CHECKOUT",
    payload: handleAddCartItem(url, params, method, data, auth_token),
  };
}

export function createAddress(data, filters = {}) {
  const url = `${API_VERSION_STOREFRONT}/account/addresses`;
  const method = "POST";
  return {
    type: "CREATE_ADDRESS",
    payload: handleAPI(url, filters, method, data),
  };
}

export function retrieveAddress(data = {}, filters = {}) {
  const url = `${API_VERSION_STOREFRONT}/account/addresses`;
  const method = "GET";
  return {
    type: "RETRIEVE_ADDRESS",
    payload: handleAPI(url, filters, method, data),
  };
}

export function deleteAdd(data = null, id, filters = {}) {
  const url = `${API_VERSION_STOREFRONT}/account/addresses/${id}`;
  const method = "DELETE";
  return {
    type: "DELETE_ADDRESS",
    payload: handleAPI(url, filters, method, data),
  };
}

export function completeCheckout() {
  const url = `${API_VERSION_STOREFRONT}/checkout/complete`;
  const method = "PATCH";
  const params = {
    include: "line_items.variant.option_values,line_items.variant.images",
  };
  return {
    type: "COMPLETE_CHECKOUT",
    payload: handleAPI(url, params, method),
  };
}

/**
 * Bag Screen Actions
 */
export function addItem(auth_token, data) {
  const url = `${API_VERSION_STOREFRONT}/cart/add_item`;
  const method = "POST";
  const params = {
    include: "line_items.variant.option_values,line_items.variant.images",
  };
  return {
    type: "ADD_ITEM",
    payload: handleAddCartItem(url, params, method, data, auth_token),
  };
}

export function getCart() {
  const url = `${API_VERSION_STOREFRONT}/cart`;
  const params = {
    include: "line_items.variant.option_values,line_items.variant.images",
  };
  const method = "GET";
  return {
    type: "GET_CART",
    payload: handleAPI(url, params, method),
  };
}

export function createCartToken() {
  const url = `${API_VERSION_STOREFRONT}/cart`;
  const method = "POST";
  const params = {
    include: "line_items.variant.option_values,line_items.variant.images",
  };
  return handleAPI(url, params, method);
}

export function createCart() {
  const url = `${API_VERSION_STOREFRONT}/cart`;
  const method = "POST";
  const params = {
    include: "line_items.variant.option_values,line_items.variant.images",
  };
  return {
    type: "CREATE_CART",
    payload: handleAPI(url, params, method),
  };
}

export function removeLineItem(lineItemId, filters = {}) {
  const url = `${API_VERSION_STOREFRONT}/cart/remove_line_item/${lineItemId}`;
  const params = {
    include: "line_items.variant.option_values,line_items.variant.images",
  };
  const method = "DELETE";
  return {
    type: "REMOVE_LINE_ITEM",
    payload: handleAPI(url, params, method, filters),
  };
}

export function setQuantity(data, filters = {}) {
  const url = `${API_VERSION_STOREFRONT}/cart/set_quantity`;
  const params = {
    include: "line_items.variant.option_values,line_items.variant.images",
  };
  const method = "PATCH";
  return {
    type: "SET_QUANTITY",
    payload: handleAPI(url, params, method, data, filters),
  };
}
