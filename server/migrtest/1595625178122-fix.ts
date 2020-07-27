import {MigrationInterface, QueryRunner} from "typeorm";

export class fix1595625178122 implements MigrationInterface {
    name = 'fix1595625178122'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "following" DROP CONSTRAINT "PK_45428a713ee7d51def21b67ff20"`);
        await queryRunner.query(`ALTER TABLE "following" DROP COLUMN "following_id"`);
        await queryRunner.query(`ALTER TABLE "follower" DROP CONSTRAINT "PK_c39c716bcdda7f17adcfe4643ad"`);
        await queryRunner.query(`ALTER TABLE "follower" DROP COLUMN "follower_id"`);
        await queryRunner.query(`ALTER TABLE "following" DROP CONSTRAINT "FK_80463ab7e0c3ed2868a59816af8"`);
        await queryRunner.query(`ALTER TABLE "following" ALTER COLUMN "followingId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "following" ADD CONSTRAINT "PK_80463ab7e0c3ed2868a59816af8" PRIMARY KEY ("followingId")`);
        await queryRunner.query(`ALTER TABLE "following" ALTER COLUMN "date" SET DEFAULT '"2020-07-24T21:13:02.363Z"'`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "pictureUrl" SET DEFAULT null`);
        await queryRunner.query(`ALTER TABLE "follower" DROP CONSTRAINT "FK_b100536f62259b7aa3733175e53"`);
        await queryRunner.query(`ALTER TABLE "follower" ALTER COLUMN "followerId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "follower" ADD CONSTRAINT "PK_b100536f62259b7aa3733175e53" PRIMARY KEY ("followerId")`);
        await queryRunner.query(`ALTER TABLE "follower" ALTER COLUMN "date" SET DEFAULT '"2020-07-24T21:13:02.363Z"'`);
        await queryRunner.query(`ALTER TABLE "following" ADD CONSTRAINT "FK_80463ab7e0c3ed2868a59816af8" FOREIGN KEY ("followingId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "follower" ADD CONSTRAINT "FK_b100536f62259b7aa3733175e53" FOREIGN KEY ("followerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "follower" DROP CONSTRAINT "FK_b100536f62259b7aa3733175e53"`);
        await queryRunner.query(`ALTER TABLE "following" DROP CONSTRAINT "FK_80463ab7e0c3ed2868a59816af8"`);
        await queryRunner.query(`ALTER TABLE "follower" ALTER COLUMN "date" SET DEFAULT '2020-07-21'`);
        await queryRunner.query(`ALTER TABLE "follower" DROP CONSTRAINT "PK_b100536f62259b7aa3733175e53"`);
        await queryRunner.query(`ALTER TABLE "follower" ALTER COLUMN "followerId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "follower" ADD CONSTRAINT "FK_b100536f62259b7aa3733175e53" FOREIGN KEY ("followerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "pictureUrl" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "following" ALTER COLUMN "date" SET DEFAULT '2020-07-21'`);
        await queryRunner.query(`ALTER TABLE "following" DROP CONSTRAINT "PK_80463ab7e0c3ed2868a59816af8"`);
        await queryRunner.query(`ALTER TABLE "following" ALTER COLUMN "followingId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "following" ADD CONSTRAINT "FK_80463ab7e0c3ed2868a59816af8" FOREIGN KEY ("followingId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "follower" ADD "follower_id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "follower" ADD CONSTRAINT "PK_c39c716bcdda7f17adcfe4643ad" PRIMARY KEY ("follower_id")`);
        await queryRunner.query(`ALTER TABLE "following" ADD "following_id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "following" ADD CONSTRAINT "PK_45428a713ee7d51def21b67ff20" PRIMARY KEY ("following_id")`);
    }

}
