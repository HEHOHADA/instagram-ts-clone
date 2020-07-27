import {MigrationInterface, QueryRunner} from "typeorm";

export class initial1595365550268 implements MigrationInterface {
    name = 'initial1595365550268'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "likes" ("photoId" uuid NOT NULL, "likerId" uuid NOT NULL, "date" date NOT NULL, "photoPhotoId" uuid, "userId" uuid, CONSTRAINT "PK_e24989f445c2652f8ebc326667f" PRIMARY KEY ("photoId"))`);
        await queryRunner.query(`CREATE TABLE "photo" ("photo_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "pictureUrl" character varying NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "PK_609f86f84c7624f71090317c15e" PRIMARY KEY ("photo_id"))`);
        await queryRunner.query(`CREATE TABLE "following" ("following_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid NOT NULL, "date" date NOT NULL DEFAULT '"2020-07-21T21:05:53.821Z"', "followingId" uuid, CONSTRAINT "PK_45428a713ee7d51def21b67ff20" PRIMARY KEY ("following_id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "fullName" text, "email" text NOT NULL, "pictureUrl" character varying, "password" character varying NOT NULL, "confirmed" boolean NOT NULL DEFAULT false, "forgotPasswordLocked" boolean NOT NULL DEFAULT false, "tokenVersion" text NOT NULL DEFAULT 0, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "follower" ("follower_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid NOT NULL, "date" date NOT NULL DEFAULT '"2020-07-21T21:05:53.822Z"', "followerId" uuid, CONSTRAINT "PK_c39c716bcdda7f17adcfe4643ad" PRIMARY KEY ("follower_id"))`);
        await queryRunner.query(`ALTER TABLE "likes" ADD CONSTRAINT "FK_dc259647b3273c835a40fe0a2ca" FOREIGN KEY ("photoPhotoId") REFERENCES "photo"("photo_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "likes" ADD CONSTRAINT "FK_cfd8e81fac09d7339a32e57d904" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "photo" ADD CONSTRAINT "FK_4494006ff358f754d07df5ccc87" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "following" ADD CONSTRAINT "FK_80463ab7e0c3ed2868a59816af8" FOREIGN KEY ("followingId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "follower" ADD CONSTRAINT "FK_b100536f62259b7aa3733175e53" FOREIGN KEY ("followerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "follower" DROP CONSTRAINT "FK_b100536f62259b7aa3733175e53"`);
        await queryRunner.query(`ALTER TABLE "following" DROP CONSTRAINT "FK_80463ab7e0c3ed2868a59816af8"`);
        await queryRunner.query(`ALTER TABLE "photo" DROP CONSTRAINT "FK_4494006ff358f754d07df5ccc87"`);
        await queryRunner.query(`ALTER TABLE "likes" DROP CONSTRAINT "FK_cfd8e81fac09d7339a32e57d904"`);
        await queryRunner.query(`ALTER TABLE "likes" DROP CONSTRAINT "FK_dc259647b3273c835a40fe0a2ca"`);
        await queryRunner.query(`DROP TABLE "follower"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "following"`);
        await queryRunner.query(`DROP TABLE "photo"`);
        await queryRunner.query(`DROP TABLE "likes"`);
    }

}
