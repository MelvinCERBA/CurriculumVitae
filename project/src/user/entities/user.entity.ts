import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Experience } from '../../experience/entities/experience.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true })
  description: string;

  @Column({ unique: true })
  email: string;

  @Column()
  passwordHash: string;

  @OneToMany(() => Experience, experience => experience.user)
  experiences: Experience[];
}
