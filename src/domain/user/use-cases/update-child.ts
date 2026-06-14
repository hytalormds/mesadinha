import { hashSync } from "bcrypt";
import { FamiliaRepository } from "../../../infra/database/typeorm/mesadinha/repositories/familia.repository";
import { UserTypeormRepository } from "../../../infra/database/typeorm/mesadinha/repositories/user.repository";
import { ForbiddenError } from "../../../shared/errors/forbidden.error";
import { NotFoundError } from "../../../shared/errors/not-found.error";
import { UnauthenticatedError } from "../../../shared/errors/unauthenticated.error";
import { User } from "../../../infra/database/typeorm/mesadinha/entities/User";

type UpdateChildParams = {
  idUsuario: number;
  familiaId?: number;
  name: string;
  email: string;
  password?: string;
};

export class UpdateChildUseCase {
  private authRepository: UserTypeormRepository;
  private familiaRepository: FamiliaRepository;

  constructor() {
    this.authRepository = new UserTypeormRepository();
    this.familiaRepository = new FamiliaRepository();
  }

  async execute({
    idUsuario,
    familiaId,
    name,
    email,
    password,
  }: UpdateChildParams): Promise<User> {
    if (!familiaId) {
      throw new ForbiddenError("Responsavel sem familia cadastrada");
    }

    const child = await this.authRepository.findById(idUsuario);

    if (!child) {
      throw new NotFoundError("Filho nao encontrado");
    }

    const membership =
      await this.familiaRepository.findMembershipByUserId(idUsuario);

    if (
      !membership ||
      membership.fkFamiliaId !== familiaId ||
      membership.papel !== "crianca"
    ) {
      throw new ForbiddenError("Filho nao pertence a familia do responsavel");
    }

    const userWithEmail = await this.authRepository.findByEmail(email);

    if (userWithEmail && userWithEmail.id !== idUsuario) {
      throw new UnauthenticatedError("O E-mail ja esta cadastrado!");
    }

    const updateData: {
      name: string;
      email: string;
      password?: string;
    } = {
      name,
      email,
    };

    if (password) {
      updateData.password = hashSync(password, 10);
    }

    const userUpdated = await this.authRepository.updateUser(
      idUsuario,
      updateData,
    );

    delete userUpdated.password;

    return userUpdated;
  }
}
