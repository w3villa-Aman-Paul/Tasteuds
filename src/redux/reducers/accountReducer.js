import Jsona from "jsona";
const dataFormatter = new Jsona();

const DEFAULT_STATE = {
  saving: false,
  account: {},
  error: null,
  isAuth: false,
  status: null,
  orders: [
    {
      variants: [
        {
          images: [
            {
              styles: [
                {
                  url: "",
                },
                {
                  url: "",
                },
                {
                  url: "",
                },
                {
                  url: "",
                },
              ],
            },
          ],
          option_values: [
            {
              presentation: "",
            },
            {
              presentation: "",
            },
          ],
        },
      ],
    },
  ],
};

let changes = null;
export default function accountReducer(state = DEFAULT_STATE, action) {
  const response =
    action.payload && (action.payload.data || action.payload.response);

  switch (action.type) {
    /**
     * ACCOUNT_CREATE
     */

    case "ACCOUNT_CREATE_PENDING":
      return { ...state, saving: true, error: null, isAuth: false, status: "" };

    case "ACCOUNT_CREATE_REJECTED":
      changes = {
        saving: false,
        error: response.data.error,
        isAuth: false,
        status: response.status,
      };
      return { ...state, ...changes };

    case "ACCOUNT_CREATE_FULFILLED":
      changes = {
        account: dataFormatter.deserialize(response),
        saving: false,
        error: null,
        isAuth: true,
        status: action.payload.status,
      };
      return { ...state, ...changes };

    case "ACCOUNT_RETREIVE_PENDING":
      return { ...state, saving: true, error: null, isAuth: false, status: "" };

    case "ACCOUNT_RETREIVE_REJECTED":
      changes = {
        saving: false,
        error: response.data.error,
        isAuth: false,
        status: response.status,
      };
      return { ...state, ...changes };

    case "ACCOUNT_RETREIVE_FULFILLED":
      return {
        account: dataFormatter.deserialize(response),
        saving: false,
        error: null,
        isAuth: true,
        status: response.status,
      };

    /**
     * GET_COMPLETED_ORDERS
     */
    case "GET_COMPLETED_ORDERS_PENDING":
      return { ...state, saving: true };

    case "GET_COMPLETED_ORDERS_REJECTED":
      changes = {
        saving: false,
      };
      return { ...state, ...changes };

    case "GET_COMPLETED_ORDERS_FULFILLED":
      changes = {
        orders: dataFormatter.deserialize(response),
        saving: false,
      };
      return { ...state, ...changes };

    case "RESET_COMPLETED_ORDERS_PENDING":
      return { ...state, saving: true };

    case "RESET_COMPLETED_ORDERS_REJECTED":
      changes = {
        saving: false,
      };
      return { ...state, ...changes };

    case "RESET_COMPLETED_ORDERS_FULFILLED":
      changes = {
        orders: [],
        saving: false,
      };
      return { ...state, ...changes };

    /**
     * RETURN DEFAULT
     */
    default:
      return state;
  }
}
