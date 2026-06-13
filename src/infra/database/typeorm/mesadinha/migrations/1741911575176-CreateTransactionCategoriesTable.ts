import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTransactionCategoriesTable1741911575176 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "tarefa",
        columns: [
          {
            name: "id_tarefa",
            type: "integer",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "valor_recompensa",
            type: "real",
            isNullable: false,
          },
          {
            name: "data_limite",
            type: "datetime",
            isNullable: true,
          },
          {
            name: "titulo",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "descricao",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "fk_status_tarefa",
            type: "integer",
            isNullable: false,
          },
          {
            name: "fk_usuario_responsavel",
            type: "integer",
            isNullable: false,
          },
        ],
        foreignKeys: [
          {
            columnNames: ["fk_status_tarefa"],
            referencedColumnNames: ["id_status"],
            referencedTableName: "status_tarefa",
            onDelete: "RESTRICT",
          },
          {
            columnNames: ["fk_usuario_responsavel"],
            referencedColumnNames: ["id_usuario"],
            referencedTableName: "usuarios",
            onDelete: "CASCADE",
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("tarefa");
  }
}
