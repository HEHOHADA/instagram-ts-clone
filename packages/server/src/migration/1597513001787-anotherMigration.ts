import {MigrationInterface, QueryRunner} from "typeorm";

export class anotherMigration1597513001787 implements MigrationInterface {
    name = 'anotherMigration1597513001787'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "likes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "photoId" uuid NOT NULL, "userId" uuid NOT NULL, "date" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(6), CONSTRAINT "PK_a9323de3f8bced7539a794b4a37" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "photo" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "date" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(6), "pictureUrl" character varying NOT NULL, "postText" character varying, "userId" uuid NOT NULL, CONSTRAINT "PK_723fa50bf70dcfd06fb5a44d4ff" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "fullName" text NOT NULL, "email" text NOT NULL, "username" text NOT NULL, "pictureUrl" character varying DEFAULT null, "password" character varying NOT NULL, "confirmed" boolean NOT NULL DEFAULT false, "forgotPasswordLocked" boolean NOT NULL DEFAULT false, "tokenVersion" text NOT NULL DEFAULT 0, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "comment" ("photoId" uuid NOT NULL, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "commentText" text NOT NULL, "userId" uuid NOT NULL, "date" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(6), CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_followers_user" ("userId_1" uuid NOT NULL, "userId_2" uuid NOT NULL, CONSTRAINT "PK_980ff03f415077df184596dcf73" PRIMARY KEY ("userId_1", "userId_2"))`);
        await queryRunner.query(`CREATE INDEX "IDX_26312a1e34901011fc6f63545e" ON "user_followers_user" ("userId_1") `);
        await queryRunner.query(`CREATE INDEX "IDX_110f993e5e9213a7a44f172b26" ON "user_followers_user" ("userId_2") `);
        await queryRunner.query(`ALTER TABLE "likes" ADD CONSTRAINT "FK_e24989f445c2652f8ebc326667f" FOREIGN KEY ("photoId") REFERENCES "photo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "likes" ADD CONSTRAINT "FK_cfd8e81fac09d7339a32e57d904" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "photo" ADD CONSTRAINT "FK_4494006ff358f754d07df5ccc87" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_c0354a9a009d3bb45a08655ce3b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_16688e4a4f41cb008e4d7934a4c" FOREIGN KEY ("photoId") REFERENCES "photo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_followers_user" ADD CONSTRAINT "FK_26312a1e34901011fc6f63545e2" FOREIGN KEY ("userId_1") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_followers_user" ADD CONSTRAINT "FK_110f993e5e9213a7a44f172b264" FOREIGN KEY ("userId_2") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_followers_user" DROP CONSTRAINT "FK_110f993e5e9213a7a44f172b264"`);
        await queryRunner.query(`ALTER TABLE "user_followers_user" DROP CONSTRAINT "FK_26312a1e34901011fc6f63545e2"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_16688e4a4f41cb008e4d7934a4c"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_c0354a9a009d3bb45a08655ce3b"`);
        await queryRunner.query(`ALTER TABLE "photo" DROP CONSTRAINT "FK_4494006ff358f754d07df5ccc87"`);
        await queryRunner.query(`ALTER TABLE "likes" DROP CONSTRAINT "FK_cfd8e81fac09d7339a32e57d904"`);
        await queryRunner.query(`ALTER TABLE "likes" DROP CONSTRAINT "FK_e24989f445c2652f8ebc326667f"`);
        await queryRunner.query(`DROP INDEX "IDX_110f993e5e9213a7a44f172b26"`);
        await queryRunner.query(`DROP INDEX "IDX_26312a1e34901011fc6f63545e"`);
        await queryRunner.query(`DROP TABLE "user_followers_user"`);
        await queryRunner.query(`DROP TABLE "comment"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "photo"`);
        await queryRunner.query(`DROP TABLE "likes"`);
    }

}
