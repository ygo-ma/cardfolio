export { AuthError, User } from "./BaseUserBackend";

import type BaseUserBackend from "./BaseUserBackend.ts";
import { SupabaseUserBackend } from "./supabase";

// Create default backends
export const UserBackend: BaseUserBackend = new SupabaseUserBackend();
