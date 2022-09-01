import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, ObjectType } from "type-graphql";

@ObjectType() // for the query in the PostResolver
@Entity()
export class Post {
  @Field() // for the query in the PostResolver
  @PrimaryKey()
  id!: number;

  @Field(() => String) // for the query in the PostResolver
  @Property({ type: "date", nullable: true })
  createdAt?: Date = new Date();

  @Field(() => String) // for the query in the PostResolver
  @Property({ type: "date", onUpdate: () => new Date(), nullable: true })
  updatedAt?: Date = new Date();

  @Field() // for the query in the PostResolver
  @Property({ type: "text" })
  title!: string;
}
