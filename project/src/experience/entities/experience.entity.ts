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

  @ManyToMany(type => Tag, tag => tag.experiences, { onDelete: 'CASCADE', cascade: true })
  @JoinTable()
  tags: Tag[]

  @ManyToOne(() => User, user => user.experiences, { nullable: false, onDelete: 'CASCADE' })
  user: User;
}
