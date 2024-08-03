import { Column, Entity, Index, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Experience } from '../../experience/entities/experience.entity';
import { TagCategory } from './tag-category.entity';

@Entity()
export class Tag {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ unique: true })
  @Index()
  slug: string;

  @ManyToMany(() => Experience, experience => experience.tags)
  experiences: Experience[];

  @OneToMany(() => Tag, tag => tag.aliasFor)
  aliases: Tag[];

  @ManyToOne(() => Tag, tag => tag.aliases)
  aliasFor: Tag;

  @ManyToOne(() => TagCategory, category => category.tags, { nullable: true })
  category: TagCategory;

  @Column({ default: 1 })
  priority: number;
}

