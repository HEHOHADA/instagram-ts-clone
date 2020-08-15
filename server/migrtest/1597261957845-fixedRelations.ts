import {MigrationInterface, QueryRunner} from "typeorm";

export class fixedRelations1597261957845 implements MigrationInterface {
    name = 'fixedRelations1597261957845'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_16688e4a4f41cb008e4d7934a4c"`);
        await queryRunner.query(`ALTER TABLE "comment" ADD "photoPhotoId" uuid`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "pictureUrl" SET DEFAULT null`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_8f4066a5d14c10b490464ec47bd" FOREIGN KEY ("photoPhotoId") REFERENCES "photo"("photoId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_8f4066a5d14c10b490464ec47bd"`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "pictureUrl" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "photoPhotoId"`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_16688e4a4f41cb008e4d7934a4c" FOREIGN KEY ("photoId") REFERENCES "photo"("photoId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
