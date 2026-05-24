import { FastifyInstance } from "fastify";
import S from "fluent-json-schema";

export const configure = (fastify: FastifyInstance) => {
  const unprocessableEntityResponse = S.object()
    .id("UnprocessableEntity")
    .prop("message", S.string())
    .prop("errors", S.array().items(S.string()))
    .description("Erro de validação.");

  const businessErrorResponse = S.object()
    .id("BusinessError")
    .prop("message", S.string())
    .prop(
      "internalErrorCode",
      S.number().enum([1]).description("1 - Username already registered"),
    );

  const forbiddenResponse = S.object()
    .id("Forbidden")
    .prop("message", S.string());

  const notFoundErrorResponse = S.object()
    .id("NotFound")
    .prop("message", S.string());

  const unauthorizedErrorResponse = S.object()
    .id("Unauthorized")
    .prop("message", S.string());

  const errorResponse = S.object()
    .id("ServerError")
    .prop("message", S.string());

  const user = S.object()
    .id("User")
    .prop("id", S.number())
    .prop("name", S.string())
    .prop("email", S.string())
    .prop("idTipo", S.number());

  const statusTarefa = S.object()
    .id("StatusTarefa")
    .prop("idStatus", S.number())
    .prop("descricao", S.string());

  const resumoTarefa = S.object()
    .id("ResumoTarefa")
    .prop("totalTarefas", S.number())
    .prop("totalRecompensas", S.number());

  const tarefa = S.object()
    .id("Tarefa")
    .prop("idTarefa", S.number().required())
    .prop("valorRecompensa", S.number().required())
    .prop("dataLimite", S.oneOf([S.string().format("date-time"), S.null()]))
    .prop("titulo", S.string().required())
    .prop("descricao", S.oneOf([S.string(), S.null()]))
    .prop("fkStatusTarefa", S.number().required())
    .prop("fkUsuarioResponsavel", S.number().required())
    .prop("status", S.oneOf([S.ref("StatusTarefa#"), S.null()]));

  const orderDirection = S.string()
    .enum(["ASC", "asc", "DESC", "desc"])
    .id("OrderDirection");

  fastify.addSchema(statusTarefa);
  fastify.addSchema(resumoTarefa);
  fastify.addSchema(tarefa);
  fastify.addSchema(user);
  fastify.addSchema(orderDirection);
  fastify.addSchema(unprocessableEntityResponse);
  fastify.addSchema(businessErrorResponse);
  fastify.addSchema(forbiddenResponse);
  fastify.addSchema(notFoundErrorResponse);
  fastify.addSchema(unauthorizedErrorResponse);
  fastify.addSchema(errorResponse);
};
