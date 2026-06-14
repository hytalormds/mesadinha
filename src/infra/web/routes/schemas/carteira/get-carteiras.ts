import { FastifySchema } from "fastify";
import S from "fluent-json-schema";

const carteira = S.object()
  .prop("idCarteira", S.number())
  .prop("saldo", S.number())
  .prop("fkUsuarioId", S.number())
  .prop("usuario", S.ref("User#"));

export const getCarteirasSchema: FastifySchema = {
  tags: ["Carteira"],
  security: [{ bearerAuth: [] }],
  response: {
    200: S.object().prop("data", S.array().items(carteira)),
    401: { $ref: "Unauthorized#" },
    403: { $ref: "Forbidden#" },
    500: { $ref: "ServerError#" },
  },
};
