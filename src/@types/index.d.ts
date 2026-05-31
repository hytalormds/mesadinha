import "fastify";
import { User } from "../infra/database/typeorm/dt-money/entities/User";
import { PapelFamilia } from "../infra/database/typeorm/dt-money/entities/UsuarioFamilia";

declare module "fastify" {
  interface FastifyRequest {
    user: User & {
      papel?: PapelFamilia;
      familiaId?: number;
    };
  }
}
