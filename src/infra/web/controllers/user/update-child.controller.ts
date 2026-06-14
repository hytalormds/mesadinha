import { FastifyReply, FastifyRequest } from "fastify";
import { UpdateChildUseCase } from "../../../../domain/user/use-cases/update-child";

export class UpdateChildController {
  private updateChildUseCase: UpdateChildUseCase;

  constructor() {
    this.updateChildUseCase = new UpdateChildUseCase();
  }

  execute = async (
    request: FastifyRequest<{
      Params: {
        id: string;
      };
      Body: {
        name: string;
        email: string;
        password?: string;
      };
    }>,
    reply: FastifyReply,
  ) => {
    const user = await this.updateChildUseCase.execute({
      idUsuario: Number(request.params.id),
      familiaId: request.user.familiaId,
      name: request.body.name,
      email: request.body.email.toLowerCase(),
      password: request.body.password,
    });

    reply.send({ data: user });
  };
}
