import Jsona from "jsona";
const dataFormatter = new Jsona();

const DEFAULT_STATE = {
  saving: false,
  status: null,
  address: [],
  orderComplete: [],
  error: null,
  country: {
    states: [],
    iso: null,
  },
  countriesList: [],
  paymentMethods: [],
  message: null,
  cart: {
    line_items: [
      {
        variant: {
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
      },
    ],
  },
};

let changes = null;
export default function checkoutReducer(state = DEFAULT_STATE, action) {
  const response =
    action.payload && (action.payload.data || action.payload.response);
  switch (action.type) {
    /**
     * GET_DEFAULT_COUNTRY
     */
    case "GET_DEFAULT_COUNTRY_PENDING":
      return { ...state, saving: true };

    case "GET_DEFAULT_COUNTRY_REJECTED":
      changes = {
        saving: false,
      };
      return { ...state, ...changes };

    case "GET_DEFAULT_COUNTRY_FULFILLED":
      changes = {
        country: dataFormatter.deserialize(response),
        saving: false,
        error: null,
        isAuth: true,
        status: action.payload.status,
      };
      return { ...state, ...changes };

    /**
     * GET_COUNTRIES_LIST
     */
    case "GET_COUNTRIES_LIST_PENDING":
      return { ...state, saving: true };

    case "GET_COUNTRIES_LIST_REJECTED":
      changes = {
        saving: false,
      };
      return { ...state, ...changes };

    case "GET_COUNTRIES_LIST_FULFILLED":
      changes = {
        countriesList: dataFormatter.deserialize(response),
        saving: false,
        error: null,
        isAuth: true,
        status: action.payload.status,
      };
      return { ...state, ...changes };

    /**
     * GET_COUNTRY
     */
    case "GET_COUNTRY_PENDING":
      return { ...state, saving: true };

    case "GET_COUNTRY_REJECTED":
      changes = {
        saving: false,
      };
      return { ...state, ...changes };

    case "GET_COUNTRY_FULFILLED":
      changes = {
        country: dataFormatter.deserialize(response),
        saving: false,
        error: null,
        isAuth: true,
        status: action.payload.status,
      };
      return { ...state, ...changes };

    /**
     * GET_PAYMENT_METHODS
     */
    case "GET_PAYMENT_METHODS_PENDING":
      return { ...state, saving: true };

    case "GET_PAYMENT_METHODS_REJECTED":
      changes = {
        saving: false,
      };
      return { ...state, ...changes };

    case "GET_PAYMENT_METHODS_FULFILLED":
      changes = {
        paymentMethods: dataFormatter.deserialize(response),
        saving: false,
        error: null,
        isAuth: true,
        status: action.payload.status,
      };
      return { ...state, ...changes };

    /**
     * CHECKOUT_NEXT
     */
    case "CHECKOUT_NEXT_PENDING":
      return { ...state, saving: true };

    case "CHECKOUT_NEXT_REJECTED":
      changes = {
        saving: false,
      };
      return { ...state, ...changes };

    case "CHECKOUT_NEXT_FULFILLED":
      changes = {
        cart: dataFormatter.deserialize(response),
        saving: false,
        error: null,
        isAuth: true,
        status: action.payload.status,
      };
      return { ...state, ...changes };

    /**
     * UPDATE_CHECKOUT
     */
    case "UPDATE_CHECKOUT_PENDING":
      return { ...state, saving: true, error: null, isAuth: false, status: "" };

    case "UPDATE_CHECKOUT_REJECTED":
      changes = {
        saving: false,
        error: response.data.error,
        isAuth: false,
        status: response.status,
      };
      return { ...state, ...changes };

    case "UPDATE_CHECKOUT_FULFILLED":
      changes = {
        cart: dataFormatter.deserialize(response),
        saving: false,
        error: null,
        isAuth: true,
        status: action.payload.status,
      };
      return { ...state, ...changes };

    case "ADVANCE_NEXT_PENDING":
      return { ...state, saving: true, error: null, isAuth: false, status: "" };

    case "ADVANCE_NEXT_REJECTED":
      changes = {
        saving: false,
      };
      return { ...state, ...changes };

    case "ADVANCE_NEXT_FULFILLED":
      changes = {
        cart: dataFormatter.deserialize(response),
        saving: false,
        error: null,
        isAuth: true,
        status: action.payload.status,
      };
      return { ...state, ...changes };

    /**
     * CREATE_ADDRESS
     */

    case "CREATE_ADDRESS_PENDING":
      return { ...state, saving: true, error: null, isAuth: false, status: "" };

    case "CREATE_ADDRESS_REJECTED":
      changes = {
        saving: false,
        error: response.data.error,
        isAuth: false,
        status: response.status,
      };
      return { ...state, ...changes };

    case "CREATE_ADDRESS_FULFILLED":
      return {
        ...state,
        saving: false,
        error: null,
        isAuth: true,
        address: [...state.address, action.payload.data.data.attributes],
      };

    case "RETRIEVE_ADDRESS_PENDING":
      return { ...state, saving: true, error: null, isAuth: false, status: "" };

    case "RETRIEVE_ADDRESS_REJECTED":
      changes = {
        saving: false,
        error: response.data.error,
        isAuth: false,
        status: response.status,
      };
      return { ...state, ...changes };

    case "RETRIEVE_ADDRESS_FULFILLED":
      changes = {
        address: dataFormatter.deserialize(response),
        saving: false,
        error: null,
        isAuth: true,
        status: action.payload.status,
      };
      return { ...state, ...changes };

    case "UPDATE_ADDRESS_PENDING":
      return { ...state, saving: true, error: null, isAuth: false, status: "" };

    case "UPDATE_ADDRESS_REJECTED":
      changes = {
        saving: false,
        error: response.data.error,
        isAuth: false,
        status: response.status,
      };
      return { ...state, ...changes };

    case "UPDATE_ADDRESS_FULFILLED":
      const existItem = state.address.filter(
        (x) => x.id === action.payload.data.data.id
      );
      if (existItem) {
        return {
          ...state,
          address: state.address.map((x) =>
            x.id === action.payload.data.data.id
              ? { ...state.address[0], ...action.payload.data.data.attributes }
              : x
          ),
          saving: false,
          error: null,
          isAuth: true,
        };
      }

    case "DELETE_ADDRESS_PENDING":
      return {
        ...state,
        saving: true,
        error: null,
        isAuth: false,
        status: "",
      };

    case "DELETE_ADDRESS_REJECTED":
      changes = {
        saving: false,
        error: response.data.error,
        isAuth: false,
        status: response.status,
      };
      return { ...state, ...changes };

    case "DELETE_ADDRESS_FULFILLED":
      changes = {
        message: "Address Deleted Succcessfully",
        saving: false,
        error: null,
        isAuth: true,
        status: action.payload.status,
      };
      return { ...state, ...changes };

    /**
     * COMPLETE_CHECKOUT
     */
    case "COMPLETE_CHECKOUT_PENDING":
      return { ...state, saving: true, error: null, isAuth: false, status: "" };

    case "COMPLETE_CHECKOUT_REJECTED":
      changes = {
        saving: false,
        error: response.data.error,
        isAuth: false,
        status: response.status,
      };
      return { ...state, ...changes };

    case "COMPLETE_CHECKOUT_FULFILLED":
      changes = {
        orderComplete: dataFormatter.deserialize(response),
        saving: false,
        error: null,
        isAuth: true,
        status: action.payload.status,
      };
      return { ...state, ...changes };

    /**
     * GET_CART
     */
    case "GET_CART_PENDING":
      return { ...state, saving: true, error: null, isAuth: false, status: "" };

    case "GET_CART_REJECTED":
      changes = {
        saving: false,
        error: response.data.error,
        status: response.status,
      };
      return { ...state, ...changes };

    case "GET_CART_FULFILLED":
      changes = {
        cart: dataFormatter.deserialize(response),
        saving: false,
        error: null,
        isAuth: true,
        status: action.payload.status,
      };
      return { ...state, ...changes };

    /**
     * CREATE_CART
     */
    case "CREATE_CART_PENDING":
      return { ...state, saving: true, error: null, isAuth: false, status: "" };

    case "CREATE_CART_REJECTED":
      changes = {
        saving: false,
        error: response.data.error,
        isAuth: false,
        status: response.status,
      };
      return { ...state, ...changes };

    case "CREATE_CART_FULFILLED":
      changes = {
        cart: dataFormatter.deserialize(response),
        saving: false,
        error: null,
        isAuth: true,
        status: action.payload.status,
      };
      return { ...state, ...changes };

    /**
     * ADD_ITEM
     */
    case "ADD_ITEM_PENDING":
      return { ...state, saving: true, error: null, isAuth: false, status: "" };

    case "ADD_ITEM_REJECTED":
      changes = {
        saving: false,
        error: response.data.error,
        isAuth: false,
        status: response.status,
      };
      return { ...state, ...changes };

    case "ADD_ITEM_FULFILLED":
      changes = {
        cart: dataFormatter.deserialize(response),
        saving: false,
        error: "Lagt til bag",
        isAuth: true,
        status: action.payload.status,
      };
      return { ...state, ...changes };

    /**
     * SET_QUANTITY
     */
    case "SET_QUANTITY_PENDING":
      return { ...state, saving: true, error: null, isAuth: false, status: "" };

    case "SET_QUANTITY_REJECTED":
      changes = {
        saving: false,
        error: response.data.error,
        isAuth: false,
        status: response.status,
      };
      return { ...state, ...changes };

    case "SET_QUANTITY_FULFILLED":
      changes = {
        cart: dataFormatter.deserialize(response),
        saving: false,
        error: null,
        isAuth: true,
        status: action.payload.status,
      };
      return { ...state, ...changes };

    /**
     * REMOVE_LINE_ITEM
     */
    case "REMOVE_LINE_ITEM_PENDING":
      return { ...state, saving: true, error: null, isAuth: false, status: "" };

    case "REMOVE_LINE_ITEM_REJECTED":
      changes = {
        saving: false,
        error: response.data.error,
        isAuth: false,
        status: response.status,
      };
      return { ...state, ...changes };

    case "REMOVE_LINE_ITEM_FULFILLED":
      changes = {
        cart: dataFormatter.deserialize(response),
        saving: false,
        error: null,
        isAuth: true,
        status: action.payload.status,
        saving: false,
      };
      return { ...state, ...changes };

    /**
     * Default State
     */
    default:
      return state;
  }
}
