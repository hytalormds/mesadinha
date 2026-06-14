import { CarteiraRepository } from "../../../infra/database/typeorm/mesadinha/repositories/carteira.repository";
import { GetCarteirasUseCase } from "./get-carteiras";

export class GetMovimentacoesUseCase {
  private carteiraRepository: CarteiraRepository;
  private getCarteirasUseCase: GetCarteirasUseCase;

  constructor() {
    this.carteiraRepository = new CarteiraRepository();
    this.getCarteirasUseCase = new GetCarteirasUseCase();
  }

  async execute(params: {
    userId: number;
    familiaId?: number;
    papel?: "responsavel" | "crianca";
  }) {
    const carteiras = await this.getCarteirasUseCase.execute(params);

    return this.carteiraRepository.findMovimentacoesByCarteiraIds(
      carteiras.map((carteira) => carteira.idCarteira),
    );
  }
}
