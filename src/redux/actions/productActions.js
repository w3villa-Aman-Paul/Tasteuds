import { string } from "yup";
import {
  handleAPI,
  API_VERSION_STOREFRONT,
  handleAPIWithoutToken,
} from "../../library/utils/apiUtils";

export function getProductsList(data, { pageIndex, filter }) {
  const url = `${API_VERSION_STOREFRONT}/products`;
  const params = {
    include: "images",
    filter: filter,
    "Content-Type": "application/json",
    page: pageIndex,
    per_page: 10,
  };
  const method = "GET";
  return {
    type: "GET_PRODUCTS_LIST",
    payload: handleAPIWithoutToken(url, params, method, data),
  };
}

export function getProduct(id) {
  const url = `${API_VERSION_STOREFRONT}/products/${id}`;
  const params = {
    include: "images,variants,product_properties",
    data: null,
  };
  const method = "GET";
  return {
    type: "GET_PRODUCT",
    payload: handleAPIWithoutToken(url, params, method, null),
  };
}

export function setMinimumPriceRange(minimum) {
  return {
    type: "SET_MINIMUM_PRICE_RANGE",
    payload: minimum,
  };
}

export function setMaximumPriceRange(maximum) {
  return {
    type: "SET_MAXIMUM_PRICE_RANGE",
    payload: maximum,
  };
}

export const toggleProductsSizeFilter = (size) => ({
  type: "TOGGLE_PRODUCT_SIZE_FILTER",
  payload: size,
});

export const setProductFavourite = (variant) => (dispatch, getState) => {
  dispatch({
    type: "SET_PRODUCT_FAVOURITE",
    payload: variant,
  });
};

export const setFavQuantityDec = (FavDecData) => (dispatch, getState) => {
  dispatch({
    type: "SET_FAV_QTY_DEC",
    payload: FavDecData,
  });
};

export const setFavQuantityInc = (FavIncData) => (dispatch, getState) => {
  dispatch({
    type: "SET_FAV_QTY_INC",
    payload: FavIncData,
  });
};

export const deleteFavourite = (id) => ({
  type: "DELETE_PRODUCT_FAVOURITE",
  payload: id,
});

export const resetProductsList = () => ({
  type: "RESET_PRODUCTS_LIST",
});

export const setPageIndex = (pageIndex) => ({
  type: "SET_PAGE_INDEX",
  payload: pageIndex,
});

export const resetProductsFilter = () => ({
  type: "RESET_PRODUCTS_FILTER",
});

export const getSearchProduct = (data = null, taxon = [], vendorId = []) => {
  const url = `${API_VERSION_STOREFRONT}/products`;
  const params = {
    include: "images",
    "Content-Type": "application/json",
    // page: pageIndex,
    per_page: 10,
    filter: {
      taxons: "" + taxon,
      vendor_ids: "" + vendorId,
    },
  };
  const method = "GET";
  return {
    type: "GET_SEARCH_PRODUCTS_LIST",
    payload: handleAPIWithoutToken(url, params, method, data, null),
  };
};

export const getSearchByProductName = (data = null, filter = null) => {
  const url = `${API_VERSION_STOREFRONT}/products`;
  const params = {
    include: "images",
    "Content-Type": "application/json",
    // page: pageIndex,
    per_page: 10,
    filter: {
      name: "" + filter,
    },
  };
  const method = "GET";
  return {
    type: "GET_SEARCH_BY_PRODUCTS_NAME",
    payload: handleAPIWithoutToken(url, params, method, data, filter),
  };
};
