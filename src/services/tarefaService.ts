import type { StatusTarefa, Tarefa, Usuario } from "@/types/navigation";
import { converterDataBRParaDate } from "@/utils/datas";

export function obterStatusTarefa(tarefa: Tarefa): StatusTarefa {
  if (tarefa.status === "Concluída" || tarefa.concluida) {
    return "Concluída";
  }

  if (
    tarefa.status === "Aguardando Aprovação" ||
    tarefa.status === "Recusada" ||
    tarefa.status === "Expirado"
  ) {
    return tarefa.status;
  }

  const dataLimiteConvertida = converterDataBRParaDate(tarefa.dataLimite);

  if (dataLimiteConvertida) {
    const hoje = new Date();

    hoje.setHours(0, 0, 0, 0);
    dataLimiteConvertida.setHours(0, 0, 0, 0);

    if (dataLimiteConvertida < hoje) {
      return "Expirado";
    }
  }

  return tarefa.status ?? "Em Aberto";
}

export function tarefaPertenceAoFilhoLogado(
  tarefa: Tarefa,
  usuarioLogado: Usuario
) {
  const usuarioLogadoId = String(usuarioLogado.id_usuario);

  const idsPossiveisDaCrianca = [
    tarefa.fk_usuario_crianca,
    tarefa.fk_usuario_responsavel,
  ]
    .filter(Boolean)
    .map((id) => String(id));

  const nomeCriancaDaTarefa = String(
    tarefa.nome_usuario_crianca ??
      tarefa.nome_usuario_responsavel ??
      ""
  )
    .trim()
    .toLowerCase();

  const nomeUsuarioLogado = String(usuarioLogado.nome)
    .trim()
    .toLowerCase();

  return (
    usuarioLogado.id_tipo === 2 &&
    (idsPossiveisDaCrianca.includes(usuarioLogadoId) ||
      nomeCriancaDaTarefa === nomeUsuarioLogado)
  );
}