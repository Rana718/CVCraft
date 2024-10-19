import { serial, pgTable, text, varchar } from "drizzle-orm/pg-core";

export const ResumeTitle = pgTable("resume_title", {
    id: serial("id").primaryKey(),
    unicon_id: varchar("unicon_id").notNull(),
    title: text("title").notNull(),
    user: varchar("user").notNull(),
    email: varchar("email").notNull(),
})