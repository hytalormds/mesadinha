import { FastifyReply, FastifyRequest } from "fastify";
import { GetMovimentacoesUseCase } from "../../../../domain/carteira/use-cases/get-movimentacoes";

export class GetMovimentacoesController {
  private getMovimentacoesUseCase: GetMovimentacoesUseCase;

  constructor() {
    this.getMovimentacoesUseCase = new GetMovimentacoesUseCase();
  }

  execute = async (request: FastifyRequest, reply: FastifyReply) => {
    const movimentacoes = await this.getMovimentacoesUseCase.execute({
      userId: request.user.id,
      familiaId: request.user.familiaId,
      papel: request.user.papel,
    });

    reply.send({ data: movimentacoes });
  };
}
