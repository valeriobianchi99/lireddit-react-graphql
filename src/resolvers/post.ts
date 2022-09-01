import { Post } from "../entities/Post";
import { MyContext } from "src/types";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";

// Manages the CRUD of the POST table in the postgresql lireddit DB 
@Resolver()
export class PostResolver {
  /*
    @Query() is for reading data
    @Mutation() is for writing data
    */

  @Query(() => [Post])
  posts(@Ctx() { em }: MyContext): Promise<Post[]> {
    // Context  @Ctx() passed in the ApolloServer constructor
    return em.find(Post, {});
  }

  // select by id
  @Query(() => Post, { nullable: true })
  post(
    @Arg("id") id: number, // 'id' passed to the @Arg() decorator will be the actual name of the parameter
    @Ctx() { em }: MyContext
  ): Promise<Post | null> {
    return em.findOne(Post, { id });
  }

  // Create post
  @Mutation(() => Post)
  async createPost(
    @Arg("title") title: string, // 'title' passed to the @Arg() decorator will be the actual name of the parameter
    @Ctx() { em }: MyContext
  ): Promise<Post> {
    const post = em.create(Post, {title});
    await em.persistAndFlush(post);
    return post;
  }

  // update post
  @Mutation(() => Post)
  async updatePost(
    @Arg("id") id: number,
    @Arg("title", () => String, { nullable: true }) title: string, // 'title' passed to the @Arg() decorator will be the actual name of the parameter
    @Ctx() { em }: MyContext
  ): Promise<Post | null> {
    const post = await em.findOne(Post, {id});
    if(!post){
        return null;
    }
    if(typeof title !== 'undefined') {
        post.title = title;
        await em.persistAndFlush(post);
    }
    return post;
  }

  // delete post
  @Mutation(() => Boolean)
  async deletePost(
    @Arg("id") id: number,
    @Ctx() { em }: MyContext
  ): Promise<boolean> {
    await em.nativeDelete(Post, { id })
    return true;
  }
}
