import { MigrationInterface, QueryRunner } from "typeorm";

export class OnDeleteCascade1722720046629 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`experience_tags_tag\` DROP FOREIGN KEY \`FK_a093b49b6516643c2fed2d8e2c6\``);
        await queryRunner.query(`ALTER TABLE \`experience_tags_tag\` ADD CONSTRAINT \`FK_a093b49b6516643c2fed2d8e2c6\` FOREIGN KEY (\`tagId\`) REFERENCES \`tag\`(\`id\`) ON DELETE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`experience_tags_tag\` DROP FOREIGN KEY \`FK_a093b49b6516643c2fed2d8e2c6\``);
        await queryRunner.query(`ALTER TABLE \`experience_tags_tag\` ADD CONSTRAINT \`FK_a093b49b6516643c2fed2d8e2c6\` FOREIGN KEY (\`tagId\`) REFERENCES \`tag\`(\`id\`) ON DELETE NO ACTION`);
    }

}
