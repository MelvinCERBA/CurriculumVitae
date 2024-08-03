import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Experience } from '../../experience/entities/experience.entity';
import { TagCategory } from './tag-category.entity';

@Entity()
export class Tag {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @ManyToMany(() => Experience, experience => experience.tags)
  @JoinTable()
  experiences: Experience[];

  @OneToMany(() => Tag, tag => tag.aliasFor)
  aliases: Tag[];

  @ManyToOne(() => Tag, tag => tag.aliases)
  aliasFor: Tag;

  @ManyToOne(() => TagCategory, category => category.tags, { nullable: true })
  category: TagCategory;
}

