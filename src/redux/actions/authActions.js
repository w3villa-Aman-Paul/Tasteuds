import { handleAPI, handleSocialLogin } from "../../library/utils/apiUtils";

export function userLogin(data, filters = {}) {
  const url = `/spree_oauth/token`;
  const method = "POST";
  return {
    type: "LOGIN",
    payload: handleAPI(url, filters, method, data),
  };
}

export const userLogout = () => ({
  type: "LOGOUT",
});

export const accountLogout = () => ({
  type: "ACCOUNT_LOGOUT",
});

export const googleLogin = (access_token) => {
  const path = "/api/v1/spree_oauth/social_login/google_oauth2";
  const method = "POST";
  const params = {
    access_token: "" + access_token,
  };

  return {
    type: "LOGIN",
    payload: handleSocialLogin(path, method, params),
  };
};

export const facebookLogin = (access_token) => {
  const path = "/api/v1/spree_oauth/social_login/facebook";
  const method = "POST";
  const params = {
    access_token: "" + access_token,
  };

  return {
    type: "LOGIN",
    payload: handleSocialLogin(path, method, params),
  };
};

export const appleLogin = (identity_token) => {
  const path = "/api/v1/spree_oauth/social_login/apple";
  const method = "POST";
  const params = {
    access_token: "" + identity_token,
  };

  return {
    type: "LOGIN",
    payload: handleSocialLogin(path, method, params),
  };
};


