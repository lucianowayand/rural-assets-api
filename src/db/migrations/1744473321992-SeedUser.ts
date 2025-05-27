import { MigrationInterface, QueryRunner } from 'typeorm';
import * as bcrypt from 'bcrypt';

export class SeedUser1744473321992 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const hash = await bcrypt.hash('minimal_nestjs', 8);

    await queryRunner.query(
      `insert into users (name, email, password) values ('User', 'user@email.com', '${hash}');`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `delete from users where email = 'user@email.com';`,
    );
  }
}
