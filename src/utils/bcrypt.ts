import bcrypt from "bcrypt";
import { BCRYPT_SALT } from "./../constant";

/**
 * Hashes a password using bcrypt.
 *
 * @param password - The plaintext password to hash.
 * @returns The hashed password as a string, or null if an error occurs.
 */

export const hashPassword = async (
  password: string
): Promise<string | null> => {
  try {
    // Parse the salt rounds or default to 10 if parsing fails
    const saltRounds = parseInt(BCRYPT_SALT as string) || 10;

    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(password, salt);
  } catch (error) {
    console.error("Error hashing password:", error);
    return null;
  }
};

/**
 * Compare a password using bcrypt.
 * @param password The plaintext password.
 * @param hashPassword The hash password
 * @returns A promise that resolves to true if passwords match, otherwise false
 */

export const comparePassword = async (
  password: string,
  hashPassword: string
): Promise<boolean> => {
  try {
    return await bcrypt.compare(password, hashPassword);
  } catch (error) {
    console.error("Error hashing password:", error);
    return false;
  }
};
