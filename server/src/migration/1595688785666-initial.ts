import {MigrationInterface, QueryRunner} from "typeorm";

export class initial1595688785666 implements MigrationInterface {
    name = 'initial1595688785666'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "likes" ("photoId" uuid NOT NULL, "likerId" uuid NOT NULL, "date" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(6), "photoPhotoId" uuid, "userId" uuid, CONSTRAINT "PK_e24989f445c2652f8ebc326667f" PRIMARY KEY ("photoId"))`);
        await queryRunner.query(`CREATE TABLE "photo" ("photoId" uuid NOT NULL DEFAULT uuid_generate_v4(), "pictureUrl" character varying NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "PK_2542768a00b49aac004c86d93f3" PRIMARY KEY ("photoId"))`);
        await queryRunner.query(`CREATE TABLE "follower" ("userId" uuid NOT NULL, "followerId" uuid NOT NULL, "date" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(6), CONSTRAINT "PK_6fe328c3c08b70a5c9c79348839" PRIMARY KEY ("userId"))`);
        await queryRunner.query(`CREATE TABLE "following" ("userId" uuid NOT NULL, "followingId" uuid NOT NULL, "date" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(6), CONSTRAINT "PK_fc4cbf2396bf4bb1df9ecb3cc4a" PRIMARY KEY ("userId"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "fullName" text NOT NULL, "email" text NOT NULL, "pictureUrl" character varying DEFAULT null, "password" character varying NOT NULL, "confirmed" boolean NOT NULL DEFAULT false, "forgotPasswordLocked" boolean NOT NULL DEFAULT false, "tokenVersion" text NOT NULL DEFAULT 0, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "comment" ("photoId" uuid NOT NULL, "comment" text NOT NULL, "userId" uuid NOT NULL, "date" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(6), "photoPhotoId" uuid, CONSTRAINT "PK_16688e4a4f41cb008e4d7934a4c" PRIMARY KEY ("photoId"))`);
        await queryRunner.query(`ALTER TABLE "likes" ADD CONSTRAINT "FK_dc259647b3273c835a40fe0a2ca" FOREIGN KEY ("photoPhotoId") REFERENCES "photo"("photoId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "likes" ADD CONSTRAINT "FK_cfd8e81fac09d7339a32e57d904" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "photo" ADD CONSTRAINT "FK_4494006ff358f754d07df5ccc87" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "follower" ADD CONSTRAINT "FK_b100536f62259b7aa3733175e53" FOREIGN KEY ("followerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "following" ADD CONSTRAINT "FK_80463ab7e0c3ed2868a59816af8" FOREIGN KEY ("followingId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_c0354a9a009d3bb45a08655ce3b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_8f4066a5d14c10b490464ec47bd" FOREIGN KEY ("photoPhotoId") REFERENCES "photo"("photoId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_8f4066a5d14c10b490464ec47bd"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_c0354a9a009d3bb45a08655ce3b"`);
        await queryRunner.query(`ALTER TABLE "following" DROP CONSTRAINT "FK_80463ab7e0c3ed2868a59816af8"`);
        await queryRunner.query(`ALTER TABLE "follower" DROP CONSTRAINT "FK_b100536f62259b7aa3733175e53"`);
        await queryRunner.query(`ALTER TABLE "photo" DROP CONSTRAINT "FK_4494006ff358f754d07df5ccc87"`);
        await queryRunner.query(`ALTER TABLE "likes" DROP CONSTRAINT "FK_cfd8e81fac09d7339a32e57d904"`);
        await queryRunner.query(`ALTER TABLE "likes" DROP CONSTRAINT "FK_dc259647b3273c835a40fe0a2ca"`);
        await queryRunner.query(`DROP TABLE "comment"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "following"`);
        await queryRunner.query(`DROP TABLE "follower"`);
        await queryRunner.query(`DROP TABLE "photo"`);
        await queryRunner.query(`DROP TABLE "likes"`);
    }

}
