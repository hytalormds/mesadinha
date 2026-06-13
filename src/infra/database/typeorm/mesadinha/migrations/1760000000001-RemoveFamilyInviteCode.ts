import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class RemoveFamilyInviteCode1760000000001
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    const familia = await queryRunner.getTable("familia");
    const hasInviteCode = familia?.findColumnByName("codigo_convite");

    if (hasInviteCode) {
      await queryRunner.dropColumn("familia", "codigo_convite");
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const familia = await queryRunner.getTable("familia");
    const hasInviteCode = familia?.findColumnByName("codigo_convite");

    if (familia && !hasInviteCode) {
      await queryRunner.addColumn(
        "familia",
        new TableColumn({
          name: "codigo_convite",
          type: "varchar",
          isNullable: true,
          isUnique: true,
        }),
      );
    }
  }
}
