import { Annotation } from '@api/annotation/annotation.entity';
import { Cep } from '@api/cep/cep.class';
import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty()
  id: number;

  @Column({ length: 255 })
  @ApiProperty()
  name: string;

  @Column({ length: 255 })
  @ApiProperty()
  mothers_name: string;

  @Column({ length: 255 })
  @ApiProperty()
  fathers_name: string;

  @Column({ length: 8 })
  @ApiProperty()
  cep: string;

  @Column({ type: 'date' })
  @ApiProperty()
  birth_date: Date;

  @OneToMany(() => Annotation, (annotation) => annotation.person)
  @ApiProperty()
  annotations: Annotation[];

  @CreateDateColumn({ type: 'timestamp' })
  @ApiProperty()
  public createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  @ApiProperty()
  public updatedAt!: Date;

  address?: Cep;
}
