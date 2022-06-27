import Jsona from "jsona";
const dataFormatter = new Jsona();

const DEFAULT_STATE = {
  saving: false,
  favorites: [],
  pageIndex: 1,
  selectedVendor: {},
  params: {
    priceRange: {
      minimum: 20,
      maximum: 100,
    },
    sizeFilterList: [
      {
        name: "XS",
        active: false,
      },
      {
        name: "S",
        active: false,
      },
      {
        name: "M",
        active: false,
      },
      {
        name: "L",
        active: false,
      },
      {
        name: "XL",
        active: false,
      },
      {
        name: "XXL",
        active: false,
      },
      {
        name: "XXXL",
        active: false,
      },
    ],
  },
  meta: {
    total_count: null,
  },
  isViewing: false,
  title: "",
  product: {
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
      },
    ],
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
    option_types: [
      {
        option_values: [],
      },
      {
        option_values: [],
      },
    ],
    variants: [
      {
        option_values: [
          {
            presentation: "",
          },
          {
            presentation: "",
          },
        ],
        images: [
          {
            styles: [{ url: "" }, { url: "" }, { url: "" }, { url: "" }],
          },
        ],
      },
    ],
    product_properties: [],
    default_variant: {
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
  productsList: [
    {
      display_price: "$",
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
};

let changes = null;
export default function productsReducer(state = DEFAULT_STATE, action) {
  const response =
    action.payload && (action.payload.data || action.payload.response);
  switch (action.type) {
    /**
     * GET_PRODUCTS_LIST
     */
    case "GET_PRODUCTS_LIST_PENDING":
      return { ...state, saving: state.isViewing ? false : true };

    case "GET_PRODUCTS_LIST_REJECTED":
      changes = {
        saving: false,
      };
      return { ...state, ...changes };

    case "GET_PRODUCTS_LIST_FULFILLED":
      changes = {
        productsList: [
          ...state.productsList,
          ...dataFormatter.deserialize(response),
        ],
        isViewing: true,
        saving: false,
        meta: response.meta,
      };
      return { ...state, ...changes };

      /**
       * GET_SEARCH_PRODUCTS_LIST
       */
      GET_SEARCH_PRODUCTS_LIST;
    case "GET_SEARCH_PRODUCTS_LIST_PENDING":
      return { ...state, saving: state.isViewing ? false : true };

    case "GET_SEARCH_PRODUCTS_LIST_REJECTED":
      changes = {
        saving: false,
      };
      return { ...state, ...changes };

    case "GET_SEARCH_PRODUCTS_LIST_FULFILLED":
      changes = {
        productsList: [...dataFormatter.deserialize(response)],
        isViewing: true,
        saving: false,
        meta: response.meta,
      };
      return { ...state, ...changes };

    /**
     * GET_PRODUCT
     */
    case "GET_PRODUCT_PENDING":
      return { ...state, saving: true };

    case "GET_PRODUCT_REJECTED":
      changes = {
        saving: false,
      };
      return { ...state, ...changes };

    case "GET_PRODUCT_FULFILLED":
      changes = {
        product: dataFormatter.deserialize(response),
        saving: false,
      };
      return { ...state, ...changes };

    /**
     * PRICE_RANGE
     */
    case "SET_MINIMUM_PRICE_RANGE":
      return {
        ...state,
        params: {
          ...state.params,
          priceRange: {
            ...state.params.priceRange,
            minimum: action.payload,
          },
        },
      };

    case "SET_MAXIMUM_PRICE_RANGE":
      return {
        ...state,
        params: {
          ...state.params,
          priceRange: {
            ...state.params.priceRange,
            maximum: action.payload,
          },
        },
      };

    /**
     * RESET_PRODUCTS_LIST
     */
    case "RESET_PRODUCTS_LIST":
      return {
        ...state,
        isViewing: false,
        productsList: [],
      };

    /**
     * TOGGLE_PRODUCT_SIZE_FILTER
     */
    case "TOGGLE_PRODUCT_SIZE_FILTER":
      return {
        ...state,
        params: {
          ...state.params,
          sizeFilterList: state.params.sizeFilterList.map((item) =>
            item.name !== action.payload.name
              ? item
              : { ...item, active: !item.active }
          ),
        },
      };

    /**
     * SET_PRODUCT_FAVOURITE
     */
    case "SET_PRODUCT_FAVOURITE":
      return {
        ...state,

        favorites: [...new Set([...state.favorites, action.payload])],
      };

    case "DELETE_PRODUCT_FAVOURITE":
      return {
        ...state,

        favorites: state.favorites.filter((fav) => fav.id !== action.payload),
      };
    /**
     * SET_PAGE_INDEX
     */
    case "SET_PAGE_INDEX":
      return {
        ...state,
        pageIndex: action.payload,
      };

    /**
     * RESET_PRODUCTS_FILTER
     */
    case "RESET_PRODUCTS_FILTER":
      return {
        ...state,
        params: {
          priceRange: {
            minimum: 20,
            maximum: 100,
          },
          sizeFilterList: [
            {
              name: "XS",
              active: false,
            },
            {
              name: "S",
              active: false,
            },
            {
              name: "M",
              active: false,
            },
            {
              name: "L",
              active: false,
            },
            {
              name: "XL",
              active: false,
            },
            {
              name: "XXL",
              active: false,
            },
            {
              name: "XXXL",
              active: false,
            },
          ],
        },
      };
    /**
     * SET_SELECTED_VENDOR
     */
    case "SET_SELECTED_VENDOR":
      return {
        ...state,

        selectedVendor: action.payload,
      };

    /**
     * Default State
     */
    default:
      return state;
  }
}
