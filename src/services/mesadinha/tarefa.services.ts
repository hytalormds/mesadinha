import { mesadinhaApi } from "@/shared/api/mesadinha";
import type { StatusTarefa, Tarefa } from "@/types/navigation";
import { converterMoedaParaNumero } from "@/utils/formatadores";
import { ApiTarefa, dateBrToIso, mapTarefa, statusToId } from "./mappers";

type TarefasResponse = {
  data: ApiTarefa[];
};

type SaveTarefaParams = {
  tarefaEditando?: Tarefa;
  titulo: string;
  descricao: string;
  dataLimite: string;
  valorRecompensa: string;
  fkUsuarioCrianca: string;
};

export async function listarTarefas() {
  const { data } = await mesadinhaApi.get<TarefasResponse>("/tarefa");

  return data.data.map(mapTarefa);
}

export async function salvarTarefaApi(params: SaveTarefaParams) {
  const payload = {
    titulo: params.titulo.trim(),
    descricao: params.descricao.trim(),
    dataLimite: dateBrToIso(params.dataLimite),
    valorRecompensa: converterMoedaParaNumero(params.valorRecompensa),
    fkStatusTarefa: statusToId(params.tarefaEditando?.status ?? "Em Aberto"),
    fkUsuarioCrianca: Number(params.fkUsuarioCrianca),
  };

  if (params.tarefaEditando?.id_tarefa) {
    await mesadinhaApi.put("/tarefa", {
      ...payload,
      idTarefa: Number(params.tarefaEditando.id_tarefa),
    });

    return;
  }

  await mesadinhaApi.post("/tarefa", payload);
}

export async function excluirTarefaApi(id: string) {
  await mesadinhaApi.delete(`/tarefa/${id}`);
}

export async function atualizarStatusTarefaApi(id: string, status: StatusTarefa) {
  await mesadinhaApi.put("/tarefa", {
    idTarefa: Number(id),
    fkStatusTarefa: statusToId(status),
  });
}
