import {MigrationInterface, QueryRunner} from "typeorm";

export class pictureFix1595365993029 implements MigrationInterface {
    name = 'pictureFix1595365993029'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "following" ALTER COLUMN "date" SET DEFAULT '"2020-07-21T21:13:16.567Z"'`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "fullName" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "pictureUrl" SET DEFAULT null`);
        await queryRunner.query(`ALTER TABLE "follower" ALTER COLUMN "date" SET DEFAULT '"2020-07-21T21:13:16.567Z"'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "follower" ALTER COLUMN "date" SET DEFAULT '2020-07-21'`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "pictureUrl" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "fullName" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "following" ALTER COLUMN "date" SET DEFAULT '2020-07-21'`);
    }

}
