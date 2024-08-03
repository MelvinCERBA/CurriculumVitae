import { MigrationInterface, QueryRunner } from "typeorm";

export class ExperienceTagTagAliases1722640816655 implements MigrationInterface {
    name = 'ExperienceTagTagAliases1722640816655'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`tag_alias\` (\`alias\` varchar(255) NOT NULL, \`tagId\` int NULL, PRIMARY KEY (\`alias\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tag\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`experience\` (\`id\` int NOT NULL AUTO_INCREMENT, \`picture_url\` varchar(255) NULL, \`title\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`link\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tag_experiences_experience\` (\`tagId\` int NOT NULL, \`experienceId\` int NOT NULL, INDEX \`IDX_998eb682283ca0714819cc7c62\` (\`tagId\`), INDEX \`IDX_773454efda16674ac295ae59d8\` (\`experienceId\`), PRIMARY KEY (\`tagId\`, \`experienceId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`experience_tag\` (\`experience_id\` int NOT NULL, \`tag_id\` int NOT NULL, INDEX \`IDX_4077499f6f6f4f43b8c94b28fc\` (\`experience_id\`), INDEX \`IDX_1b44e57647c78f9b4e03ed681b\` (\`tag_id\`), PRIMARY KEY (\`experience_id\`, \`tag_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`tag_alias\` ADD CONSTRAINT \`FK_c838531770328702eb9e630bf05\` FOREIGN KEY (\`tagId\`) REFERENCES \`tag\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tag_experiences_experience\` ADD CONSTRAINT \`FK_998eb682283ca0714819cc7c622\` FOREIGN KEY (\`tagId\`) REFERENCES \`tag\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`tag_experiences_experience\` ADD CONSTRAINT \`FK_773454efda16674ac295ae59d8e\` FOREIGN KEY (\`experienceId\`) REFERENCES \`experience\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`experience_tag\` ADD CONSTRAINT \`FK_4077499f6f6f4f43b8c94b28fcd\` FOREIGN KEY (\`experience_id\`) REFERENCES \`experience\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`experience_tag\` ADD CONSTRAINT \`FK_1b44e57647c78f9b4e03ed681be\` FOREIGN KEY (\`tag_id\`) REFERENCES \`tag\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`experience_tag\` DROP FOREIGN KEY \`FK_1b44e57647c78f9b4e03ed681be\``);
        await queryRunner.query(`ALTER TABLE \`experience_tag\` DROP FOREIGN KEY \`FK_4077499f6f6f4f43b8c94b28fcd\``);
        await queryRunner.query(`ALTER TABLE \`tag_experiences_experience\` DROP FOREIGN KEY \`FK_773454efda16674ac295ae59d8e\``);
        await queryRunner.query(`ALTER TABLE \`tag_experiences_experience\` DROP FOREIGN KEY \`FK_998eb682283ca0714819cc7c622\``);
        await queryRunner.query(`ALTER TABLE \`tag_alias\` DROP FOREIGN KEY \`FK_c838531770328702eb9e630bf05\``);
        await queryRunner.query(`DROP INDEX \`IDX_1b44e57647c78f9b4e03ed681b\` ON \`experience_tag\``);
        await queryRunner.query(`DROP INDEX \`IDX_4077499f6f6f4f43b8c94b28fc\` ON \`experience_tag\``);
        await queryRunner.query(`DROP TABLE \`experience_tag\``);
        await queryRunner.query(`DROP INDEX \`IDX_773454efda16674ac295ae59d8\` ON \`tag_experiences_experience\``);
        await queryRunner.query(`DROP INDEX \`IDX_998eb682283ca0714819cc7c62\` ON \`tag_experiences_experience\``);
        await queryRunner.query(`DROP TABLE \`tag_experiences_experience\``);
        await queryRunner.query(`DROP TABLE \`experience\``);
        await queryRunner.query(`DROP TABLE \`tag\``);
        await queryRunner.query(`DROP TABLE \`tag_alias\``);
    }

}
