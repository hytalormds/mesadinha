import type { Carteira } from "@/types/navigation";

export function creditarValorNaCarteira(
  carteiras: Carteira[],
  usuarioId: string,
  valor: number
) {
  const carteiraExistente = carteiras.find(
    (carteira) => String(carteira.fk_usuario_id) === String(usuarioId)
  );

  if (carteiraExistente) {
    const carteiraAtualizada: Carteira = {
      ...carteiraExistente,
      saldo: carteiraExistente.saldo + valor,
    };

    const carteirasAtualizadas = carteiras.map((carteira) =>
      String(carteira.fk_usuario_id) === String(usuarioId)
        ? carteiraAtualizada
        : carteira
    );

    return {
      carteira: carteiraAtualizada,
      carteiras: carteirasAtualizadas,
    };
  }

  const novaCarteira: Carteira = {
    id_carteira: String(Date.now()),
    saldo: valor,
    fk_usuario_id: usuarioId,
  };

  return {
    carteira: novaCarteira,
    carteiras: [...carteiras, novaCarteira],
  };
}