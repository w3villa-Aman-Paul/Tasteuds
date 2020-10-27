import { handleAPI, API_VERSION_STOREFRONT } from '../../library/utils/apiUtils';

export function addItem(/* auth_token, */ data, filters={}) {
  const url = `/${API_VERSION_STOREFRONT}/cart/add_item`;
  const method = 'POST';
  return {
    type: 'ADD_ITEM',
    payload: handleAPI(url, filters, method, data /* , auth_token */)
  };
}

export function getCart(filters={}) {
  const url = `/${API_VERSION_STOREFRONT}/cart`;
  const params = {
    include: 'line_items.variant.images'
  }
  const method = 'GET';
  // debugger
  return {
    type: 'GET_CART',
    payload: handleAPI(url, params, method, filters)
  };
}

export function removeLineItem(lineItemId, filters={}) {
  const url = `/${API_VERSION_STOREFRONT}/cart/remove_line_item/${lineItemId}`;
  const params = {
    include: 'line_items.variant.images'
  }
  const method = 'DELETE';
  return {
    type: 'REMOVE_LINE_ITEM',
    payload: handleAPI(url, params, method, filters)
  };
}

export function setQuantity(data, filters={}) {
  const url = `/${API_VERSION_STOREFRONT}/cart/set_quantity`;
  const params = {
    include: 'line_items.variant.images'
  }
  const method = 'PATCH';
  return {
    type: 'SET_QUANTITY',
    payload: handleAPI(url, params, method, data, filters)
  };
}