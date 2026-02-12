import { compare, hash } from 'bcryptjs'

const BCRYPT_HASH_REGEX = /^\$2[aby]\$\d{2}\$/

export function isBcryptHash(value: string | null | undefined): value is string {
  return typeof value === 'string' && BCRYPT_HASH_REGEX.test(value)
}

export async function hashPassword(plainPassword: string): Promise<string> {
  return hash(plainPassword, 12)
}

export async function verifyPassword(
  plainPassword: string,
  storedPassword: string | null | undefined
): Promise<boolean> {
  if (!storedPassword) return false

  if (isBcryptHash(storedPassword)) {
    return compare(plainPassword, storedPassword)
  }

  // Fallback temporal para credenciales antiguas en texto plano.
  return plainPassword === storedPassword
}
