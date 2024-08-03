import { MigrationInterface, QueryRunner } from "typeorm";

export class IdOnTagAliases1722675557956 implements MigrationInterface {
    name = 'IdOnTagAliases1722675557956'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tag_alias\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`tag_alias\` ADD \`id\` int NOT NULL AUTO_INCREMENT PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`tag_alias\` ADD UNIQUE INDEX \`IDX_0a2645c3c25c1c33adf89a4dc1\` (\`alias\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tag_alias\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`tag_alias\` DROP INDEX \`IDX_0a2645c3c25c1c33adf89a4dc1\``);
        await queryRunner.query(`ALTER TABLE \`tag_alias\` ADD PRIMARY KEY (\`alias\`)`);
        await queryRunner.query(`ALTER TABLE \`tag_alias\` DROP COLUMN \`id\``);
    }

}
