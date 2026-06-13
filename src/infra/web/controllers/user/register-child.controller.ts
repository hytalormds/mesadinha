import { FastifyReply, FastifyRequest } from "fastify";
import { CreateUserParams } from "../../../../domain/user/repositoryInterface/user-repository.interface";
import { RegisterChildUseCase } from "../../../../domain/user/use-cases/register";

export class RegisterChildController {
  private registerChildUseCase: RegisterChildUseCase;

  constructor() {
    this.registerChildUseCase = new RegisterChildUseCase();
  }

  execute = async (
    request: FastifyRequest<{ Body: CreateUserParams }>,
    reply: FastifyReply,
  ) => {
    const childData = {
      ...request.body,
      email: request.body.email.toLowerCase(),
    };

    const child = await this.registerChildUseCase.execute({
      child: childData,
      familiaId: request.user.familiaId,
    });

    reply.status(201).send(child);
  };
}
