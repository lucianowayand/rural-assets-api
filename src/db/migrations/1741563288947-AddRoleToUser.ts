import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRoleToUser1741563288947 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TYPE "role_enum" AS ENUM('USER', 'STAFF')`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD COLUMN "role" "role_enum" NOT NULL DEFAULT 'USER'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "role"`);
    await queryRunner.query(`DROP TYPE "role_enum"`);
  }
}
