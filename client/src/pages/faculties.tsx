import { GraduationCap, ChartLine, Users, Cog, FlaskConical } from "lucide-react";
import { useLocation } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Breadcrumb } from "@/components/breadcrumb";
import { useQuery } from "@tanstack/react-query";
import { Faculty, University } from "@shared/schema";

const iconMap = {
    "chart-line": ChartLine,
    "users": Users,
    "cogs": Cog,
    "flask": FlaskConical,
};

const colorMap = {
    "blue": "bg-blue-500",
    "green": "bg-green-500",
    "purple": "bg-purple-500",
    "orange": "bg-orange-500",
};

export default function Faculties() {
    const [, setLocation] = useLocation();
    const [location] = useLocation();
    const universityId = parseInt(location.split("/")[2]);

    const { data: universities } = useQuery<University[]>({
        queryKey: ["/api/universities"],
    });

    const { data: universityFaculties, isLoading } = useQuery<Faculty[]>({
        queryKey: ["/api/universities", universityId, "faculties"],
    });

    const university = universities?.find(u => u.id === universityId);

    if (isLoading) {
        return <div>Loading faculties...</div>;
    }

    if (!university) {
        return <div>University not found</div>;
    }

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
                    { label: university.name }
                ]} />

                <div className="space-y-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">{university.name} Faculties</h2>
                        <p className="text-lg text-secondary mb-8">Select a faculty to explore teachers and their ratings</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {universityFaculties?.map((faculty) => {
                            const IconComponent = iconMap[faculty.icon as keyof typeof iconMap];
                            const colorClass = colorMap[faculty.color as keyof typeof colorMap];

                            return (
                                <Card
                                    key={faculty.id}
                                    className="hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
                                >
                                    <CardContent className="p-6">
                                        <div className="text-center">
                                            <div className={`w-16 h-16 ${colorClass} rounded-full flex items-center justify-center mx-auto mb-4`}>
                                                <IconComponent className="text-white text-xl" />
                                            </div>
                                            <h3 className="text-lg font-semibold text-gray-900 mb-2">{faculty.name}</h3>
                                            <p className="text-sm text-secondary mb-4">{faculty.fullName}</p>
                                            <Button
                                                onClick={() => setLocation(`/teachers/${faculty.id}`)}
                                                className="w-full"
                                            >
                                                View Teachers
                                            </Button>
                                        </div>
                                    </CardContent>
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