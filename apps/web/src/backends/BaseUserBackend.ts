export type ErrorCode = "auth.user_already_exists" | "auth.weak_password";

export class AuthError extends Error {
  public code: ErrorCode;
  public originalError?: Error;

  constructor(code: ErrorCode, originalError?: Error) {
    super(`Auth error: ${code}`);
    this.name = "AuthError";

    this.code = code;
    this.originalError = originalError;
  }
}

export default abstract class BaseUserBackend {
  /**
   * Create a user
   */
  abstract create(
    email: string,
    password: string,
    passwordConfirm: string,
  ): Promise<void>;
}
