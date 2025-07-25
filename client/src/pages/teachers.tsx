import { useState } from "react";
import { GraduationCap, Star, StarHalf } from "lucide-react";
import { useLocation } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Breadcrumb } from "@/components/breadcrumb";
import { RatingSlider } from "@/components/rating-slider";
import { RatingHistory } from "@/components/rating-history";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Teacher, Faculty, University, Review } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function Teachers() {
    const [location] = useLocation();
    const { toast } = useToast();
    const queryClient = useQueryClient();
    const facultyId = parseInt(location.split("/")[2]);

    const [ratings, setRatings] = useState<{ [key: number]: number }>({});
    const [comments, setComments] = useState<{ [key: number]: string }>({});

    const { data: universities } = useQuery<University[]>({
        queryKey: ["/api/universities"],
    });

    const { data: faculties } = useQuery<Faculty[]>({
        queryKey: ["/api/universities", "faculties"],
    });

    const { data: facultyTeachers, isLoading } = useQuery<Teacher[]>({
        queryKey: ["/api/faculties", facultyId, "teachers"],
    });

    const faculty = faculties?.find(f => f.id === facultyId);
    const university = universities?.find(u => u.id === faculty?.universityId);

    const reviewMutation = useMutation({
        mutationFn: async (reviewData: { teacherId: number; rating: number; comment: string }) => {
            return await apiRequest(`/api/reviews`, {
                method: "POST",
                body: JSON.stringify(reviewData),
                headers: {
                    "Content-Type": "application/json",
                },
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["/api/faculties", facultyId, "teachers"] });
            toast({
                title: "Review Submitted",
                description: "Thank you for your review! Your feedback helps other students.",
            });
        },
        onError: () => {
            toast({
                title: "Error",
                description: "Failed to submit review. Please try again.",
                variant: "destructive",
            });
        },
    });

    if (isLoading) {
        return <div>Loading teachers...</div>;
    }

    if (!faculty || !university) {
        return <div>Faculty not found</div>;
    }

    const generateStarRating = (rating: number) => {
        const stars = [];
        const fullStars = Math.floor(rating / 20); // Convert from 0-100 to 0-5
        const hasHalfStar = (rating % 20) >= 10;

        for (let i = 0; i < fullStars; i++) {
            stars.push(<Star key={`full-${i}`} className="h-4 w-4 fill-yellow-400 text-yellow-400" />);
        }

        if (hasHalfStar) {
            stars.push(<StarHalf key="half" className="h-4 w-4 fill-yellow-400 text-yellow-400" />);
        }

        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
        for (let i = 0; i < emptyStars; i++) {
            stars.push(<Star key={`empty-${i}`} className="h-4 w-4 text-gray-300" />);
        }

        return stars;
    };

    const handleRatingChange = (teacherId: number, rating: number) => {
        setRatings(prev => ({ ...prev, [teacherId]: rating }));
    };

    const handleCommentChange = (teacherId: number, comment: string) => {
        setComments(prev => ({ ...prev, [teacherId]: comment }));
    };

    const submitReview = (teacherId: number) => {
        const rating = ratings[teacherId] || 5;
        const comment = comments[teacherId] || "";

        if (!comment.trim()) {
            toast({
                title: "Review Required",
                description: "Please provide a comment with your rating.",
                variant: "destructive",
            });
            return;
        }

        reviewMutation.mutate({
            teacherId,
            rating,
            comment,
        });

        // Clear form
        setRatings(prev => ({ ...prev, [teacherId]: 5 }));
        setComments(prev => ({ ...prev, [teacherId]: "" }));
    };

    return (
        <div className="min-h-screen bg-neutral">
            {/* Header */}
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <div className="flex items-center space-x-3">
                            <GraduationCap className="text-primary text-2xl" />
                            <h1 className="text-2xl font-bold text-gray-900">Teacher Review BD</h1>
                        </div>
                        <div className="flex items-center space-x-4">
                            <span className="text-sm text-secondary">Rate • Review • Discover</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Breadcrumb items={[
                    { label: "Private Universities", href: "/universities" },
                    { label: university.name, href: `/faculties/${university.id}` },
                    { label: faculty.name }
                ]} />

                <div className="space-y-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Faculty Teachers</h2>
                        <p className="text-lg text-secondary mb-8">Rate and review teachers to help fellow students</p>
                    </div>

                    <div className="space-y-6">
                        {facultyTeachers?.map((teacher) => {
                            const ratingHistory = [8, 9, 7, 8, 9, 8, 7, 9, 8, 8]; // Mock rating history for now
                            const currentRating = ratings[teacher.id] || 5;
                            const currentComment = comments[teacher.id] || "";

                            return (
                                <Card key={teacher.id} className="p-6">
                                    <div className="flex flex-col lg:flex-row gap-6">
                                        {/* Teacher Info */}
                                        <div className="flex-shrink-0">
                                            <img
                                                src={teacher.image}
                                                alt={teacher.name}
                                                className="w-32 h-32 rounded-full object-cover mx-auto lg:mx-0"
                                            />
                                        </div>

                                        <div className="flex-1">
                                            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                                                <div>
                                                    <h3 className="text-xl font-semibold text-gray-900 mb-1">{teacher.name}</h3>
                                                    <p className="text-secondary mb-2">{teacher.subject}</p>
                                                    <div className="flex items-center space-x-2">
                            <span className="text-2xl font-bold text-primary">
                              {(teacher.averageRating / 10).toFixed(1)}
                            </span>
                                                        <div className="flex items-center">
                                                            {generateStarRating(teacher.averageRating)}
                                                        </div>
                                                        <span className="text-sm text-secondary">({teacher.totalRatings} reviews)</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Rating History Bar Graph */}
                                            <RatingHistory ratings={ratingHistory} />

                                            {/* Rating Form */}
                                            <div className="border-t pt-4">
                                                <h4 className="text-sm font-semibold text-gray-700 mb-3">Rate this teacher</h4>
                                                <div className="space-y-4">
                                                    <RatingSlider
                                                        onRatingChange={(rating) => handleRatingChange(teacher.id, rating)}
                                                        initialValue={currentRating}
                                                    />

                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                                            Your Review
                                                        </label>
                                                        <Textarea
                                                            rows={3}
                                                            value={currentComment}
                                                            onChange={(e) => handleCommentChange(teacher.id, e.target.value)}
                                                            placeholder="Share your experience with this teacher..."
                                                            className="resize-none"
                                                        />
                                                    </div>

                                                    <Button
                                                        onClick={() => submitReview(teacher.id)}
                                                        disabled={reviewMutation.isPending}
                                                        className="w-full sm:w-auto"
                                                    >
                                                        {reviewMutation.isPending ? "Submitting..." : "Submit Review"}
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            );
                        })}
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-white border-t mt-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="text-center">
                        <p className="text-secondary">
                            &copy; 2024 Teacher Review BD. Empowering students through transparent teacher reviews.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}