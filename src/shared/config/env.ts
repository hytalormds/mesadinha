export function getJwtSecret() {
  const secret = process.env.APP_SECRET_KEY ?? process.env.APP_SCRETET_KEY;

  if (!secret) {
    throw new Error("APP_SECRET_KEY nao configurada");
  }

  return secret;
}
