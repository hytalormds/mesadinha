import { FastifySchema } from "fastify";
import S from "fluent-json-schema";

export const listChildrenSchema: FastifySchema = {
  tags: ["Auth"],
  security: [{ bearerAuth: [] }],
  response: {
    200: S.object().prop("data", S.array().items(S.ref("User#"))),
    401: {
      $ref: "Unauthorized#",
    },
    403: {
      $ref: "Forbidden#",
    },
    500: {
      $ref: "ServerError#",
    },
  },
};
