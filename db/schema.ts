import {
  boolean,
  int,
  mysqlTable,
  mysqlEnum,
  serial,
  bigint,
  varchar,
  text,
  timestamp,
} from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: serial("id").primaryKey(),
  unionId: varchar("unionId", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 320 }),
  avatar: text("avatar"),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
  lastSignInAt: timestamp("lastSignInAt").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// TODO: Add your tables here. See docs/Database.md for schema examples and patterns.
//
// Example:
// export const posts = mysqlTable("posts", {
//   id: serial("id").primaryKey(),
//   title: varchar("title", { length: 255 }).notNull(),
//   content: text("content"),
//   createdAt: timestamp("created_at").notNull().defaultNow(),
// });
//
// Note: FK columns referencing a serial() PK must use:
//   bigint("columnName", { mode: "number", unsigned: true }).notNull()

export const titles = mysqlTable("titles", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  title: varchar("title", { length: 255 }).notNull(),
  subtitle: varchar("subtitle", { length: 255 }),
  type: mysqlEnum("type", ["ebook", "artikel", "leseprobe"]).notNull(),
  premium: boolean("premium").notNull().default(false),
  excerpt: text("excerpt"),
  author: varchar("author", { length: 255 }).notNull(),
  route: varchar("route", { length: 255 }).notNull(),
  coverImage: varchar("coverImage", { length: 255 }),
  publishedAt: timestamp("publishedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Title = typeof titles.$inferSelect;
export type InsertTitle = typeof titles.$inferInsert;

export const entitlements = mysqlTable("entitlements", {
  id: serial("id").primaryKey(),
  userId: bigint("user_id", { mode: "number", unsigned: true })
    .notNull()
    .references(() => users.id),
  titleId: bigint("title_id", { mode: "number", unsigned: true })
    .notNull()
    .references(() => titles.id),
  source: varchar("source", { length: 50 }).notNull().default("kauf"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Entitlement = typeof entitlements.$inferSelect;
export type InsertEntitlement = typeof entitlements.$inferInsert;

export const purchases = mysqlTable("purchases", {
  id: serial("id").primaryKey(),
  userId: bigint("userId", { mode: "number", unsigned: true }),
  email: varchar("email", { length: 320 }),
  tier: mysqlEnum("tier", ["einmal", "monat", "jahr"]).notNull(),
  stripeSessionId: varchar("stripeSessionId", { length: 255 }),
  amount: int("amount"),
  currency: varchar("currency", { length: 8 }).default("chf"),
  status: mysqlEnum("status", ["bezahlt", "storniert", "erstattet"])
    .default("bezahlt")
    .notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Purchase = typeof purchases.$inferSelect;
export type InsertPurchase = typeof purchases.$inferInsert;
