import type { Movimentacao, Tarefa } from "@/types/navigation";

export function criarMovimentacaoEntrada(
  tarefa: Tarefa,
  carteiraId: string,
  valor: number
): Movimentacao {
  return {
    id_movimentacao: String(Date.now()),
    tipo_movimentacao: "entrada",
    data: new Date().toISOString(),
    valor,
    fk_tarefa_id: tarefa.id,
    fk_carteira_id: carteiraId,
  };
}