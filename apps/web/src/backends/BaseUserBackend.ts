export type ErrorCode =
  | "auth.user_already_exists"
  | "auth.weak_password"
  | "auth.invalid_credentials";

/**
 * Error class for authentication errors
 */
export class AuthError extends Error {
  public code: ErrorCode;
  public originalError?: Error;

  /**
   * @param code - The error code
   * @param originalError - The original error from the underlying backend
   */
  constructor(code: ErrorCode, originalError?: Error) {
    super(`Auth error: ${code}`);
    this.name = "AuthError";

    this.code = code;
    this.originalError = originalError;
  }
}

/**
 * User object
 */
export class User {
  public email: string;

  constructor(email: string) {
    this.email = email;
  }
}

/**
 * Base class for user backends
 */
export default abstract class BaseUserBackend {
  /**
   * Create a user
   *
   * @param email - The user's email
   * @param password - The user's password
   * @param passwordConfirm - The user's password confirmation
   *
   * @throws {AuthError} If the user already exists or the password is weak
   */
  abstract create(
    email: string,
    password: string,
    passwordConfirm: string,
  ): Promise<void>;

  /**
   * Log in a user
   *
   * @param email - The user's email
   * @param password - The user's password
   *
   * @throws {AuthError} If the user does not exist or the password is incorrect
   */
  abstract login(email: string, password: string): Promise<User>;

  /**
   * Retrieves the current user
   */
  abstract getCurrentUser(): Promise<User | undefined>;
}
