import { Education, Experience, Skill } from "@/types";
import { serial, pgTable, text, varchar, jsonb } from "drizzle-orm/pg-core";

export const ResumeTitle = pgTable("resume_title", {
    id: serial("id").primaryKey(),
    unicon_id: varchar("unicon_id").notNull(),
    title: text("title").notNull(),
    user: varchar("user").notNull(),
    email: varchar("email").notNull(),
    firstName: varchar("firstName"),
    lastName: varchar("lastName"),
    jobTitle: varchar("jobTitle"),
    address: varchar("address"),
    phone: varchar("phone"),
    res_email: varchar("res_email"),
    summery: text("summary"),
    experience: jsonb("experience").$type<Experience[]>(),
    education: jsonb("education").$type<Education[]>(),
    skills: jsonb("skills").$type<Skill[]>(),
})
