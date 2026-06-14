import type { StatusTarefa, Tarefa, Usuario } from "@/types/navigation";

export type ApiUser = {
  id: number;
  name: string;
  email: string;
  idTipo: 1 | 2;
  papel?: "responsavel" | "crianca";
  familiaId?: number;
};

export type ApiTarefa = {
  idTarefa: number;
  valorRecompensa: number;
  dataLimite?: string | null;
  titulo: string;
  descricao?: string | null;
  fkStatusTarefa: number;
  fkUsuarioResponsavel: number;
  fkUsuarioCrianca: number;
  fkFamiliaId: number;
  usuarioCrianca?: ApiUser;
  usuarioResponsavel?: ApiUser;
  status?: {
    idStatus: number;
    descricao: string;
  } | null;
};

const statusById: Record<number, StatusTarefa> = {
  1: "Concluída",
  2: "Em Andamento",
  3: "Em Aberto",
  4: "Expirado",
};

export function mapUser(user: ApiUser): Usuario {
  return {
    id_usuario: String(user.id),
    nome: user.name,
    email: user.email,
    id_tipo: user.idTipo,
    papel: user.papel,
    familiaId: user.familiaId,
  };
}

export function mapTarefa(tarefa: ApiTarefa): Tarefa {
  const status = statusById[tarefa.fkStatusTarefa] ?? "Em Aberto";

  return {
    id: String(tarefa.idTarefa),
    id_tarefa: String(tarefa.idTarefa),
    titulo: tarefa.titulo,
    descricao: tarefa.descricao ?? undefined,
    dataLimite: formatDateForApp(tarefa.dataLimite),
    valor_recompensa: tarefa.valorRecompensa,
    status,
    concluida: status === "Concluída",
    fk_usuario_responsavel: String(tarefa.fkUsuarioResponsavel),
    nome_usuario_responsavel: tarefa.usuarioResponsavel?.name,
    fk_usuario_crianca: String(tarefa.fkUsuarioCrianca),
    nome_usuario_crianca: tarefa.usuarioCrianca?.name,
    fk_familia_id: String(tarefa.fkFamiliaId),
  };
}

export function statusToId(status: StatusTarefa) {
  if (status === "Concluída" || status === "Aguardando Aprovação") {
    return 1;
  }

  if (status === "Em Andamento") {
    return 2;
  }

  if (status === "Expirado" || status === "Recusada") {
    return 4;
  }

  return 3;
}

export function dateBrToIso(date: string) {
  const [day, month, year] = date.split("/");

  return new Date(Number(year), Number(month) - 1, Number(day)).toISOString();
}

function formatDateForApp(date?: string | null) {
  if (!date) {
    return undefined;
  }

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return undefined;
  }

  return parsed.toLocaleDateString("pt-BR");
}
