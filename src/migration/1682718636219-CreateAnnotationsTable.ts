import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAnnotationsTable1682718636219 implements MigrationInterface {
  name = 'CreateAnnotationsTable1682718636219';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`annotation\` (\`id\` int NOT NULL AUTO_INCREMENT, \`person_id\` int NOT NULL,\`title\` varchar(255) NOT NULL, \`description\` varchar(2000) NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`annotation\` ADD CONSTRAINT \`FK_60e7ee42cc421590dadfe0ca5cf\` FOREIGN KEY (\`person_id\`) REFERENCES \`person\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`annotation\` DROP FOREIGN KEY \`FK_60e7ee42cc421590dadfe0ca5cf\``,
    );
    await queryRunner.query(`DROP TABLE \`annotation\``);
  }
}
