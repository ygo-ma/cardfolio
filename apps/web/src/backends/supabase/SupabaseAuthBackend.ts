import {
  AuthApiError,
  AuthWeakPasswordError,
  type User as SupabaseUser,
} from "@supabase/supabase-js";

import BaseAuthBackend, { AuthError, User } from "../BaseAuthBackend.ts";
import supabase from "./client.ts";

/**
 * User backend using Supabase
 */
export default class SupabaseAuthBackend extends BaseAuthBackend {
  async create(email: string, password: string) {
    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      if (error instanceof AuthWeakPasswordError) {
        throw new AuthError("auth.weak_password", error);
      } else if (
        error instanceof AuthApiError &&
        error.code === "user_already_exists"
      ) {
        throw new AuthError("auth.user_already_exists", error);
      } else {
        throw error;
      }
    }
  }

  async login(email: string, password: string): Promise<User> {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      if (
        error instanceof AuthApiError &&
        error.code === "invalid_credentials"
      ) {
        throw new AuthError("auth.invalid_credentials", error);
      } else {
        throw error;
      }
    }

    const { user } = data;
    return this.fromSupabaseUser(user);
  }

  async getCurrentUser(): Promise<User | undefined> {
    const { data } = await supabase.auth.getSession();

    const user = data?.session?.user;
    if (!user) {
      return undefined;
    }

    return this.fromSupabaseUser(user);
  }

  async logout() {
    await supabase.auth.signOut();
  }

  onLogin(callback: (user: User) => void): () => void {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      const user = session?.user;

      if (event === "SIGNED_IN" && user) {
        callback(this.fromSupabaseUser(user));
      }
    });

    return data.subscription.unsubscribe;
  }

  onLogout(callback: () => void): () => void {
    const { data } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_OUT") {
        callback();
      }
    });

    return data.subscription.unsubscribe;
  }

  private fromSupabaseUser(user: SupabaseUser): User {
    return new User(user.email ?? "<unknown email>");
  }
}
