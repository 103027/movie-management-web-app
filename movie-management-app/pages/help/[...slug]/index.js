import Link from 'next/link';
import { useRouter } from 'next/router';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription,
  CardFooter
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  ChevronLeft, 
  Home, 
  AlertCircle,
  Mail,
  Phone,
  Clock,
  Search,
  Star,
  Database
} from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function HelpInfo() {
  const helpContent = {
    faqs: {
      title: 'Frequently Asked Questions',
      description: 'Common questions about using our movie database',
      items: [
        {
          icon: <Search className="h-5 w-5 text-blue-500" />,
          question: 'How do I search for movies?',
          answer: 'Use the search bar at the top of the page to find movies by title or director.'
        },
        {
          icon: <Star className="h-5 w-5 text-yellow-500" />,
          question: 'How are movies rated?',
          answer: 'Movies are rated on a scale of 1-10 based on user ratings.'
        },
        {
          icon: <Database className="h-5 w-5 text-green-500" />,
          question: 'Can I contribute to the movie database?',
          answer: 'Currently, this is a read-only database for demonstration purposes.'
        }
      ]
    },
    contact: {
      title: 'Contact Us',
      description: 'Get in touch with our support team',
      items: [
        {
          icon: <Mail className="h-5 w-5 text-blue-500" />,
          label: 'Email',
          value: 'support@moviehouse.com'
        },
        {
          icon: <Phone className="h-5 w-5 text-green-500" />,
          label: 'Phone',
          value: '1-800-MOVIES'
        },
        {
          icon: <Clock className="h-5 w-5 text-purple-500" />,
          label: 'Hours',
          value: 'Monday through Friday, 9 AM to 5 PM EST'
        }
      ]
    },
    privacy: {
      title: 'Privacy Policy',
      description: 'Information about data collection and usage',
      content: 'This is a demo application. No personal data is collected or stored. The movie information is stored locally and used for demonstration purposes only.'
    },
  };

  const router = useRouter();
  const { slug } = router.query;

  if (!slug) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-white dark:bg-gray-800">
          <CardContent className="pt-6">
            <div className="space-y-2">
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const pageKey = slug[0];

  if (!helpContent[pageKey]) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-white dark:bg-gray-800">
          <CardHeader className="text-center">
            <CardTitle className="text-4xl font-bold text-red-600">404</CardTitle>
            <CardDescription className="text-xl">Oops! Page not found</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center py-6">
            <AlertCircle className="h-16 w-16 text-red-500" />
          </CardContent>
          <CardFooter className="flex justify-center pb-6">
            <Link href="/">
              <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
                <Home className="h-4 w-4" />
                Go Home
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    );
  }

  // Render content based on the page type
  const renderContent = () => {
    if (pageKey === 'faqs') {
      return (
        <div className="space-y-6">
          {helpContent.faqs.items.map((item, index) => (
            <div key={index} className="border-b pb-4 last:border-0 last:pb-0">
              <div className="flex items-start gap-3">
                {item.icon}
                <div>
                  <h3 className="font-medium text-lg text-gray-800 dark:text-gray-400">{item.question}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">{item.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    } else if (pageKey === 'contact') {
      return (
        <div className="space-y-6">
          {helpContent.contact.items.map((item, index) => (
            <div key={index} className="flex items-center gap-3 border-b pb-4 last:border-0 last:pb-0">
              {item.icon}
              <div>
                <h3 className="font-medium text-gray-800 dark:text-gray-400">{item.label}</h3>
                <p className="text-gray-600 dark:text-gray-400">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      );
    } else {
      return (
        <div className="text-gray-600 dark:text-gray-400">
          <p>{helpContent[pageKey].content}</p>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <main className="container mx-auto px-4 py-8">
        <div className="mt-2 mb-6">
          <Link href="/help">
            <Button variant="ghost" className="text-blue-600 hover:text-blue-800">
              <ChevronLeft size={16} />
              <span>Back to Help</span>
            </Button>
          </Link>
        </div>
        <Card className="bg-white dark:bg-gray-800 shadow-sm">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-blue-700">{helpContent[pageKey].title}</CardTitle>
            {helpContent[pageKey].description && (
              <CardDescription>{helpContent[pageKey].description}</CardDescription>
            )}
          </CardHeader>
          <CardContent>
            {renderContent()}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}