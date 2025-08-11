import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  userType: text("user_type").notNull().default("individual"), // individual, driving_school
  subscriptionPlan: text("subscription_plan").default("individual"), // individual, basic, premium
  subscriptionStatus: text("subscription_status").default("active"), // active, inactive, cancelled
  createdAt: timestamp("created_at").defaultNow(),
});

export const dtlcCenters = pgTable("dtlc_centers", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  location: text("location").notNull(),
  province: text("province").notNull(),
  available: boolean("available").default(false),
  lastUpdated: timestamp("last_updated").defaultNow(),
});

export const userCenters = pgTable("user_centers", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id).notNull(),
  centerId: varchar("center_id").references(() => dtlcCenters.id).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const notifications = pgTable("notifications", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id).notNull(),
  centerId: varchar("center_id").references(() => dtlcCenters.id).notNull(),
  message: text("message").notNull(),
  read: boolean("read").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const notificationStats = pgTable("notification_stats", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  totalSent: integer("total_sent").default(0),
  lastUpdated: timestamp("last_updated").defaultNow(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

export const insertDtlcCenterSchema = createInsertSchema(dtlcCenters).omit({
  id: true,
  lastUpdated: true,
});

export const insertUserCenterSchema = createInsertSchema(userCenters).omit({
  id: true,
  createdAt: true,
});

export const insertNotificationSchema = createInsertSchema(notifications).omit({
  id: true,
  createdAt: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type DtlcCenter = typeof dtlcCenters.$inferSelect;
export type InsertDtlcCenter = z.infer<typeof insertDtlcCenterSchema>;
export type UserCenter = typeof userCenters.$inferSelect;
export type InsertUserCenter = z.infer<typeof insertUserCenterSchema>;
export type Notification = typeof notifications.$inferSelect;
export type InsertNotification = z.infer<typeof insertNotificationSchema>;
export type NotificationStats = typeof notificationStats.$inferSelect;

// Auth schemas
export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const registerSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  userType: z.enum(["individual", "driving_school"]).default("individual"),
});

export type LoginData = z.infer<typeof loginSchema>;
export type RegisterData = z.infer<typeof registerSchema>;
