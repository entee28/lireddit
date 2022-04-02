import { __prod__ } from "./constants";
import { Post } from "./entities/Post";
import { Options } from "@mikro-orm/core";
import path from "path";
import { User } from "./entities/User";

export default {
    migrations: {
        path: path.join(__dirname, './migrations'),
        pathTs: path.join(__dirname, './migrations'),
    },
    entities: [Post, User],
    dbName: 'lireddit',
    debug: !__prod__,
    type: 'postgresql',
    user: 'postgres',
    password: '200182',
    allowGlobalContext: true
} as Options