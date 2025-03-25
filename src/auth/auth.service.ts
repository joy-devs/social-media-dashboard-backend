import { authOnUser, TIAuthonUser, TSAuthonUser } from "../drizzle/schema";
import db from "../drizzle/db";
import { sql } from "drizzle-orm";

export const createAuthUserService = async (user: TIAuthonUser): Promise<string | null> => {
    await db.insert(authOnUser).values(user)
    return "User created successfully";
}

export const userLoginService = async (user: TSAuthonUser) => {
    const { username, password } = user;
    return await db.query.authOnUser.findFirst({
        columns: {
            username: true,
            role: true,
            id: true,
            password: true,
            // id:true,
            // userId:true
            
        }, where: sql` ${authOnUser.username} = ${username}`,
        // with: {
        //     user: {
        //         columns: {
        //             user_id:true,
        //             full_name:true,
        //             email:true,
        //             contact_phone: true,
        //             address:true,
        //             role:true

        //         }
        //     }
        // }
    })
}