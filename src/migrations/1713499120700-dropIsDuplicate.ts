import { MigrationInterface, QueryRunner } from "typeorm";

export class DropIsDuplicate1713499120700 implements MigrationInterface {
    name = 'DropIsDuplicate1713499120700'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`coffee\` DROP COLUMN \`isDuplicate\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`coffee\` ADD \`isDuplicate\` tinyint NOT NULL`);
    }

}
