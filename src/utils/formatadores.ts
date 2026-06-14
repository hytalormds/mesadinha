export function formatarValor(valor?: number) {
  return (valor ?? 0).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export function formatarMoedaDigitada(texto: string) {
  const numeros = texto.replace(/\D/g, "");

  if (!numeros) {
    return "";
  }

  const valor = Number(numeros) / 100;

  return formatarValor(valor);
}

export function converterMoedaParaNumero(valor: string) {
  const numeros = valor.replace(/\D/g, "");

  return Number(numeros) / 100;
}