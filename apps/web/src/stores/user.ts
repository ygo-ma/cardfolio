import { create } from "zustand";

type User = {
  name: string;
};

type UserStore = {
  user: User | null;
  setUser: (user: User | null) => void;
};

export class LoginRequiredError extends Error {
  constructor() {
    super("Login required");

    this.name = "LoginRequiredError";
  }
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));

/**
 * A custom hook that ensures the user is logged in.
 */
export function useUser() {
  const user = useUserStore(({ user }) => user);
  if (!user) {
    throw new LoginRequiredError();
  }

  return user;
}
