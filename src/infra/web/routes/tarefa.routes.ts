import { FastifyInstance } from "fastify";
import { allowRoles } from "../middlewares/allow-roles";
import { CheckAuthtenticationMiddleware } from "../middlewares/check-authentication";
import { CreateTarefaController } from "../controllers/tarefa/create-tarefa.controller";
import { DeleteTarefaController } from "../controllers/tarefa/delete-tarefa.controller";
import { GetStatusTarefaController } from "../controllers/tarefa/get-status-tarefa.controller";
import { GetTarefaController } from "../controllers/tarefa/get-tarefa.controller";
import { UpdateTarefaController } from "../controllers/tarefa/update-tarefa.controller";
import { createTarefaSchema } from "./schemas/tarefas/create-tarefa";
import { deleteTarefaSchema } from "./schemas/tarefas/delete-tarefa";
import { getStatusTarefaSchema } from "./schemas/tarefas/get-status-tarefa";
import { getTarefaSchema } from "./schemas/tarefas/get-tarefa";
import { updateTarefaSchema } from "./schemas/tarefas/update-tarefa";

export const configure = (fastify: FastifyInstance) => {
  const createTarefa = new CreateTarefaController();
  const deleteTarefa = new DeleteTarefaController();
  const updateTarefa = new UpdateTarefaController();
  const getTarefa = new GetTarefaController();
  const getStatusTarefa = new GetStatusTarefaController();
  const checkAuthenticated = new CheckAuthtenticationMiddleware();

  fastify.route({
    url: "/tarefa/status",
    method: "get",
    handler: getStatusTarefa.execute,
    preHandler: [checkAuthenticated.execute],
    schema: getStatusTarefaSchema,
  });

  fastify.route({
    url: "/tarefa",
    method: "get",
    handler: getTarefa.execute,
    preHandler: [checkAuthenticated.execute],
    schema: getTarefaSchema,
  });

  fastify.route({
    url: "/tarefa",
    method: "post",
    handler: createTarefa.execute,
    preHandler: [checkAuthenticated.execute, allowRoles("responsavel")],
    schema: createTarefaSchema,
  });

  fastify.route({
    url: "/tarefa/:id",
    method: "delete",
    handler: deleteTarefa.execute,
    preHandler: [checkAuthenticated.execute, allowRoles("responsavel")],
    schema: deleteTarefaSchema,
  });

  fastify.route({
    url: "/tarefa",
    method: "put",
    handler: updateTarefa.execute,
    preHandler: [checkAuthenticated.execute, allowRoles("responsavel")],
    schema: updateTarefaSchema,
  });
};
