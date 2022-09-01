import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class User {
  @Field()
  @PrimaryKey()
  id!: number;

  @Field(() => String)
  @Property({ type: "date", nullable: true })
  createdAt?: Date = new Date();

  @Field(() => String)
  @Property({ type: "date", onUpdate: () => new Date(), nullable: true })
  updatedAt?: Date = new Date();

  @Field()
  @Property({ type: "text", unique: true })
  username!: string;

  // @Field() commented -> not allowing to select the password in queries
  @Property({ type: "text"})
  password?: string;
}
