import { UserTypeormRepository } from "../../../infra/database/typeorm/mesadinha/repositories/user.repository";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { AuthLoginRequest } from "../interfaces/authLoginRequest";
import { NotFoundError } from "../../../shared/errors/not-found.error";
import { UnauthenticatedError } from "../../../shared/errors/unauthenticated.error";
import { getJwtSecret } from "../../../shared/config/env";

export class AuthenticateUseCase {
  private authRepository: UserTypeormRepository;

  constructor() {
    this.authRepository = new UserTypeormRepository();
  }

  async execute({ email, password }: AuthLoginRequest) {
    const user = await this.authRepository.findByEmail(email);

    if (!user) {
      throw new NotFoundError("Usuário não encontrado");
    }

    const checkPassword = await compare(password, user.password);

    if (!checkPassword) {
      throw new UnauthenticatedError("A senha está inválida!");
    }

    const token = sign(
      {
        id: user.id,
        email,
      },
      getJwtSecret(),
      {
        expiresIn: "365d",
        algorithm: "HS256",
      }
    );

    delete user.password;

    return {
      token,
      user,
    };
  }
}
