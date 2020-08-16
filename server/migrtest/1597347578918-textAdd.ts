import {MigrationInterface, QueryRunner} from "typeorm";

export class textAdd1597347578918 implements MigrationInterface {
    name = 'textAdd1597347578918'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "photo" ADD "postText" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "pictureUrl" SET DEFAULT null`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "pictureUrl" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "photo" DROP COLUMN "postText"`);
    }

}
