import { FamiliaRepository } from "../../../infra/database/typeorm/mesadinha/repositories/familia.repository";
import { User } from "../../../infra/database/typeorm/mesadinha/entities/User";
import { ForbiddenError } from "../../../shared/errors/forbidden.error";

export class ListChildrenUseCase {
  private familiaRepository: FamiliaRepository;

  constructor() {
    this.familiaRepository = new FamiliaRepository();
  }

  async execute(familiaId?: number): Promise<User[]> {
    if (!familiaId) {
      throw new ForbiddenError("Responsavel sem familia cadastrada");
    }

    const children = await this.familiaRepository.findChildrenByFamiliaId(
      familiaId,
    );

    return children.map((child) => {
      delete child.password;
      return child;
    });
  }
}
