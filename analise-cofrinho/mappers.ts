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
  usuarioCrianca?: ApiUser | null;
  usuarioResponsavel?: ApiUser | null;
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
  5: "Aguardando Aprovação",
  6: "Recusada",
};

const statusByText: Record<string, StatusTarefa> = {
  concluida: "Concluída",
  "em andamento": "Em Andamento",
  "em aberto": "Em Aberto",
  expirado: "Expirado",
  "aguardando aprovacao": "Aguardando Aprovação",
  recusada: "Recusada",
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
  const status = mapStatusTarefa(tarefa);

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
  if (status === "Concluída") {
    return 1;
  }

  if (status === "Em Andamento") {
    return 2;
  }

  if (status === "Expirado") {
    return 4;
  }

  if (status === "Aguardando Aprovação") {
    return 5;
  }

  if (status === "Recusada") {
    return 6;
  }

  return 3;
}

export function dateBrToIso(date: string) {
  const [day, month, year] = date.split("/");

  return new Date(Number(year), Number(month) - 1, Number(day), 12).toISOString();
}

function mapStatusTarefa(tarefa: ApiTarefa): StatusTarefa {
  const statusText = normalizeStatus(tarefa.status?.descricao);

  if (statusText && statusByText[statusText]) {
    return statusByText[statusText];
  }

  return statusById[tarefa.fkStatusTarefa] ?? "Em Aberto";
}

function normalizeStatus(status?: string | null) {
  return status
    ?.normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function formatDateForApp(date?: string | null) {
  if (!date) {
    return undefined;
  }

  const dateOnlyMatch = date.match(/^(\d{4})-\d{2}-\d{2}/);

  if (dateOnlyMatch) {
    const [year, month, day] = date.slice(0, 10).split("-");
    return `${day}/${month}/${year}`;
  }

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return undefined;
  }

  return parsed.toLocaleDateString("pt-BR");
}
