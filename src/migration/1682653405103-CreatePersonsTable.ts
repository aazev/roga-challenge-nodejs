import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePersonsTable1682653405103 implements MigrationInterface {
    name = 'CreatePersonsTable1682653405103'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`person\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`mothers_name\` varchar(255) NOT NULL, \`fathers_name\` varchar(255) NOT NULL, \`cep\` varchar(8) NOT NULL, \`birth_date\` date NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`person\``);
    }

}
