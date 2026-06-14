import { FastifyReply, FastifyRequest } from "fastify";
import { UpdateTarefaParams } from "../../../../domain/tarefa/repositoryInterface/tarefa-repository.interface";
import { UpdateTarefaUseCase } from "../../../../domain/tarefa/use-cases/update-tarefa.use-case";

export class UpdateTarefaController {
  private updateTarefaUseCase: UpdateTarefaUseCase;

  constructor() {
    this.updateTarefaUseCase = new UpdateTarefaUseCase();
  }

  execute = async (
    request: FastifyRequest<{
      Body: Omit<UpdateTarefaParams, "userId" | "familiaId">;
    }>,
    reply: FastifyReply,
  ) => {
    const body = request.body;
    const userId = request.user.id;
    const familiaId = request.user.familiaId;

    await this.updateTarefaUseCase.execute({
      ...body,
      userId,
      familiaId,
      papel: request.user.papel,
    });

    reply.status(204).send();
  };
}
