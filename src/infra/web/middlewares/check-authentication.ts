import { FastifyRequest } from "fastify";
import jwt from "jsonwebtoken";
import { FamiliaRepository } from "../../database/typeorm/mesadinha/repositories/familia.repository";
import { UserTypeormRepository } from "../../database/typeorm/mesadinha/repositories/user.repository";
import { UnauthenticatedError } from "../../../shared/errors/unauthenticated.error";
import { getJwtSecret } from "../../../shared/config/env";

export class CheckAuthtenticationMiddleware {
  private authRepository: UserTypeormRepository;
  private familiaRepository: FamiliaRepository;

  constructor() {
    this.authRepository = new UserTypeormRepository();
    this.familiaRepository = new FamiliaRepository();
  }

  execute = async (request: FastifyRequest) => {
    const authorizationHeader = request.headers?.authorization;

    if (!authorizationHeader) {
      throw new UnauthenticatedError("Sem autorizacao");
    }

    const [, token] = authorizationHeader.split(" ");

    if (!token || token === "") {
      throw new UnauthenticatedError("Nao possui token");
    }

    try {
      const { email } = jwt.verify(token, getJwtSecret()) as {
        email: string;
      };

      const user = await this.authRepository.findByEmail(email);
      if (!user) {
        throw new UnauthenticatedError("Usuario nao encontrado");
      }

      const membership = await this.familiaRepository.findMembershipByUserId(
        user.id,
      );

      // Cada request recebe tambem o papel e a familia do usuario autenticado.
      // As rotas usam esse contexto para separar acoes de responsavel e crianca.
      request.user = Object.assign(user, {
        papel: membership?.papel,
        familiaId: membership?.fkFamiliaId,
      });
    } catch (error) {
      if (error instanceof UnauthenticatedError) {
        throw error;
      }

      throw new UnauthenticatedError("Falha ao buscar usuario");
    }
  };
}
