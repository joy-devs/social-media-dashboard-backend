import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { follows, TIFollow, TSFollow } from "../drizzle/schema";  

export const followersService = async (limit?: number): Promise<TSFollow[] | null> => {
    if (limit) {
        return await db.query.follows.findMany({
            limit: limit
        });
    }
    return await db.query.follows.findMany();
}

export const getfollowersService = async (id: number): Promise<TIFollow | undefined> => {
    return await db.query.follows.findFirst({
        where: eq(follows.id, id), 
        with:{
            follows:true
        }
    });
}

export const createfollowersService = async (follow: TIFollow): Promise<string> => {
    await db.insert(follows).values(follow);
    return "Follow created successfully";
}

export const updatefollowersService = async (id: number, follow: TIFollow): Promise<string> => {
    await db.update(follows).set(follow).where(eq(follows.id, id));
    return "Follow updated successfully";
}

export const deletefollowersService = async (id: number): Promise<string> => {
    await db.delete(follows).where(eq(follows.id, id));
    return "User deleted successfully";
}
