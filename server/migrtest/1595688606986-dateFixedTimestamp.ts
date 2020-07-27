import {MigrationInterface, QueryRunner} from "typeorm";

export class dateFixedTimestamp1595688606986 implements MigrationInterface {
    name = 'dateFixedTimestamp1595688606986'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "likes" DROP COLUMN "date"`);
        await queryRunner.query(`ALTER TABLE "likes" ADD "date" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE "follower" DROP COLUMN "date"`);
        await queryRunner.query(`ALTER TABLE "follower" ADD "date" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE "following" DROP COLUMN "date"`);
        await queryRunner.query(`ALTER TABLE "following" ADD "date" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "pictureUrl" SET DEFAULT null`);
        await queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "date"`);
        await queryRunner.query(`ALTER TABLE "comment" ADD "date" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "date"`);
        await queryRunner.query(`ALTER TABLE "comment" ADD "date" date NOT NULL DEFAULT '2020-07-25'`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "pictureUrl" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "following" DROP COLUMN "date"`);
        await queryRunner.query(`ALTER TABLE "following" ADD "date" date NOT NULL DEFAULT '2020-07-25'`);
        await queryRunner.query(`ALTER TABLE "follower" DROP COLUMN "date"`);
        await queryRunner.query(`ALTER TABLE "follower" ADD "date" date NOT NULL DEFAULT '2020-07-25'`);
        await queryRunner.query(`ALTER TABLE "likes" DROP COLUMN "date"`);
        await queryRunner.query(`ALTER TABLE "likes" ADD "date" date NOT NULL DEFAULT '2020-07-25'`);
    }

}
