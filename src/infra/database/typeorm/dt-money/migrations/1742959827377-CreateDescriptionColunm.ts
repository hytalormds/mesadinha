import { MigrationInterface, QueryRunner, Table, TableCheck } from "typeorm";

export class CreateDescriptionColunm1742959827377 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "movimentacao",
        columns: [
          {
            name: "id_movimentacao",
            type: "integer",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "tipo_movimentacao",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "data",
            type: "datetime",
            isNullable: false,
            default: "CURRENT_TIMESTAMP",
          },
          {
            name: "valor",
            type: "real",
            isNullable: false,
          },
          {
            name: "fk_tarefa_id",
            type: "integer",
            isNullable: true,
          },
          {
            name: "fk_carteira_id",
            type: "integer",
            isNullable: false,
          },
        ],
        foreignKeys: [
          {
            columnNames: ["fk_tarefa_id"],
            referencedColumnNames: ["id_tarefa"],
            referencedTableName: "tarefa",
            onDelete: "SET NULL",
          },
          {
            columnNames: ["fk_carteira_id"],
            referencedColumnNames: ["id_carteira"],
            referencedTableName: "carteira",
            onDelete: "CASCADE",
          },
        ],
        checks: [
          new TableCheck({
            name: "chk_tipo_movimentacao",
            expression: "tipo_movimentacao IN ('entrada', 'saida')",
          }),
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("movimentacao");
  }
}
