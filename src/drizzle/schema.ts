import { pgTable, serial, text, timestamp, integer, varchar, unique, foreignKey } from 'drizzle-orm/pg-core';

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

// Auth table
export const authOnUser = pgTable("auth_on_users", {
  id: serial('id').primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  password: varchar("password", { length: 100 }),
  username: varchar("username", { length: 100 }),
  address: varchar('address', { length: 100 }),
  fullname: text("full_name"),
  contactPhone: integer("contact_phone"),
  email: varchar("email", { length: 100 })
});

// Posts table
export const posts = pgTable('posts', {
  id: serial('id').primaryKey(),
  authorId: integer('author_id').notNull().references(() => users.id),
  content: text('content').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

// Comments table
export const comments = pgTable('comments', {
  id: serial('id').primaryKey(),
  postId: integer('post_id').notNull().references(() => posts.id),
  authorId: integer('author_id').notNull().references(() => users.id),
  content: text('content').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

// Follows table
export const follows = pgTable('follows', {
  id: serial('id').primaryKey(),
  followerId: integer('follower_id').notNull().references(() => users.id),
  followingId: integer('following_id').notNull().references(() => users.id),
  createdAt: timestamp('created_at').defaultNow(),
});

// Likes table
export const likes = pgTable('likes', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull().references(() => users.id),
  postId: integer('post_id').notNull().references(() => posts.id),
  createdAt: timestamp('created_at').defaultNow(),
}, (table) => {
  return {
    uniqueLike: unique().on(table.userId, table.postId),
  };
});

// Profiles table
export const profiles = pgTable('profiles', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull().references(() => users.id),
  bio: text('bio'),
  avatarUrl: text('avatar_url'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().$onUpdateFn(() => new Date()),
});

// Messages table
export const messages = pgTable('messages', {
  id: serial('id').primaryKey(),
  senderId: integer('sender_id').notNull().references(() => users.id),
  recipientId: integer('recipient_id').notNull().references(() => users.id),
  content: text('content').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

// Notifications table
export const notifications = pgTable('notifications', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull().references(() => users.id),
  message: text('message').notNull(),
  isRead: integer('is_read').default(0),
  createdAt: timestamp('created_at').defaultNow(),
});
