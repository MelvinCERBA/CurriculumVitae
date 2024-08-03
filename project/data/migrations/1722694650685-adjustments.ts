import { MigrationInterface, QueryRunner } from "typeorm";

export class Adjustments1722694650685 implements MigrationInterface {
    name = 'Adjustments1722694650685'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`tag_category\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_f48a9fe1f705a7c2a60856d395\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`experience\` DROP COLUMN \`picture_url\``);
        await queryRunner.query(`ALTER TABLE \`tag\` ADD \`aliasForId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`tag\` ADD \`categoryId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`experience\` ADD \`pictureUrl\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`experience\` ADD \`userId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`tag\` ADD UNIQUE INDEX \`IDX_6a9775008add570dc3e5a0bab7\` (\`name\`)`);
        await queryRunner.query(`ALTER TABLE \`tag\` ADD CONSTRAINT \`FK_9aad79080e4340bfc3f0d08f6bf\` FOREIGN KEY (\`aliasForId\`) REFERENCES \`tag\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tag\` ADD CONSTRAINT \`FK_60fbdce32f9ca3b5afce15a9c32\` FOREIGN KEY (\`categoryId\`) REFERENCES \`tag_category\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`experience\` ADD CONSTRAINT \`FK_cbfb1d1219454c9b45f1b3c4274\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`experience\` DROP FOREIGN KEY \`FK_cbfb1d1219454c9b45f1b3c4274\``);
        await queryRunner.query(`ALTER TABLE \`tag\` DROP FOREIGN KEY \`FK_60fbdce32f9ca3b5afce15a9c32\``);
        await queryRunner.query(`ALTER TABLE \`tag\` DROP FOREIGN KEY \`FK_9aad79080e4340bfc3f0d08f6bf\``);
        await queryRunner.query(`ALTER TABLE \`tag\` DROP INDEX \`IDX_6a9775008add570dc3e5a0bab7\``);
        await queryRunner.query(`ALTER TABLE \`experience\` DROP COLUMN \`userId\``);
        await queryRunner.query(`ALTER TABLE \`experience\` DROP COLUMN \`pictureUrl\``);
        await queryRunner.query(`ALTER TABLE \`tag\` DROP COLUMN \`categoryId\``);
        await queryRunner.query(`ALTER TABLE \`tag\` DROP COLUMN \`aliasForId\``);
        await queryRunner.query(`ALTER TABLE \`experience\` ADD \`picture_url\` varchar(255) NULL`);
        await queryRunner.query(`DROP INDEX \`IDX_f48a9fe1f705a7c2a60856d395\` ON \`tag_category\``);
        await queryRunner.query(`DROP TABLE \`tag_category\``);
    }

}
