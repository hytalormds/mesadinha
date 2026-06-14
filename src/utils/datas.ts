export function formatarDataDigitada(texto: string) {
  const numeros = texto.replace(/\D/g, "").slice(0, 8);

  if (numeros.length <= 2) {
    return numeros;
  }

  if (numeros.length <= 4) {
    return `${numeros.slice(0, 2)}/${numeros.slice(2)}`;
  }

  return `${numeros.slice(0, 2)}/${numeros.slice(2, 4)}/${numeros.slice(4)}`;
}

export function converterDataBRParaDate(dataBR?: string) {
  if (!dataBR) {
    return null;
  }

  const partes = dataBR.split("/");

  if (partes.length !== 3) {
    return null;
  }

  const dia = Number(partes[0]);
  const mes = Number(partes[1]) - 1;
  const ano = Number(partes[2]);

  const data = new Date(ano, mes, dia);

  if (
    data.getFullYear() !== ano ||
    data.getMonth() !== mes ||
    data.getDate() !== dia
  ) {
    return null;
  }

  return data;
}

export function dataValida(dataTexto: string) {
  return converterDataBRParaDate(dataTexto) !== null;
}