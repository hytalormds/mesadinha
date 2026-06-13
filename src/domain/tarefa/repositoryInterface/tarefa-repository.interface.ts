import { Tarefa } from "../../../infra/database/typeorm/mesadinha/entities/Tarefa";
import { OrderDirection } from "../../../interfaces/order-direction";
import { Paginated } from "../../../interfaces/paginated";

export interface GetTarefasParams {
  userId: number;
  familiaId?: number;
  papel?: "responsavel" | "crianca";
  pagination?: {
    page: number;
    perPage: number;
  };
  filters?: {
    from?: Date;
    to?: Date;
    statusIds?: number[];
  };
  sort?: {
    id?: OrderDirection;
  };
  searchText?: string;
}

export interface UpdateTarefaParams {
  idTarefa: number;
  userId: number;
  titulo?: string;
  descricao?: string;
  valorRecompensa?: number;
  dataLimite?: Date;
  fkStatusTarefa?: number;
  fkUsuarioCrianca?: number;
  familiaId?: number;
}

export interface CreateTarefaParams {
  titulo: string;
  descricao?: string;
  valorRecompensa: number;
  dataLimite?: Date;
  fkStatusTarefa: number;
  userId: number;
  fkUsuarioCrianca: number;
  familiaId?: number;
}

export interface TarefaResumoResponse {
  totalTarefas: number;
  totalRecompensas: number;
}

export interface TarefaRepositoryInterface {
  getTarefas(params: GetTarefasParams): Promise<Paginated<Tarefa>>;
  deleteTarefa(idTarefa: number): Promise<void>;
  findById(idTarefa: number): Promise<Tarefa | null>;
  updateTarefa(params: UpdateTarefaParams): Promise<void>;
  createTarefa(params: CreateTarefaParams): Promise<Tarefa>;
  getTarefaResumo(params: GetTarefasParams): Promise<TarefaResumoResponse>;
}
