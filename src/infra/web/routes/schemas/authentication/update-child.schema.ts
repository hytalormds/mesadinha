import { FastifySchema } from "fastify";
import S from "fluent-json-schema";

const params = S.object().prop("id", S.string().required());

const body = S.object()
  .prop("email", S.string().required())
  .prop("name", S.string().required())
  .prop("password", S.string());

export const updateChildSchema: FastifySchema = {
  tags: ["Auth"],
  params,
  body,
  security: [{ bearerAuth: [] }],
  response: {
    200: S.object().prop("data", S.ref("User#")),
    401: {
      $ref: "Unauthorized#",
    },
    403: {
      $ref: "Forbidden#",
    },
    404: {
      $ref: "NotFound#",
    },
    422: {
      $ref: "UnprocessableEntity#",
    },
    500: {
      $ref: "ServerError#",
    },
  },
};
