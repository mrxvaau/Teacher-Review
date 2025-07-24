import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from "recharts";

interface RatingHistoryProps {
    ratings: number[];
    title?: string;
}

export function RatingHistory({ ratings, title = "Rating History" }: RatingHistoryProps) {
    const data = ratings.map((rating, index) => ({
        index: index + 1,
        rating,
    }));

    return (
        <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-700 mb-3">{title}</h4>
            <div className="h-16">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                        <XAxis hide />
                        <YAxis hide />
                        <Bar dataKey="rating" radius={[2, 2, 0, 0]}>
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill="hsl(207, 90%, 54%)" />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}