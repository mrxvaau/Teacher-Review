import { useLocation } from "wouter";
import { GraduationCap, Building, University } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Home() {
    const [, setLocation] = useLocation();

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
                <div className="space-y-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose University Type</h2>
                        <p className="text-lg text-secondary mb-8">Select the type of university to explore and rate teachers</p>
                    </div>

                    {/* Toggle Options */}
                    <div className="flex justify-center space-x-6">
                        {/* Public University (Disabled) */}
                        <Card className="relative opacity-50">
                            <CardContent className="p-8">
                                <div className="text-center">
                                    <University className="h-16 w-16 text-gray-400 mb-4 mx-auto" />
                                    <h3 className="text-xl font-semibold text-gray-500 mb-2">Public University</h3>
                                    <span className="bg-gray-200 text-gray-600 px-3 py-1 rounded-full text-sm">
                    Coming Soon
                  </span>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Private University (Enabled) */}
                        <Card className="relative hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                            <CardContent className="p-8">
                                <div className="text-center">
                                    <Building className="h-16 w-16 text-primary mb-4 mx-auto" />
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Private University</h3>
                                    <span className="bg-primary text-white px-3 py-1 rounded-full text-sm mb-4 inline-block">
                    Available
                  </span>
                                    <div>
                                        <Button
                                            onClick={() => setLocation("/universities")}
                                            className="w-full"
                                        >
                                            Explore Universities
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
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