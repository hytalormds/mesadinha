import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTransactionsTable1741746343254 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "carteira",
        columns: [
          {
            name: "id_carteira",
            type: "integer",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "saldo",
            type: "real",
            isNullable: false,
            default: "0",
          },
          {
            name: "fk_usuario_id",
            type: "integer",
            isNullable: false,
            isUnique: true,
          },
        ],
        foreignKeys: [
          {
            columnNames: ["fk_usuario_id"],
            referencedColumnNames: ["id_usuario"],
            referencedTableName: "usuarios",
            onDelete: "CASCADE",
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("carteira");
  }
}
