import { MigrationInterface, QueryRunner } from "typeorm";

export class IndexOnTagSlug1722720689409 implements MigrationInterface {
    name = 'IndexOnTagSlug1722720689409'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_3413aed3ecde54f832c4f44f04\` ON \`tag\``);
        await queryRunner.query(`ALTER TABLE \`tag\` ADD UNIQUE INDEX \`IDX_3413aed3ecde54f832c4f44f04\` (\`slug\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tag\` DROP INDEX \`IDX_3413aed3ecde54f832c4f44f04\``);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_3413aed3ecde54f832c4f44f04\` ON \`tag\` (\`slug\`)`);
    }

}
