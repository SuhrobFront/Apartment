import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  User,
  Menu,
  X,
  Heart,
  MapPin,
  Home as HomeIcon,
} from "lucide-react";
import { cn } from "../lib/utils";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface NavbarProps {
  logo?: string;
  onSearch?: (query: string) => void;
  isLoggedIn?: boolean;
  userName?: string;
}

const Navbar = ({
  logo = "Квартира",
  onSearch = () => {},
  isLoggedIn = false,
  userName = "Гость",
}: NavbarProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="w-full h-20 bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="container h-full mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/">
            <h1 className="text-2xl font-bold text-gray-900">{logo}</h1>
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center space-x-6">
          <Link to="/" className="text-gray-700 hover:text-primary font-medium">
            Квартиры
          </Link>
          <Link
            to="/floor-plans"
            className="text-gray-700 hover:text-primary font-medium"
          >
            Планировки
          </Link>
          <Link
            to="/about"
            className="text-gray-700 hover:text-primary font-medium"
          >
            О нас
          </Link>
          <Link
            to="/contact"
            className="text-gray-700 hover:text-primary font-medium"
          >
            Контакты
          </Link>
        </div>

        {/* Desktop Search */}
        <div className="hidden md:flex items-center space-x-6 flex-1 justify-center max-w-md mx-4">
          <form onSubmit={handleSearch} className="w-full">
            <div className="relative">
              <Input
                type="text"
                placeholder="Поиск квартир..."
                className="w-full pl-10 pr-4 py-2 rounded-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
            </div>
          </form>
        </div>

        {/* User Menu (Desktop) */}
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/favorites">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Heart className="h-5 w-5" />
            </Button>
          </Link>
          <Button variant="ghost" size="icon" className="rounded-full">
            <MapPin className="h-5 w-5" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {isLoggedIn ? (
                <>
                  <DropdownMenuItem className="cursor-pointer">
                    <Link to="/profile" className="w-full">
                      Профиль ({userName})
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <Link to="/favorites" className="w-full">
                      Избранное
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    Выйти
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem className="cursor-pointer">
                    <Link to="/login" className="w-full">
                      Войти
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <Link to="/login?tab=register" className="w-full">
                      Регистрация
                    </Link>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMobileMenu}
            className="rounded-full"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white p-4 border-b border-gray-200">
          <form onSubmit={handleSearch} className="mb-4">
            <div className="relative">
              <Input
                type="text"
                placeholder="Поиск квартир..."
                className="w-full pl-10 pr-4 py-2 rounded-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
            </div>
          </form>
          <div className="space-y-2">
            <Link to="/">
              <Button variant="ghost" className="w-full justify-start">
                <HomeIcon className="mr-2 h-4 w-4" /> Квартиры
              </Button>
            </Link>
            <Link to="/floor-plans">
              <Button variant="ghost" className="w-full justify-start">
                <MapPin className="mr-2 h-4 w-4" /> Планировки
              </Button>
            </Link>
            <Link to="/favorites">
              <Button variant="ghost" className="w-full justify-start">
                <Heart className="mr-2 h-4 w-4" /> Избранное
              </Button>
            </Link>
            <Link to="/about">
              <Button variant="ghost" className="w-full justify-start">
                О нас
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="ghost" className="w-full justify-start">
                Контакты
              </Button>
            </Link>
            <div className="border-t border-gray-200 my-2 pt-2">
              {isLoggedIn ? (
                <>
                  <Link to="/profile">
                    <Button variant="ghost" className="w-full justify-start">
                      <User className="mr-2 h-4 w-4" /> Профиль ({userName})
                    </Button>
                  </Link>
                  <Button variant="ghost" className="w-full justify-start">
                    Выйти
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <Button variant="ghost" className="w-full justify-start">
                      Войти
                    </Button>
                  </Link>
                  <Link to="/login?tab=register">
                    <Button variant="ghost" className="w-full justify-start">
                      Регистрация
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
