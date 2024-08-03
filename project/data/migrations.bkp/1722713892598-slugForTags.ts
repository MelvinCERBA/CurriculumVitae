import { MigrationInterface, QueryRunner } from "typeorm";
import slugify from "slugify";

export class SlugForTags1722713892598 implements MigrationInterface {
    name = 'SlugForTags1722713892598'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tag\` ADD \`slug\` varchar(255)`);

        const tags = await queryRunner.query(`SELECT \`id\`, \`name\` FROM \`tag\``);
        for (const tag of tags) {
            const slug = slugify(tag.name, { lower: true });
            await queryRunner.query(`UPDATE \`tag\` SET \`slug\` = ? WHERE \`id\` = ?`, [slug, tag.id]);
        }

        await queryRunner.query(`ALTER TABLE \`tag\` MODIFY \`slug\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`tag\` ADD UNIQUE INDEX \`IDX_3413aed3ecde54f832c4f44f04\` (\`slug\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tag\` DROP INDEX \`IDX_3413aed3ecde54f832c4f44f04\``);
        await queryRunner.query(`ALTER TABLE \`tag\` DROP COLUMN \`slug\``);
    }

}
