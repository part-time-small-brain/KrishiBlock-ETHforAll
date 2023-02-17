import create from "zustand";
import { devtools, persist } from "zustand/middleware";

interface UserState {
  loggedIn: boolean;
  user: Partial<User>;
}

const useUserStore = create<UserState>()(
  devtools(
    persist(
      (set) => ({
        loggedIn: false,
        user: {},
      }),
      {
        name: "user-storage",
      }
    )
  )
);

export default useUserStore;
