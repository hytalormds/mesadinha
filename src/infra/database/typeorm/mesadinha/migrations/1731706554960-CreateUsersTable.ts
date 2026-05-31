import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsersTable1731706554960 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "tipo_usuario",
        columns: [
          {
            name: "id_tipo",
            type: "integer",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "descricao",
            type: "varchar",
            isNullable: false,
            isUnique: true,
          },
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: "usuarios",
        columns: [
          {
            name: "id_usuario",
            type: "integer",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "nome",
            type: "varchar(50)",
            isNullable: false,
          },
          {
            name: "email",
            type: "varchar",
            isNullable: false,
            isUnique: true,
          },
          {
            name: "senha",
            type: "varchar",
            isNullable: false,
          },
          {
            name: "id_tipo",
            type: "integer",
            isNullable: false,
          },
        ],
        foreignKeys: [
          {
            columnNames: ["id_tipo"],
            referencedTableName: "tipo_usuario",
            referencedColumnNames: ["id_tipo"],
            onDelete: "RESTRICT",
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("usuarios");
    await queryRunner.dropTable("tipo_usuario");
  }
}
