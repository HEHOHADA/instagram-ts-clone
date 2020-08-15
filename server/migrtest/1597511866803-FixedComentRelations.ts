import {MigrationInterface, QueryRunner} from "typeorm";

export class FixedComentRelations1597511866803 implements MigrationInterface {
    name = 'FixedComentRelations1597511866803'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "likes" DROP CONSTRAINT "FK_dc259647b3273c835a40fe0a2ca"`);
        await queryRunner.query(`ALTER TABLE "comment" RENAME COLUMN "commentId" TO "id"`);
        await queryRunner.query(`ALTER TABLE "comment" RENAME CONSTRAINT "PK_bcf8e4e71fff5ad34b97d91bbe2" TO "PK_b4460b413891ea8b0ad274d90b9"`);
        await queryRunner.query(`ALTER TABLE "likes" DROP COLUMN "photoPhotoId"`);
        await queryRunner.query(`ALTER TABLE "photo" DROP CONSTRAINT "PK_2542768a00b49aac004c86d93f3"`);
        await queryRunner.query(`ALTER TABLE "photo" DROP COLUMN "photoId"`);
        await queryRunner.query(`ALTER TABLE "photo" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "photo" ADD CONSTRAINT "PK_723fa50bf70dcfd06fb5a44d4ff" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "photo" ADD "postText" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "pictureUrl" SET DEFAULT null`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_16688e4a4f41cb008e4d7934a4c"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "PK_b4460b413891ea8b0ad274d90b9"`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "likes" ADD CONSTRAINT "FK_e24989f445c2652f8ebc326667f" FOREIGN KEY ("photoId") REFERENCES "photo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_16688e4a4f41cb008e4d7934a4c" FOREIGN KEY ("photoId") REFERENCES "photo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_16688e4a4f41cb008e4d7934a4c"`);
        await queryRunner.query(`ALTER TABLE "likes" DROP CONSTRAINT "FK_e24989f445c2652f8ebc326667f"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2"`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "PK_b4460b413891ea8b0ad274d90b9" PRIMARY KEY ("photoId", "id")`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_16688e4a4f41cb008e4d7934a4c" FOREIGN KEY ("photoId") REFERENCES "photo"("photoId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "pictureUrl" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "photo" DROP COLUMN "postText"`);
        await queryRunner.query(`ALTER TABLE "photo" DROP CONSTRAINT "PK_723fa50bf70dcfd06fb5a44d4ff"`);
        await queryRunner.query(`ALTER TABLE "photo" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "photo" ADD "photoId" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "photo" ADD CONSTRAINT "PK_2542768a00b49aac004c86d93f3" PRIMARY KEY ("photoId")`);
        await queryRunner.query(`ALTER TABLE "likes" ADD "photoPhotoId" uuid`);
        await queryRunner.query(`ALTER TABLE "comment" RENAME CONSTRAINT "PK_b4460b413891ea8b0ad274d90b9" TO "PK_bcf8e4e71fff5ad34b97d91bbe2"`);
        await queryRunner.query(`ALTER TABLE "comment" RENAME COLUMN "id" TO "commentId"`);
        await queryRunner.query(`ALTER TABLE "likes" ADD CONSTRAINT "FK_dc259647b3273c835a40fe0a2ca" FOREIGN KEY ("photoPhotoId") REFERENCES "photo"("photoId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
