import { FastifySchema } from "fastify";
import S from "fluent-json-schema";

export const sacarSchema: FastifySchema = {
  tags: ["Carteira"],
  body: S.object()
    .prop("idCarteira", S.number().required())
    .prop("valor", S.number().required()),
  security: [{ bearerAuth: [] }],
  response: {
    200: S.object()
      .prop("carteira", S.object())
      .prop("movimentacao", S.object()),
    401: { $ref: "Unauthorized#" },
    403: { $ref: "Forbidden#" },
    404: { $ref: "NotFound#" },
    422: { $ref: "UnprocessableEntity#" },
    500: { $ref: "ServerError#" },
  },
};
