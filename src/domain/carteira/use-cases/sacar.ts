import { CarteiraRepository } from "../../../infra/database/typeorm/mesadinha/repositories/carteira.repository";
import { ForbiddenError } from "../../../shared/errors/forbidden.error";
import { NotFoundError } from "../../../shared/errors/not-found.error";
import { UnprocessedEntityError } from "../../../shared/errors/unprocessed-entity.error";

type SacarParams = {
  idCarteira: number;
  valor: number;
  familiaId?: number;
};

export class SacarUseCase {
  private carteiraRepository: CarteiraRepository;

  constructor() {
    this.carteiraRepository = new CarteiraRepository();
  }

  async execute({ idCarteira, valor, familiaId }: SacarParams) {
    if (valor <= 0) {
      throw new UnprocessedEntityError(["Valor do saque deve ser maior que zero"]);
    }

    const carteira = await this.carteiraRepository.findById(idCarteira);

    if (!carteira) {
      throw new NotFoundError("Carteira nao encontrada");
    }

    if (!familiaId) {
      throw new ForbiddenError("Usuario sem familia cadastrada");
    }

    const carteirasDaFamilia =
      await this.carteiraRepository.findByFamiliaId(familiaId);

    const carteiraPertenceAFamilia = carteirasDaFamilia.some(
      (item) => item.idCarteira === idCarteira,
    );

    if (!carteiraPertenceAFamilia) {
      throw new ForbiddenError("Sem autorizacao para sacar desta carteira");
    }

    if (valor > carteira.saldo) {
      throw new UnprocessedEntityError(["Saldo insuficiente para saque"]);
    }

    const novoSaldo = carteira.saldo - valor;

    await this.carteiraRepository.updateSaldo(idCarteira, novoSaldo);

    const movimentacao = await this.carteiraRepository.createMovimentacao({
      tipoMovimentacao: "saida",
      valor,
      fkCarteiraId: idCarteira,
    });

    return {
      carteira: {
        ...carteira,
        saldo: novoSaldo,
      },
      movimentacao,
    };
  }
}
