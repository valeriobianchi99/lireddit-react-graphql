import { __prod__ } from "./constants";
import { Post } from "./entities/Post";
import { MikroORM } from "@mikro-orm/core";
import path from "path";
import { User } from "./entities/User";

export default {
    dbName: 'lireddit',
    user: 'postgres',
    password: 'vale6651',
    debug: !__prod__,
    type: 'postgresql',
    entities: [Post, User],
    migrations: {
        path: path.join(__dirname, './migrations'), // path to the folder with migrations
        glob: '!(*.d).{js,ts}', // how to match migration files (all .js and .ts files, but not .d.ts)
    }
} as Parameters<typeof MikroORM.init>[0];
// Type of the first paramete of MikroORM.init() function
