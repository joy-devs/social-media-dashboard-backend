import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { users } from "../drizzle/schema";

// Types
export type TIUser = typeof users.$inferInsert; // For create/update (includes passwordHash)
export type TSUser = Omit<typeof users.$inferSelect, "passwordHash">; // For return (exclude passwordHash)

// Helper to exclude passwordHash from result
const excludePasswordHash = (user: typeof users.$inferSelect): TSUser => {
  const { passwordHash, ...rest } = user;
  return rest;
};

// Fetch all users
export const usersService = async (limit?: number): Promise<TSUser[]> => {
  const rawUsers = await db.query.users.findMany({ limit });
  return rawUsers.map(excludePasswordHash);
};

// Fetch single user by ID
export const getusersService = async (id: number): Promise<TSUser | undefined> => {
  const user = await db.query.users.findFirst({ where: eq(users.id, id) });
  return user ? excludePasswordHash(user) : undefined;
};

// Create new user
export const createusersService = async (user: TIUser): Promise<string> => {
  // passwordHash must be provided
  if (!user.passwordHash) {
    throw new Error("passwordHash is required");
  }

  await db.insert(users).values(user);
  return "User created successfully";
};

// Update user
export const updateusersService = async (id: number, user: Partial<TIUser>): Promise<string> => {
  await db.update(users).set(user).where(eq(users.id, id));
  return "User updated successfully";
};

// Delete user
export const deleteusersService = async (id: number): Promise<string> => {
  await db.delete(users).where(eq(users.id, id));
  return "User deleted successfully";
};
