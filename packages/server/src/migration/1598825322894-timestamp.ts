import { MigrationInterface, QueryRunner } from 'typeorm'

export class timestamp1598825322894 implements MigrationInterface {
  name = 'timestamp1598825322894'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "pictureUrl" SET DEFAULT null`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "pictureUrl" DROP DEFAULT`)
  }
}
