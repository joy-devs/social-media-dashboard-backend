import { pgTable, serial, text, timestamp, integer, varchar, unique } from 'drizzle-orm/pg-core';
import { pgEnum } from 'drizzle-orm/pg-core';
import { relations } from "drizzle-orm";

// pgEnums
export const roleEnum = pgEnum("role", ["user", "admin"]);

// Users table
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  username: varchar('username', { length: 50 }).notNull().unique(),
  email: varchar('email', { length: 100 }).notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  profilePicture: text('profile_picture').default(''),
  bio: text('bio'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const authOnUser = pgTable("auth_on_users", {
  id: serial('id').primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  password: varchar("password", { length: 100 }),
  username: varchar("username", { length: 100 }),
  address: varchar('address', { length: 100 }),
  fullname: text("full_name"),
  contactPhone: integer("contact_phone"),
  role: roleEnum("role").default("user"),
  email: varchar("email", { length: 100 })
});

// Posts table
export const posts = pgTable('posts', {
  id: serial('id').primaryKey(),
  authorId: integer('author_id').notNull().references(() => users.id, { onDelete: "cascade" }),
  content: text('content').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

// Comments table
export const comments = pgTable('comments', {
  id: serial('id').primaryKey(),
  postId: integer('post_id').notNull().references(() => posts.id, { onDelete: "cascade" }),
  authorId: integer('author_id').notNull().references(() => users.id, { onDelete: "cascade" }),
  content: text('content').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

// Follows table
export const follows = pgTable('follows', {
  id: serial('id').primaryKey(),
  followerId: integer('follower_id').notNull().references(() => users.id, { onDelete: "cascade" }),
  followingId: integer('following_id').notNull().references(() => users.id, { onDelete: "cascade" }),
  createdAt: timestamp('created_at').defaultNow(),
});

// Likes table
export const likes = pgTable('likes', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull().references(() => users.id, { onDelete: "cascade" }),
  postId: integer('post_id').notNull().references(() => posts.id, { onDelete: "cascade" }),
  createdAt: timestamp('created_at').defaultNow(),
}, (table) => {
  return {
    uniqueLike: unique().on(table.userId, table.postId),
  };
});

// Tokens table (for user authentication)
export const tokens = pgTable('tokens', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull().references(() => users.id, { onDelete: "cascade" }),
  password: varchar("password", { length: 100 }),
  username: varchar("username", { length: 100 }),
  address: varchar('address', { length: 100 }),
  fullname: text("full_name"),
  contactPhone: integer("contact_phone"),
  role: roleEnum("role").default("user"),
  email: varchar("email", { length: 100 }),
});

// Profiles table (additional profile details)
export const profiles = pgTable('profiles', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull().references(() => users.id, { onDelete: "cascade" }),
  bio: text('bio'),
  avatarUrl: text('avatar_url'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().$onUpdateFn(() => new Date()),
});

// Messages table (for direct messaging)
export const messages = pgTable('messages', {
  id: serial('id').primaryKey(),
  senderId: integer('sender_id').notNull().references(() => users.id, { onDelete: "cascade" }),
  recipientId: integer('recipient_id').notNull().references(() => users.id, { onDelete: "cascade" }),
  content: text('content').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

// Notifications table (for user notifications)
export const notifications = pgTable('notifications', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull().references(() => users.id, { onDelete: "cascade" }),
  message: text('message').notNull(),
  isRead: integer('is_read').default(0),
  createdAt: timestamp('created_at').defaultNow(),
});

// Define Relationships using Drizzle's relations API
export const userRelations = relations(users, ({ one, many }) => ({
  authOnUser: one(authOnUser, {
    fields: [users.id],
    references: [authOnUser.userId]
  }),
  posts: many(posts),
  comments: many(comments),
  followsFollower: many(follows),
  followsFollowing: many(follows),
  likes: many(likes),
  tokens: many(tokens),
  profiles: one(profiles, {
    fields: [users.id],
    references: [profiles.userId]
  }),
  messagesSent: many(messages),
  messagesReceived: many(messages),
  notifications: many(notifications)
}));

export const postRelations = relations(posts, ({ many }) => ({
  comments: many(comments),
  likes: many(likes)
}));

//Types
export type TIFollow = typeof follows.$inferInsert;
export type TSFollow = typeof follows.$inferSelect;

export type TILike = typeof likes.$inferInsert;
export type TSLike = typeof likes.$inferSelect;

export type TIMessage = typeof messages.$inferInsert;
export type TSMessage = typeof messages.$inferSelect;

export type TIPost = typeof posts.$inferInsert;
export type TSPost = typeof posts.$inferSelect;

export type TIProfile = typeof profiles.$inferInsert;
export type TSProfile = typeof profiles.$inferSelect;

export type TIToken = typeof tokens.$inferInsert;
export type TSToken = typeof tokens.$inferSelect;

export type TIAuthonUser = typeof users.$inferInsert;
export type TSAuthonUser = typeof users.$inferSelect;

export type TIUser = typeof authOnUser.$inferInsert;
export type TSUser = typeof authOnUser.$inferSelect;




