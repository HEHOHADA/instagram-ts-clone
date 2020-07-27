import {MigrationInterface, QueryRunner} from "typeorm";

export class add1595681262992 implements MigrationInterface {
    name = 'add1595681262992'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "photo" RENAME COLUMN "photo_id" TO "photoId"`);
        await queryRunner.query(`ALTER TABLE "photo" RENAME CONSTRAINT "PK_609f86f84c7624f71090317c15e" TO "PK_2542768a00b49aac004c86d93f3"`);
        await queryRunner.query(`CREATE TABLE "comment" ("photoId" uuid NOT NULL, "comment" text NOT NULL, "userId" uuid NOT NULL, "date" date NOT NULL DEFAULT '"2020-07-25T12:47:46.772Z"', "photoPhotoId" uuid, CONSTRAINT "PK_16688e4a4f41cb008e4d7934a4c" PRIMARY KEY ("photoId"))`);
        await queryRunner.query(`ALTER TABLE "follower" DROP CONSTRAINT "FK_b100536f62259b7aa3733175e53"`);
        await queryRunner.query(`ALTER TABLE "follower" DROP CONSTRAINT "PK_b100536f62259b7aa3733175e53"`);
        await queryRunner.query(`ALTER TABLE "follower" ADD CONSTRAINT "PK_6fe328c3c08b70a5c9c79348839" PRIMARY KEY ("userId")`);
        await queryRunner.query(`ALTER TABLE "follower" ALTER COLUMN "date" SET DEFAULT '"2020-07-25T12:47:46.760Z"'`);
        await queryRunner.query(`ALTER TABLE "following" DROP CONSTRAINT "FK_80463ab7e0c3ed2868a59816af8"`);
        await queryRunner.query(`ALTER TABLE "following" DROP CONSTRAINT "PK_80463ab7e0c3ed2868a59816af8"`);
        await queryRunner.query(`ALTER TABLE "following" ADD CONSTRAINT "PK_fc4cbf2396bf4bb1df9ecb3cc4a" PRIMARY KEY ("userId")`);
        await queryRunner.query(`ALTER TABLE "following" ALTER COLUMN "date" SET DEFAULT '"2020-07-25T12:47:46.771Z"'`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "pictureUrl" SET DEFAULT null`);
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
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "pictureUrl" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "following" ALTER COLUMN "date" SET DEFAULT '2020-07-24'`);
        await queryRunner.query(`ALTER TABLE "following" DROP CONSTRAINT "PK_fc4cbf2396bf4bb1df9ecb3cc4a"`);
        await queryRunner.query(`ALTER TABLE "following" ADD CONSTRAINT "PK_80463ab7e0c3ed2868a59816af8" PRIMARY KEY ("followingId")`);
        await queryRunner.query(`ALTER TABLE "following" ADD CONSTRAINT "FK_80463ab7e0c3ed2868a59816af8" FOREIGN KEY ("followingId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "follower" ALTER COLUMN "date" SET DEFAULT '2020-07-24'`);
        await queryRunner.query(`ALTER TABLE "follower" DROP CONSTRAINT "PK_6fe328c3c08b70a5c9c79348839"`);
        await queryRunner.query(`ALTER TABLE "follower" ADD CONSTRAINT "PK_b100536f62259b7aa3733175e53" PRIMARY KEY ("followerId")`);
        await queryRunner.query(`ALTER TABLE "follower" ADD CONSTRAINT "FK_b100536f62259b7aa3733175e53" FOREIGN KEY ("followerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`DROP TABLE "comment"`);
        await queryRunner.query(`ALTER TABLE "photo" RENAME CONSTRAINT "PK_2542768a00b49aac004c86d93f3" TO "PK_609f86f84c7624f71090317c15e"`);
        await queryRunner.query(`ALTER TABLE "photo" RENAME COLUMN "photoId" TO "photo_id"`);
    }

}
