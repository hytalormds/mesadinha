import { FastifyReply, FastifyRequest } from "fastify";
import { PapelFamilia } from "../../database/typeorm/dt-money/entities/UsuarioFamilia";
import { ForbiddenError } from "../../../shared/errors/forbidden.error";
import { UnauthenticatedError } from "../../../shared/errors/unauthenticated.error";

export const allowRoles = (...roles: PapelFamilia[]) => {
  return async (request: FastifyRequest, _reply: FastifyReply) => {
    if (!request.user?.papel) {
      throw new UnauthenticatedError("Usuario sem papel familiar");
    }

    if (!roles.includes(request.user.papel)) {
      throw new ForbiddenError("Acesso negado para este perfil");
    }
  };
};
