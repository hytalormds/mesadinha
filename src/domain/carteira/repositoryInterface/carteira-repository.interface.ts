import { Carteira } from "../../../infra/database/typeorm/mesadinha/entities/Carteira";
import { Movimentacao } from "../../../infra/database/typeorm/mesadinha/entities/Movimentacao";

export interface CreateMovimentacaoParams {
  tipoMovimentacao: "entrada" | "saida";
  valor: number;
  fkCarteiraId: number;
  fkTarefaId?: number;
}

export interface CarteiraRepositoryInterface {
  findById(idCarteira: number): Promise<Carteira | null>;
  findByUsuarioId(userId: number): Promise<Carteira | null>;
  findByFamiliaId(familiaId: number): Promise<Carteira[]>;
  updateSaldo(idCarteira: number, saldo: number): Promise<void>;
  createMovimentacao(params: CreateMovimentacaoParams): Promise<Movimentacao>;
  findMovimentacoesByCarteiraIds(carteiraIds: number[]): Promise<Movimentacao[]>;
}
