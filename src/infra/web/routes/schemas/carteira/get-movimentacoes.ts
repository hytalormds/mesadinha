import { FastifySchema } from "fastify";
import S from "fluent-json-schema";

const movimentacao = S.object()
  .prop("idMovimentacao", S.number())
  .prop("tipoMovimentacao", S.string())
  .prop("data", S.string())
  .prop("valor", S.number())
  .prop("fkTarefaId", S.number())
  .prop("fkCarteiraId", S.number());

export const getMovimentacoesSchema: FastifySchema = {
  tags: ["Carteira"],
  security: [{ bearerAuth: [] }],
  response: {
    200: S.object().prop("data", S.array().items(movimentacao)),
    401: { $ref: "Unauthorized#" },
    403: { $ref: "Forbidden#" },
    500: { $ref: "ServerError#" },
  },
};
