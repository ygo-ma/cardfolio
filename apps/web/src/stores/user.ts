import { create } from "zustand";

type User = {
  name: string;
};

type UserStore = {
  user: User | null;
  setUser: (user: User | null) => void;
};

export class UserNotLoggedInError extends Error {
  constructor() {
    super("User not logged in");

    this.name = "UserNotLoggedInError";
  }
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));

export function useUser() {
  const user = useUserStore(({ user }) => user);
  if (!user) {
    throw new UserNotLoggedInError();
  }

  return user;
}
