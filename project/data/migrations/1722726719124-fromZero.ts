import { MigrationInterface, QueryRunner } from "typeorm";

export class FromZero1722726719124 implements MigrationInterface {
    name = 'FromZero1722726719124'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`tag_category\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_f48a9fe1f705a7c2a60856d395\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tag\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`slug\` varchar(255) NOT NULL, \`priority\` int NOT NULL DEFAULT '1', \`aliasForId\` int NULL, \`categoryId\` int NULL, UNIQUE INDEX \`IDX_6a9775008add570dc3e5a0bab7\` (\`name\`), UNIQUE INDEX \`IDX_3413aed3ecde54f832c4f44f04\` (\`slug\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`firstName\` varchar(255) NOT NULL, \`lastName\` varchar(255) NOT NULL, \`description\` varchar(255) NULL, \`email\` varchar(255) NOT NULL, \`passwordHash\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`experience\` (\`id\` int NOT NULL AUTO_INCREMENT, \`pictureUrl\` varchar(255) NULL, \`title\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`link\` varchar(255) NULL, \`userId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`experience_tags_tag\` (\`experienceId\` int NOT NULL, \`tagId\` int NOT NULL, INDEX \`IDX_a7db19c4feaa4e9f0fdeb71f66\` (\`experienceId\`), INDEX \`IDX_a093b49b6516643c2fed2d8e2c\` (\`tagId\`), PRIMARY KEY (\`experienceId\`, \`tagId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`tag\` ADD CONSTRAINT \`FK_9aad79080e4340bfc3f0d08f6bf\` FOREIGN KEY (\`aliasForId\`) REFERENCES \`tag\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tag\` ADD CONSTRAINT \`FK_60fbdce32f9ca3b5afce15a9c32\` FOREIGN KEY (\`categoryId\`) REFERENCES \`tag_category\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`experience\` ADD CONSTRAINT \`FK_cbfb1d1219454c9b45f1b3c4274\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`experience_tags_tag\` ADD CONSTRAINT \`FK_a7db19c4feaa4e9f0fdeb71f665\` FOREIGN KEY (\`experienceId\`) REFERENCES \`experience\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`experience_tags_tag\` ADD CONSTRAINT \`FK_a093b49b6516643c2fed2d8e2c6\` FOREIGN KEY (\`tagId\`) REFERENCES \`tag\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`experience_tags_tag\` DROP FOREIGN KEY \`FK_a093b49b6516643c2fed2d8e2c6\``);
        await queryRunner.query(`ALTER TABLE \`experience_tags_tag\` DROP FOREIGN KEY \`FK_a7db19c4feaa4e9f0fdeb71f665\``);
        await queryRunner.query(`ALTER TABLE \`experience\` DROP FOREIGN KEY \`FK_cbfb1d1219454c9b45f1b3c4274\``);
        await queryRunner.query(`ALTER TABLE \`tag\` DROP FOREIGN KEY \`FK_60fbdce32f9ca3b5afce15a9c32\``);
        await queryRunner.query(`ALTER TABLE \`tag\` DROP FOREIGN KEY \`FK_9aad79080e4340bfc3f0d08f6bf\``);
        await queryRunner.query(`DROP INDEX \`IDX_a093b49b6516643c2fed2d8e2c\` ON \`experience_tags_tag\``);
        await queryRunner.query(`DROP INDEX \`IDX_a7db19c4feaa4e9f0fdeb71f66\` ON \`experience_tags_tag\``);
        await queryRunner.query(`DROP TABLE \`experience_tags_tag\``);
        await queryRunner.query(`DROP TABLE \`experience\``);
        await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP INDEX \`IDX_3413aed3ecde54f832c4f44f04\` ON \`tag\``);
        await queryRunner.query(`DROP INDEX \`IDX_6a9775008add570dc3e5a0bab7\` ON \`tag\``);
        await queryRunner.query(`DROP TABLE \`tag\``);
        await queryRunner.query(`DROP INDEX \`IDX_f48a9fe1f705a7c2a60856d395\` ON \`tag_category\``);
        await queryRunner.query(`DROP TABLE \`tag_category\``);
    }

}
