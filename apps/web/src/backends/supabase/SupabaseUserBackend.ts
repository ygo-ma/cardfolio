import { AuthApiError, AuthWeakPasswordError } from "@supabase/supabase-js";
import BaseUserBackend, { AuthError } from "../BaseUserBackend.ts";
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
}
