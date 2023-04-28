import * as bcrypt from 'bcrypt';
import { MigrationInterface, QueryRunner } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

export class SeedUser1682720770042 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const salt = await bcrypt.genSalt();
    await queryRunner.query(`INSERT into user (name, email, password, api_token)
      VALUES
      ('Naruto Uzumaki', 'ramenlover@konohamail.com', '${await bcrypt.hash(
        'IamHokage1234',
        salt,
      )}', '${uuidv4()}'),
      ('Tony Stark', 'ironman@starkindustries.net', '${await bcrypt.hash(
        'IAmIronMan2023',
        salt,
      )}', '${uuidv4()}'),
      ('Pikachu Pokemon', 'pika.pika@pokepost.com', '${await bcrypt.hash(
        'Thunderbolt789',
        salt,
      )}', '${uuidv4()}');`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM user;`);
  }
}
