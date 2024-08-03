import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Tag } from "../../tag/entities/tag.entity";

@Entity()
export class Experience {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: true })
  picture_url: string

  @Column()
  title: string

  @Column()
  description: string

  @Column({ nullable: true })
  link: string

  @ManyToMany(type => Tag, tag => tag.experiences)
  @JoinTable({
    name: 'experience_tag',
    joinColumn: {
      name: 'experience_id',
      referencedColumnName: 'id'
    },
    inverseJoinColumn: {
      name: 'tag_id',
      referencedColumnName: 'id'
    }
  })
  tags: Tag[]
}
