import { pgTable, serial, text, timestamp, integer, varchar, unique } from 'drizzle-orm/pg-core';
import { pgEnum } from 'drizzle-orm/pg-core';

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

export const AuthonUser = pgTable("auth_on_users", {
  id: serial('id').primaryKey(),
//   userId:integer("user_id").notNull().references(() => UsersTable.user_id, { onDelete :"cascade"}),
  password:varchar("password", {length:100}),
  username:varchar("username", {length:100}),
  address: varchar('address',{length:100}),
  fullname:text("full_name"),
  contact_Phone:integer("contact_phone"),
  role: roleEnum("role").default("user"),
  email:varchar("email", {length:100} )
});


// Posts table
export const posts = pgTable('posts', {
  id: serial('id').primaryKey(),
  authorId: integer('author_id').references(() => users.id),  // Foreign key to users table
  content: text('content').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

// Comments table
export const comments = pgTable('comments', {
  id: serial('id').primaryKey(),
  postId: integer('post_id').references(() => posts.id),  // Foreign key to posts table
  authorId: integer('author_id').references(() => users.id),  // Foreign key to users table
  content: text('content').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

// Follows table
export const follows = pgTable('follows', {
  id: serial('id').primaryKey(),
  followerId: integer('follower_id').references(() => users.id),  // Foreign key to users table
  followingId: integer('following_id').references(() => users.id),  // Foreign key to users table
  createdAt: timestamp('created_at').defaultNow(),
});

// Likes table
export const likes = pgTable('likes', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id),  // Foreign key to users table
  postId: integer('post_id').references(() => posts.id),  // Foreign key to posts table
  createdAt: timestamp('created_at').defaultNow(),
}, (table) => {
  return {
    uniqueLike: unique().on(table.userId, table.postId),
  };
});

// Tokens table (for user authentication)
export const tokens = pgTable('tokens', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id),  // Foreign key to users table
  password:varchar("password", {length:100}),
  username:varchar("username", {length:100}),
  address: varchar('address',{length:100}),
  fullname:text("full_name"),
  contact_Phone:integer("contact_phone"),
  role: roleEnum("role").default("user"),
  email:varchar("email", {length:100} ),

});

// Profiles table (additional profile details)
export const profiles = pgTable('profiles', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id),  // Foreign key to users table
  bio: text('bio'),
  avatarUrl: text('avatar_url'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().$onUpdateFn(() => new Date()),
});

// Messages table (for direct messaging)
export const messages = pgTable('messages', {
  id: serial('id').primaryKey(),
  senderId: integer('sender_id').references(() => users.id),  // Foreign key to sender (user)
  recipientId: integer('recipient_id').references(() => users.id),  // Foreign key to recipient (user)
  content: text('content').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

// Notifications table (for user notifications)
export const notifications = pgTable('notifications', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id),  // Foreign key to user receiving notification
  message: text('message').notNull(),
  isRead: integer('is_read').default(0),  // 0: unread, 1: read
  createdAt: timestamp('created_at').defaultNow(),
});

// Users table types
export type TIUser = typeof users.$inferInsert;
export type TSUser = typeof users.$inferSelect;

// Posts table types
export type TIPost = typeof posts.$inferInsert;
export type TSPost = typeof posts.$inferSelect;

// Comments table types
export type TIComment = typeof comments.$inferInsert;
export type TSComment = typeof comments.$inferSelect;

// Follows table types
export type TIFollow = typeof follows.$inferInsert;
export type TSFollow = typeof follows.$inferSelect;

// Likes table types
export type TILike = typeof likes.$inferInsert;
export type TSLike = typeof likes.$inferSelect;

// Tokens table types
export type TIToken = typeof tokens.$inferInsert;
export type TSToken = typeof tokens.$inferSelect;

// Profiles table types
export type TIProfile = typeof profiles.$inferInsert;
export type TSProfile = typeof profiles.$inferSelect;

// Messages table types
export type TIMessage = typeof messages.$inferInsert;
export type TSMessage = typeof messages.$inferSelect;

// Notifications table types
export type TINotification = typeof notifications.$inferInsert;
export type TSNotification = typeof notifications.$inferSelect;

// AuthonUser
export type TIAuthonUser = typeof AuthonUser.$inferInsert;
export type TSAuthonUser= typeof AuthonUser.$inferSelect;
 
