import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HelpCircle, MessageCircle, ShieldCheck, ChevronRight } from "lucide-react";

export default function HelpPage() {
    const helpTopics = [
        {
            title: "FAQs",
            icon: <HelpCircle className="h-5 w-5" />,
            href: "/help/faqs",
            description: "Find answers to commonly asked questions about Movie House."
        },
        {
            title: "Contact Us",
            icon: <MessageCircle className="h-5 w-5" />,
            href: "/help/contact",
            description: "Get in touch with our support team for assistance."
        },
        {
            title: "Privacy Policy",
            icon: <ShieldCheck className="h-5 w-5" />,
            href: "/help/privacy",
            description: "Learn about how we handle your data and privacy."
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
            <main className="container mx-auto px-4 py-8">
                <div className="mt-2 mb-4">
                    <Link href="/">
                        <span className="text-blue-600 hover:text-blue-800">← Back</span>
                    </Link>
                </div>
                
                <Card className="overflow-hidden transition-all duration-300 bg-white dark:bg-gray-800 border border-gray-100 shadow-md">
                    <CardHeader className="border-b border-gray-100">
                        <CardTitle className="text-3xl font-bold text-movieHouse">Help Center</CardTitle>
                    </CardHeader>
                    
                    <CardContent className="pt-6">
                        <p className="mb-6 text-gray-700 dark:text-gray-400">Welcome to the Movie House help center. Choose a topic below:</p>

                        <div className="space-y-4">
                            {helpTopics.map((topic, index) => (
                                <Link key={index} href={topic.href}>
                                    <div className="p-4 border border-gray-100 rounded-lg hover:bg-gray-50 hover:dark:bg-gray-700 transition-all duration-300 flex items-center justify-between group">
                                        <div className="flex items-center">
                                            <div className="text-movieHouse mr-3">
                                                {topic.icon}
                                            </div>
                                            <div>
                                                <h3 className="font-medium text-gray-800 dark:text-gray-400">{topic.title}</h3>
                                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{topic.description}</p>
                                            </div>
                                        </div>
                                        <ChevronRight className="h-5 w-5 text-gray-400 dark:text-gray-400 group-hover:text-movieHouse transition-colors" />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}