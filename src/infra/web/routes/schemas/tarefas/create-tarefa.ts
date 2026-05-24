import { FastifySchema } from "fastify";
import S from "fluent-json-schema";

const body = S.object()
  .prop("titulo", S.string().required())
  .prop("descricao", S.string())
  .prop("valorRecompensa", S.number().required())
  .prop("dataLimite", S.string().format("date-time"))
  .prop("fkStatusTarefa", S.number().required());

const successResponse = S.ref("Tarefa#");

export const createTarefaSchema: FastifySchema = {
  tags: ["Tarefa"],
  body,
  security: [{ bearerAuth: [] }],
  response: {
    200: successResponse,
    401: {
      $ref: "Unauthorized#",
    },
    422: {
      $ref: "UnprocessableEntity#",
    },
    500: {
      $ref: "ServerError#",
    },
  },
};
