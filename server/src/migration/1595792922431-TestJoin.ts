import {MigrationInterface, QueryRunner} from "typeorm";

export class TestJoin1595792922431 implements MigrationInterface {
    name = 'TestJoin1595792922431'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "pictureUrl" SET DEFAULT null`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "pictureUrl" DROP DEFAULT`);
    }

}
