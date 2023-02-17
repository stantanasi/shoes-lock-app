import { configureStore, createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit/dist/createAction";
import { Shoe } from "./services/shoes";

const cartSlice = createSlice({
  name: "cart",
  initialState: [] as ShoeInCart[],
  reducers: {
    addToCart: (state, action: PayloadAction<Shoe>) => {
      const newShoe: Shoe = action.payload;
      //   console.log("state", state);
      //   console.log("item", newShoe);
      let newItem: ShoeInCart | undefined = state.find((item) => {
        return item.id == newShoe.id;
      });
      if (newItem) {
        newItem.quantity += 1;
        console.log("Item existant");
      } else {
        newItem = { ...newShoe, quantity: 1 };
        state.push(newItem);
      }
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      const shoeID: string = action.payload;
      console.log("Shoe ID : ", shoeID);
      console.log("Item ID : ", state);
      let item: ShoeInCart | undefined = state.find((item) => {
        return item.id == shoeID;
      });
      if (!item) {
        // throw new Error("Item non trouvé");
        return;
      }

      if (item.quantity <= 1) {
        return state.filter((item) => {
          return item.id !== shoeID;
        });
      } else {
        item.quantity -= 1;
      }
    },

    updateCart: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const shoeID: string = action.payload.id;
      const shoeQuantity: number = action.payload.quantity;
      let item: ShoeInCart | undefined = state.find((item) => {
        return item.id == shoeID;
      });
      if (!item) {
        // throw new Error("Item non trouvé");
        return;
      }
      if (shoeQuantity <= 0) {
        return state.filter((item) => {
          return item.id !== shoeID;
        });
      } else {
        item.quantity = shoeQuantity;
      }
    },
  },
});

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: [] as ShoeInFavorites[],
  reducers: {
    addToFavorites: (state, action: PayloadAction<Shoe>) => {
      const newShoe: Shoe = action.payload;
      //   console.log("state", state);
      //   console.log("item", newShoe);
      let newItem: ShoeInFavorites | undefined = state.find((item) => {
        return item.id == newShoe.id;
      });
      if (newItem) {
        console.log("Item existant");
      } else {
        newItem = { ...newShoe };
        state.push(newItem);
      }
    },

    removeFromFavorites: (state, action: PayloadAction<string>) => {
      const shoeID: string = action.payload;
      console.log("Shoe ID : ", shoeID);
      console.log("Item ID : ", state);
      let item: ShoeInFavorites | undefined = state.find((item) => {
        return item.id == shoeID;
      });
      if (!item) {
        // throw new Error("Item non trouvé");
        return;
      }
      return state.filter((item) => {
        return item.id !== shoeID;
      });
    },
  },
});

export const { addToCart, removeFromCart, updateCart } = cartSlice.actions;
export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;

export const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    favorites: favoritesSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type ShoeInCart = Shoe & {
  quantity: number;
};
export type ShoeInFavorites = Shoe;
