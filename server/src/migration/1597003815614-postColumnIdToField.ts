import {MigrationInterface, QueryRunner} from "typeorm";

export class postColumnIdToField1597003815614 implements MigrationInterface {
    name = 'postColumnIdToField1597003815614'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "pictureUrl" SET DEFAULT null`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "pictureUrl" DROP DEFAULT`);
    }

}
