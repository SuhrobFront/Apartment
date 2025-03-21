import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  User,
  Menu,
  X,
  Heart,
  MapPin,
  Home as HomeIcon,
  LogOut,
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
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [localUserName, setLocalUserName] = useState(userName);
  const [localIsLoggedIn, setLocalIsLoggedIn] = useState(isLoggedIn);

  // Check login status from localStorage
  useEffect(() => {
    const userToken = localStorage.getItem("userToken");
    const storedUserName = localStorage.getItem("userName");

    setLocalIsLoggedIn(!!userToken);
    if (storedUserName) {
      setLocalUserName(storedUserName);
    }
  }, [isLoggedIn]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userName");
    setLocalIsLoggedIn(false);
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold text-primary">{logo}</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            <Link
              to="/"
              className="text-gray-700 hover:text-primary px-3 py-2 text-sm font-medium"
            >
              Главная
            </Link>
            <Link
              to="/floor-plans"
              className="text-gray-700 hover:text-primary px-3 py-2 text-sm font-medium"
            >
              Квартиры
            </Link>
            <Link
              to="/about"
              className="text-gray-700 hover:text-primary px-3 py-2 text-sm font-medium"
            >
              О нас
            </Link>
            <Link
              to="/contact"
              className="text-gray-700 hover:text-primary px-3 py-2 text-sm font-medium"
            >
              Контакты
            </Link>
          </nav>

          {/* Desktop Search and User */}
          <div className="hidden md:flex items-center space-x-4">
            <form onSubmit={handleSearch} className="relative w-64">
              <Input
                type="text"
                placeholder="Поиск..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
            </form>

            {localIsLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center gap-2 text-gray-700 hover:text-primary"
                  >
                    <User size={20} />
                    <span>{localUserName}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => navigate("/profile")}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Профиль</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/favorites")}>
                    <Heart className="mr-2 h-4 w-4" />
                    <span>Избранное</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Выйти</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                variant="default"
                onClick={() => navigate("/login")}
                className="flex items-center gap-2"
              >
                <User size={18} />
                <span>Войти</span>
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-2">
            {localIsLoggedIn && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate("/favorites")}
                className="text-gray-700"
              >
                <Heart size={20} />
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMobileMenu}
              className="text-gray-700"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200">
          <div className="container mx-auto px-4 py-3 space-y-4">
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="text"
                placeholder="Поиск..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
            </form>

            <nav className="flex flex-col space-y-2">
              <Link
                to="/"
                className="flex items-center gap-2 text-gray-700 hover:text-primary px-3 py-2 text-sm font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <HomeIcon size={18} />
                <span>Главная</span>
              </Link>
              <Link
                to="/floor-plans"
                className="flex items-center gap-2 text-gray-700 hover:text-primary px-3 py-2 text-sm font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <MapPin size={18} />
                <span>Квартиры</span>
              </Link>
              <Link
                to="/about"
                className="flex items-center gap-2 text-gray-700 hover:text-primary px-3 py-2 text-sm font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span>О нас</span>
              </Link>
              <Link
                to="/contact"
                className="flex items-center gap-2 text-gray-700 hover:text-primary px-3 py-2 text-sm font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span>Контакты</span>
              </Link>
            </nav>

            {localIsLoggedIn ? (
              <div className="border-t border-gray-200 pt-4">
                <div className="flex items-center gap-2 mb-4">
                  <User size={18} className="text-gray-500" />
                  <span className="font-medium">{localUserName}</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      navigate("/profile");
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full"
                  >
                    Профиль
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleLogout}
                    className="w-full"
                  >
                    Выйти
                  </Button>
                </div>
              </div>
            ) : (
              <div className="border-t border-gray-200 pt-4">
                <Button
                  onClick={() => {
                    navigate("/login");
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full"
                >
                  Войти / Зарегистрироваться
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
