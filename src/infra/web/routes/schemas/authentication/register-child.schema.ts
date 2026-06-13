import { FastifySchema } from "fastify";
import S from "fluent-json-schema";

const body = S.object()
  .prop("email", S.string().required())
  .prop("name", S.string().required())
  .prop("password", S.string().required());

export const registerChildSchema: FastifySchema = {
  tags: ["Auth"],
  body,
  security: [{ bearerAuth: [] }],
  response: {
    201: S.object().prop("user", S.ref("User#")),
    401: {
      $ref: "Unauthorized#",
    },
    403: {
      $ref: "Forbidden#",
    },
    422: {
      $ref: "UnprocessableEntity#",
    },
    500: {
      $ref: "ServerError#",
    },
  },
};
