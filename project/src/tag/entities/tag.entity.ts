import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Experience } from '../../experience/entities/experience.entity';
import { TagAlias } from './tagAlias.entity';

@Entity()
export class Tag {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Experience, experience => experience.tags)
  @JoinTable()
  experiences: Experience[];

  @OneToMany(() => TagAlias, tagAlias => tagAlias.tag)
  @JoinTable()
  aliases: TagAlias[];
}

