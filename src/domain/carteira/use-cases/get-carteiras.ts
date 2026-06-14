import { CarteiraRepository } from "../../../infra/database/typeorm/mesadinha/repositories/carteira.repository";
import { ForbiddenError } from "../../../shared/errors/forbidden.error";

export class GetCarteirasUseCase {
  private carteiraRepository: CarteiraRepository;

  constructor() {
    this.carteiraRepository = new CarteiraRepository();
  }

  async execute({
    userId,
    familiaId,
    papel,
  }: {
    userId: number;
    familiaId?: number;
    papel?: "responsavel" | "crianca";
  }) {
    if (familiaId) {
      return this.carteiraRepository.findByFamiliaId(familiaId);
    }

    if (papel === "responsavel") {
      throw new ForbiddenError("Responsavel sem familia cadastrada");
    }

    const carteira = await this.carteiraRepository.findByUsuarioId(userId);

    return carteira ? [carteira] : [];
  }
}
