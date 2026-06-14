import { FastifyReply, FastifyRequest } from "fastify";
import { ListChildrenUseCase } from "../../../../domain/user/use-cases/list-children";

export class ListChildrenController {
  private listChildrenUseCase: ListChildrenUseCase;

  constructor() {
    this.listChildrenUseCase = new ListChildrenUseCase();
  }

  execute = async (request: FastifyRequest, reply: FastifyReply) => {
    const children = await this.listChildrenUseCase.execute(
      request.user.familiaId,
    );

    reply.send({ data: children });
  };
}
