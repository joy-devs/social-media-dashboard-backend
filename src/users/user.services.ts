import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { users, TIUser, TSUser } from "../drizzle/schema";

// Helper to exclude sensitive fields
const excludePasswordHash = (user: typeof users.$inferSelect): TSUser => {
  const { passwordHash, ...rest } = user;
  return rest;
};

// Fetch all users (excluding passwordHash)
export const usersService = async (limit?: number): Promise<TSUser[]> => {
  const rawUsers = await db.query.users.findMany({
    limit,
  });

  return rawUsers.map(excludePasswordHash);
};

// Fetch single user by ID (excluding passwordHash)
export const getusersService = async (id: number): Promise<TSUser | undefined> => {
  const user = await db.query.users.findFirst({
    where: eq(users.id, id),
  });

  if (!user) return undefined;

  return excludePasswordHash(user);
};

// Create user
export const createusersService = async (user: TIUser): Promise<string> => {
  // Ensure passwordHash is provided
  if (!user.passwordHash) {
    throw new Error("Missing passwordHash field");
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
