import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertReviewSchema } from "@shared/schema";
import { seedDatabase } from "./seed";

export async function registerRoutes(app: Express): Promise<Server> {
    // Seed the database on startup
    await seedDatabase();

    // Get all universities
    app.get("/api/universities", async (req, res) => {
        try {
            const universities = await storage.getUniversities();
            res.json(universities);
        } catch (error) {
            res.status(500).json({ error: "Failed to fetch universities" });
        }
    });

    // Get faculties by university
    app.get("/api/universities/:id/faculties", async (req, res) => {
        try {
            const universityId = parseInt(req.params.id);
            const faculties = await storage.getFacultiesByUniversity(universityId);
            res.json(faculties);
        } catch (error) {
            res.status(500).json({ error: "Failed to fetch faculties" });
        }
    });

    // Get teachers by faculty
    app.get("/api/faculties/:id/teachers", async (req, res) => {
        try {
            const facultyId = parseInt(req.params.id);
            const teachers = await storage.getTeachersByFaculty(facultyId);
            res.json(teachers);
        } catch (error) {
            res.status(500).json({ error: "Failed to fetch teachers" });
        }
    });

    // Get reviews for a teacher
    app.get("/api/teachers/:id/reviews", async (req, res) => {
        try {
            const teacherId = parseInt(req.params.id);
            const reviews = await storage.getReviewsByTeacher(teacherId);
            res.json(reviews);
        } catch (error) {
            res.status(500).json({ error: "Failed to fetch reviews" });
        }
    });

    // Submit a review
    app.post("/api/reviews", async (req, res) => {
        try {
            const reviewData = insertReviewSchema.parse(req.body);
            const review = await storage.addReview(reviewData);
            res.json(review);
        } catch (error) {
            res.status(500).json({ error: "Failed to submit review" });
        }
    });

    const httpServer = createServer(app);

    return httpServer;
}
