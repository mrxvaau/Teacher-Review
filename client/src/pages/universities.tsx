import { GraduationCap } from "lucide-react";
import { useLocation } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Breadcrumb } from "@/components/breadcrumb";
import { useQuery } from "@tanstack/react-query";
import { University } from "@shared/schema";

export default function Universities() {
    const [, setLocation] = useLocation();
    const { data: universities, isLoading } = useQuery<University[]>({
        queryKey: ["/api/universities"],
    });

    if (isLoading) {
        return <div>Loading universities...</div>;
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
                <Breadcrumb items={[{ label: "Private Universities" }]} />

                <div className="space-y-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Private Universities</h2>
                        <p className="text-lg text-secondary mb-8">Select a university to explore faculties and rate teachers</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {universities?.map((university) => (
                            <Card
                                key={university.id}
                                className={`
                  ${university.enabled
                                    ? 'hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 cursor-pointer'
                                    : 'opacity-50 cursor-not-allowed bg-gray-50'
                                }
                `}
                            >
                                <CardContent className="p-6">
                                    <div className="text-center">
                                        <div className={`
                      w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4
                      ${university.enabled ? 'bg-primary' : 'bg-gray-300'}
                    `}>
                                            <GraduationCap className={`
                        text-xl ${university.enabled ? 'text-white' : 'text-gray-500'}
                      `} />
                                        </div>
                                        <h3 className={`
                      text-lg font-semibold mb-2
                      ${university.enabled ? 'text-gray-900' : 'text-gray-600'}
                    `}>
                                            {university.name}
                                        </h3>
                                        <p className={`
                      text-sm mb-4
                      ${university.enabled ? 'text-secondary' : 'text-gray-500'}
                    `}>
                                            {university.fullName}
                                        </p>
                                        <Button
                                            onClick={() => university.enabled && setLocation(`/faculties/${university.id}`)}
                                            disabled={!university.enabled}
                                            className="w-full"
                                            variant={university.enabled ? "default" : "secondary"}
                                        >
                                            {university.enabled ? "View Faculties" : "Coming Soon"}
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
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