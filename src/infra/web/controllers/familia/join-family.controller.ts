import { FastifyReply, FastifyRequest } from "fastify";
import { JoinFamilyRequest } from "../../../../domain/familia/interfaces/join-family-request";
import { JoinFamilyByCodeUseCase } from "../../../../domain/familia/use-cases/join-family-by-code";

export class JoinFamilyController {
  private joinFamilyUseCase: JoinFamilyByCodeUseCase;

  constructor() {
    this.joinFamilyUseCase = new JoinFamilyByCodeUseCase();
  }

  execute = async (
    request: FastifyRequest<{ Body: JoinFamilyRequest }>,
    reply: FastifyReply,
  ) => {
    const result = await this.joinFamilyUseCase.execute(request.body);

    reply.send(result);
  };
}
