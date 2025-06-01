import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedCropsAndSeasons1748794449564 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Seed crops
    await queryRunner.query(`
      INSERT INTO crops (id, name, created_at, updated_at) VALUES
        (uuid_generate_v4(), 'Soja', now(), now()),
        (uuid_generate_v4(), 'Milho', now(), now()),
        (uuid_generate_v4(), 'Algodão', now(), now()),
        (uuid_generate_v4(), 'Cana-de-açúcar', now(), now()),
        (uuid_generate_v4(), 'Café', now(), now()),
        (uuid_generate_v4(), 'Feijão', now(), now()),
        (uuid_generate_v4(), 'Trigo', now(), now()),
        (uuid_generate_v4(), 'Arroz', now(), now());
    `);

    // Seed seasons
    await queryRunner.query(`
      INSERT INTO seasons (id, reference_year, created_at, updated_at) VALUES
        (uuid_generate_v4(), 2022, now(), now()),
        (uuid_generate_v4(), 2023, now(), now()),
        (uuid_generate_v4(), 2024, now(), now());
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM crops WHERE name IN ('Soja', 'Milho', 'Algodão', 'Cana-de-açúcar', 'Café', 'Feijão', 'Trigo', 'Arroz');`);
    await queryRunner.query(`DELETE FROM seasons WHERE reference_year IN (2022, 2023, 2024);`);
  }
}
