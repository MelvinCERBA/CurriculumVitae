import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Tag } from "../../tag/entities/tag.entity";
import { User } from "../../user/entities/user.entity";

@Entity()
export class Experience {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: true })
  pictureUrl: string

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

  @ManyToOne(() => User, user => user.experiences, { nullable: false })
  user: User;
}
