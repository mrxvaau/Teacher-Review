import {
    pgTable,
    text,
    serial,
    integer,
    boolean,
    timestamp,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const universities = pgTable("universities", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    fullName: text("full_name").notNull(),
    type: text("type").notNull(), // 'public' or 'private'
    enabled: boolean("enabled").default(false),
});

export const faculties = pgTable("faculties", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    fullName: text("full_name").notNull(),
    universityId: integer("university_id").references(() => universities.id),
    color: text("color").notNull(),
    icon: text("icon").notNull(),
});

export const teachers = pgTable("teachers", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    subject: text("subject").notNull(),
    image: text("image").notNull(),
    facultyId: integer("faculty_id").references(() => faculties.id),
    averageRating: integer("average_rating").default(0),
    totalRatings: integer("total_ratings").default(0),
});

export const reviews = pgTable("reviews", {
    id: serial("id").primaryKey(),
    teacherId: integer("teacher_id").references(() => teachers.id),
    rating: integer("rating").notNull(),
    comment: text("comment").notNull(),
    timestamp: timestamp("timestamp").defaultNow(),
});

export const insertUniversitySchema = createInsertSchema(universities);
export const insertFacultySchema = createInsertSchema(faculties);
export const insertTeacherSchema = createInsertSchema(teachers);
export const insertReviewSchema = createInsertSchema(reviews).omit({
    id: true,
    timestamp: true,
});

export type University = typeof universities.$inferSelect;
export type Faculty = typeof faculties.$inferSelect;
export type Teacher = typeof teachers.$inferSelect;
export type Review = typeof reviews.$inferSelect;
export type InsertReview = z.infer<typeof insertReviewSchema>;
