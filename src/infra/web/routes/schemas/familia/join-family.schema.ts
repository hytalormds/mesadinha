import { FastifySchema } from "fastify";
import S from "fluent-json-schema";

const body = S.object()
  .prop("codigoConvite", S.string().required())
  .prop("name", S.string());

const successResponse = S.object()
  .prop("user", S.ref("User#"))
  .prop("token", S.string().required())
  .prop(
    "familia",
    S.object()
      .prop("idFamilia", S.number())
      .prop("nome", S.string())
      .prop("codigoConvite", S.string()),
  );

export const joinFamilySchema: FastifySchema = {
  tags: ["Familia"],
  body,
  response: {
    200: successResponse,
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
