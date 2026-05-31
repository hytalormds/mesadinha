import { FastifyInstance } from "fastify";
import { JoinFamilyController } from "../controllers/familia/join-family.controller";
import { joinFamilySchema } from "./schemas/familia/join-family.schema";

export const configure = (fastify: FastifyInstance) => {
  const joinFamilyController = new JoinFamilyController();

  fastify.route({
    url: "/familia/entrar",
    method: "post",
    handler: joinFamilyController.execute,
    schema: joinFamilySchema,
  });
};
