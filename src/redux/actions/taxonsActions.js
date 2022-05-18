import {
  handleAPI,
  API_VERSION_STOREFRONT,
  handleAPIWithoutToken,
} from "../../library/utils/apiUtils";

export function getTaxonsList(filters = {}) {
  const url = `${API_VERSION_STOREFRONT}/taxons`;
  const method = "GET";
  return {
    type: "GET_TAXONS_LIST",
    payload: handleAPIWithoutToken(url, filters, method),
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
    payload: handleAPIWithoutToken(url, params, method),
  };
}

export function getVendorsList() {
  const url = `${API_VERSION_STOREFRONT}/vendors`;
  const method = "GET";
  const params = {
    include: "image",
  };

  return {
    type: "GET_VENDOR_LIST",
    payload: handleAPIWithoutToken(url, params, method),
  };
}

export function getSelectedVendor(vendor) {
  const url = `${API_VERSION_STOREFRONT}/vendors/${vendor}`;
  const method = "GET";
  const params = {
    include: "image,products.images.attachment",
  };

  return {
    type: "GET_SELECTED_VENDOR",
    payload: handleAPIWithoutToken(url, params, method),
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
    payload: handleAPIWithoutToken(url, params, method),
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
    payload: handleAPIWithoutToken(url, params, method),
  };
}

// export function activeFunction(id) {
//   return {
//     type: "SET_MENU_ITEM_CHECK",
//     payload: id,
//   };
// }

export function getSubMenu(menuName) {
  const url = `${API_VERSION_STOREFRONT}/taxons/${menuName}`;
  const method = "GET";
  const params = {
    include: "products,children",
  };

  return {
    type: "GET_SUB_MENU",
    payload: handleAPIWithoutToken(url, params, method),
  };
}

export function getSubMenuProducts(menuName) {
  const url = `${API_VERSION_STOREFRONT}/taxons/${menuName}`;
  const method = "GET";
  const params = {
    include: "products.images.attachment",
  };

  return {
    type: "GET_SUB_MENU_PRODUCTS",
    payload: handleAPIWithoutToken(url, params, method),
  };
}
