import { DataSource } from "typeorm";
import { StatusTarefa } from "../entities/StatusTarefa";
import { TipoUsuario } from "../entities/TipoUsuario";

export class SeederService {
  constructor(private dataSource: DataSource) {}

  async run() {
    await this.seedTipoUsuario();
    await this.seedStatusTarefa();
  }

  private async seedTipoUsuario() {
    const tipoUsuarioRepository = this.dataSource.getRepository(TipoUsuario);

    const tipos = [
      { idTipo: 1, descricao: "Responsável" },
      { idTipo: 2, descricao: "Dependente" },
    ];

    for (const tipo of tipos) {
      const exists = await tipoUsuarioRepository.findOne({
        where: { idTipo: tipo.idTipo },
      });

      if (!exists) {
        await tipoUsuarioRepository.save(tipo);
      }
    }
  }

  private async seedStatusTarefa() {
    const statusRepository = this.dataSource.getRepository(StatusTarefa);

    const status = [
      { idStatus: 1, descricao: "Concluída" },
      { idStatus: 2, descricao: "Em Andamento" },
      { idStatus: 3, descricao: "Em Aberto" },
      { idStatus: 4, descricao: "Expirado" },
    ];

    for (const item of status) {
      const exists = await statusRepository.findOne({
        where: { idStatus: item.idStatus },
      });

      if (!exists) {
        await statusRepository.save(item);
      }
    }
  }
}
