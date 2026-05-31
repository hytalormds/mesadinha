import { FastifyInstance } from "fastify";
import * as AuthRoutes from "./auth.routes";
import * as FamiliaRoutes from "./familia.routes";
import * as TarefaRoutes from "./tarefa.routes";

export const register = (fasify: FastifyInstance) => {
  fasify.register((instance, _, done) => {
    AuthRoutes.configure(instance);
    FamiliaRoutes.configure(instance);
    TarefaRoutes.configure(instance);
    done();
  });
};
