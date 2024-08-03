import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Experience } from '../../experience/entities/experience.entity';
import { Tag } from './tag.entity';
import { IsNumber } from 'class-validator';

@Entity()
export class TagCategory {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => Tag, tag => tag.category)
  tags: Tag[];

  @IsNumber()
  priority: number
}

