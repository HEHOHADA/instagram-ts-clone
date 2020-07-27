import {MigrationInterface, QueryRunner} from "typeorm";

export class addCOmmentId1595701256145 implements MigrationInterface {
    name = 'addCOmmentId1595701256145'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment" ADD "commentId" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "PK_16688e4a4f41cb008e4d7934a4c"`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "PK_bcf8e4e71fff5ad34b97d91bbe2" PRIMARY KEY ("photoId", "commentId")`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "pictureUrl" SET DEFAULT null`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "pictureUrl" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "PK_bcf8e4e71fff5ad34b97d91bbe2"`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "PK_16688e4a4f41cb008e4d7934a4c" PRIMARY KEY ("photoId")`);
        await queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "commentId"`);
    }

}
