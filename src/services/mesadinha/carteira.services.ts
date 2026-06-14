import { mesadinhaApi } from "@/shared/api/mesadinha";
import type { Carteira, Movimentacao } from "@/types/navigation";
import { ApiUser, mapUser } from "./mappers";

type ApiCarteira = {
  idCarteira: number;
  saldo: number;
  fkUsuarioId: number;
  usuario?: ApiUser;
};

type ApiMovimentacao = {
  idMovimentacao: number;
  tipoMovimentacao: "entrada" | "saida";
  data: string;
  valor: number;
  fkTarefaId?: number;
  fkCarteiraId: number;
};

export type CarteiraComUsuario = Carteira & {
  usuario?: ReturnType<typeof mapUser>;
};

function mapCarteira(carteira: ApiCarteira): CarteiraComUsuario {
  return {
    id_carteira: String(carteira.idCarteira),
    saldo: carteira.saldo,
    fk_usuario_id: String(carteira.fkUsuarioId),
    usuario: carteira.usuario ? mapUser(carteira.usuario) : undefined,
  };
}

function mapMovimentacao(movimentacao: ApiMovimentacao): Movimentacao {
  return {
    id_movimentacao: String(movimentacao.idMovimentacao),
    tipo_movimentacao: movimentacao.tipoMovimentacao,
    data: movimentacao.data,
    valor: movimentacao.valor,
    fk_tarefa_id: movimentacao.fkTarefaId
      ? String(movimentacao.fkTarefaId)
      : undefined,
    fk_carteira_id: String(movimentacao.fkCarteiraId),
  };
}

export async function listarCarteiras() {
  const { data } = await mesadinhaApi.get<{ data: ApiCarteira[] }>(
    "/carteira",
  );

  return data.data.map(mapCarteira);
}

export async function listarMovimentacoes() {
  const { data } = await mesadinhaApi.get<{ data: ApiMovimentacao[] }>(
    "/movimentacao",
  );

  return data.data.map(mapMovimentacao);
}

export async function creditarTarefa(idTarefa: string) {
  await mesadinhaApi.post("/carteira/creditar-tarefa", {
    idTarefa: Number(idTarefa),
  });
}

export async function sacarCarteira(idCarteira: string, valor: number) {
  await mesadinhaApi.post("/carteira/sacar", {
    idCarteira: Number(idCarteira),
    valor,
  });
}
