import { FastifyReply, FastifyRequest } from "fastify";
import { CreateTarefaUseCase } from "../../../../domain/tarefa/use-cases/create-tarefa.use-case";
import { CreateTarefaParams } from "../../../../domain/tarefa/repositoryInterface/tarefa-repository.interface";

export class CreateTarefaController {
  private createTarefaUseCase: CreateTarefaUseCase;

  constructor() {
    this.createTarefaUseCase = new CreateTarefaUseCase();
  }

  execute = async (
    request: FastifyRequest<{ Body: Omit<CreateTarefaParams, "userId"> }>,
    reply: FastifyReply,
  ) => {
    const body = request.body;
    const userId = request.user.id;

    const tarefa = await this.createTarefaUseCase.execute({
      ...body,
      userId,
    });

    reply.status(200).send(tarefa);
  };
}
