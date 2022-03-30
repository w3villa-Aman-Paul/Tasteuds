import AsyncStorage from "@react-native-community/async-storage";

const DEFAULT_STATE = {
  saving: false,
  user: {},
  error: null,
  isAuth: false,
  status: null,
};

let changes = null;
export default function authReducer(state = DEFAULT_STATE, action) {
  const response =
    action.payload && (action.payload.data || action.payload.response);
  switch (action.type) {
    case "LOGIN_PENDING":
      return { ...state, saving: true, error: null, isAuth: false, status: "" };

    case "LOGIN_REJECTED":
      changes = {
        saving: false,
        error: response.data.error,
        isAuth: false,
        status: response.status,
      };
      return { ...state, ...changes };

    case "LOGIN_FULFILLED":
      changes = {
        ...response,
        saving: false,
        error: null,
        isAuth: true,
        status: response.status,
      };
      AsyncStorage.setItem("userToken", response.access_token);
      AsyncStorage.setItem("refreshToken", response.refresh_token);
      return { ...state, ...changes };

    case "LOGOUT":
      AsyncStorage.removeItem("userToken");
      AsyncStorage.removeItem("refreshToken");
      AsyncStorage.removeItem("account");
      return {
        isLoading: false,
      };

    default:
      return state;
  }
}
