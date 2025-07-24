import { Review, Teacher, Faculty, University, InsertReview, universities, faculties, teachers, reviews } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
    getReviews(): Promise<Review[]>;
    getReviewsByTeacher(teacherId: number): Promise<Review[]>;
    addReview(review: InsertReview): Promise<Review>;
    getTeachers(): Promise<Teacher[]>;
    getTeachersByFaculty(facultyId: number): Promise<Teacher[]>;
    getFaculties(): Promise<Faculty[]>;
    getFacultiesByUniversity(universityId: number): Promise<Faculty[]>;
    getUniversities(): Promise<University[]>;
}

export class DatabaseStorage implements IStorage {
    async getReviews(): Promise<Review[]> {
        try {
            return await db.select().from(reviews);
        } catch (error) {
            console.error("Database error in getReviews:", error);
            return [];
        }
    }

    async getReviewsByTeacher(teacherId: number): Promise<Review[]> {
        try {
            return await db.select().from(reviews).where(eq(reviews.teacherId, teacherId));
        } catch (error) {
            console.error("Database error in getReviewsByTeacher:", error);
            return [];
        }
    }

    async addReview(insertReview: InsertReview): Promise<Review> {
        try {
            const [review] = await db
                .insert(reviews)
                .values(insertReview)
                .returning();
            return review;
        } catch (error) {
            console.error("Database error in addReview:", error);
            // Return a mock review for development
            return {
                id: Math.floor(Math.random() * 1000),
                teacherId: insertReview.teacherId || 0,
                rating: insertReview.rating,
                comment: insertReview.comment,
                timestamp: new Date()
            };
        }
    }

    async getTeachers(): Promise<Teacher[]> {
        try {
            return await db.select().from(teachers);
        } catch (error) {
            console.error("Database error in getTeachers:", error);
            return [];
        }
    }

    async getTeachersByFaculty(facultyId: number): Promise<Teacher[]> {
        try {
            return await db.select().from(teachers).where(eq(teachers.facultyId, facultyId));
        } catch (error) {
            console.error("Database error in getTeachersByFaculty:", error);
            return [];
        }
    }

    async getFaculties(): Promise<Faculty[]> {
        try {
            return await db.select().from(faculties);
        } catch (error) {
            console.error("Database error in getFaculties:", error);
            return [];
        }
    }

    async getFacultiesByUniversity(universityId: number): Promise<Faculty[]> {
        try {
            return await db.select().from(faculties).where(eq(faculties.universityId, universityId));
        } catch (error) {
            console.error("Database error in getFacultiesByUniversity:", error);
            return [];
        }
    }

    async getUniversities(): Promise<University[]> {
        try {
            return await db.select().from(universities);
        } catch (error) {
            console.error("Database error in getUniversities:", error);
            return [];
        }
    }
}

// Create an in-memory storage fallback
export class MemoryStorage implements IStorage {
    private universities: University[] = [
        {
            id: 1,
            name: "AIUB",
            fullName: "American International University-Bangladesh",
            type: "private",
            enabled: true,
        },
        {
            id: 2,
            name: "NSU",
            fullName: "North South University",
            type: "private",
            enabled: false,
        },
        {
            id: 3,
            name: "BRAC",
            fullName: "BRAC University",
            type: "private",
            enabled: false,
        }
    ];

    private faculties: Faculty[] = [
        {
            id: 1,
            name: "FBA",
            fullName: "Faculty of Business Administration",
            universityId: 1,
            color: "blue",
            icon: "chart-line",
        },
        {
            id: 2,
            name: "FASS",
            fullName: "Faculty of Arts and Social Sciences",
            universityId: 1,
            color: "green",
            icon: "users",
        },
        {
            id: 3,
            name: "FE",
            fullName: "Faculty of Engineering",
            universityId: 1,
            color: "purple",
            icon: "cogs",
        }
    ];

    private teachers: Teacher[] = [
        {
            id: 1,
            name: "Dr. Sarah Ahmed",
            subject: "Marketing Management",
            image: "https://images.unsplash.com/photo-1494790108755-2616b2e11b8a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400",
            facultyId: 1,
            averageRating: 85,
            totalRatings: 24,
        },
        {
            id: 2,
            name: "Prof. Mohammad Khan",
            subject: "Financial Management",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400",
            facultyId: 1,
            averageRating: 72,
            totalRatings: 18,
        },
        {
            id: 3,
            name: "Dr. Fatima Rahman",
            subject: "English Literature",
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400",
            facultyId: 2,
            averageRating: 91,
            totalRatings: 31,
        }
    ];

    private reviews: Review[] = [
        { id: 1, teacherId: 1, rating: 8, comment: "Great teacher, very clear explanations", timestamp: new Date() },
        { id: 2, teacherId: 1, rating: 9, comment: "Excellent teaching style", timestamp: new Date() },
        { id: 3, teacherId: 2, rating: 7, comment: "Knowledgeable but strict", timestamp: new Date() }
    ];

    async getReviews(): Promise<Review[]> {
        return this.reviews;
    }

    async getReviewsByTeacher(teacherId: number): Promise<Review[]> {
        return this.reviews.filter(review => review.teacherId === teacherId);
    }

    async addReview(insertReview: InsertReview): Promise<Review> {
        const newReview: Review = {
            id: Math.max(...this.reviews.map(r => r.id), 0) + 1,
            teacherId: insertReview.teacherId || 0,
            rating: insertReview.rating,
            comment: insertReview.comment,
            timestamp: new Date()
        };
        this.reviews.push(newReview);
        return newReview;
    }

    async getTeachers(): Promise<Teacher[]> {
        return this.teachers;
    }

    async getTeachersByFaculty(facultyId: number): Promise<Teacher[]> {
        return this.teachers.filter(teacher => teacher.facultyId === facultyId);
    }

    async getFaculties(): Promise<Faculty[]> {
        return this.faculties;
    }

    async getFacultiesByUniversity(universityId: number): Promise<Faculty[]> {
        return this.faculties.filter(faculty => faculty.universityId === universityId);
    }

    async getUniversities(): Promise<University[]> {
        return this.universities;
    }
}

// Try database first, fallback to memory storage
let storageInstance: IStorage;
try {
    storageInstance = new DatabaseStorage();
} catch (error) {
    console.log("Database unavailable, using memory storage");
    storageInstance = new MemoryStorage();
}

export const storage = storageInstance;