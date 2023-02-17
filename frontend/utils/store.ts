import create from "zustand";
import { devtools, persist } from "zustand/middleware";

interface UserState {
  loggedIn: boolean;
  user: Partial<User>;
  randomLogin: () => void;
  logOut: () => void;
}

const useUserStore = create<UserState>()(
  devtools(
    persist(
      (set) => ({
        loggedIn: false,
        user: {},
        randomLogin: () =>
          set((state) => {
            return {
              ...state,
              loggedIn: true,
              user: {
                name: "Shivom Srivastava",
                address: "erpiqwefnl232j34l123412341431",
                adhar: 4999551231,
                id: 1,
                verified: false,
              },
            };
          }),
        logOut: () => set({ user: {} }),
      }),
      {
        name: "user-storage",
      }
    )
  )
);

export default useUserStore;
