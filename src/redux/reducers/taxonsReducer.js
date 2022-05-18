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
  menus: [{}],
  submenus: [{}],
  vendors: [{}],
  vendorImages: [{}],
  subMenuProducts: [{}],
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
        vendorImages: response.included,
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
     * Menus
     */
    case "GET_MENU_ITEMS_PENDING":
      return { ...state, saving: true };

    case "GET_MENU_ITEMS_REJECTED":
      changes = {
        saving: false,
      };
      return { ...state, ...changes };

    case "GET_MENU_ITEMS_FULFILLED":
      changes = {
        menus: dataFormatter.deserialize(response),
        saving: false,
      };
      return { ...state, ...changes };

    // case "SET_MENU_ITEM_CHECK":
    //   let res = state.menus.menu_items.find(
    //     (menu) => menu.id === action.payload
    //   );
    //   console.log(">>>>", res);
    //   return {
    //     ...state,
    //     menus: state.menus.menu_items.map((x) =>
    //       x.id === action.payload ? { ...res, is_root: true } : x
    //     ),
    //   };

    /**
     * SUB_MENU
     */
    case "GET_SUB_MENU_PENDING":
      return { ...state, saving: true };

    case "GET_SUB_MENU_REJECTED":
      changes = {
        saving: false,
      };
      return { ...state, ...changes };

    case "GET_SUB_MENU_FULFILLED":
      changes = {
        submenus: dataFormatter.deserialize(response),
        saving: false,
      };
      return { ...state, ...changes };
    /**
     * SUB_MENU_PRODUCTS
     */
    case "GET_SUB_MENU_PRODUCTS_PENDING":
      return { ...state, saving: true };

    case "GET_SUB_MENU_PRODUCTS_REJECTED":
      changes = {
        saving: false,
      };
      return { ...state, ...changes };

    case "GET_SUB_MENU_PRODUCTS_FULFILLED":
      changes = {
        subMenuProducts: dataFormatter.deserialize(response),
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
