import { Review, InsertReview } from "@shared/schema";

const STORAGE_KEY = "teacher_reviews";

export interface StoredReview extends Omit<Review, "timestamp"> {
    timestamp: string;
}

export class LocalStorageService {
    static getReviews(): StoredReview[] {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    }

    static addReview(review: InsertReview): StoredReview {
        const reviews = this.getReviews();
        // @ts-ignore
        const newReview: StoredReview = {
            ...review,
            id: Date.now(), // Simple ID generation
            timestamp: new Date().toISOString(),
        };

        reviews.push(newReview);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
        return newReview;
    }

    static getReviewsByTeacher(teacherId: number): StoredReview[] {
        return this.getReviews().filter(review => review.teacherId === teacherId);
    }

    static calculateAverageRating(teacherId: number): number {
        const reviews = this.getReviewsByTeacher(teacherId);
        if (reviews.length === 0) return 0;

        const sum = reviews.reduce((total, review) => total + review.rating, 0);
        return Math.round((sum / reviews.length) * 10) / 10;
    }

    static getRatingHistory(teacherId: number): number[] {
        const reviews = this.getReviewsByTeacher(teacherId);
        return reviews.map(review => review.rating).slice(-10);
    }
}
