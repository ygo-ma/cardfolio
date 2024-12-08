import type BaseUserBackend from "./BaseUserBackend";
import SupabaseUserBackend from "./SupabaseUserBackend";

export { AuthError } from "./BaseUserBackend";

export const userBackend: BaseUserBackend = new SupabaseUserBackend();
