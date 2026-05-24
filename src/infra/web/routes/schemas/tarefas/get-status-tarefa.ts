import { FastifySchema } from "fastify";
import S from "fluent-json-schema";

const successResponse = S.array().items(S.ref("StatusTarefa#"));

export const getStatusTarefaSchema: FastifySchema = {
  tags: ["Tarefa"],
  security: [{ bearerAuth: [] }],
  response: {
    200: successResponse,
    401: {
      $ref: "Unauthorized#",
    },
    500: {
      $ref: "ServerError#",
    },
  },
};
