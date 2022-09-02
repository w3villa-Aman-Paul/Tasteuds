import {
  handleAPI,
  API_VERSION_STOREFRONT,
  handleAPIWithoutToken,
  handleAPIForFilteredVendors,
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

  console.log("SELECTED VENDOR: ", handleAPIWithoutToken(url, params, method));
  return {
    type: "GET_SELECTED_VENDOR",
    payload: handleAPIWithoutToken(url, params, method),
  };
}

export function getFilteredVendors(ids = []) {
  const url = `${API_VERSION_STOREFRONT}/new_api/taxon_vendors.json`;
  const method = "GET";
  const params = {
    ids: "" + ids,
  };

  return {
    type: "GET_FILTERED_VENDOR_LIST",
    payload: handleAPIForFilteredVendors(url, params, method),
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
    include: "menu_items.icon",
  };

  return {
    type: "GET_MENU_ITEMS",
    payload: handleAPIWithoutToken(url, params, method),
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

/*
 *  Weekly Producer
 */

export function getWeeklyProducer() {
  const url = `${API_VERSION_STOREFRONT}/new_api/weekly_producer`;
  const method = "GET";

  const params = null;

  return {
    type: "GET_WEEKLY_PRODUCER",
    payload: handleAPIWithoutToken(url, params, method),
  };
}

export function getMostBoughtGoods() {
  const url = `${API_VERSION_STOREFRONT}/new_api/most_bought_products`;
  const method = "GET";

  const params = null;

  return {
    type: "GET_MOST_BOUGHT_GOODS",
    payload: handleAPIWithoutToken(url, params, method),
  };
}

export function getNewlyAddProducts() {
  const url = `${API_VERSION_STOREFRONT}/new_api/newly_added_products`;
  const method = "GET";

  const params = null;

  return {
    type: "GET_NEWLY_ADDED_PRODUCTS_GOODS",
    payload: handleAPIWithoutToken(url, params, method),
  };
}
