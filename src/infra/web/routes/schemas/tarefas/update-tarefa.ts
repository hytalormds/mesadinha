import { FastifySchema } from "fastify";
import S from "fluent-json-schema";

const body = S.object()
  .prop("idTarefa", S.number().required())
  .prop("titulo", S.string())
  .prop("descricao", S.string())
  .prop("valorRecompensa", S.number())
  .prop("dataLimite", S.string().format("date-time"))
  .prop("fkStatusTarefa", S.number());

export const updateTarefaSchema: FastifySchema = {
  tags: ["Tarefa"],
  body,
  security: [{ bearerAuth: [] }],
  response: {
    204: {
      type: "null",
    },
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
