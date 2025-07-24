import { ChevronRight } from "lucide-react";
import { Link } from "wouter";

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface BreadcrumbProps {
    items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
    return (
        <nav className="mb-8">
            <ol className="flex items-center space-x-2 text-sm">
                <li>
                    <Link
                        href="/"
                        className="text-primary hover:text-blue-600 transition-colors"
                    >
                        Home
                    </Link>
                </li>
                {items.map((item, index) => (
                    <li key={index} className="flex items-center">
                        <ChevronRight className="h-4 w-4 text-secondary mx-2" />
                        {item.href ? (
                            <Link
                                href={item.href}
                                className="text-primary hover:text-blue-600 transition-colors"
                            >
                                {item.label}
                            </Link>
                        ) : (
                            <span className="text-secondary">{item.label}</span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
}