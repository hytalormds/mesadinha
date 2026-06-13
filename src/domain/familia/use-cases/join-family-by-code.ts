import { FamiliaRepository } from "../../../infra/database/typeorm/mesadinha/repositories/familia.repository";
import { NotFoundError } from "../../../shared/errors/not-found.error";
import { UnauthenticatedError } from "../../../shared/errors/unauthenticated.error";
import { JoinFamilyRequest } from "../interfaces/join-family-request";

export class JoinFamilyByCodeUseCase {
  private familiaRepository: FamiliaRepository;

  constructor() {
    this.familiaRepository = new FamiliaRepository();
  }

  async execute({ codigoConvite }: JoinFamilyRequest) {
    const familia =
      await this.familiaRepository.findByCodigoConvite(codigoConvite);

    if (!familia) {
      throw new NotFoundError("Familia nao encontrada");
    }

    throw new UnauthenticatedError(
      "Usuario autenticado nao identificado para entrar na familia",
    );
  }
}
