import Jsona from "jsona";
const dataFormatter = new Jsona();

const DEFAULT_STATE = {
  saving: false,
  taxon: {
    products: [
      {
        display_price: "",
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
      },
    ],
  },
  taxonsList: [
    {
      children: [],
    },
  ],
  categories: [{}],
  vendors: [{}],
};

let changes = null;
export default function taxonsReducer(state = DEFAULT_STATE, action) {
  const response =
    action.payload && (action.payload.data || action.payload.response);
  switch (action.type) {
    /**
     * GET_TAXONS_LIST
     */
    case "GET_TAXONS_LIST_PENDING":
      return { ...state, saving: true };

    case "GET_TAXONS_LIST_REJECTED":
      changes = {
        saving: false,
      };
      return { ...state, ...changes };

    case "GET_TAXONS_LIST_FULFILLED":
      changes = {
        taxonsList: dataFormatter.deserialize(response),
        saving: false,
      };
      return { ...state, ...changes };

    /**
     * GET_TAXON
     */
    case "GET_TAXON_PENDING":
      return { ...state, saving: true };

    case "GET_TAXON_REJECTED":
      changes = {
        saving: false,
      };
      return { ...state, ...changes };

    case "GET_TAXON_FULFILLED":
      changes = {
        taxon: dataFormatter.deserialize(response),
        saving: false,
      };
      return { ...state, ...changes };

    /**
     * Vendors
     */
    case "GET_VENDOR_LIST_PENDING":
      return { ...state, saving: true };

    case "GET_VENDOR_LIST_REJECTED":
      changes = {
        saving: false,
      };
      return { ...state, ...changes };

    case "GET_VENDOR_LIST_FULFILLED":
      changes = {
        vendors: dataFormatter.deserialize(response),
        saving: false,
      };
      return { ...state, ...changes };

    /**
     * Categories
     */

    case "GET_CATEGORIES_PENDING":
      return { ...state, saving: true };

    case "GET_CATEGORIES_REJECTED":
      changes = {
        saving: false,
      };
      return { ...state, ...changes };

    case "GET_CATEGORIES_FULFILLED":
      changes = {
        categories: dataFormatter.deserialize(response),
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
