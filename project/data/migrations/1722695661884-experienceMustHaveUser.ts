import { MigrationInterface, QueryRunner } from "typeorm";

export class ExperienceMustHaveUser1722695661884 implements MigrationInterface {
    name = 'ExperienceMustHaveUser1722695661884'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM \`experience\` `);
        await queryRunner.query(`ALTER TABLE \`experience\` CHANGE \`userId\` \`userId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`experience\` ADD CONSTRAINT \`FK_cbfb1d1219454c9b45f1b3c4274\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`experience\` DROP FOREIGN KEY \`FK_cbfb1d1219454c9b45f1b3c4274\``);
        await queryRunner.query(`ALTER TABLE \`experience\` CHANGE \`userId\` \`userId\` int NULL`);
    }

}
