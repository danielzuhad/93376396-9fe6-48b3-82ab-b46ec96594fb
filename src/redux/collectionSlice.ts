import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export type ProductType = {
  id: number;
  title?: string;
  price?: number | null;
  discountPercentage?: number;
  category?: string;
  thumbnail?: string | null;
};

export type StateType = {
  products: ProductType[];
  categories: string[];
  // Favorite
  favorites: ProductType[];
  // Filtering
  selectedFiltering: string;
  // loading
  loadingProducts: boolean;
  loadingCategories: boolean;
  error: string;
};

const initialState: StateType = {
  loadingProducts: false,
  loadingCategories: false,
  error: "",
  selectedFiltering: "All",
  products: [],
  categories: [],
  favorites: [],
};

// fetching datas
const getProducts = createAsyncThunk("collection/getProducts", async () => {
  try {
    const response = await axios.get(
      "https://dummyjson.com/products?select=title,price,category,discountPercentage,thumbnail,"
    );

    console.log(response);

    return response.data.products;
  } catch (error) {
    console.error("Error fetching products:", error);

    throw error;
  }
});

const getCategories = createAsyncThunk("collection/getCategories", async () => {
  try {
    const response = await axios.get(
      "https://dummyjson.com/products/categories"
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching Categories:", error);

    throw error;
  }
});

export const collectionSlice = createSlice({
  name: "collection",
  initialState,
  reducers: {
    // Products
    setProducts: (state, action) => {
      state.products = action.payload.products;
    },

    addProduct: (state, action) => {
      state.products.push(action.payload);
    },

    resetProducts: (state) => {
      state.products = [];
    },

    updateProduct: (state, action: PayloadAction<ProductType>) => {
      const updatedProduct = action.payload;

      const index = state.products.findIndex(
        (product) => product.id === updatedProduct.id
      );

      if (index !== -1) {
        state.products[index] = updatedProduct;
      }
    },

    deleteProduct: (state, action: PayloadAction<ProductType>) => {
      const productId = action.payload.id;
      state.products = state.products.filter(
        (product) => product.id !== productId
      );
    },

    // Filtering
    setSelectedFiltering: (state, action) => {
      state.selectedFiltering = action.payload;
    },

    // Favorites
    addToFavorites: (state, action) => {
      state.favorites.push(action.payload.product);
    },

    removeFromFavorites: (state, action) => {
      const productId = action.payload.id;
      state.favorites = state.favorites.filter(
        (product) => product.id !== productId
      );
    },
  },

  extraReducers: (builder) => {
    builder
      // Product
      .addCase(getProducts.pending, (state) => {
        state.loadingProducts = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loadingProducts = false;
        state.products = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loadingProducts = false;
        state.error = action.error.message || "Failed to fetch products";
      })

      // Categories
      .addCase(getCategories.pending, (state) => {
        state.loadingCategories = true;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.loadingCategories = false;
        state.categories = action.payload;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.loadingCategories = false;
        state.error = action.error.message || "Failed to fetch categories";
      });
  },
});

export { getProducts };
export { getCategories };

export const {
  setProducts,
  resetProducts,
  setSelectedFiltering,
  addProduct,
  updateProduct,
  deleteProduct,
  addToFavorites,
  removeFromFavorites,
} = collectionSlice.actions;

export default collectionSlice.reducer;
