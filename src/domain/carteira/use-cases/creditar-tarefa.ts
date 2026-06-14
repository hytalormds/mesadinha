import { CarteiraRepository } from "../../../infra/database/typeorm/mesadinha/repositories/carteira.repository";
import { TarefaRepository } from "../../../infra/database/typeorm/mesadinha/repositories/tarefa.repository";
import { ForbiddenError } from "../../../shared/errors/forbidden.error";
import { NotFoundError } from "../../../shared/errors/not-found.error";
import { UnprocessedEntityError } from "../../../shared/errors/unprocessed-entity.error";

export class CreditarTarefaUseCase {
  private carteiraRepository: CarteiraRepository;
  private tarefaRepository: TarefaRepository;

  constructor() {
    this.carteiraRepository = new CarteiraRepository();
    this.tarefaRepository = new TarefaRepository();
  }

  async execute({
    idTarefa,
    userId,
    familiaId,
  }: {
    idTarefa: number;
    userId: number;
    familiaId?: number;
  }) {
    const tarefa = await this.tarefaRepository.findById(idTarefa);

    if (!tarefa) {
      throw new NotFoundError("Tarefa nao encontrada");
    }

    if (
      tarefa.fkUsuarioResponsavel !== userId ||
      (familiaId && tarefa.fkFamiliaId !== familiaId)
    ) {
      throw new ForbiddenError("Sem autorizacao para creditar esta tarefa");
    }

    const carteira = await this.carteiraRepository.findByUsuarioId(
      tarefa.fkUsuarioCrianca,
    );

    if (!carteira) {
      throw new NotFoundError("Carteira da crianca nao encontrada");
    }

    const movimentacoes =
      await this.carteiraRepository.findMovimentacoesByCarteiraIds([
        carteira.idCarteira,
      ]);

    const recompensaJaCreditada = movimentacoes.some(
      (movimentacao) => movimentacao.fkTarefaId === idTarefa,
    );

    if (recompensaJaCreditada) {
      throw new UnprocessedEntityError(["Recompensa ja creditada"]);
    }

    await this.carteiraRepository.updateSaldo(
      carteira.idCarteira,
      carteira.saldo + tarefa.valorRecompensa,
    );

    const movimentacao = await this.carteiraRepository.createMovimentacao({
      tipoMovimentacao: "entrada",
      valor: tarefa.valorRecompensa,
      fkCarteiraId: carteira.idCarteira,
      fkTarefaId: tarefa.idTarefa,
    });

    await this.tarefaRepository.updateTarefa({
      idTarefa,
      userId,
      familiaId,
      fkUsuarioCrianca: tarefa.fkUsuarioCrianca,
      fkStatusTarefa: 1,
    });

    return {
      carteira: {
        ...carteira,
        saldo: carteira.saldo + tarefa.valorRecompensa,
      },
      movimentacao,
    };
  }
}
