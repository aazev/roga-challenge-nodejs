import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedPersons1682721036417 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`INSERT INTO person (name, fathers_name, mothers_name, cep, birth_date)
VALUES 
('Luffy D Monkey', 'Dragon D Monkey', 'Unknown', '01311000', '1996-05-05'),
('Frodo Baggins', 'Drogo Baggins', 'Primula Brandybuck', '20031050', '1980-09-22'),
('Totoro', 'Hayao Miyazaki', 'Studio Ghibli', '40140130', '1988-04-16'),
('Goku Son', 'Bardock', 'Gine', '60060170', '1986-04-18'),
('Harry Potter', 'James Potter', 'Lily Potter', '60175055', '1980-07-31');`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM Person;`);
  }
}
