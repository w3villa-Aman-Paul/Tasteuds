import axios from "axios";
import qs from "qs";
import { HOST } from "../../res/env";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_VERSION_STOREFRONT = "/api/v2/storefront";
const API_ROOT = HOST;

async function getAuthToken() {
  const value = await AsyncStorage.getItem("userToken");

  return value;
}

async function handleAPIWithoutToken(path, params, method, data = null) {
  const headers = {
    "Content-Type": "application/vnd.api+json",
    Accept: "application/json",
  };
  let url = API_ROOT + path;
  url = params
    ? url + "?" + qs.stringify(params, { arrayFormat: "brackets" })
    : url;

  return await axios({ url, headers, method, data });
}

async function handleAPIForFilteredVendors(path, params, method, data = null) {
  const headers = {
    "Content-Type": "application/vnd.api+json",
    Accept: "application/json",
  };
  let url = API_ROOT + path;
  url = params ? url + "?" + qs.stringify(params) : url;

  return await axios({ url, headers, method, data });
}

async function handleAPI(path, params, method, data = null, filter = null) {
  const authToken = await getAuthToken();

  const headers = {
    "Content-Type": "application/vnd.api+json",
    Accept: "application/json",
    Authorization: `Bearer ${authToken}`,
  };
  let url = API_ROOT + path;

  if (params) {
    url = url + "?" + qs.stringify(params, { arrayFormat: "brackets" });
  }

  // console.log("TRUE")
  return await axios({ url, headers, method, data });
}

async function handleAddCartItem(
  path,
  params,
  method,
  data = null,
  auth_token
) {
  const headers = {
    "Content-Type": "application/vnd.api+json",
    Accept: "application/json",
    "X-Spree-Order-Token": `${auth_token}`,
  };
  let url = API_ROOT + path;
  url = url + "?" + qs.stringify(params, { arrayFormat: "brackets" });

  return await axios({ url, headers, method, data });
}

const handleSocialLogin = async (path, method, params) => {
  const headers = {
    "Content-Type": "application/vnd.api+json",
    Accept: "application/json",
  };

  const data = null;

  let url = API_ROOT + path;
  url = url + "?" + qs.stringify(params, { arrayFormat: "brackets" });

  return await axios({ url, headers, method, data });
};

export {
  handleAPI,
  API_VERSION_STOREFRONT,
  handleAddCartItem,
  handleAPIWithoutToken,
  handleSocialLogin,
  handleAPIForFilteredVendors,
};
