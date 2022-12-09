import {
  handleAPI,
  API_VERSION_STOREFRONT,
  handleAddCartItem,
  handleAPIWithoutToken,
} from "../../library/utils/apiUtils";


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

  const updatedData = {
    address: {
      firstname: data?.FORNAVN,
      lastname: data?.ETTERNAVN,
      address1: data?.ADRESSE,
      zipcode: data?.PIN,
      city: data?.CITY,
      state_name: "Bergen",
      country_iso: "NO",
      phone: data?.TELEFONNUMMER,
      email: data?.EMAIL,
    },
  };
  return {
    type: "CREATE_ADDRESS",
    payload: handleAPI(url, filters, method, updatedData),
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

  const updatedData = {
    address: {
      firstname: data?.FORNAVN,
      lastname: data?.ETTERNAVN,
      address1: data?.ADRESSE,
      zipcode: data?.PIN,
      city: data?.CITY,
      state_name: "Bergen",
      country_iso: "NO",
      phone: data?.TELEFONNUMMER,
      email: data?.EMAIL,
    },
  };
  return {
    type: "UPDATE_ADDRESS",
    payload: handleAPI(url, filters, method, updatedData),
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

export const resetError = () => (dispatch) => {
  dispatch({
    type: "RESET_ERROR",
  });
};


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

export function createCart() {
  const url = `${API_VERSION_STOREFRONT}/cart`;
  const method = "POST";
  const params = {
    include: "line_items.variant.option_values,line_items.variant.images",
  };
  return {
    type: "CREATE_CART",
    payload: handleAPI(url, params, method)
    
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

export const fetchClientSecret = () => {
  const url = `/api/v2/storefront/checkout/payment_intent`;
  const method = "POST";
  const data = {
    currency: "NOK",
    payment_method_types: ["card"],
  };

  return handleAddCartItem(url, null, method, data);
};


// ORDERS LIST

export function getOrders() {
  const url = `${API_VERSION_STOREFRONT}/account/orders`;
  const method = "GET";
  const params = {
    include: "line_items,variants,variants.images,billing_address,shipping_address,user,payments,shipments,promotions",
  };
  return {
    type: "GET_ORDERS",
    payload: handleAPI(url, params, method)

  };
}

