import { FastifyInstance } from "fastify";
import { registerSchema } from "./schemas/authentication/register.schema";
import { AuthenticateController } from "../controllers/user/authenticate.controller";
import { RegisterController } from "../controllers/user/register.controller";
import { RegisterChildController } from "../controllers/user/register-child.controller";
import { CheckAuthtenticationMiddleware } from "../middlewares/check-authentication";
import { allowRoles } from "../middlewares/allow-roles";
import { loginSchema } from "./schemas/authentication/login.schema";
import { registerChildSchema } from "./schemas/authentication/register-child.schema";

export const configure = (fastify: FastifyInstance) => {
  const authenticateController = new AuthenticateController();
  const registerController = new RegisterController();
  const registerChildController = new RegisterChildController();
  const checkAuthenticated = new CheckAuthtenticationMiddleware();

  fastify.route({
    url: "/auth/register",
    method: "post",
    handler: registerController.execute,
    schema: registerSchema,
  });

  fastify.route({
    url: "/auth/login",
    method: "post",
    handler: authenticateController.execute,
    schema: loginSchema,
  });

  fastify.route({
    url: "/auth/children",
    method: "post",
    handler: registerChildController.execute,
    preHandler: [checkAuthenticated.execute, allowRoles("responsavel")],
    schema: registerChildSchema,
  });
};
