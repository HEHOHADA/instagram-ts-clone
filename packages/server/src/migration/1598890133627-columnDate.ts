import { MigrationInterface, QueryRunner } from 'typeorm'

export class columnDate1598890133627 implements MigrationInterface {
  name = 'columnDate1598890133627'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "likes" ALTER COLUMN "date" DROP DEFAULT`)
    await queryRunner.query(`ALTER TABLE "photo" ALTER COLUMN "date" DROP DEFAULT`)
    await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "pictureUrl" SET DEFAULT null`)
    await queryRunner.query(`ALTER TABLE "comment" ALTER COLUMN "date" DROP DEFAULT`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "comment" ALTER COLUMN "date" SET DEFAULT now()`)
    await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "pictureUrl" DROP DEFAULT`)
    await queryRunner.query(`ALTER TABLE "photo" ALTER COLUMN "date" SET DEFAULT now()`)
    await queryRunner.query(`ALTER TABLE "likes" ALTER COLUMN "date" SET DEFAULT now()`)
  }
}
