import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreatePropertiesTable1748790712519 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'properties',
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
          {
            name: 'city',
            type: 'character varying',
            isNullable: false,
          },
          {
            name: 'state_short_name',
            type: 'character varying',
            isNullable: false,
          },
          {
            name: 'total_area',
            type: 'float',
            isNullable: false,
          },
          {
            name: 'farmable_area',
            type: 'float',
            isNullable: false,
          },
          {
            name: 'vegetation_area',
            type: 'float',
            isNullable: false,
          },
          {
            name: 'producer_id',
            type: 'uuid',
            isNullable: false,
          },
        ],
      }),
      true,
    );
    await queryRunner.createForeignKey(
      'properties',
      new TableForeignKey({
        columnNames: ['producer_id'],
        referencedTableName: 'producers',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
        name: 'FK_PROPERTY_PRODUCER',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('properties');
  }
}
