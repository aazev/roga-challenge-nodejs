import { ApiProperty } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity()
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  name: string;

  @Column()
  @ApiProperty()
  email: string;

  @Column({ select: false })
  @ApiProperty()
  password: string;

  @Column()
  @ApiProperty()
  api_token: string;

  @CreateDateColumn({ type: 'timestamp' })
  @ApiProperty()
  public createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  @ApiProperty()
  public updatedAt!: Date;

  @DeleteDateColumn({ type: 'timestamp', default: null })
  @ApiProperty()
  public deletedAt?: Date;

  @BeforeInsert()
  generateApiToken() {
    this.api_token = uuidv4();
  }

  @BeforeInsert()
  async hashPasswordBeforeInsert() {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }
}
