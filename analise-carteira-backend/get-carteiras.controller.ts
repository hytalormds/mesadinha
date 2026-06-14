import { FastifyReply, FastifyRequest } from "fastify";
import { GetCarteirasUseCase } from "../../../../domain/carteira/use-cases/get-carteiras";

export class GetCarteirasController {
  private getCarteirasUseCase: GetCarteirasUseCase;

  constructor() {
    this.getCarteirasUseCase = new GetCarteirasUseCase();
  }

  execute = async (request: FastifyRequest, reply: FastifyReply) => {
    const carteiras = await this.getCarteirasUseCase.execute({
      userId: request.user.id,
      familiaId: request.user.familiaId,
      papel: request.user.papel,
    });

    reply.send({ data: carteiras });
  };
}
