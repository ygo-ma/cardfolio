import { AuthApiError, AuthWeakPasswordError } from "@supabase/supabase-js";
import BaseUserBackend, { AuthError, User } from "../BaseUserBackend.ts";
import supabase from "./client.ts";

/**
 * User backend using Supabase
 */
export default class SupabaseUserBackend extends BaseUserBackend {
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
    return new User(user.email ?? "<unknown email>");
  }
}
