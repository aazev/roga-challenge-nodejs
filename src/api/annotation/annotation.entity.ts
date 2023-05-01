import { Person } from '@api/person/person.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Annotation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => Person, (person) => person.annotations, {
    nullable: false,
  })
  @JoinColumn({ name: 'person_id' })
  person: Person;

  @Column({ length: 255 })
  title: string;

  @Column({ length: 2000, default: null })
  description?: string;

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt!: Date;
}
