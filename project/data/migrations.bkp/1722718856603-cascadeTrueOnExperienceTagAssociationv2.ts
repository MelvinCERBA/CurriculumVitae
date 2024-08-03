import { MigrationInterface, QueryRunner } from "typeorm";

export class CascadeTrueOnExperienceTagAssociationv21722718856603 implements MigrationInterface {
    name = 'CascadeTrueOnExperienceTagAssociationv21722718856603'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tag_experiences_experience\` DROP FOREIGN KEY \`FK_773454efda16674ac295ae59d8e\``);
        await queryRunner.query(`CREATE TABLE \`experience_tags_tag\` (\`experienceId\` int NOT NULL, \`tagId\` int NOT NULL, INDEX \`IDX_a7db19c4feaa4e9f0fdeb71f66\` (\`experienceId\`), INDEX \`IDX_a093b49b6516643c2fed2d8e2c\` (\`tagId\`), PRIMARY KEY (\`experienceId\`, \`tagId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`tag_experiences_experience\` ADD CONSTRAINT \`FK_773454efda16674ac295ae59d8e\` FOREIGN KEY (\`experienceId\`) REFERENCES \`experience\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`experience_tags_tag\` ADD CONSTRAINT \`FK_a7db19c4feaa4e9f0fdeb71f665\` FOREIGN KEY (\`experienceId\`) REFERENCES \`experience\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`experience_tags_tag\` ADD CONSTRAINT \`FK_a093b49b6516643c2fed2d8e2c6\` FOREIGN KEY (\`tagId\`) REFERENCES \`tag\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`experience_tags_tag\` DROP FOREIGN KEY \`FK_a093b49b6516643c2fed2d8e2c6\``);
        await queryRunner.query(`ALTER TABLE \`experience_tags_tag\` DROP FOREIGN KEY \`FK_a7db19c4feaa4e9f0fdeb71f665\``);
        await queryRunner.query(`ALTER TABLE \`tag_experiences_experience\` DROP FOREIGN KEY \`FK_773454efda16674ac295ae59d8e\``);
        await queryRunner.query(`DROP INDEX \`IDX_a093b49b6516643c2fed2d8e2c\` ON \`experience_tags_tag\``);
        await queryRunner.query(`DROP INDEX \`IDX_a7db19c4feaa4e9f0fdeb71f66\` ON \`experience_tags_tag\``);
        await queryRunner.query(`DROP TABLE \`experience_tags_tag\``);
        await queryRunner.query(`ALTER TABLE \`tag_experiences_experience\` ADD CONSTRAINT \`FK_773454efda16674ac295ae59d8e\` FOREIGN KEY (\`experienceId\`) REFERENCES \`experience\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
