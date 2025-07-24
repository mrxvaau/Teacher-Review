import { University, Faculty, Teacher, Review } from "@shared/schema";

export const universities: University[] = [
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
    },
    {
        id: 4,
        name: "IUB",
        fullName: "Independent University Bangladesh",
        type: "private",
        enabled: false,
    },
];

export const faculties: Faculty[] = [
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
    },
    {
        id: 4,
        name: "FEST",
        fullName: "Faculty of Engineering Science and Technology",
        universityId: 1,
        color: "orange",
        icon: "flask",
    },
];

export const teachers: Teacher[] = [
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
    },
    {
        id: 4,
        name: "Mr. Rashid Hassan",
        subject: "Psychology",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400",
        facultyId: 2,
        averageRating: 68,
        totalRatings: 15,
    },
    {
        id: 5,
        name: "Dr. Aminul Islam",
        subject: "Computer Science",
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400",
        facultyId: 3,
        averageRating: 89,
        totalRatings: 42,
    },
    {
        id: 6,
        name: "Ms. Nadia Sultana",
        subject: "Software Engineering",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400",
        facultyId: 3,
        averageRating: 76,
        totalRatings: 27,
    },
    {
        id: 7,
        name: "Dr. Karim Uddin",
        subject: "Electrical Engineering",
        image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400",
        facultyId: 4,
        averageRating: 83,
        totalRatings: 33,
    },
    {
        id: 8,
        name: "Prof. Sultana Begum",
        subject: "Civil Engineering",
        image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400",
        facultyId: 4,
        averageRating: 79,
        totalRatings: 21,
    },
];

export const mockReviews: Review[] = [
    // Sample reviews for each teacher
    { id: 1, teacherId: 1, rating: 8, comment: "Great teacher, very clear explanations", timestamp: new Date() },
    { id: 2, teacherId: 1, rating: 9, comment: "Excellent teaching style", timestamp: new Date() },
    { id: 3, teacherId: 1, rating: 7, comment: "Good but could be more engaging", timestamp: new Date() },
    { id: 4, teacherId: 2, rating: 7, comment: "Knowledgeable but strict", timestamp: new Date() },
    { id: 5, teacherId: 2, rating: 8, comment: "Helpful during office hours", timestamp: new Date() },
    { id: 6, teacherId: 3, rating: 9, comment: "Amazing professor!", timestamp: new Date() },
    { id: 7, teacherId: 3, rating: 10, comment: "Best teacher I've had", timestamp: new Date() },
    { id: 8, teacherId: 4, rating: 6, comment: "Decent teacher", timestamp: new Date() },
    { id: 9, teacherId: 5, rating: 9, comment: "Very helpful and patient", timestamp: new Date() },
    { id: 10, teacherId: 5, rating: 8, comment: "Great programming instructor", timestamp: new Date() },
];

// Generate rating history for each teacher
export const generateRatingHistory = (teacherId: number): number[] => {
    const ratings = mockReviews.filter(review => review.teacherId === teacherId).map(review => review.rating);
    // Add some additional mock ratings for demonstration
    const additionalRatings = [8, 9, 7, 8, 9, 8, 7, 9, 8, 8];
    return [...ratings, ...additionalRatings].slice(0, 10);
};
