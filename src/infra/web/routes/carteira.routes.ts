import { FastifyInstance } from "fastify";
import { allowRoles } from "../middlewares/allow-roles";
import { CheckAuthtenticationMiddleware } from "../middlewares/check-authentication";
import { GetCarteirasController } from "../controllers/carteira/get-carteiras.controller";
import { GetMovimentacoesController } from "../controllers/carteira/get-movimentacoes.controller";
import { CreditarTarefaController } from "../controllers/carteira/creditar-tarefa.controller";
import { SacarController } from "../controllers/carteira/sacar.controller";
import { getCarteirasSchema } from "./schemas/carteira/get-carteiras";
import { getMovimentacoesSchema } from "./schemas/carteira/get-movimentacoes";
import { creditarTarefaSchema } from "./schemas/carteira/creditar-tarefa";
import { sacarSchema } from "./schemas/carteira/sacar";

export const configure = (fastify: FastifyInstance) => {
  const checkAuthenticated = new CheckAuthtenticationMiddleware();
  const getCarteirasController = new GetCarteirasController();
  const getMovimentacoesController = new GetMovimentacoesController();
  const creditarTarefaController = new CreditarTarefaController();
  const sacarController = new SacarController();

  fastify.route({
    url: "/carteira",
    method: "get",
    handler: getCarteirasController.execute,
    preHandler: [checkAuthenticated.execute],
    schema: getCarteirasSchema,
  });

  fastify.route({
    url: "/movimentacao",
    method: "get",
    handler: getMovimentacoesController.execute,
    preHandler: [checkAuthenticated.execute],
    schema: getMovimentacoesSchema,
  });

  fastify.route({
    url: "/carteira/creditar-tarefa",
    method: "post",
    handler: creditarTarefaController.execute,
    preHandler: [checkAuthenticated.execute, allowRoles("responsavel")],
    schema: creditarTarefaSchema,
  });

  fastify.route({
    url: "/carteira/sacar",
    method: "post",
    handler: sacarController.execute,
    preHandler: [checkAuthenticated.execute, allowRoles("responsavel")],
    schema: sacarSchema,
  });
};
