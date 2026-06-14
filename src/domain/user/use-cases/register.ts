import { UserTypeormRepository } from "../../../infra/database/typeorm/mesadinha/repositories/user.repository";
import { FamiliaRepository } from "../../../infra/database/typeorm/mesadinha/repositories/familia.repository";
import { CreateUserParams } from "../repositoryInterface/user-repository.interface";
import { hashSync } from "bcrypt";
import { sign } from "jsonwebtoken";
import { AuthReponse } from "../interfaces/authResponse";
import { UnauthenticatedError } from "../../../shared/errors/unauthenticated.error";
import { ForbiddenError } from "../../../shared/errors/forbidden.error";
import { User } from "../../../infra/database/typeorm/mesadinha/entities/User";
import { getJwtSecret } from "../../../shared/config/env";

export class RegisterUseCase {
  private authRepository: UserTypeormRepository;
  private familiaRepository: FamiliaRepository;

  constructor() {
    this.authRepository = new UserTypeormRepository();
    this.familiaRepository = new FamiliaRepository();
  }

  async execute(user: CreateUserParams): Promise<AuthReponse> {
    const userAlredyExists = await this.authRepository.findByEmail(user.email);

    if (userAlredyExists) {
      throw new UnauthenticatedError("O E-mail já está cadastrado!");
    }

    const encryptedPassword = hashSync(user.password, 10);

    const idTipo = user.idTipo ?? 1;

    const userCreated = await this.authRepository.createUser({
      ...user,
      password: encryptedPassword,
      idTipo,
    });

    const familia =
      idTipo === 1 ? await this.createFamiliaResponsavel(userCreated.id, user) : undefined;

    const token = sign(
      {
        id: userCreated.id,
        email: userCreated.email,
      },
      getJwtSecret(),
      {
        expiresIn: "365d",
        algorithm: "HS256",
      },
    );

    delete userCreated.password;

    return {
      token,
      user: userCreated,
      familia,
    };
  }

  private async createFamiliaResponsavel(
    userId: number,
    user: CreateUserParams,
  ) {
    const familia = await this.familiaRepository.createFamilia({
      nome: user.nomeFamilia ?? `Familia de ${user.name}`,
      fkUsuarioResponsavel: userId,
    });

    await this.familiaRepository.addUsuarioFamilia({
      fkUsuarioId: userId,
      fkFamiliaId: familia.idFamilia,
      papel: "responsavel",
    });

    return familia;
  }
}

export class RegisterChildUseCase {
  private authRepository: UserTypeormRepository;
  private familiaRepository: FamiliaRepository;

  constructor() {
    this.authRepository = new UserTypeormRepository();
    this.familiaRepository = new FamiliaRepository();
  }

  async execute({
    child,
    familiaId,
  }: {
    child: CreateUserParams;
    familiaId?: number;
  }): Promise<User> {
    if (!familiaId) {
      throw new ForbiddenError("Responsavel sem familia cadastrada");
    }

    const userAlredyExists = await this.authRepository.findByEmail(child.email);

    if (userAlredyExists) {
      throw new UnauthenticatedError("O E-mail ja esta cadastrado!");
    }

    const userCreated = await this.authRepository.createUser({
      ...child,
      password: hashSync(child.password, 10),
      idTipo: 2,
    });

    await this.familiaRepository.addUsuarioFamilia({
      fkUsuarioId: userCreated.id,
      fkFamiliaId: familiaId,
      papel: "crianca",
    });

    delete userCreated.password;

    return userCreated;
  }
}
