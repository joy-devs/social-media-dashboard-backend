import { tokens, users, TIToken, TSToken } from "../drizzle/schema";
import db from "../drizzle/db";
import { sql } from "drizzle-orm";
import { eq } from "drizzle-orm";


// Create new token for authentication
export const createAuthUserService = async (user: TIToken): Promise<string | null> => {
    await db.insert(tokens).values(user);
    return "User created successfully";
}

export const gettokensService = async (id: number): Promise<TIToken | undefined> => {
    return await db.query.tokens.findFirst({
        where: eq(tokens.id, id)
    });
}

export const createtokensService = async (authentication: TIToken): Promise<string> => {
    await db.insert(tokens).values(authentication);
    return "authentication created successfully";
}

export const updatetokensService = async (id: number, authentication: TIToken): Promise<string> => {
    await db.update(tokens).set(authentication).where(eq(tokens.id, id));
    return "authentication updated successfully";
}

export const deletetokensService = async (id: number): Promise<string> => {
    await db.delete(tokens).where(eq(tokens.id, id));
    return "authentication deleted successfully";
}


// User login service
export const userLoginService = async (user: TSToken) => {
    const { username, password } = user; // Adjust this if necessary for password hash comparison

    return await db.query.users.findFirst({
        columns: {
            id: true,
            username: true,
            email: true,
            passwordHash: true, // Check for hashed password
            bio: true,
        },
        where: sql`${users.username} = ${username}`, // Using the correct field from your schema
    });
};
