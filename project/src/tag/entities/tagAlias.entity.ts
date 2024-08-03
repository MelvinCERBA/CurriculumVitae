import { Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Tag } from "./tag.entity";

@Entity()
export class TagAlias {
  @PrimaryColumn()
  alias: string;

  @ManyToOne(() => Tag, tag => tag.aliases)
  tag: Tag;
}
