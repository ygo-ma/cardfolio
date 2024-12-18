export { AuthError, User } from "./BaseAuthBackend.ts";

import type BaseAuthBackend from "./BaseAuthBackend.ts";
import { SupabaseAuthBackend } from "./supabase";

// Create default backends
export const AuthBackend: BaseAuthBackend = new SupabaseAuthBackend();
