import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateCropsSeasonsAndSeasonHarvests1748794180808 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Crops table
    await queryRunner.createTable(
      new Table({
        name: 'crops',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'deleted_at',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'name',
            type: 'character varying',
            isNullable: false,
          },
        ],
      }),
      true,
    );

    // Seasons table
    await queryRunner.createTable(
      new Table({
        name: 'seasons',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'deleted_at',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'reference_year',
            type: 'int',
            isNullable: false,
          },
        ],
      }),
      true,
    );

    // Season Harvests table
    await queryRunner.createTable(
      new Table({
        name: 'season_harvests',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'deleted_at',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'property_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'crop_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'season_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'area',
            type: 'float',
            isNullable: false,
          },
        ],
      }),
      true,
    );

    // Foreign keys for season_harvests
    await queryRunner.createForeignKey(
      'season_harvests',
      new TableForeignKey({
        columnNames: ['property_id'],
        referencedTableName: 'properties',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
        name: 'FK_SEASONHARVEST_PROPERTY',
      }),
    );
    await queryRunner.createForeignKey(
      'season_harvests',
      new TableForeignKey({
        columnNames: ['crop_id'],
        referencedTableName: 'crops',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
        name: 'FK_SEASONHARVEST_CROP',
      }),
    );
    await queryRunner.createForeignKey(
      'season_harvests',
      new TableForeignKey({
        columnNames: ['season_id'],
        referencedTableName: 'seasons',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
        name: 'FK_SEASONHARVEST_SEASON',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('season_harvests');
    await queryRunner.dropTable('seasons');
    await queryRunner.dropTable('crops');
  }
}
