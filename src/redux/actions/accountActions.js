import AsyncStorage from "@react-native-community/async-storage";
import {
  handleAPI,
  API_VERSION_STOREFRONT,
} from "../../library/utils/apiUtils";

export function accountCreate(data, filters = {}) {
  const url = `${API_VERSION_STOREFRONT}/account`;
  const method = "POST";
  return {
    type: "ACCOUNT_CREATE",
    payload: handleAPI(url, filters, method, data),
  };
}

export const accountRetrieve =
  (filters = {}) =>
  (dispatch) => {
    const url = `${API_VERSION_STOREFRONT}/account`;
    const method = "GET";
    dispatch({
      type: "ACCOUNT_RETREIVE",
      payload: handleAPI(url, filters, method),
    });
  };

export const accountUpdate = (data, filters = {}) => {
  const url = `${API_VERSION_STOREFRONT}/account`;
  const method = "PATCH";
  return {
    type: "ACCOUNT_UPDATE",
    payload: handleAPI(url, filters, method, data),
  };
};

export function getCompletedOrders() {
  const url = `${API_VERSION_STOREFRONT}/orders`;
  const method = "GET";
  const params = {
    include: "variants.images,variants.option_values",
  };
  return {
    type: "GET_COMPLETED_ORDERS",
    payload: handleAPI(url, params, method),
  };
}

export const resetCompletedOrders = () => ({
  type: "RESET_COMPLETED_ORDERS",
});
