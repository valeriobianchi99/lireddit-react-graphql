import { Query, Resolver } from "type-graphql";

@Resolver()
export class HelloResolver {
    @Query(() => String)
    hello() {
        return "hello world"
    }

    // called in graphql by { hello } that returns { data: { hello: 'hello world' }}
}