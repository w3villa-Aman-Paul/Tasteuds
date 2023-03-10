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
  selectedVendor: [{}],
  vendors: [],
  vendorImages: [{}],
  subMenuProducts: [],
  weeklyProducer: [],
  mostBoughtGoods: [],
  newAddedProducts: [],
  filteredVendors: [],
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
        vendors: response,
        vendorImages: response.included,
        saving: false,
      };
      return { ...state, ...changes };

    case "GET_SELECTED_VENDOR_PENDING":
      return { ...state, saving: true };

    case "GET_SELECTED_VENDOR_REJECTED":
      changes = {
        saving: false,
      };
      return { ...state, ...changes };

    case "GET_SELECTED_VENDOR_FULFILLED":
      changes = {
        selectedVendor: dataFormatter.deserialize(response),
        saving: false,
      };
      return { ...state, ...changes };

    case "GET_FILTERED_VENDOR_LIST_PENDING":
      return { ...state, saving: true };

    case "GET_FILTERED_VENDOR_LIST_REJECTED":
      changes = {
        saving: false,
      };
      return { ...state, ...changes };

    case "GET_FILTERED_VENDOR_LIST_FULFILLED":
      changes = {
        filteredVendors: response,
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
     * Weekly Producer
     */
    case "GET_WEEKLY_PRODUCER_PENDING":
      return { ...state, saving: true };

    case "GET_WEEKLY_PRODUCER_REJECTED":
      changes = {
        saving: false,
      };
      return { ...state, ...changes };

    case "GET_WEEKLY_PRODUCER_FULFILLED":
      changes = {
        weeklyProducer: [response],
        saving: false,
      };
      return { ...state, ...changes };

    /**
     * Most Bought Goods
     */
    case "GET_MOST_BOUGHT_GOODS_PENDING":
      return { ...state, saving: true };

    case "GET_MOST_BOUGHT_GOODS_REJECTED":
      changes = {
        saving: false,
      };
      return { ...state, ...changes };

    case "GET_MOST_BOUGHT_GOODS_FULFILLED":
      let uniqueProducts = [...action.payload.data.products];
      changes = {
        mostBoughtGoods: [
          ...new Map(uniqueProducts.map((item) => [item["id"], item])).values(),
        ],
        saving: false,
      };
      return { ...state, ...changes };

    /**
     * Newly Added Products
     */
    case "GET_NEWLY_ADDED_PRODUCTS_PENDING":
      return { ...state, saving: true };

    case "GET_NEWLY_ADDED_PRODUCTS_REJECTED":
      changes = {
        saving: false,
      };
      return { ...state, ...changes };

    case "GET_NEWLY_ADDED_PRODUCTS_FULFILLED":
      changes = {
        newAddedProducts: response,
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
