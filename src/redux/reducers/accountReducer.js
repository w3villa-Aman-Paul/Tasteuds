import Jsona from "jsona";
const dataFormatter = new Jsona();

const DEFAULT_STATE = {
  saving: false,
  account: {},
<<<<<<< HEAD
  error: null,
  isAuth: false,
  status: null,
=======
  isAuth: false,
  error: null,
  message: null,
>>>>>>> dev/mohsin
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
<<<<<<< HEAD
=======
    case 'ACCOUNT_CREATE_PENDING':
      return { ...state, saving: true, isAuth: false, error: null, message: null};
>>>>>>> dev/mohsin

    case "ACCOUNT_CREATE_PENDING":
      return { ...state, saving: true, error: null, isAuth: false, status: "" };

    case "ACCOUNT_CREATE_REJECTED":
      changes = {
        saving: false,
<<<<<<< HEAD
        error: response.data.error,
        isAuth: false,
        status: response.status,
=======
        isAuth: false,
        message: null,
        error: response.data.error,

>>>>>>> dev/mohsin
      };
      return { ...state, ...changes };

    case "ACCOUNT_CREATE_FULFILLED":
      changes = {
        account: dataFormatter.deserialize(response),
<<<<<<< HEAD
        saving: false,
        error: null,
        isAuth: true,
        status: action.payload.status,
=======
        isAuth: true,
        message: 'Account has successfully created! Kindly Login',
        saving: false,
        error: null,
>>>>>>> dev/mohsin
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
