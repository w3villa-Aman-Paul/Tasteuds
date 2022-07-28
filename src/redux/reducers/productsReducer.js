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
  searchedProducts: [],
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
      let uniqueProducts = [
        ...state.productsList,
        ...dataFormatter.deserialize(response),
      ];
      changes = {
        productsList: [
          ...new Map(uniqueProducts.map((item) => [item["id"], item])).values(),
        ],
        isViewing: true,
        saving: false,
        meta: response.meta,
      };
      return { ...state, ...changes };

    /**
     * GET_SEARCH_PRODUCTS_LIST
     */

    case "GET_SEARCH_PRODUCTS_LIST_PENDING":
      return { ...state, saving: true };

    case "GET_SEARCH_PRODUCTS_LIST_REJECTED":
      changes = {
        saving: false,
      };
      return { ...state, ...changes };

    case "GET_SEARCH_PRODUCTS_LIST_FULFILLED":
      let unique = [...dataFormatter.deserialize(response)];
      changes = {
        productsList: [
          ...new Map(unique.map((item) => [item["id"], item])).values(),
        ],
        isViewing: true,
        saving: false,
        meta: response.meta,
      };
      return { ...state, ...changes };

    /**
     * GET_SEARCH_BY_PRODUCTS_NAME
     */

    case "GET_SEARCH_BY_PRODUCTS_NAME_PENDING":
      return { ...state, saving: true };

    case "GET_SEARCH_BY_PRODUCTS_NAME_REJECTED":
      changes = {
        saving: false,
      };
      return { ...state, ...changes };

    case "GET_SEARCH_BY_PRODUCTS_NAME_FULFILLED":
      changes = {
        searchedProducts: [...dataFormatter.deserialize(response)],
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
      let item = action.payload;
      let existed = state.favorites.find((x) => x.id === item.id);

      if (existed) {
        return {
          ...state,
          favorites: state.favorites.map((x) =>
            x.id === existed.id
              ? { ...existed, fav_qty: existed.fav_qty + 1 }
              : x
          ),
        };
      } else {
        return {
          ...state,
          favorites: [...state.favorites, action.payload],
        };
      }

    case "SET_FAV_QTY_INC":
      let existFav2 = state.favorites.find(
        (x) => x.id === action.payload.fav_item_id
      );
      return {
        ...state,
        favorites: state.favorites.map((x) =>
          x.id === existFav2.id
            ? { ...existFav2, fav_qty: action.payload.quantity }
            : x
        ),
      };

    case "SET_FAV_QTY_DEC":
      let existFav = state.favorites.find(
        (x) => x.id === action.payload.fav_item_id
      );
      return {
        ...state,
        favorites: state.favorites.map((x) =>
          x.id === existFav.id
            ? { ...existFav, fav_qty: action.payload.quantity }
            : x
        ),
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
     * SET_SELECTED_VENDOR
     */

    case "SORT_MOST_BOUGHT":
      let uniqueMost = [...action.payload, ...state.productsList];
      changes = {
        productsList: [
          ...new Map(uniqueMost.map((item) => [item["id"], item])).values(),
        ],
        saving: false,
      };
      return { ...state, ...changes };

    /**
     * SORT_NEWLY_ADDED
     */
    case "SORT_NEWLY_ADDED":
      let uniqueNew = [...action.payload, ...state.productsList];
      changes = {
        productsList: [
          ...new Map(uniqueNew.map((item) => [item["id"], item])).values(),
        ],
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
