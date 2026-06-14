import { FastifyReply, FastifyRequest } from "fastify";
import { SacarUseCase } from "../../../../domain/carteira/use-cases/sacar";

export class SacarController {
  private sacarUseCase: SacarUseCase;

  constructor() {
    this.sacarUseCase = new SacarUseCase();
  }

  execute = async (
    request: FastifyRequest<{
      Body: {
        idCarteira: number;
        valor: number;
      };
    }>,
    reply: FastifyReply,
  ) => {
    const result = await this.sacarUseCase.execute({
      idCarteira: request.body.idCarteira,
      valor: request.body.valor,
      familiaId: request.user.familiaId,
    });

    reply.send(result);
  };
}
