import { Annotation } from '@api/annotation/annotation.entity';
import { Cep } from '@api/cep/cep.class';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Person {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 255 })
  mothers_name: string;

  @Column({ length: 255 })
  fathers_name: string;

  @Column({ length: 8 })
  cep: string;

  @Column({ type: 'date' })
  birth_date: Date;

  @OneToMany((type) => Annotation, (annotation) => annotation.person)
  annotations: Annotation[];

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt!: Date;

  address?: Cep;
}
