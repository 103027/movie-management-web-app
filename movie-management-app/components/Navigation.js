import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { useTheme } from '../store/ThemeContext';
import { Sun, Moon } from 'lucide-react';

export default function Navigation() {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();

  const isActive = (path) => router.pathname === path;

  return (
    <>
      <div className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-lg z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="font-bold text-xl text-movieHouse hover:text-blue-800 transition duration-300 dark:text-blue-600">
                Movie House
              </Link>
            </div>

            <NavigationMenu className="flex items-center space-x-4">
              <NavigationMenuList className="flex items-center space-x-4">
                <NavigationMenuItem>
                  <Link href="/movies" passHref>
                    <span
                      className={`${navigationMenuTriggerStyle()} ${isActive('/movies')
                        ? 'text-blue-600 border-b-2 border-blue-500'
                        : 'text-gray-500 hover:text-blue-600 dark:text-gray-300'
                        }`}
                    >
                      Movies
                    </span>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link href="/genres" passHref>
                    <span
                      className={`${navigationMenuTriggerStyle()} ${isActive('/genres')
                        ? 'text-blue-600 border-b-2 border-blue-500'
                        : 'text-gray-500 hover:text-blue-600 dark:text-gray-300'
                        }`}
                    >
                      Genres
                    </span>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link href="/directors" passHref>
                    <span
                      className={`${navigationMenuTriggerStyle()} ${isActive('/directors')
                        ? 'text-blue-600 border-b-2 border-blue-500'
                        : 'text-gray-500 hover:text-blue-600 dark:text-gray-300'
                        }`}
                    >
                      Directors
                    </span>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link href="/help" passHref>
                    <span
                      className={`${navigationMenuTriggerStyle()} ${isActive('/help')
                        ? 'text-blue-600 border-b-2 border-blue-500'
                        : 'text-gray-500 hover:text-blue-600 dark:text-gray-300'
                        }`}
                    >
                      Help
                    </span>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            {/* Dark Mode Toggle Button */}
            <button
              onClick={toggleTheme}
              className="px-4 py-2 rounded dark:text-gray-400 ml-4 flex items-center justify-center"
            >
              {theme === 'light' ? (
                <Sun className="w-5 h-5 text-black dark:text-gray-800" />
              ) : (
                <Moon className="w-5 h-5 text-black dark:text-blue-700" />
              )}
            </button>
          </div>
        </div>
      </div>
      {/* Add padding to prevent content from hiding under fixed navbar */}
      <div className="h-16"></div>
    </>
  );
}
