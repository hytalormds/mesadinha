import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
  TableIndex,
} from "typeorm";

export class CreateFamilyStructure1760000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "familia",
        columns: [
          {
            name: "id_familia",
            type: "integer",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          { name: "nome", type: "varchar", isNullable: false },
          {
            name: "codigo_convite",
            type: "varchar",
            isNullable: false,
            isUnique: true,
          },
          {
            name: "fk_usuario_responsavel",
            type: "integer",
            isNullable: false,
          },
        ],
        foreignKeys: [
          {
            columnNames: ["fk_usuario_responsavel"],
            referencedTableName: "usuarios",
            referencedColumnNames: ["id_usuario"],
            onDelete: "CASCADE",
          },
        ],
      }),
      true,
    );

    await queryRunner.createTable(
      new Table({
        name: "usuario_familia",
        columns: [
          {
            name: "id_usuario_familia",
            type: "integer",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          { name: "fk_usuario_id", type: "integer", isNullable: false },
          { name: "fk_familia_id", type: "integer", isNullable: false },
          { name: "papel", type: "varchar", isNullable: false },
        ],
        foreignKeys: [
          {
            columnNames: ["fk_usuario_id"],
            referencedTableName: "usuarios",
            referencedColumnNames: ["id_usuario"],
            onDelete: "CASCADE",
          },
          {
            columnNames: ["fk_familia_id"],
            referencedTableName: "familia",
            referencedColumnNames: ["id_familia"],
            onDelete: "CASCADE",
          },
        ],
      }),
      true,
    );

    // Estas colunas tornam a tarefa individual: familia, responsavel criador
    // e crianca que deve executar.
    await queryRunner.addColumns("tarefa", [
      new TableColumn({
        name: "fk_usuario_crianca",
        type: "integer",
        isNullable: true,
      }),
      new TableColumn({
        name: "fk_familia_id",
        type: "integer",
        isNullable: true,
      }),
    ]);

    await queryRunner.createForeignKeys("tarefa", [
      new TableForeignKey({
        columnNames: ["fk_usuario_crianca"],
        referencedTableName: "usuarios",
        referencedColumnNames: ["id_usuario"],
        onDelete: "CASCADE",
      }),
      new TableForeignKey({
        columnNames: ["fk_familia_id"],
        referencedTableName: "familia",
        referencedColumnNames: ["id_familia"],
        onDelete: "CASCADE",
      }),
    ]);

    await queryRunner.createIndices("usuario_familia", [
      new TableIndex({
        name: "idx_usuario_familia_usuario",
        columnNames: ["fk_usuario_id"],
      }),
      new TableIndex({
        name: "idx_usuario_familia_familia",
        columnNames: ["fk_familia_id"],
      }),
    ]);

    await queryRunner.createIndices("tarefa", [
      new TableIndex({
        name: "idx_tarefa_crianca",
        columnNames: ["fk_usuario_crianca"],
      }),
      new TableIndex({
        name: "idx_tarefa_familia",
        columnNames: ["fk_familia_id"],
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex("tarefa", "idx_tarefa_familia");
    await queryRunner.dropIndex("tarefa", "idx_tarefa_crianca");
    await queryRunner.dropIndex(
      "usuario_familia",
      "idx_usuario_familia_familia",
    );
    await queryRunner.dropIndex(
      "usuario_familia",
      "idx_usuario_familia_usuario",
    );

    const tarefa = await queryRunner.getTable("tarefa");
    const familyForeignKeys = tarefa?.foreignKeys.filter((foreignKey) =>
      ["fk_usuario_crianca", "fk_familia_id"].some((columnName) =>
        foreignKey.columnNames.includes(columnName),
      ),
    );

    if (familyForeignKeys?.length) {
      await queryRunner.dropForeignKeys("tarefa", familyForeignKeys);
    }

    await queryRunner.dropColumn("tarefa", "fk_familia_id");
    await queryRunner.dropColumn("tarefa", "fk_usuario_crianca");
    await queryRunner.dropTable("usuario_familia");
    await queryRunner.dropTable("familia");
  }
}
