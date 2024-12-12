import { create } from "zustand";
import { User, UserBackend } from "../backends";

type UserStore = {
  user: User | undefined | null; // null means the session is not loaded yet
  setUser: (user: User | undefined) => void;
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

// Update the store when the user logs in
UserBackend.onLogin((user) => {
  useUserStore.setState({ user });
});

// Update the store when the user logs out
UserBackend.onLogout(() => {
  useUserStore.setState({ user: undefined });
});

/**
 * A custom hook that ensures the user is logged in.
 *
 * @param loginRequired - Whether to redirect the user to the login page
 *  if not logged in
 */
export function useUser(loginRequired?: true): User;
export function useUser(loginRequired: false): User | undefined;
export function useUser(loginRequired = true): User | undefined {
  const user = useUserStore(({ user }) => user);

  // Load the session if it is not already loaded
  if (user === null) {
    throw UserBackend.getCurrentUser().then((user) => {
      useUserStore.setState({ user });
    });
  }

  // If the user is not logged in and login is required, throw an error
  if (user === undefined && loginRequired) {
    throw new LoginRequiredError();
  }

  return user;
}

// Prevent LoginRequiredError errors from being logged to the console
window.addEventListener("error", (event: ErrorEvent) => {
  if (event.error instanceof LoginRequiredError) {
    event.preventDefault();
  }
});
