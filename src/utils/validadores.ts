export function validarEmail(email: string) {
  return email.trim().includes("@");
}

export function obterErrosSenha(senha: string) {
  const erros: string[] = [];

  if (senha.length < 8) {
    erros.push("mínimo de 8 caracteres");
  }

  if (!/[0-9]/.test(senha)) {
    erros.push("um número");
  }

  if (!/[A-Z]/.test(senha)) {
    erros.push("uma letra maiúscula");
  }

  if (!/[^A-Za-z0-9]/.test(senha)) {
    erros.push("um caractere especial");
  }

  return erros;
}

export function campoObrigatorio(valor: string) {
  return valor.trim().length > 0;
}