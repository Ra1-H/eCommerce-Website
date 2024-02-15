import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CommerceStore {
  token: string;
  setToken: (token: string) => void;

  cart:{};
  addOneToCart: (productId: string) => void;
  removeOneFromCart: (productId: string) => void;

  favoritesToggled: Boolean;
  toggleFavoritesFilter: () => void;

  searchFilter: string;
  setSearchFilter: (searchString: string) => void;

  categoryFilter: string;
  setCategoryFilter: (category: string) => void;

  userName: string;
  setUserName: (userName: string) => void;

  userEmail: string;
  setUserEmail: (userEmail: string) => void;

  userPassword: string;
  setUserPassword: (userPassword: string) => void;

  userConfirmPassword: string;
  setUserConfirmPassword: (userConfirmPassword: string) => void;

  showCart: boolean;
  setShowCart: (value: boolean) => void;
  emptyCart: () => void;
  

  logout: () => void;

  favorites: string[],
  setFavorites: (favorites: string[]) => void
}

export const useCommerceStore = create<CommerceStore>(
  // @ts-ignore
  persist(
    (set, get) => ({

      token: "",
      setToken: (token) => set((state) => ({ token: token })),

      cart: {},
      addOneToCart: (productId) =>
        set((state) => {
          // @ts-ignore
          let newCount = (state.cart[productId] || 0) + 1;
          return {
            cart: { ...state.cart, [productId]: newCount },
          };
        }),

      removeOneFromCart: (productId) =>
        set((state) => {
          // @ts-ignore
          const currentQuantity = state.cart[productId] || 0;
          const newCount = Math.max(currentQuantity - 1, 0); // Prevent going below 0
          return {
            cart: { ...state.cart, [productId]: newCount },
          };
        }),


      // favorites
      favoritesToggled: false,
      toggleFavoritesFilter: () =>
        set((state) => {
          return {
            favoritesToggled: !state.favoritesToggled,
          };
        }),


      // search state
      searchFilter: "",
      setSearchFilter: (searchString) =>
        set((state) => {
          return {
            searchFilter: searchString,
          };
        }),

      // category filter
      categoryFilter: "",
      setCategoryFilter: (category) =>
        set((state) => {
          return {
            categoryFilter: category,
          };
        }),

      userName: "",
      setUserName: (userName) =>
        set((state) => {
          return {
            userName: userName,
          };
        }),


      userEmail: "",
      setUserEmail: (userEmail) => set((state) => ({ userEmail: userEmail })),


      userPassword: "",
      setUserPassword: (userPassword) =>
        set((state) => ({ userPassword: userPassword })),


      userConfirmPassword: "",
      setUserConfirmPassword: (userConfirmPassword) =>
        set((state) => ({ userConfirmPassword: userConfirmPassword })),


      showCart: false,
      setShowCart: (value: boolean) =>
        set((state) => {
          return {
            showCart: value,
          };
        }),
        
      logout: () => set({ token: "", userName: "" }),

      emptyCart: () => set((state) => { return { cart: {} } }),

      favorites: [],
      setFavorites: (favorites: string[]) => set((state) => ({
          favorites: favorites
      }))
      
     
    }),
    {
      name: "mern-ecom-app", // name of the item in the storage (must be unique)
    }
  )
);
