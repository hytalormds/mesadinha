import "fastify";
import { User } from "../infra/database/typeorm/mesadinha/entities/User";
import { PapelFamilia } from "../infra/database/typeorm/mesadinha/entities/UsuarioFamilia";

declare module "fastify" {
  interface FastifyRequest {
    user: User & {
      papel?: PapelFamilia;
      familiaId?: number;
    };
  }
}
