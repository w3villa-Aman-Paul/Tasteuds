import {
  handleAPI,
  API_VERSION_STOREFRONT,
} from "../../library/utils/apiUtils";

export function getTaxonsList(filters = {}) {
  const url = `${API_VERSION_STOREFRONT}/taxons`;
  const method = "GET";
  return {
    type: "GET_TAXONS_LIST",
    payload: handleAPI(url, filters, method),
  };
}

export function getTaxon(id) {
  const url = `${API_VERSION_STOREFRONT}/taxons/${id}`;
  const method = "GET";
  const params = {
    include: "products.images",
  };
  return {
    type: "GET_TAXON",
    payload: handleAPI(url, params, method),
  };
}

export function getVendorsList() {
  const url = `${API_VERSION_STOREFRONT}/vendors`;
  const method = "GET";
  const params = {};

  return {
    type: "GET_VENDOR_LIST",
    payload: handleAPI(url, params, method),
  };
}

export function getCategories() {
  const url = `${API_VERSION_STOREFRONT}/taxons/kategorier/`;
  const method = "GET";
  const params = {
    include: "products,children",
  };

  return {
    type: "GET_CATEGORIES",
    payload: handleAPI(url, params, method),
  };
}

export function getMenus() {
  const url = `${API_VERSION_STOREFRONT}/menus/2`;
  const method = "GET";
  const params = {
    include: "menu_items",
  };

  return {
    type: "GET_MENU_ITEMS",
    payload: handleAPI(url, params, method),
  };
}

export function getSubMenu(menuName) {
  const url = `${API_VERSION_STOREFRONT}/taxons/${menuName}`;
  const method = "GET";
  const params = {
    include: "products,children",
  };

  return {
    type: "GET_SUB_MENU",
    payload: handleAPI(url, params, method),
  };
}

export function getSubMenuProducts(menuName) {
  const url = `${API_VERSION_STOREFRONT}/taxons/${menuName}`;
  const method = "GET";
  const params = {
    include: "products,children",
  };

  return {
    type: "GET_SUB_MENU_PRODUCTS",
    payload: handleAPI(url, params, method),
  };
}
