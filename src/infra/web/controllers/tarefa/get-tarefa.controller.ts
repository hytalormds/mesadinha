import { FastifyReply, FastifyRequest } from "fastify";
import { GetTarefasParams } from "../../../../domain/tarefa/repositoryInterface/tarefa-repository.interface";
import { GetTarefaUseCase } from "../../../../domain/tarefa/use-cases/get-tarefa.use-case";
import { OrderDirection } from "../../../../interfaces/order-direction";

interface Request {
  Querystring: {
    page?: number;
    perPage?: number;
    from?: string;
    to?: string;
    orderId?: OrderDirection;
    searchText?: string;
    statusIds?: number[];
  };
}

export class GetTarefaController {
  private getTarefaUseCase: GetTarefaUseCase;

  constructor() {
    this.getTarefaUseCase = new GetTarefaUseCase();
  }

  execute = async (request: FastifyRequest<Request>, reply: FastifyReply) => {
    const { from, orderId, page, perPage, to, searchText, statusIds } =
      request.query;

    const userId = request.user.id;
    const params: GetTarefasParams = {
      filters: {
        from: from ? new Date(from) : undefined,
        to: to ? new Date(to) : undefined,
        statusIds,
      },
      sort: {
        id: orderId,
      },
      userId,
      searchText: searchText ?? undefined,
    };

    if (page && perPage) {
      params.pagination = {
        page,
        perPage,
      };
    }

    const tarefa = await this.getTarefaUseCase.execute(params);

    reply.send(tarefa);
  };
}
